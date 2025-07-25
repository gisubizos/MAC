import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Language, Theme, User, Story } from '../types';
import { stories as initialStories } from '../lib/data';
import { translations } from '../lib/translations';

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  user: User | null;
  stories: Story[];
  toggleFavorite: (storyId: string) => void;
  getTranslation: (key: string) => string;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'light';
  });
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'rw';
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [stories, setStories] = useState<Story[]>(initialStories);
  
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setTheme = (newTheme: Theme) => setThemeState(newTheme);
  const setLanguage = (newLang: Language) => setLanguageState(newLang);

  const login = (loggedInUser: User) => {
    setIsAuthenticated(true);
    setUser(loggedInUser);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const toggleFavorite = (storyId: string) => {
    setStories(prevStories =>
      prevStories.map(story =>
        story.id === storyId ? { ...story, isFavorite: !story.isFavorite } : story
      )
    );
  };
  
  const getTranslation = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <AppContext.Provider value={{ theme, setTheme, language, setLanguage, isAuthenticated, login, logout, user, stories, toggleFavorite, getTranslation }}>
      {children}
    </AppContext.Provider>
  );
};
