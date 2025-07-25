
import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { useAppContext } from '../hooks/useAppContext';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { user } = useAppContext();
  
  return (
    <header className="bg-white dark:bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10 p-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-700">
      <Link to="/" className="flex items-center gap-2">
        <BookOpenIcon className="h-8 w-8 text-primary-DEFAULT" />
        <span className="text-xl font-extrabold text-primary-DEFAULT">Inkuru Zacu</span>
      </Link>
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeSwitcher />
        <Link to="/profile">
           <img src={user?.avatar} alt="User Avatar" className="h-8 w-8 rounded-full" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
