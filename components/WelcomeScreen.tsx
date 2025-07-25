
import React, { useContext } from 'react';
import { LanguageContext } from '../App';
import { LogoIcon } from './icons';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const { t } = useContext(LanguageContext);

  return (
    <div className="flex flex-col items-center justify-center text-center h-full animate-fade-in">
      <LogoIcon className="h-24 w-24 text-primary mb-6" />
      <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">{t('welcome')}</h1>
      <p className="max-w-md mb-8 text-gray-600 dark:text-gray-300">
        {t('welcome_desc')}
      </p>
      <button
        onClick={onStart}
        className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary-light dark:hover:bg-primary-dark transition-transform transform hover:scale-105 shadow-lg"
      >
        {t('start_assessment')}
      </button>
    </div>
  );
};

export default WelcomeScreen;
