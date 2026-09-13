# ToolFinder 🧭
> *Find better tools for your next project.*

ToolFinder is a modern, production-grade web application built to help engineers, designers, creators, and founders discover verified software, inspect realistic free tiers & limitations, follow step-by-step project roadmaps, and compare tools side by side.

---

## 🚀 Key Features

1. **Clean Authentication & Profile Architecture**:
   - Real Firebase Auth (`Email & Password`, `Google Sign-in`, and `Password Reset`).
   - Strictly isolated user profiles created on signup in Firestore `users/{uid}`.
   - Protected routes — private dashboards and user features are inaccessible until authenticated.
   - Zero hardcoded demo users or pre-filled sessions.

2. **Curated 60+ Developer & Creator Tools**:
   - Filter by Category (Development, UI/UX, Content & Copy, Video & Audio, Productivity & Automation, Data & AI Models).
   - Filter by Pricing (100% Free, Freemium, Paid), Skill Level, and "No Credit Card Required".
   - Transparent quotas and free plan limitations highlighted for every tool.

3. **Curated Hidden Gems & Surprise Me ✨**:
   - Discover high-leverage tools built by focused indie developers.
   - "Surprise Me" lucky generator rolls unexpected gems.

4. **Interactive Project Roadmaps**:
   - 4 End-to-End Guides: Website Development, Mobile App Development, Content Creation, and Video Production.
   - Real-time step completion checkboxes persisted to Firestore per user.
   - Recommended production tools and 0-cost free alternatives for each step.

5. **Build It For Free Blueprints**:
   - 7 Verified 0-cost stack recipes for Websites, Mobile Apps, Portfolios, Blogs, Video, Newsletters, and E-commerce.
   - Software cost breakdowns with transparent limit caveats.

6. **Side-by-Side Comparison Engine**:
   - Compare up to 4 tools across pricing models, quotas, learning curves, and strengths.

7. **AI Stack Assistant (Secure Backend Proxy)**:
   - Fullstack proxy endpoint `/api/assistant` securely keeping API keys on the server.
   - Pre-engineered system prompt grounded in 60+ verified software tools.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide React, Motion, React Router v7
- **Backend / API**: Express Node.js (`server.ts` bundled with `esbuild`)
- **Database & Auth**: Firebase Authentication & Firestore (with automatic local-scoped storage fallback)
- **AI Engine**: Gemini 2.5 / OpenAI GPT-4o proxy

---

## 📦 How to Upload to GitHub & Deploy to Netlify

### Step 1: Initialize Git and Push to GitHub

In your project terminal, run:

```bash
# 1. Initialize git repository
git init

# 2. Add all files and commit
git add .
git commit -m "feat: complete ToolFinder production application"

# 3. Rename branch to main
git branch -M main

# 4. Add your GitHub remote (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/toolfinder.git

# 5. Push code to GitHub
git push -u origin main
```

### Step 2: Deploy to Netlify

ToolFinder comes with a pre-configured `netlify.toml` file ready for instant deployment.

1. Go to [Netlify](https://app.netlify.com/) and sign in.
2. Click **"Add new site"** > **"Import an existing project"**.
3. Select **GitHub** and authorize access to your `toolfinder` repository.
4. Netlify will auto-detect the build settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. *(Optional)* Under **Site configuration > Environment variables**, add your production credentials:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_PROJECT_ID`
   - `GEMINI_API_KEY` or `OPENAI_API_KEY`
6. Click **"Deploy ToolFinder"**. Your application will be live in seconds with automatic HTTPS and continuous deployment on every git push!

---

## 🔑 Environment Variables

Refer to `.env.example` for all configurable variables:

```bash
# Server-side AI
GEMINI_API_KEY=""
OPENAI_API_KEY=""

# Client-side Firebase (Optional)
VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_MESSAGING_SENDER_ID=""
VITE_FIREBASE_APP_ID=""
```

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
