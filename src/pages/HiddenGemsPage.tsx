import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Shuffle,
  Star,
  ExternalLink,
  Bookmark,
  CheckCircle2,
  X,
  Layers,
} from 'lucide-react';
import { TOOLS_DATA } from '../data/toolsData';
import { ToolCard } from '../components/ToolCard';
import { ToolDetailsModal } from '../components/ToolDetailsModal';
import { ToolItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCompare } from '../context/CompareContext';
import {
  getUserFavorites,
  toggleUserFavorite,
  addRecentlyViewed,
} from '../firebase/firestoreService';

export const HiddenGemsPage: React.FC = () => {
  const { user } = useAuth();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);
  const [surpriseGem, setSurpriseGem] = useState<ToolItem | null>(null);
  const [isSurpriseModalOpen, setIsSurpriseModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const allGems = TOOLS_DATA.filter((t) => t.hiddenGem);

  useEffect(() => {
    if (!user) return;
    getUserFavorites(user.uid).then(setFavorites).catch(console.error);
  }, [user]);

  const handleToggleFavorite = async (toolId: string) => {
    if (!user) return;
    const willBeFav = !favorites.includes(toolId);
    setFavorites((prev) =>
      willBeFav ? [...prev, toolId] : prev.filter((id) => id !== toolId)
    );
    try {
      await toggleUserFavorite(user.uid, toolId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectDetails = async (tool: ToolItem) => {
    setSelectedTool(tool);
    if (!user) return;
    try {
      await addRecentlyViewed(user.uid, tool.id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleCompare = (tool: ToolItem) => {
    if (isInCompare(tool.id)) {
      removeFromCompare(tool.id);
    } else {
      addToCompare(tool);
    }
  };

  const handleSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * allGems.length);
    const chosen = allGems[randomIndex];
    setSurpriseGem(chosen);
    setIsSurpriseModalOpen(true);
    if (user) {
      addRecentlyViewed(user.uid, chosen.id).catch(console.error);
    }
  };

  const categories = ['All', ...Array.from(new Set(allGems.map((g) => g.category)))];

  const filteredGems =
    selectedCategory === 'All'
      ? allGems
      : allGems.filter((g) => g.category === selectedCategory);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Hero Spotlight */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 text-white p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-amber-100 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Curated Hidden Gems Directory</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Lesser-Known, High-Impact Tools
          </h1>
          <p className="mt-2 text-sm sm:text-base text-amber-100 font-normal leading-relaxed">
            Software built by hyper-focused indie developers and specialized labs that rival $100/mo enterprise platforms.
          </p>
        </div>

        {/* Surprise Me CTA Button */}
        <button
          onClick={handleSurpriseMe}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-amber-900 hover:bg-amber-50 font-bold text-sm shadow-lg hover:scale-105 transition-all shrink-0"
        >
          <Shuffle className="w-4 h-4 text-amber-600" />
          <span>Surprise Me ✨</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat} ({cat === 'All' ? allGems.length : allGems.filter((g) => g.category === cat).length})
          </button>
        ))}
      </div>

      {/* Gems Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredGems.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            isFavorite={favorites.includes(tool.id)}
            onToggleFavorite={handleToggleFavorite}
            isInCompare={isInCompare(tool.id)}
            onToggleCompare={handleToggleCompare}
            onSelectDetails={handleSelectDetails}
          />
        ))}
      </div>

      {/* Surprise Me Spotlight Modal */}
      {isSurpriseModalOpen && surpriseGem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-amber-200 overflow-hidden">
            <div className="p-6 bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl ${surpriseGem.iconBg} text-white font-black text-lg flex items-center justify-center shadow-md`}
                >
                  {surpriseGem.initials}
                </div>
                <div>
                  <div className="text-xs font-semibold text-amber-200 uppercase tracking-wider">
                    Today&apos;s Lucky Discovery
                  </div>
                  <h3 className="text-2xl font-bold">{surpriseGem.name}</h3>
                </div>
              </div>

              <button
                onClick={() => setIsSurpriseModalOpen(false)}
                className="p-1.5 rounded-xl bg-white/20 text-white hover:bg-white/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <span className="font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  {surpriseGem.pricing}
                </span>
                <span className="font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {surpriseGem.category}
                </span>
                <div className="ml-auto flex items-center gap-1 font-bold text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{surpriseGem.rating.toFixed(1)}</span>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {surpriseGem.description}
              </p>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80">
                <div className="font-bold text-amber-900 mb-1">Why this is a Gem:</div>
                <p className="text-amber-800">
                  {surpriseGem.useCases[0] || 'Offers exceptional functionality without hefty subscription costs.'}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    handleToggleFavorite(surpriseGem.id);
                  }}
                  className={`px-3 py-2 rounded-xl border font-semibold flex items-center gap-1.5 ${
                    favorites.includes(surpriseGem.id)
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{favorites.includes(surpriseGem.id) ? 'Favorited' : 'Bookmark'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSurpriseMe}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 flex items-center gap-1"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span>Roll Again</span>
                  </button>
                  <a
                    href={surpriseGem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center gap-1.5 shadow-xs"
                  >
                    Open Website
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
