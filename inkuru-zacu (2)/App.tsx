
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from './hooks/useAppContext';

import Header from './components/Header';
import BottomNav from './components/BottomNav';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import StoryDetailPage from './pages/StoryDetailPage';
import LearningHubPage from './pages/LearningHubPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import CreateStoryPage from './pages/CreateStoryPage';

const App: React.FC = () => {
  const { theme, isAuthenticated } = useAppContext();

  useEffect(() => {
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }, [theme]);

  return (
    <HashRouter>
      <div className="bg-background-light dark:bg-background-dark min-h-screen font-sans text-text-light dark:text-text-dark">
        <div className="max-w-md mx-auto h-screen flex flex-col shadow-2xl">
          {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </div>
      </div>
    </HashRouter>
  );
};

const AuthenticatedApp: React.FC = () => (
  <>
    <Header />
    <main className="flex-grow overflow-y-auto pb-20">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/story/:id" element={<StoryDetailPage />} />
        <Route path="/learning" element={<LearningHubPage />} />
        <Route path="/create-story" element={<CreateStoryPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
    <BottomNav />
  </>
);

const UnauthenticatedApp: React.FC = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);

export default App;
