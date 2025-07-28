
import React, { useState, useMemo } from 'react';
import type { UserInfo } from '../types';
import { BotIcon } from './icons';

interface OnboardingProps {
  onStart: (userInfo: UserInfo) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [language, setLanguage] = useState<'English' | 'French' | 'Kinyarwanda'>('English');

  const isFormValid = useMemo(() => {
    return name.trim() !== '' && location.trim() !== '' && company.trim() !== '';
  }, [name, location, company]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onStart({ name, location, company, language });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 md:p-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="text-center w-full max-w-md">
        <div className="mx-auto mb-6 bg-blue-600 rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <BotIcon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Interview AI Assistant</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Tell us a bit about yourself to start a personalized interview session.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Jane Doe"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Location (City/District)
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Kigali"
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Target Company
            </label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Google"
            />
          </div>
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Interview Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'English' | 'French' | 'Kinyarwanda')}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
            >
              <option>English</option>
              <option>French</option>
              <option>Kinyarwanda</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Start Interview
          </button>
        </form>
      </div>
    </div>
  );
};
