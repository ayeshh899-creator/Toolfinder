import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Bookmark,
  Layers,
  Search,
  Scale,
  DollarSign,
  Bot,
  Zap,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCompare } from '../context/CompareContext';
import { TOOLS_DATA } from '../data/toolsData';
import { ROADMAPS_DATA } from '../data/roadmapsData';
import { ToolCard } from '../components/ToolCard';
import { ToolDetailsModal } from '../components/ToolDetailsModal';
import {
  getUserFavorites,
  toggleUserFavorite,
  getUserRecentlyViewed,
  addRecentlyViewed,
  getUserRoadmapProgress,
  RoadmapProgressState,
} from '../firebase/firestoreService';
import { ToolItem } from '../types';

export const DashboardPage: React.FC = () => {
  const { user, userProfile } = useAuth();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);
  const [roadmapProgress, setRoadmapProgress] = useState<RoadmapProgressState>({});
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);
  const [quickAiPrompt, setQuickAiPrompt] = useState('');

  // Load user data on mount
  useEffect(() => {
    if (!user) return;

    const loadUserData = async () => {
      try {
        const [favs, recents, progress] = await Promise.all([
          getUserFavorites(user.uid),
          getUserRecentlyViewed(user.uid),
          getUserRoadmapProgress(user.uid),
        ]);
        setFavorites(favs);
        setRecentlyViewedIds(recents);
        setRoadmapProgress(progress);
      } catch (err) {
        console.error('Error loading dashboard user data:', err);
      }
    };

    loadUserData();
  }, [user]);

  const handleToggleFavorite = async (toolId: string) => {
    if (!user) return;
    // Optimistic state update
    const willBeFavorite = !favorites.includes(toolId);
    setFavorites((prev) =>
      willBeFavorite ? [...prev, toolId] : prev.filter((id) => id !== toolId)
    );
    try {
      await toggleUserFavorite(user.uid, toolId);
    } catch (err) {
      console.error('Failed to sync favorite:', err);
    }
  };

  const handleSelectToolDetails = async (tool: ToolItem) => {
    setSelectedTool(tool);
    if (!user) return;
    try {
      await addRecentlyViewed(user.uid, tool.id);
      setRecentlyViewedIds((prev) => [tool.id, ...prev.filter((id) => id !== tool.id)].slice(0, 10));
    } catch (err) {
      console.error('Failed to record recently viewed:', err);
    }
  };

  const handleToggleCompare = (tool: ToolItem) => {
    if (isInCompare(tool.id)) {
      removeFromCompare(tool.id);
    } else {
      addToCompare(tool);
    }
  };

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickAiPrompt.trim()) return;
    navigate('/ai-assistant', { state: { initialPrompt: quickAiPrompt } });
  };

  // Compute stats
  const displayName = userProfile?.displayName || user?.displayName || user?.email?.split('@')[0] || 'Creator';
  const popularTools = TOOLS_DATA.filter((t) => t.popularity >= 95).slice(0, 4);
  const hiddenGemsPreview = TOOLS_DATA.filter((t) => t.hiddenGem).slice(0, 4);
  const recentlyViewedTools = TOOLS_DATA.filter((t) => recentlyViewedIds.includes(t.id)).slice(0, 4);
  const favoriteTools = TOOLS_DATA.filter((t) => favorites.includes(t.id));

  // Compute active roadmap step progress
  const totalCompletedSteps = Object.values(roadmapProgress).reduce(
    (acc, steps) => acc + steps.length,
    0
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Workspace Active</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, <span className="text-indigo-300">{displayName}</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-indigo-200 font-normal leading-relaxed">
            Ready to find better tools for your project? Search verified software, track step-by-step project roadmaps, or assemble 100% free stacks.
          </p>

          {/* Quick AI Search bar inside hero */}
          <form onSubmit={handleAiSubmit} className="mt-6 flex gap-2 max-w-xl">
            <div className="relative flex-1">
              <Bot className="w-4 h-4 text-indigo-300 absolute left-3.5 top-3" />
              <input
                type="text"
                value={quickAiPrompt}
                onChange={(e) => setQuickAiPrompt(e.target.value)}
                placeholder="Ask ToolFinder AI: 'I want to build a free mobile app...'"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300/70 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shrink-0 transition-colors shadow-sm"
            >
              Ask AI
            </button>
          </form>
        </div>

        {/* Decorative corner icon */}
        <div className="hidden lg:block absolute -right-6 -bottom-6 text-white/5 pointer-events-none">
          <Compass className="w-64 h-64" />
        </div>
      </div>

      {/* Quick Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/favorites"
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Favorites</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bookmark className="w-4 h-4 fill-rose-500 text-rose-500" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{favorites.length}</div>
          <div className="text-xs text-slate-500 mt-1">Saved tools in profile</div>
        </Link>

        <Link
          to="/roadmaps"
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Roadmap Steps</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalCompletedSteps}</div>
          <div className="text-xs text-slate-500 mt-1">Completed milestones</div>
        </Link>

        <Link
          to="/hidden-gems"
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Hidden Gems</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {TOOLS_DATA.filter((t) => t.hiddenGem).length}
          </div>
          <div className="text-xs text-slate-500 mt-1">Lesser-known tools</div>
        </Link>

        <Link
          to="/build-free"
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Free Stacks</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">7 Stacks</div>
          <div className="text-xs text-slate-500 mt-1">Verified 0-cost recipes</div>
        </Link>
      </div>

      {/* Popular Tools Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Industry Standard Tools</h2>
            <p className="text-xs text-slate-500">The most adopted tools across modern software teams</p>
          </div>
          <Link
            to="/tools"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            View all 60+ tools
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isFavorite={favorites.includes(tool.id)}
              onToggleFavorite={handleToggleFavorite}
              isInCompare={isInCompare(tool.id)}
              onToggleCompare={handleToggleCompare}
              onSelectDetails={handleSelectToolDetails}
            />
          ))}
        </div>
      </section>

      {/* Hidden Gems Banner Spotlight */}
      <section className="bg-amber-50/60 border border-amber-200/80 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-2">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Specialized Curations
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Breakthrough Hidden Gems</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              High-productivity tools that don&apos;t spend millions on ads, but will save you hours.
            </p>
          </div>
          <Link
            to="/hidden-gems"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
          >
            Explore All Hidden Gems
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hiddenGemsPreview.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isFavorite={favorites.includes(tool.id)}
              onToggleFavorite={handleToggleFavorite}
              isInCompare={isInCompare(tool.id)}
              onToggleCompare={handleToggleCompare}
              onSelectDetails={handleSelectToolDetails}
            />
          ))}
        </div>
      </section>

      {/* Roadmaps & Free Stack Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Roadmaps Quick View */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Guided Project Roadmaps</h3>
              </div>
              <span className="text-xs font-semibold text-indigo-600">4 Workflows</span>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Step-by-step paths with exact tools for ideation, design, development, and deployment.
            </p>

            <div className="space-y-3 mb-4">
              {ROADMAPS_DATA.map((rm) => {
                const completedCount = roadmapProgress[rm.id]?.length || 0;
                const percent = Math.round((completedCount / rm.steps.length) * 100);
                return (
                  <Link
                    key={rm.id}
                    to="/roadmaps"
                    className="block p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                      <span>{rm.title}</span>
                      <span className="text-indigo-600 font-semibold">{percent}% Complete</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <Link
            to="/roadmaps"
            className="inline-flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 pt-2 border-t border-slate-100"
          >
            Continue Roadmaps
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Recently Viewed Tools */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Recently Viewed Tools</h3>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {recentlyViewedTools.length} tools
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Quickly jump back to the software profiles you inspected during this session.
            </p>

            {recentlyViewedTools.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-500">
                <Search className="w-6 h-6 mx-auto text-slate-400 mb-2" />
                You haven&apos;t inspected any tools yet today.
                <div className="mt-2">
                  <Link to="/tools" className="font-bold text-indigo-600 hover:underline">
                    Browse 60+ tools
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {recentlyViewedTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => handleSelectToolDetails(tool)}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg ${tool.iconBg} text-white font-bold flex items-center justify-center text-xs`}
                      >
                        {tool.initials}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{tool.name}</div>
                        <div className="text-[11px] text-slate-500">{tool.category}</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-indigo-600">Inspect</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/tools"
            className="inline-flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 pt-2 border-t border-slate-100 mt-4"
          >
            Explore Directory
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Tool Details Modal */}
      <ToolDetailsModal
        tool={selectedTool}
        isOpen={Boolean(selectedTool)}
        onClose={() => setSelectedTool(null)}
        isFavorite={selectedTool ? favorites.includes(selectedTool.id) : false}
        onToggleFavorite={handleToggleFavorite}
        isInCompare={selectedTool ? isInCompare(selectedTool.id) : false}
        onToggleCompare={handleToggleCompare}
      />
    </div>
  );
};
