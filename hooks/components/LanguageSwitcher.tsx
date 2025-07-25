
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Language } from '../types';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useAppContext();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  return (
    <select
      value={language}
      onChange={handleLanguageChange}
      className="bg-slate-100 dark:bg-slate-700 text-sm rounded-md p-1 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
    >
      <option value="rw">RW</option>
      <option value="en">EN</option>
      <option value="fr">FR</option>
      <option value="sw">SW</option>
    </select>
  );
};

export default LanguageSwitcher;
