import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2,
  DollarSign,
  Bot,
  Zap,
  Star,
  ExternalLink,
  Search,
  Code2,
  ShieldCheck,
  Cpu,
} from 'lucide-react';
import { PublicNavbar } from '../components/PublicNavbar';
import { TOOLS_DATA } from '../data/toolsData';
import { ROADMAPS_DATA } from '../data/roadmapsData';
import { FREE_STACKS_DATA } from '../data/freeStacksData';

export const LandingPage: React.FC = () => {
  // Grab a curated slice for previews
  const previewTools = TOOLS_DATA.slice(0, 6);
  const hiddenGems = TOOLS_DATA.filter((t) => t.hiddenGem).slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32 border-b border-slate-100">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(99,102,241,0.12),rgba(255,255,255,0))]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-8 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Curated directory of 60+ production tools & roadmaps</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.1]">
            Find better tools for your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">next project</span>.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Stop wasting hours sifting through hype. ToolFinder delivers verified, real-world development, design, and AI tools with transparent pricing, step-by-step project roadmaps, and zero-cost stack recipes.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/signin"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Sign In to Your Workspace
            </Link>
          </div>

          {/* Social Proof / Key Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-slate-100 pt-10">
            <div>
              <div className="text-3xl font-extrabold text-slate-900">60+</div>
              <div className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">Curated Real Tools</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900">4</div>
              <div className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">Interactive Roadmaps</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900">100%</div>
              <div className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">Zero-Cost Stacks</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900">OpenAI</div>
              <div className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">AI Stack Advisor</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 1: Explore Tools Preview */}
      <section id="preview-tools" className="py-20 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
                <Search className="w-3.5 h-3.5" />
                Explore Tools Preview
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Discover tested tools by category & pricing
              </h2>
              <p className="text-slate-600 mt-2 max-w-xl text-sm sm:text-base">
                Search through our verified index spanning Development, UI/UX Design, Audio & Video, and Data Models.
              </p>
            </div>
            <Link
              to="/signup"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Sign up to view all 60+ tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Tools Grid Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-indigo-300 hover:shadow-sm transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${tool.iconBg} text-white font-bold flex items-center justify-center text-sm shadow-sm`}>
                        {tool.initials}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 leading-tight">{tool.name}</h3>
                        <span className="text-xs text-slate-500">{tool.category}</span>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                        tool.pricing === '100% Free'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : tool.pricing === 'Freemium'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {tool.pricing}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tool.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1 text-amber-600 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{tool.rating.toFixed(1)}</span>
                    <span className="text-slate-400 font-normal">({tool.reviewsCount})</span>
                  </div>
                  <Link
                    to="/signup"
                    className="font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    View Details
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature 2: Hidden Gems Preview */}
      <section id="preview-gems" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Lesser-Known Superpowers
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Hidden Gems that give you an unfair advantage
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Everyone knows the mega-corporation tools. We dig up the breakthrough tools engineered by specialized teams that save you hours every week.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hiddenGems.map((gem) => (
              <div
                key={gem.id}
                className="bg-amber-50/40 rounded-xl border border-amber-200/80 p-5 flex flex-col justify-between hover:bg-amber-50/70 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg ${gem.iconBg} text-white font-bold flex items-center justify-center text-sm shadow-sm`}>
                      {gem.initials}
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                      Hidden Gem
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900">{gem.name}</h3>
                  <div className="text-xs text-slate-500 mb-2">{gem.subCategory}</div>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {gem.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-200/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">{gem.pricing}</span>
                  <Link
                    to="/signup"
                    className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1"
                  >
                    Unlock
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature 3: Interactive Roadmaps Preview */}
      <section id="preview-roadmaps" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
                <Layers className="w-3.5 h-3.5" />
                Step-by-Step Project Roadmaps
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Never guess which tool to use next
              </h2>
              <p className="text-slate-600 mt-2 max-w-xl text-sm sm:text-base">
                Follow guided production workflows that map each step of your project to the exact software you need.
              </p>
            </div>
            <Link
              to="/signup"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Access interactive checklists
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ROADMAPS_DATA.map((roadmap) => (
              <div
                key={roadmap.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {roadmap.category}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {roadmap.estimatedTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{roadmap.title}</h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    {roadmap.description}
                  </p>

                  {/* Step Previews */}
                  <div className="space-y-2 mb-6">
                    {roadmap.steps.slice(0, 3).map((step, idx) => (
                      <div
                        key={step.id}
                        className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-700"
                      >
                        <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px]">
                          {idx + 1}
                        </span>
                        <span className="truncate flex-1 font-semibold">{step.title}</span>
                        <span className="text-slate-400 hidden sm:inline">{step.recommendedToolIds.length} tools</span>
                      </div>
                    ))}
                    {roadmap.steps.length > 3 && (
                      <div className="text-xs text-slate-400 pl-8 font-medium">
                        + {roadmap.steps.length - 3} more structured steps
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Tracks progress in Firestore</span>
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                  >
                    Start Roadmap
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature 4: Build It For Free Preview */}
      <section id="preview-free" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              Build It For Free
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Zero-budget stacks with transparent limits
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              No sneaky credit card traps. We show you exactly how to build websites, mobile apps, portfolios, and stores using verified free plans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FREE_STACKS_DATA.slice(0, 3).map((stack) => (
              <div
                key={stack.id}
                className="bg-slate-50 rounded-xl border border-slate-200 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {stack.monthlyCostEstimate}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{stack.title}</h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">{stack.description}</p>

                  <div className="space-y-2 mb-4">
                    {stack.tiers.slice(0, 3).map((tier, i) => (
                      <div key={i} className="text-xs bg-white p-2 rounded border border-slate-200/80">
                        <div className="flex items-center justify-between font-semibold text-slate-800">
                          <span>{tier.role}</span>
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">
                            {tier.tier}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/signup"
                  className="mt-2 block text-center py-2 px-3 text-xs font-bold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                >
                  View Complete Stack
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature 5: AI Assistant Preview */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-indigo-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold mb-4">
              <Bot className="w-3.5 h-3.5 text-indigo-400" />
              Powered by OpenAI Chat Completions Backend
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              An AI Assistant that knows every tool in the book
            </h2>
            <p className="mt-3 text-indigo-200 text-sm sm:text-base leading-relaxed">
              Ask questions naturally: “I want to launch a SaaS prototype this weekend without writing backend code. What should I use?”
            </p>
          </div>

          {/* AI Simulator Mockup */}
          <div className="max-w-2xl mx-auto bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">ToolFinder AI Co-Pilot</div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Grounded on 60+ ToolFinder database
                </div>
              </div>
            </div>

            <div className="py-6 space-y-4 text-sm">
              <div className="flex justify-end">
                <div className="bg-indigo-600 text-white px-4 py-2.5 rounded-2xl rounded-tr-none max-w-md text-xs sm:text-sm">
                  I don&apos;t know coding. What is the best free stack to launch a modern portfolio with a contact form?
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-200 px-4 py-3 rounded-2xl rounded-tl-none max-w-lg text-xs sm:text-sm leading-relaxed border border-slate-700">
                  <p className="mb-2">
                    Here is your ideal 100% free stack without writing code:
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span><strong>Framer:</strong> Visual website design with free hosting on framer.app.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span><strong>Netlify Forms:</strong> Or export and use Netlify for 100 free monthly form submissions.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span><strong>Lucide Icons:</strong> 1,400+ free vector icons directly in your layout.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Sign in to query the real AI backend</span>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Try AI Assistant
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Big Final Call to Action */}
      <section className="py-20 bg-indigo-50/50 border-b border-indigo-100 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Ready to find better tools for your project?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
            Create a free account in 10 seconds. Save favorites, track roadmaps, and compare software side-by-side.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-100"
            >
              Create Free Account
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/signin"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold rounded-xl border border-slate-300 text-slate-700 hover:bg-white transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-200 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-900 text-sm">ToolFinder</span>
            <span className="text-slate-400">© {new Date().getFullYear()} ToolFinder Suite. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/signin" className="hover:text-slate-900 transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="hover:text-slate-900 transition-colors">
              Sign Up
            </Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors flex items-center gap-1">
              GitHub Ready
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
