
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon } from './icons/HomeIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { StarIcon } from './icons/StarIcon';
import { UserIcon } from './icons/UserIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { useAppContext } from '../hooks/useAppContext';

const BottomNav: React.FC = () => {
  const { getTranslation } = useAppContext();
  
  const navItems = [
    { path: '/', label: getTranslation('home'), icon: HomeIcon },
    { path: '/learning', label: getTranslation('learningHub'), icon: BookOpenIcon },
    { path: '/create-story', label: getTranslation('createStory'), icon: SparklesIcon, isSpecial: true },
    { path: '/favorites', label: getTranslation('favorites'), icon: StarIcon },
    { path: '/profile', label: getTranslation('profile'), icon: UserIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 p-2 z-10">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 text-xs transition-colors duration-200 w-16 ${
                item.isSpecial ? '-mt-8' : ''
              } ${isActive ? 'text-primary-DEFAULT' : 'text-text-muted-light dark:text-text-muted-dark'}`
            }
          >
            {item.isSpecial ? (
              <div className="bg-secondary-DEFAULT text-white p-4 rounded-full shadow-lg border-4 border-background-light dark:border-background-dark">
                <item.icon className="h-6 w-6" />
              </div>
            ) : (
              <item.icon className="h-6 w-6" />
            )}
            <span className="font-semibold">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
