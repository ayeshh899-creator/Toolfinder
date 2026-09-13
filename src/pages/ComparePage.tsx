import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Scale,
  X,
  Plus,
  Star,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { TOOLS_DATA } from '../data/toolsData';
import { ToolItem } from '../types';

export const ComparePage: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare, addToCompare } = useCompare();
  const [addDropdownOpen, setAddDropdownOpen] = useState(false);

  const availableToAdd = TOOLS_DATA.filter(
    (t) => !compareList.some((c) => c.id === t.id)
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Side-by-Side Tool Comparison
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Compare features, pricing limitations, and skill requirements for up to 4 software solutions.
          </p>
        </div>

        {compareList.length > 0 && (
          <div className="flex items-center gap-2">
            {compareList.length < 4 && (
              <div className="relative">
                <button
                  onClick={() => setAddDropdownOpen(!addDropdownOpen)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Another Tool
                </button>

                {addDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 max-h-72 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-y-auto p-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                      Choose tool to compare
                    </div>
                    {availableToAdd.slice(0, 15).map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => {
                          addToCompare(tool);
                          setAddDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-indigo-50 hover:text-indigo-700 flex items-center justify-between"
                      >
                        <span className="font-semibold text-slate-800">{tool.name}</span>
                        <span className="text-[10px] text-slate-400">{tool.category}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={clearCompare}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 text-xs font-semibold"
            >
              Clear Comparison
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {compareList.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Scale className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No tools selected for comparison</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Browse our 60+ verified directory and click &ldquo;Compare&rdquo; on any tool card, or pick a popular tool below to begin.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-2">
            {TOOLS_DATA.slice(0, 3).map((tool) => (
              <button
                key={tool.id}
                onClick={() => addToCompare(tool)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-xs font-bold text-slate-700 transition-colors"
              >
                + Add {tool.name}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-xs"
            >
              Browse Directory
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        /* Comparison Table Grid */
        <div className="bg-white rounded-3xl border border-slate-200 overflow-x-auto shadow-xs">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider w-48">
                  Feature / Matrix
                </th>
                {compareList.map((tool) => (
                  <th key={tool.id} className="p-5 align-top min-w-[220px]">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl ${tool.iconBg} text-white font-bold flex items-center justify-center text-sm shadow-xs`}
                        >
                          {tool.initials}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{tool.name}</div>
                          <div className="text-[11px] text-slate-500 font-normal">{tool.category}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCompare(tool.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100"
                        title="Remove from compare"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {/* Pricing Model */}
              <tr>
                <td className="p-5 font-bold text-slate-900 bg-slate-50/30">Pricing Model</td>
                {compareList.map((tool) => (
                  <td key={tool.id} className="p-5 font-semibold">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                        tool.pricing === '100% Free'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : tool.pricing === 'Freemium'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {tool.pricing}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Free Plan Limits */}
              <tr>
                <td className="p-5 font-bold text-slate-900 bg-slate-50/30">Free Plan Quota / Limits</td>
                {compareList.map((tool) => (
                  <td key={tool.id} className="p-5 text-slate-600 leading-relaxed text-xs">
                    {tool.limitations || 'Standard public limits.'}
                  </td>
                ))}
              </tr>

              {/* Credit Card Required */}
              <tr>
                <td className="p-5 font-bold text-slate-900 bg-slate-50/30">Credit Card on Signup</td>
                {compareList.map((tool) => (
                  <td key={tool.id} className="p-5">
                    {tool.noCreditCard ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                        <CreditCard className="w-3.5 h-3.5" />
                        No Card Needed
                      </span>
                    ) : (
                      <span className="text-slate-500 font-medium">May require payment details</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Skill Level */}
              <tr>
                <td className="p-5 font-bold text-slate-900 bg-slate-50/30">Learning Curve</td>
                {compareList.map((tool) => (
                  <td key={tool.id} className="p-5 font-semibold text-slate-800">
                    {tool.skillLevel}
                  </td>
                ))}
              </tr>

              {/* Community Rating */}
              <tr>
                <td className="p-5 font-bold text-slate-900 bg-slate-50/30">Rating & Popularity</td>
                {compareList.map((tool) => (
                  <td key={tool.id} className="p-5">
                    <div className="flex items-center gap-1.5 font-bold text-amber-600">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{tool.rating.toFixed(1)}</span>
                      <span className="text-slate-400 font-normal">({tool.popularity}/100 pop)</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Primary Strengths & Use Cases */}
              <tr>
                <td className="p-5 font-bold text-slate-900 bg-slate-50/30">Top Use Cases</td>
                {compareList.map((tool) => (
                  <td key={tool.id} className="p-5 align-top">
                    <ul className="space-y-1.5">
                      {tool.useCases.slice(0, 3).map((uc, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 mt-0.5 shrink-0" />
                          <span>{uc}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Actions */}
              <tr>
                <td className="p-5 font-bold text-slate-900 bg-slate-50/30">Official Link</td>
                {compareList.map((tool) => (
                  <td key={tool.id} className="p-5">
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs transition-colors shadow-xs"
                    >
                      Visit Website
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
