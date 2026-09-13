import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Search, ArrowRight, Trash2, ExternalLink } from 'lucide-react';
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

export const FavoritesPage: React.FC = () => {
  const { user } = useAuth();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getUserFavorites(user.uid)
      .then((favs) => {
        setFavorites(favs);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  const handleToggleFavorite = async (toolId: string) => {
    if (!user) return;
    setFavorites((prev) => prev.filter((id) => id !== toolId));
    try {
      await toggleUserFavorite(user.uid, toolId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectDetails = async (tool: ToolItem) => {
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

  const favoritedTools = TOOLS_DATA.filter((tool) => favorites.includes(tool.id));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Saved Favorites
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Your personal collection of bookmarked tools, synced securely with your account.
        </p>
      </div>

      {favoritedTools.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6 fill-rose-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No tools saved yet</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Click the bookmark icon on any tool card while exploring the directory to save it to your dashboard.
          </p>
          <div className="pt-2">
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-xs"
            >
              Explore Directory
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{favoritedTools.length}</strong> saved tools
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {favoritedTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={true}
                onToggleFavorite={handleToggleFavorite}
                isInCompare={isInCompare(tool.id)}
                onToggleCompare={handleToggleCompare}
                onSelectDetails={handleSelectDetails}
              />
            ))}
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
