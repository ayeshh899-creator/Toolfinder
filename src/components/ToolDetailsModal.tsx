import React from 'react';
import {
  X,
  ExternalLink,
  Star,
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  Scale,
  Sparkles,
  CreditCard,
  Layers,
} from 'lucide-react';
import { ToolItem } from '../types';

interface ToolDetailsModalProps {
  tool: ToolItem | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (toolId: string) => void;
  isInCompare: boolean;
  onToggleCompare: (tool: ToolItem) => void;
}

export const ToolDetailsModal: React.FC<ToolDetailsModalProps> = ({
  tool,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  isInCompare,
  onToggleCompare,
}) => {
  if (!isOpen || !tool) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl ${tool.iconBg} text-white font-black text-xl flex items-center justify-center shadow-md`}
            >
              {tool.initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-slate-900">{tool.name}</h2>
                {tool.hiddenGem && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    Hidden Gem
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {tool.category} {tool.subCategory && `• ${tool.subCategory}`}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key metadata pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border ${
                tool.pricing === '100% Free'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : tool.pricing === 'Freemium'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              Pricing: {tool.pricing}
            </span>

            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              Skill: {tool.skillLevel}
            </span>

            {tool.noCreditCard ? (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5" />
                No Credit Card Required
              </span>
            ) : (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Card May Be Required
              </span>
            )}

            <div className="ml-auto flex items-center gap-1.5 text-xs font-bold text-amber-600">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{tool.rating.toFixed(1)}</span>
              {tool.reviewsCount && (
                <span className="text-slate-400 font-normal">({tool.reviewsCount} reviews)</span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Overview
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {tool.description}
            </p>
          </div>

          {/* Use Cases */}
          {tool.useCases && tool.useCases.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Best Use Cases & Strengths
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tool.useCases.map((useCase, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transparent Limitations */}
          {tool.limitations && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                Free Plan Limitations & Quotas
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                {tool.limitations}
              </p>
            </div>
          )}

          {/* Tags */}
          {tool.tags && tool.tags.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Tags
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => onToggleFavorite(tool.id)}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                isFavorite
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{isFavorite ? 'Saved in Favorites' : 'Save to Favorites'}</span>
            </button>

            <button
              onClick={() => onToggleCompare(tool)}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                isInCompare
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{isInCompare ? 'In Compare' : 'Add to Compare'}</span>
            </button>
          </div>

          <a
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            Visit Official Website
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
