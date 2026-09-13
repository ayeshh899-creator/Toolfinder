import { FreeStackPreset } from '../types';

export const FREE_STACKS_DATA: FreeStackPreset[] = [
  {
    id: 'website',
    title: 'Modern Web Application',
    icon: 'Globe',
    description: 'Launch a lightning-fast web app with authentication, database, responsive frontend, and global CDN hosting at $0 upfront cost.',
    targetAudience: 'Developers, Indie Hackers & Startup Founders',
    monthlyCostEstimate: '$0 / month (Free tier limits apply)',
    tiers: [
      {
        role: 'Frontend & UI Scaffolding',
        toolId: 'v0-dev',
        tier: 'Free Plan',
        explanation: 'Generate production-ready React + Tailwind components without manual design system setup.',
        limitationNote: '200 free monthly credits. You can export clean code directly to your local project.'
      },
      {
        role: 'Code Editor & Refactoring',
        toolId: 'cursor',
        tier: 'Free Plan',
        explanation: 'AI-assisted code completion, multi-file editing, and inline terminal debugging.',
        limitationNote: 'Free tier includes standard AI completions and 50 premium fast requests/mo.'
      },
      {
        role: 'Database & Authentication',
        toolId: 'supabase',
        tier: 'Free Plan',
        explanation: 'Managed PostgreSQL database, user authentication (OAuth & Email), and auto-generated REST APIs.',
        limitationNote: '500MB database, 1GB storage, 50k monthly active users included for free.'
      },
      {
        role: 'Global CDN & Edge Hosting',
        toolId: 'vercel',
        tier: 'Free Plan',
        explanation: 'Instant continuous Git deployments, free SSL, custom domains, and Edge functions.',
        limitationNote: '100GB bandwidth/month and automatic preview branch deployments on Hobby plan.'
      },
      {
        role: 'UI Vector Icons',
        toolId: 'lucide-icons',
        tier: '100% Free',
        explanation: 'Over 1,400 clean SVG vector icons licensed under permissive open-source ISC license.',
        limitationNote: '100% free with no account or usage caps required.'
      }
    ]
  },
  {
    id: 'mobile-app',
    title: 'Cross-Platform Mobile App',
    icon: 'Smartphone',
    description: 'Create an iOS and Android mobile app using React Native, Expo, and cloud backends without buying Mac hardware or servers.',
    targetAudience: 'Mobile Developers & Solo Creators',
    monthlyCostEstimate: '$0 / month for development (Apple App Store fee $99/yr optional for publishing)',
    tiers: [
      {
        role: 'Mobile Architecture & Prototyping',
        toolId: 'figma',
        tier: 'Free Plan',
        explanation: 'Design high-fidelity mobile screens, component libraries, and interactive click-through prototypes.',
        limitationNote: 'Free plan supports 3 collaborative files and unlimited personal drafts.'
      },
      {
        role: 'Universal Mobile Framework',
        toolId: 'expo',
        tier: '100% Free',
        explanation: 'Universal React Native framework with live on-device testing via Expo Go app.',
        limitationNote: 'Core framework is 100% free open source. Cloud EAS builds provide generous free monthly credits.'
      },
      {
        role: 'Cloud Backend & Data Storage',
        toolId: 'supabase',
        tier: 'Free Plan',
        explanation: 'Handles mobile user logins, push notification tokens, and realtime user tables.',
        limitationNote: '500MB database and generous realtime quotas included free.'
      },
      {
        role: 'App Store Assets & Badges',
        toolId: 'canva',
        tier: 'Free Plan',
        explanation: 'Generate screenshot mockups for App Store and Google Play listings with device frames.',
        limitationNote: 'Free tier includes standard mobile mockups, templates, and PNG exports.'
      }
    ]
  },
  {
    id: 'portfolio',
    title: 'Developer / Designer Portfolio',
    icon: 'Briefcase',
    description: 'Showcase your work with a personalized, high-converting portfolio with animations, responsive layouts, and zero hosting costs.',
    targetAudience: 'Job Seekers, Freelancers, Software Engineers & Designers',
    monthlyCostEstimate: '$0 / month (100% free lifetime hosting)',
    tiers: [
      {
        role: 'Visual Design & CMS',
        toolId: 'framer',
        tier: 'Free Plan',
        explanation: 'Design responsive layouts visually with production animations and deploy to your custom framer.app domain.',
        limitationNote: 'Free plan includes Framer badge and framer.app subdomain. Or export code and host on Netlify for free custom domain.'
      },
      {
        role: 'Alternative Code Host',
        toolId: 'netlify',
        tier: '100% Free',
        explanation: 'Deploy static portfolio with free custom domain support (you only pay for your domain registrar) and free SSL.',
        limitationNote: '100GB monthly bandwidth, instant Git rollbacks, and built-in contact form handling for 100 submissions/mo.'
      },
      {
        role: 'Color Palette & Typography',
        toolId: 'coolors',
        tier: '100% Free',
        explanation: 'Harmonize your personal branding with accessible contrast checks.',
        limitationNote: '100% free color palette generation and HEX/CSS export.'
      },
      {
        role: 'Copy & Bio Polishing',
        toolId: 'hemingway-editor',
        tier: '100% Free',
        explanation: 'Ensure your bio and case studies are punchy, concise, and easy for recruiters to scan.',
        limitationNote: '100% free online editor with zero registration required.'
      }
    ]
  },
  {
    id: 'blog',
    title: 'High-Performance Technical Blog',
    icon: 'BookOpen',
    description: 'Publish search-optimized articles, tutorials, and technical insights with zero server maintenance and automated RSS feeds.',
    targetAudience: 'Technical Writers, Marketers & Thought Leaders',
    monthlyCostEstimate: '$0 / month',
    tiers: [
      {
        role: 'Topic & Search Intent Discovery',
        toolId: 'answer-the-public',
        tier: 'Free with Limits',
        explanation: 'Discover high-volume questions people ask on Google to write targeted tutorials that rank.',
        limitationNote: 'Free plan provides 3 searches per day without credit card.'
      },
      {
        role: 'Drafting & Code Snippets',
        toolId: 'claude-3-5',
        tier: 'Free with Limits',
        explanation: 'Draft thorough, highly technical blog articles with nuanced explanations and code samples.',
        limitationNote: 'Free access subject to standard rolling message quota.'
      },
      {
        role: 'Grammar & Clarity Verification',
        toolId: 'grammarly',
        tier: 'Free Plan',
        explanation: 'Real-time spelling, punctuation, and syntax proofreading before publishing.',
        limitationNote: 'Core critical grammar and spelling corrections are free.'
      },
      {
        role: 'Hosting & CDN Distribution',
        toolId: 'vercel',
        tier: 'Free Plan',
        explanation: 'Host Next.js or Astro blog with server-side rendering or static HTML generation.',
        limitationNote: 'Free Hobby tier provides fast global caching and automatic Git CI/CD.'
      }
    ]
  },
  {
    id: 'video',
    title: 'Short-Form & YouTube Video Suite',
    icon: 'Video',
    description: 'Produce engaging video content, screen recordings, tutorials, and TikTok/Reels without expensive editing software.',
    targetAudience: 'YouTubers, Educators & Social Media Creators',
    monthlyCostEstimate: '$0 / month with watermark-free exports',
    tiers: [
      {
        role: 'Timeline Video Editor',
        toolId: 'capcut',
        tier: 'Free Plan',
        explanation: 'Browser and desktop video editor with automatic kinetic subtitles and trending audio beats.',
        limitationNote: 'Core video editing, transitions, and 1080p exports are free without watermarks.'
      },
      {
        role: 'Webcam & Screen Recording',
        toolId: 'clipchamp',
        tier: 'Free Plan',
        explanation: 'Browser-based HD screen and camera recorder with built-in trimming tools.',
        limitationNote: 'Unlimited watermark-free 1080p video rendering on the free tier.'
      },
      {
        role: 'Royalty-Free Audio & SFX',
        toolId: 'pixabay-audio',
        tier: '100% Free',
        explanation: 'Thousands of high-quality background music tracks and audio effects safe from copyright claims.',
        limitationNote: '100% free for commercial use with no attribution required.'
      },
      {
        role: 'AI Voice Narration',
        toolId: 'elevenlabs',
        tier: 'Free with Limits',
        explanation: 'Ultra-realistic AI voiceover for intro clips and video tutorials.',
        limitationNote: '10,000 free characters per month (approx. 10-15 minutes of audio) with attribution.'
      }
    ]
  },
  {
    id: 'content',
    title: 'Multi-Channel Content Engine',
    icon: 'Feather',
    description: 'Research, outline, draft, edit, and cross-post content across LinkedIn, Twitter/X, and newsletters systematically.',
    targetAudience: 'Copywriters, Agency Marketers & Brand Strategists',
    monthlyCostEstimate: '$0 / month',
    tiers: [
      {
        role: 'Research & Fact Verification',
        toolId: 'perplexity-ai',
        tier: 'Free Plan',
        explanation: 'Search engine with real-time web citations to back up every claim and quote in your content.',
        limitationNote: 'Unlimited basic searches with source citations included for free.'
      },
      {
        role: 'Long-Form Writing & Repurposing',
        toolId: 'chatgpt-4o',
        tier: 'Free with Limits',
        explanation: 'Repurpose one core article into tweet storms, newsletter digests, and LinkedIn carousels.',
        limitationNote: 'Free access to GPT-4o with standard usage limits.'
      },
      {
        role: 'Thumbnail & Carousel Design',
        toolId: 'canva',
        tier: 'Free Plan',
        explanation: 'Craft clean visual carousels and infographics with drag-and-drop templates.',
        limitationNote: 'Thousands of free templates, fonts, and high-res PNG/PDF exports.'
      },
      {
        role: 'Social Syndication Automation',
        toolId: 'zapier',
        tier: 'Free with Limits',
        explanation: 'Auto-publish new blog RSS items directly to social channels.',
        limitationNote: 'Free tier includes 100 task executions per month.'
      }
    ]
  },
  {
    id: 'online-store',
    title: 'Digital Products & Online Store',
    icon: 'ShoppingBag',
    description: 'Sell digital downloads, templates, SaaS subscriptions, or merch with $0 monthly recurring software fees.',
    targetAudience: 'Creators, Digital Sellers & Course Instructors',
    monthlyCostEstimate: '$0 / month fixed cost (Only standard 2.9% + 30¢ credit card processing fees per sale apply)',
    tiers: [
      {
        role: 'Storefront & Landing Page',
        toolId: 'framer',
        tier: 'Free Plan',
        explanation: 'Visually assemble a clean, high-conversion product landing page with product mockups.',
        limitationNote: 'Free to build and publish on framer.app domain or export to Vercel/Netlify.'
      },
      {
        role: 'Checkout & Customer Database',
        toolId: 'supabase',
        tier: 'Free Plan',
        explanation: 'Store customer accounts, product catalog, purchase history, and download links securely.',
        limitationNote: 'Free tier easily supports initial 10,000+ customer records.'
      },
      {
        role: 'Product Mockups & Badges',
        toolId: 'canva',
        tier: 'Free Plan',
        explanation: 'Generate realistic digital book, software box, and 3D screen mockups for your store.',
        limitationNote: 'Free tier includes dozens of customizable digital product mockups.'
      },
      {
        role: 'Order Notification Automation',
        toolId: 'make-com',
        tier: 'Free with Limits',
        explanation: 'Send instant receipt emails and invite customers to your community automatically when payment succeeds.',
        limitationNote: '1,000 free automation operations every month.'
      }
    ]
  }
];
