import { ProjectRoadmap } from '../types';

export const ROADMAPS_DATA: ProjectRoadmap[] = [
  {
    id: 'website-development',
    title: 'Website Development',
    category: 'Development & Engineering',
    description: 'A complete step-by-step path from raw idea through wireframes, responsive frontend, API backend, and automated global deployment.',
    estimatedTime: '2 - 4 Weeks',
    difficulty: 'Beginner',
    steps: [
      {
        id: 'ideation',
        title: 'Step 1: Ideation & Architecture',
        subtitle: 'Map out the sitemap, value proposition, and user journeys',
        description: 'Define who the website is for, lay out the page hierarchy, write the initial core copy, and choose your technology stack.',
        recommendedToolIds: ['relume', 'claude-3-5', 'notion-ai'],
        freeAlternativeIds: ['hemingway-editor', 'coolors'],
        deliverables: ['Sitemap diagram', 'Key value proposition copy', 'Technical requirements doc']
      },
      {
        id: 'design',
        title: 'Step 2: UI/UX & Wireframing',
        subtitle: 'Craft visual wireframes, responsive grids, and design tokens',
        description: 'Create interactive prototypes, define color palettes and typography, and assemble reusable component tokens.',
        recommendedToolIds: ['figma', 'relume', 'coolors'],
        freeAlternativeIds: ['lucide-icons', 'canva'],
        deliverables: ['Figma design system', 'Mobile & desktop responsive wireframes', 'Design token library']
      },
      {
        id: 'frontend',
        title: 'Step 3: Frontend Development',
        subtitle: 'Generate modern React, Tailwind, and accessible interactive views',
        description: 'Scaffold components rapidly using AI component generation, build responsive pages, and bind interactive states.',
        recommendedToolIds: ['v0-dev', 'cursor', 'bolt-new'],
        freeAlternativeIds: ['phind', 'lucide-icons'],
        deliverables: ['React / Vite frontend codebase', 'Tailwind responsive components', 'Interactive navigation and routes']
      },
      {
        id: 'backend',
        title: 'Step 4: Backend & Database',
        subtitle: 'Setup authentication, cloud databases, and secure APIs',
        description: 'Implement user login, configure Firestore or PostgreSQL tables, write server API endpoints, and enforce row security.',
        recommendedToolIds: ['supabase', 'convex', 'cursor'],
        freeAlternativeIds: ['render', 'postman'],
        deliverables: ['Database schemas & migration scripts', 'User auth flow (OAuth & Email)', 'REST / Serverless API routes']
      },
      {
        id: 'deployment',
        title: 'Step 5: Deployment & CI/CD',
        subtitle: 'Deploy live to global edge networks with custom domains and SSL',
        description: 'Connect your GitHub repository for automatic builds, configure environment variables, and map a custom domain.',
        recommendedToolIds: ['vercel', 'netlify', 'render'],
        freeAlternativeIds: ['netlify'],
        deliverables: ['Production URL with automatic SSL', 'Continuous deployment Git pipeline', 'Lighthouse 90+ speed audit']
      }
    ]
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    category: 'Mobile & Multi-Platform',
    description: 'Plan, prototype, code, test, and distribute cross-platform iOS and Android applications with native performance.',
    estimatedTime: '4 - 8 Weeks',
    difficulty: 'Intermediate',
    steps: [
      {
        id: 'planning',
        title: 'Step 1: Planning & Specification',
        subtitle: 'Specify mobile user journeys, permissions, and offline needs',
        description: 'Outline core mobile user stories, permissions required (camera, push notifications), and local offline storage strategy.',
        recommendedToolIds: ['linear', 'mobbin', 'notion-ai'],
        freeAlternativeIds: ['obsidian', 'trello'],
        deliverables: ['User journey wireflows', 'Device permission checklist', 'Milestone sprint backlog']
      },
      {
        id: 'design',
        title: 'Step 2: Mobile UI & Prototyping',
        subtitle: 'Design native tap-friendly layouts adhering to HIG & Material Design',
        description: 'Design mobile screens with 44px+ touch targets, bottom sheets, navigation tabs, and micro-animations.',
        recommendedToolIds: ['figma', 'uizard', 'mobbin'],
        freeAlternativeIds: ['coolors', 'canva'],
        deliverables: ['Interactive mobile clickable prototype', 'App icon & splash screen assets', 'Typography & spacing tokens']
      },
      {
        id: 'development',
        title: 'Step 3: App Development',
        subtitle: 'Build with React Native / Expo and connect cloud backends',
        description: 'Implement screen navigation, state management, offline caches, and integrate backend APIs.',
        recommendedToolIds: ['expo', 'cursor', 'supabase'],
        freeAlternativeIds: ['phind', 'replit'],
        deliverables: ['Universal React Native app codebase', 'Local SQLite / offline sync', 'Push notification handler']
      },
      {
        id: 'testing',
        title: 'Step 4: Testing & QA',
        subtitle: 'Validate device performance, API mocks, and crash telemetry',
        description: 'Run automated end-to-end device simulations, test edge network conditions, and verify deep links.',
        recommendedToolIds: ['postman', 'expo'],
        freeAlternativeIds: ['phind'],
        deliverables: ['Simulated test run report', 'Error tracking & crash logger setup', 'Beta build for TestFlight / Internal Track']
      },
      {
        id: 'deployment',
        title: 'Step 5: App Store Deployment',
        subtitle: 'Compile production binaries and publish to Google Play & Apple App Store',
        description: 'Generate production keys, bundle iOS .ipa and Android .aab binaries, write store listings, and submit for review.',
        recommendedToolIds: ['expo', 'canva'],
        freeAlternativeIds: ['recraft-ai'],
        deliverables: ['Store listing screenshots', 'Privacy policy statement', 'App Store and Google Play approvals']
      }
    ]
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    category: 'Media & Marketing',
    description: 'High-output workflow to research viral topics, generate high-retention copy, polish grammar, and automate multi-channel growth.',
    estimatedTime: 'Ongoing / 1 Week',
    difficulty: 'Beginner',
    steps: [
      {
        id: 'ideation',
        title: 'Step 1: Ideation & Topic Research',
        subtitle: 'Discover high-intent queries, viral angles, and audience questions',
        description: 'Analyze real-time search trends and questions your audience is asking online to formulate killer hooks and content outlines.',
        recommendedToolIds: ['answer-the-public', 'perplexity-ai', 'chatgpt-4o'],
        freeAlternativeIds: ['claude-3-5'],
        deliverables: ['10 validated content hooks', 'Topic outline with audience pain points', 'SEO keyword target list']
      },
      {
        id: 'writing',
        title: 'Step 2: First Draft Writing',
        subtitle: 'Write compelling long-form copy, newsletters, or blog articles',
        description: 'Flesh out your outline with compelling stories, clear data points, and actionable takeaways using collaborative AI writers.',
        recommendedToolIds: ['claude-3-5', 'per-word-ai', 'copy-ai'],
        freeAlternativeIds: ['chatgpt-4o'],
        deliverables: ['Full first-pass draft (1,500+ words)', '3 headline variations', 'Key summary bullet points']
      },
      {
        id: 'editing',
        title: 'Step 3: Editing & Readability',
        subtitle: 'Trim fluff, eliminate passive voice, and polish tone',
        description: 'Review the text to ensure high readability, flawless grammar, compelling transitions, and brand consistency.',
        recommendedToolIds: ['hemingway-editor', 'grammarly', 'quillbot'],
        freeAlternativeIds: ['hemingway-editor'],
        deliverables: ['Grade 7-8 readability score', 'Zero spelling or grammar defects', 'Formatted headings and pull quotes']
      },
      {
        id: 'publishing',
        title: 'Step 4: Visuals & Publishing',
        subtitle: 'Design custom thumbnails, banner art, and schedule publication',
        description: 'Generate high-contrast cover images, format for CMS or social platforms, and prep multi-format excerpts.',
        recommendedToolIds: ['canva', 'framer', 'recraft-ai'],
        freeAlternativeIds: ['pixabay-audio'],
        deliverables: ['Custom 16:9 social cover graphics', 'Published CMS live post', 'Formatted email newsletter']
      },
      {
        id: 'growth',
        title: 'Step 5: Distribution & Growth',
        subtitle: 'Repurpose into threads, automate social broadcasts, and track reach',
        description: 'Turn your long-form article into 5 social posts, schedule automated posting, and monitor reader engagement.',
        recommendedToolIds: ['make-com', 'zapier', 'copy-ai'],
        freeAlternativeIds: ['chatgpt-4o'],
        deliverables: ['Automated syndication pipeline', 'Social carousel / thread batch', 'Conversion analytics tracker']
      }
    ]
  },
  {
    id: 'video-production',
    title: 'Video Production',
    category: 'Audio & Visuals',
    description: 'Transform concepts into professional short and long-form video content with AI voiceovers, dynamic captions, and sound design.',
    estimatedTime: '2 - 5 Days',
    difficulty: 'Beginner',
    steps: [
      {
        id: 'scripting',
        title: 'Step 1: Scripting & Storyboarding',
        subtitle: 'Write high-retention hooks and word-for-word voiceover scripts',
        description: 'Craft a compelling script structured with a 3-second hook, problem exposition, solution demonstration, and clear call-to-action.',
        recommendedToolIds: ['audiopen', 'chatgpt-4o', 'claude-3-5'],
        freeAlternativeIds: ['hemingway-editor'],
        deliverables: ['Word-for-word timed script', 'Visual scene breakdown (B-roll cues)', 'Audio voiceover track outline']
      },
      {
        id: 'editing',
        title: 'Step 2: Video Editing & Trimming',
        subtitle: 'Cut timeline, remove filler words, and splice B-roll',
        description: 'Import video footage and audio, sync transcripts, trim awkward pauses, and arrange high-energy visual pacing.',
        recommendedToolIds: ['capcut', 'descript', 'clipchamp'],
        freeAlternativeIds: ['capcut', 'clipchamp'],
        deliverables: ['Rough cut timeline with zero dead air', 'Word-synced audio tracks', 'Multi-camera / screen-share splits']
      },
      {
        id: 'effects',
        title: 'Step 3: Visual Effects & Auto-Captions',
        subtitle: 'Add animated subtitles, B-roll generation, and background removal',
        description: 'Generate dynamic kinetic subtitles, overlay AI-generated visual B-roll, and apply smooth zoom-in camera punch cuts.',
        recommendedToolIds: ['runway-gen3', 'kling-ai', 'unscreen'],
        freeAlternativeIds: ['capcut'],
        deliverables: ['Animated word-by-word highlighted captions', 'B-roll footage overlays', 'Color grade and visual enhancements']
      },
      {
        id: 'music',
        title: 'Step 4: AI Voiceover & Music Score',
        subtitle: 'Layer realistic voiceovers, sound effects, and copyright-free beats',
        description: 'Generate emotive narration with voice cloning or text-to-speech, and blend balanced background music that ducks behind voice.',
        recommendedToolIds: ['elevenlabs', 'suno-ai', 'pixabay-audio'],
        freeAlternativeIds: ['pixabay-audio'],
        deliverables: ['Studio-grade voice narration', 'Balanced royalty-free background soundtrack', 'Punchy audio SFX (whooshes, dings)']
      },
      {
        id: 'publishing',
        title: 'Step 5: Export & Multi-Platform Publishing',
        subtitle: 'Export in crisp 1080p/4K and distribute across YouTube, TikTok, & LinkedIn',
        description: 'Render optimized 9:16 vertical and 16:9 horizontal versions, craft eye-catching thumbnails, and upload to platforms.',
        recommendedToolIds: ['canva', 'capcut'],
        freeAlternativeIds: ['clipchamp'],
        deliverables: ['Exported master video files (1080p / 4K)', 'High CTR video thumbnail', 'Published multi-channel uploads']
      }
    ]
  }
];
