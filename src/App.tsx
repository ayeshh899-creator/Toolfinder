import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CompareProvider } from './context/CompareContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AppLayout } from './components/AppLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';

// Protected Pages
import { DashboardPage } from './pages/DashboardPage';
import { ToolsPage } from './pages/ToolsPage';
import { HiddenGemsPage } from './pages/HiddenGemsPage';
import { RoadmapsPage } from './pages/RoadmapsPage';
import { BuildFreePage } from './pages/BuildFreePage';
import { ComparePage } from './pages/ComparePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ProfilePage } from './pages/ProfilePage';
import { AIAssistantPage } from './pages/AIAssistantPage';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CompareProvider>
          <Routes>
            {/* Public Entry Points */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* Authenticated Protected Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/hidden-gems" element={<HiddenGemsPage />} />
              <Route path="/roadmaps" element={<RoadmapsPage />} />
              <Route path="/build-free" element={<BuildFreePage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/ai-assistant" element={<AIAssistantPage />} />
            </Route>

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CompareProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
