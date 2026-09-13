import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  Globe,
  Smartphone,
  Briefcase,
  BookOpen,
  Video,
  Feather,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { FREE_STACKS_DATA } from '../data/freeStacksData';
import { TOOLS_DATA } from '../data/toolsData';
import { ToolDetailsModal } from '../components/ToolDetailsModal';
import { FreeStackPreset, ToolItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCompare } from '../context/CompareContext';
import {
  getUserFavorites,
  toggleUserFavorite,
  addRecentlyViewed,
} from '../firebase/firestoreService';

export const BuildFreePage: React.FC = () => {
  const { user } = useAuth();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  const [activeStackId, setActiveStackId] = useState<string>(FREE_STACKS_DATA[0].id);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);

  const activeStack =
    FREE_STACKS_DATA.find((s) => s.id === activeStackId) || FREE_STACKS_DATA[0];

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

  const handleSelectTool = async (tool: ToolItem) => {
    setSelectedTool(tool);
    if (!user) return;
    addRecentlyViewed(user.uid, tool.id).catch(console.error);
  };

  const handleToggleCompare = (tool: ToolItem) => {
    if (isInCompare(tool.id)) {
      removeFromCompare(tool.id);
    } else {
      addToCompare(tool);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-5 h-5" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5" />;
      case 'Video':
        return <Video className="w-5 h-5" />;
      case 'Feather':
        return <Feather className="w-5 h-5" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
          <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
          Zero-Cost & Freemium Stacks
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Build It For Free
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Select your project type to reveal a verified recipe of tools that can be run on generous free plans without entering a credit card upfront.
        </p>
      </div>

      {/* Preset Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
        {FREE_STACKS_DATA.map((preset) => {
          const isSelected = preset.id === activeStackId;
          return (
            <button
              key={preset.id}
              onClick={() => setActiveStackId(preset.id)}
              className={`p-3 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div
                className={`p-2 rounded-xl ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-700'
                }`}
              >
                {getIcon(preset.icon)}
              </div>
              <span className="text-xs font-bold leading-tight line-clamp-1">{preset.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Stack Recipe Detail */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        {/* Banner */}
        <div className="p-6 sm:p-8 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Verified Free Stack Blueprint
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
              {activeStack.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              {activeStack.description}
            </p>
            <div className="text-xs text-slate-500 mt-2">
              <strong>Best For:</strong> {activeStack.targetAudience}
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0 bg-white p-4 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Estimated Monthly Cost
            </span>
            <span className="text-xl font-black text-emerald-600 mt-0.5 block">
              {activeStack.monthlyCostEstimate}
            </span>
            <span className="text-[10px] text-slate-400">Software fees only</span>
          </div>
        </div>

        {/* Tiers Breakdown List */}
        <div className="p-6 sm:p-8 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
            Component Tools & Free Plan Breakdown ({activeStack.tiers.length} Services)
          </h3>

          <div className="space-y-4">
            {activeStack.tiers.map((tier, idx) => {
              const tool = TOOLS_DATA.find((t) => t.id === tier.toolId);
              if (!tool) return null;

              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <div
                      className={`w-12 h-12 rounded-2xl ${tool.iconBg} text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-xs mt-0.5`}
                    >
                      {tool.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          {tier.role}:
                        </span>
                        <h4
                          onClick={() => handleSelectTool(tool)}
                          className="text-base font-bold text-slate-900 hover:text-emerald-700 cursor-pointer"
                        >
                          {tool.name}
                        </h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            tier.tier === '100% Free'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : tier.tier === 'Free Plan'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          {tier.tier}
                        </span>
                      </div>

                      <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                        {tier.explanation}
                      </p>

                      {tier.limitationNote && (
                        <div className="mt-2 text-[11px] text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/70 inline-flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Limit: {tier.limitationNote}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <button
                      onClick={() => handleSelectTool(tool)}
                      className="flex-1 md:flex-initial px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Details
                    </button>
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
                    >
                      Open Tool
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
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
