import React from 'react';
import {
  Star,
  ExternalLink,
  Bookmark,
  Scale,
  Sparkles,
  CreditCard,
  Check,
} from 'lucide-react';
import { ToolItem } from '../types';

interface ToolCardProps {
  tool: ToolItem;
  isFavorite: boolean;
  onToggleFavorite: (toolId: string) => void;
  isInCompare: boolean;
  onToggleCompare: (tool: ToolItem) => void;
  onSelectDetails: (tool: ToolItem) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  isFavorite,
  onToggleFavorite,
  isInCompare,
  onToggleCompare,
  onSelectDetails,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all duration-200 group">
      <div>
        {/* Top bar: Icon, Name, Category, Badges */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-xl ${tool.iconBg} text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0`}
            >
              {tool.initials}
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3
                  onClick={() => onSelectDetails(tool)}
                  className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer leading-tight"
                >
                  {tool.name}
                </h3>
                {tool.hiddenGem && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                    Gem
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 truncate max-w-[180px]">
                {tool.subCategory || tool.category}
              </p>
            </div>
          </div>

          <button
            onClick={() => onToggleFavorite(tool.id)}
            aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            className={`p-1.5 rounded-lg border transition-colors ${
              isFavorite
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {tool.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
              tool.pricing === '100% Free'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : tool.pricing === 'Freemium'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}
          >
            {tool.pricing}
          </span>

          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60">
            {tool.skillLevel}
          </span>

          {tool.noCreditCard && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-50/50 text-emerald-800 border border-emerald-100">
              No Card Needed
            </span>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-amber-600 font-bold">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{tool.rating.toFixed(1)}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onToggleCompare(tool)}
            title="Compare tool"
            className={`px-2 py-1 rounded-lg border text-[11px] font-semibold transition-colors flex items-center gap-1 ${
              isInCompare
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : 'text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Scale className="w-3 h-3" />
            <span>{isInCompare ? 'Comparing' : 'Compare'}</span>
          </button>

          <button
            onClick={() => onSelectDetails(tool)}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-indigo-600 text-white text-[11px] font-semibold transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};
