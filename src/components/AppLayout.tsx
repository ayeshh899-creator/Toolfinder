import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Compass,
  LayoutDashboard,
  Search,
  Sparkles,
  Layers,
  DollarSign,
  Scale,
  Bookmark,
  Bot,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
  Sun,
  Moon,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCompare } from '../context/CompareContext';

export const AppLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  const [isDark, setIsDark] = useState(false);

  const { user, userProfile, logout } = useAuth();
  const { compareList } = useCompare();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/tools?q=${encodeURIComponent(quickSearch.trim())}`);
      setQuickSearch('');
    }
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/tools', label: 'Explore Tools', icon: Search },
    { to: '/hidden-gems', label: 'Hidden Gems', icon: Sparkles, badge: 'Curated' },
    { to: '/roadmaps', label: 'Project Roadmaps', icon: Layers },
    { to: '/build-free', label: 'Build For Free', icon: DollarSign },
    {
      to: '/compare',
      label: 'Compare',
      icon: Scale,
      count: compareList.length > 0 ? compareList.length : undefined,
    },
    { to: '/favorites', label: 'Saved Favorites', icon: Bookmark },
    { to: '/ai-assistant', label: 'AI Stack Assistant', icon: Bot, isAi: true },
  ];

  // Mobile bottom navigation items
  const mobileBottomItems = [
    { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
    { to: '/tools', label: 'Tools', icon: Search },
    { to: '/hidden-gems', label: 'Gems', icon: Sparkles },
    { to: '/roadmaps', label: 'Roadmaps', icon: Layers },
    { to: '/ai-assistant', label: 'AI Stack', icon: Bot },
  ];

  // Notifications mock data for live platform updates
  const notifications = [
    { id: 1, title: '8 New Tools Added', desc: 'Added Cursor, Supabase, and Coolors with full limit breakdown.', time: '2h ago' },
    { id: 2, title: 'Roadmaps Updated', desc: 'Added 0-cost hosting options for Mobile & Web roadmaps.', time: '1d ago' },
  ];

  // Derive real user display name
  const displayName = userProfile?.displayName || user?.displayName || user?.email?.split('@')[0] || 'Creator';
  const displayEmail = userProfile?.email || user?.email || '';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0 sticky top-0 h-screen z-30">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <NavLink to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-slate-900 flex items-center justify-center text-white shadow-sm shadow-indigo-100 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-slate-900">
                Tool<span className="text-indigo-600">Finder</span>
              </span>
            </div>
          </NavLink>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${item.isAi ? 'text-indigo-600' : ''}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">
                    {item.count}
                  </span>
                )}
                {item.badge && !item.count && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Card & Footer in Sidebar */}
        <div className="p-3 border-t border-slate-100 space-y-2">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2.5 rounded-xl border transition-colors ${
                isActive
                  ? 'border-indigo-200 bg-indigo-50/50'
                  : 'border-slate-100 hover:bg-slate-50'
              }`
            }
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-xs">
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">{displayName}</div>
              <div className="text-[11px] text-slate-500 truncate">{displayEmail}</div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Desktop & Mobile Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Unified Top Bar (Requirement 6: Search, Notifications, User Profile, Theme Toggle) */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Mobile hamburger & brand */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <NavLink to="/dashboard" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900 text-sm">ToolFinder</span>
            </NavLink>
          </div>

          {/* Search bar */}
          <form onSubmit={handleQuickSearchSubmit} className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="Quick search 60+ verified tools... (Press Enter)"
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
              />
            </div>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Compare Counter Badge */}
            <NavLink
              to="/compare"
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              title="Compare tools"
            >
              <Scale className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </NavLink>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Updates & Notices</span>
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-slate-400 hover:text-slate-600 text-xs"
                    >
                      Close
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                    {notifications.map((item) => (
                      <div key={item.id} className="p-3.5 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-900">
                          <span>{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{item.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme indicator */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Light theme active"
            >
              {isDark ? <Moon className="w-5 h-5 text-indigo-600" /> : <Sun className="w-5 h-5 text-amber-500" />}
            </button>

            {/* Profile Avatar */}
            <NavLink
              to="/profile"
              className="flex items-center gap-2 pl-2 border-l border-slate-200"
              title="View Profile"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs hover:ring-2 hover:ring-indigo-300 transition-all">
                {initial}
              </div>
              <span className="hidden lg:inline text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                {displayName}
              </span>
            </NavLink>
          </div>
        </header>

        {/* Mobile Slide-in Drawer */}
        {mobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white border-r border-slate-200">
              <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-slate-900 text-base">ToolFinder</span>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold ${
                          isActive
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.count !== undefined && (
                        <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                          {item.count}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-slate-100 space-y-3">
                <NavLink
                  to="/profile"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                    {initial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-900 truncate">{displayName}</div>
                    <div className="text-[10px] text-slate-500 truncate">{displayEmail}</div>
                  </div>
                </NavLink>
                <button
                  onClick={() => {
                    setMobileSidebarOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Page Scrollable Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto pb-20 md:pb-6">
          <Outlet />
        </main>
      </div>

      {/* Floating AI Assistant Button (Requirement 13) */}
      {location.pathname !== '/ai-assistant' && (
        <NavLink
          to="/ai-assistant"
          className="fixed bottom-20 md:bottom-8 right-6 z-40 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-105 active:scale-95 transition-all"
        >
          <div className="relative">
            <Bot className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-indigo-600"></span>
          </div>
          <span className="hidden sm:inline">Ask AI Stack Assistant</span>
          <span className="sm:hidden">AI Stack</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        </NavLink>
      )}

      {/* Mobile Bottom Navigation Bar (Requirement 19) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-2 flex items-center justify-around shadow-lg">
        {mobileBottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-colors ${
                  isActive ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

