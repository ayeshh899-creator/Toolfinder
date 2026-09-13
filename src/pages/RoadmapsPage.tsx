import React, { useState, useEffect } from 'react';
import {
  Layers,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  ExternalLink,
  Sparkles,
  ChevronRight,
  Bookmark,
  Scale,
} from 'lucide-react';
import { ROADMAPS_DATA } from '../data/roadmapsData';
import { TOOLS_DATA } from '../data/toolsData';
import { ToolDetailsModal } from '../components/ToolDetailsModal';
import { ProjectRoadmap, RoadmapStep, ToolItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCompare } from '../context/CompareContext';
import {
  getUserRoadmapProgress,
  toggleRoadmapStep,
  RoadmapProgressState,
  getUserFavorites,
  toggleUserFavorite,
  addRecentlyViewed,
} from '../firebase/firestoreService';

export const RoadmapsPage: React.FC = () => {
  const { user } = useAuth();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  const [activeRoadmapId, setActiveRoadmapId] = useState<string>(ROADMAPS_DATA[0].id);
  const [activeStepId, setActiveStepId] = useState<string>(ROADMAPS_DATA[0].steps[0].id);
  const [progressState, setProgressState] = useState<RoadmapProgressState>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);

  const activeRoadmap =
    ROADMAPS_DATA.find((r) => r.id === activeRoadmapId) || ROADMAPS_DATA[0];
  const activeStep =
    activeRoadmap.steps.find((s) => s.id === activeStepId) || activeRoadmap.steps[0];

  useEffect(() => {
    if (!user) return;
    Promise.all([getUserRoadmapProgress(user.uid), getUserFavorites(user.uid)])
      .then(([progress, favs]) => {
        setProgressState(progress);
        setFavorites(favs);
      })
      .catch(console.error);
  }, [user]);

  // When switching roadmap, set active step to first step of that roadmap
  const handleSelectRoadmap = (roadmap: ProjectRoadmap) => {
    setActiveRoadmapId(roadmap.id);
    setActiveStepId(roadmap.steps[0].id);
  };

  const handleToggleStep = async (stepId: string) => {
    if (!user) return;
    const currentSteps = progressState[activeRoadmapId] || [];
    const isCompleted = currentSteps.includes(stepId);
    const updated = isCompleted
      ? currentSteps.filter((s) => s !== stepId)
      : [...currentSteps, stepId];

    setProgressState((prev) => ({
      ...prev,
      [activeRoadmapId]: updated,
    }));

    try {
      await toggleRoadmapStep(user.uid, activeRoadmapId, stepId);
    } catch (err) {
      console.error('Failed to sync roadmap progress:', err);
    }
  };

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

  // Find tools for active step
  const recommendedTools = TOOLS_DATA.filter((t) =>
    activeStep.recommendedToolIds.includes(t.id)
  );
  const freeAlternatives = TOOLS_DATA.filter((t) =>
    activeStep.freeAlternativeIds.includes(t.id)
  );

  const completedCount = progressState[activeRoadmapId]?.length || 0;
  const progressPercent = Math.round(
    (completedCount / activeRoadmap.steps.length) * 100
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Interactive Project Roadmaps
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Follow verified paths for engineering, design, and content. Track your step completion in real time.
        </p>
      </div>

      {/* Roadmap Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {ROADMAPS_DATA.map((rm) => {
          const isSelected = rm.id === activeRoadmapId;
          const done = progressState[rm.id]?.length || 0;
          const pct = Math.round((done / rm.steps.length) * 100);

          return (
            <button
              key={rm.id}
              onClick={() => handleSelectRoadmap(rm)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-500/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span
                  className={`font-bold ${
                    isSelected ? 'text-indigo-700' : 'text-slate-500'
                  }`}
                >
                  {rm.category}
                </span>
                <span className="font-semibold text-slate-400">{pct}%</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{rm.title}</h3>
              <div className="mt-3 w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Roadmap Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Step Navigation Rail (Left 5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-5 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-slate-900 text-base">{activeRoadmap.title}</h2>
              <p className="text-xs text-slate-500">
                {activeRoadmap.estimatedTime} • {activeRoadmap.difficulty}
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {completedCount} / {activeRoadmap.steps.length} Steps
            </span>
          </div>

          <div className="space-y-2">
            {activeRoadmap.steps.map((step, idx) => {
              const isSelected = step.id === activeStepId;
              const isCompleted = (progressState[activeRoadmapId] || []).includes(step.id);

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStepId(step.id)}
                  className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : isCompleted
                      ? 'bg-emerald-50/60 border-emerald-200 text-slate-800 hover:bg-emerald-50'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleStep(step.id);
                    }}
                    className={`mt-0.5 shrink-0 transition-transform hover:scale-110 ${
                      isSelected ? 'text-white' : isCompleted ? 'text-emerald-600' : 'text-slate-300'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-xs font-bold ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                        Step {idx + 1}
                      </span>
                      {isCompleted && (
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-indigo-200' : 'text-emerald-700'}`}>
                          Completed
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-bold truncate leading-tight mt-0.5">
                      {step.title}
                    </div>
                    <div className={`text-xs truncate mt-0.5 ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                      {step.subtitle}
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 mt-3 ${
                      isSelected ? 'text-indigo-200' : 'text-slate-300'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Details & Tool Recommendations (Right 7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Active Step Analysis
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                {activeStep.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">{activeStep.subtitle}</p>
            </div>

            <button
              onClick={() => handleToggleStep(activeStep.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors ${
                (progressState[activeRoadmapId] || []).includes(activeStep.id)
                  ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {(progressState[activeRoadmapId] || []).includes(activeStep.id)
                  ? 'Mark Incomplete'
                  : 'Mark Step Done'}
              </span>
            </button>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Objective & Instructions
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {activeStep.description}
            </p>
          </div>

          {/* Expected Deliverables */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Expected Deliverables from this step
            </h4>
            <ul className="space-y-1.5">
              {activeStep.deliverables.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Production Tools */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Recommended Software for this Step
              </h4>
              <span className="text-[11px] text-slate-500">Curated for best output</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recommendedTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => handleSelectTool(tool)}
                  className="p-3.5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 cursor-pointer transition-all flex items-start justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl ${tool.iconBg} text-white font-bold flex items-center justify-center text-xs shrink-0`}
                    >
                      {tool.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 text-xs truncate">
                        {tool.name}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {tool.pricing} • {tool.skillLevel}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-indigo-600 shrink-0">Inspect</span>
                </div>
              ))}
            </div>
          </div>

          {/* Free Alternatives */}
          {freeAlternatives.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  100% Free / Budget Alternatives
                </h4>
                <span className="text-[11px] text-emerald-700 font-medium">Zero cost options</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {freeAlternatives.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => handleSelectTool(tool)}
                    className="p-3 rounded-xl border border-emerald-200/80 bg-emerald-50/30 hover:bg-emerald-50 cursor-pointer transition-all flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg ${tool.iconBg} text-white font-bold flex items-center justify-center text-xs shrink-0`}
                      >
                        {tool.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 text-xs truncate">
                          {tool.name}
                        </div>
                        <div className="text-[10px] text-emerald-800">{tool.pricing}</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 shrink-0">View</span>
                  </div>
                ))}
              </div>
            </div>
          )}
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
