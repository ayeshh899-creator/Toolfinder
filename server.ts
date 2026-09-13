import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "ToolFinder" });
});

// ToolFinder AI System Prompt
const TOOLFINDER_SYSTEM_PROMPT = `
You are the ToolFinder Stack Architect & AI Assistant.
Your mission is to help developers, designers, creators, and indie hackers find the absolute best software tools, frameworks, and workflows for their specific project, budget, and skill level.

Core Knowledge & Rules:
1. You have deep knowledge of modern developer and creator tools:
   - Frontend/Fullstack: Next.js, Vite, React, Vue, SvelteKit, Astro, Tailwind CSS, shadcn/ui
   - Backend & Databases: Supabase, Firebase, Appwrite, Neon (Serverless Postgres), PlanetScale, Convex, Railway, Render
   - Hosting: Vercel, Netlify, Cloudflare Pages/Workers, Fly.io, DigitalOcean
   - AI & Dev Tools: Cursor, v0 by Vercel, Bolt.new, GitHub Copilot, Claude 3.5 Sonnet, Gemini 2.5, OpenAI GPT-4o
   - UI/UX: Figma, Penpot (open-source free Figma alternative), Coolors, Lucide Icons, Spline 3D
   - Content & Audio/Video: DaVinci Resolve (free studio NLE), OBS Studio, Audacity, ElevenLabs, CapCut, Screen Studio
   - Productivity: Raycast, Notion, Obsidian, Linear, Warp terminal
2. Always highlight:
   - Whether a tool has a genuine 100% Free plan or Freemium tier
   - What the free limitations/quotas are (e.g. Supabase 500MB DB & pause after 1 week inactivity, Vercel non-commercial limits)
   - Whether a credit card is required upfront
   - Honest trade-offs and when NOT to use a tool
3. Suggest concrete, curated stacks:
   - For example: "SaaS MVP: Next.js + Tailwind + Supabase (Auth/DB) + Stripe + Resend (Emails) + Vercel (Hosting) = $0/mo until scaled."
4. Be concise, structured, friendly, and actionable with markdown formatting and bullet points.
`;

// AI Assistant Chat Proxy
app.post("/api/assistant", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Missing or invalid messages array" });
    }

    const latestUserMessage = messages[messages.length - 1]?.content || "";

    // 1. Try Gemini API first (pre-configured in AI Studio)
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey: geminiKey });
        const conversationHistory = messages.map((m: { role: string; content: string }) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: conversationHistory,
          config: {
            systemInstruction: TOOLFINDER_SYSTEM_PROMPT,
            temperature: 0.7,
          },
        });

        const reply = response.text || "I was unable to generate a response. Please try again.";
        return res.json({ reply });
      } catch (geminiError) {
        console.warn("Gemini API call failed, falling back to OpenAI or local engine:", geminiError);
      }
    }

    // 2. Try OpenAI API if provided
    const openAiKey = process.env.OPENAI_API_KEY;
    if (openAiKey) {
      try {
        const openAiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: TOOLFINDER_SYSTEM_PROMPT },
              ...messages,
            ],
            temperature: 0.7,
          }),
        });

        if (openAiResponse.ok) {
          const data = (await openAiResponse.json()) as {
            choices?: Array<{ message?: { content?: string } }>;
          };
          const reply =
            data.choices?.[0]?.message?.content ||
            "Could not parse assistant response.";
          return res.json({ reply });
        }
      } catch (openAiError) {
        console.warn("OpenAI API call failed:", openAiError);
      }
    }

    // 3. Fallback: Intelligent stack advisor engine if no API keys are configured
    const query = latestUserMessage.toLowerCase();
    let fallbackReply = `### ToolFinder Recommendation\n\nBased on your query regarding **"${latestUserMessage}"**, here is our curated stack blueprint:\n\n`;

    if (query.includes("mobile") || query.includes("app")) {
      fallbackReply += `
- **Frontend Framework**: **Expo + React Native** (100% Free, single TypeScript codebase for iOS and Android).
- **Backend & Auth**: **Supabase** or **Firebase** (Generous free tiers: 50,000 monthly active users, database storage).
- **Design & Mockups**: **Penpot** (100% Free open-source) or **Figma** (3 projects free).
- **Over-the-Air Updates**: **Expo EAS** (Free tier covers early builds).
- **Cost**: **$0/month** until reaching significant active traction.
      `;
    } else if (query.includes("design") || query.includes("ui") || query.includes("ux")) {
      fallbackReply += `
- **Interface Prototyping**: **Figma** (Industry standard) or **Penpot** (100% open-source alternative without team seat paywalls).
- **Color Palettes**: **Coolors** (Instant accessible palettes and contrast testing).
- **Icons**: **Lucide Icons** (100% Free, 1,000+ clean vector symbols with React/Vue wrappers).
- **3D & Micro-Interactions**: **Spline 3D** (Interactive 3D scenes exportable directly to web code).
      `;
    } else if (query.includes("free") || query.includes("budget") || query.includes("cheap")) {
      fallbackReply += `
- **Hosting**: **Vercel** / **Cloudflare Pages** (Zero-cost global CDN and edge networks).
- **Database**: **Neon Postgres** (0.5GB free storage, instant branching) or **Supabase**.
- **Transactional Email**: **Resend** (3,000 free emails/month, 100/day).
- **Analytics**: **Umami** / **Plausible Cloud** or Cloudflare Web Analytics (Privacy-friendly, no cookie banners).
      `;
    } else {
      fallbackReply += `
- **Web App Fullstack**: **Next.js + Tailwind CSS** deployed on **Vercel** or **Netlify**.
- **Database & Auth**: **Supabase** (Postgres DB, instant Auth, storage, row-level security).
- **AI Coding Acceleration**: **Cursor** (AI IDE) + **v0.dev** for instant UI generation.
- **Estimated Monthly Cost**: **$0.00** to prototype and launch.
      `;
    }

    fallbackReply += `\n\n*Tip: Connect your \`GEMINI_API_KEY\` or \`OPENAI_API_KEY\` in the Settings menu for live custom conversational reasoning.*`;

    return res.json({ reply: fallbackReply });
  } catch (error: unknown) {
    console.error("AI Assistant API Error:", error);
    res.status(500).json({ error: "Failed to process AI recommendation." });
  }
});

// Vite & Static Asset Handling
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ToolFinder Server running on http://localhost:${PORT}`);
  });
}

startServer();
