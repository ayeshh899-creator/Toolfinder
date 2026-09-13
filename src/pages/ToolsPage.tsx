import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Sparkles,
  DollarSign,
  CreditCard,
  X,
  RotateCcw,
} from 'lucide-react';
import { TOOLS_DATA, CATEGORIES_LIST } from '../data/toolsData';
import { ToolCard } from '../components/ToolCard';
import { ToolDetailsModal } from '../components/ToolDetailsModal';
import { ToolItem, ToolCategory, PricingModel, SkillLevel } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCompare } from '../context/CompareContext';
import {
  getUserFavorites,
  toggleUserFavorite,
  addRecentlyViewed,
} from '../firebase/firestoreService';

export const ToolsPage: React.FC = () => {
  const { user } = useAuth();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('All');
  const [selectedPricing, setSelectedPricing] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [hiddenGemsOnly, setHiddenGemsOnly] = useState(false);
  const [noCardOnly, setNoCardOnly] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'name'>('popularity');

  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);

  useEffect(() => {
    if (!user) return;
    getUserFavorites(user.uid)
      .then(setFavorites)
      .catch((e) => console.error(e));
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
      console.error('Favorite toggle sync error:', err);
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

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPricing('All');
    setSelectedSkill('All');
    setHiddenGemsOnly(false);
    setNoCardOnly(false);
    setFreeOnly(false);
    setSortBy('popularity');
  };

  // Filtered & Sorted Tools
  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesDesc = tool.description.toLowerCase().includes(q);
        const matchesTags = tool.tags.some((t) => t.toLowerCase().includes(q));
        const matchesCat = tool.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesTags && !matchesCat) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'All' && tool.category !== selectedCategory) {
        return false;
      }

      // Pricing
      if (selectedPricing !== 'All' && tool.pricing !== selectedPricing) {
        return false;
      }

      // Skill Level
      if (selectedSkill !== 'All' && tool.skillLevel !== selectedSkill) {
        return false;
      }

      // Hidden Gems toggle
      if (hiddenGemsOnly && !tool.hiddenGem) {
        return false;
      }

      // 100% Free toggle
      if (freeOnly && tool.pricing !== '100% Free') {
        return false;
      }

      // No Credit Card toggle
      if (noCardOnly && !tool.noCreditCard) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return b.popularity - a.popularity;
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedPricing,
    selectedSkill,
    hiddenGemsOnly,
    noCardOnly,
    freeOnly,
    sortBy,
  ]);

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== 'All' ||
    selectedPricing !== 'All' ||
    selectedSkill !== 'All' ||
    hiddenGemsOnly ||
    noCardOnly ||
    freeOnly;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Explore Tool Directory
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Search, filter, and compare 60+ verified production tools for development, design, audio/video, and AI.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools by name, tag, or stack (e.g. 'React', 'Voice AI', 'Supabase')..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 shrink-0">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'popularity' | 'rating' | 'name')}
              className="py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {CATEGORIES_LIST.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter Badges & Quick Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {/* Pricing Select */}
            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value)}
              className="py-1.5 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
            >
              <option value="All">All Pricing Models</option>
              <option value="100% Free">100% Free</option>
              <option value="Freemium">Freemium</option>
              <option value="Paid">Paid</option>
            </select>

            {/* Skill Level Select */}
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="py-1.5 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
            >
              <option value="All">All Skill Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            {/* Toggles */}
            <button
              onClick={() => setHiddenGemsOnly(!hiddenGemsOnly)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
                hiddenGemsOnly
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Hidden Gems</span>
            </button>

            <button
              onClick={() => setFreeOnly(!freeOnly)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
                freeOnly
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Free Only</span>
            </button>

            <button
              onClick={() => setNoCardOnly(!noCardOnly)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
                noCardOnly
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span>No Credit Card</span>
            </button>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-900">{filteredTools.length}</strong> of{' '}
          {TOOLS_DATA.length} tools
        </span>
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No tools match your filters</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search query, selecting &ldquo;All Categories&rdquo;, or resetting your filters.
          </p>
          <button
            onClick={resetFilters}
            className="mt-2 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTools.map((tool) => (
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
