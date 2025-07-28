
import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { BookOpenIcon } from '../components/icons/BookOpenIcon';
import { User } from '../types';

const LoginPage: React.FC = () => {
  const { login, getTranslation } = useAppContext();
  const [username, setUsername] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      const mockUser: User = {
        id: 'user1',
        name: username,
        role: 'child',
        avatar: `https://i.pravatar.cc/150?u=${username}`
      };
      login(mockUser);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-primary-light/20 dark:bg-primary-dark/50">
      <div className="text-center mb-10">
        <BookOpenIcon className="h-20 w-20 text-primary-DEFAULT mx-auto mb-4" />
        <h1 className="text-3xl font-extrabold text-primary-DEFAULT">
          {getTranslation('welcomeTo')} Inkuru Zacu
        </h1>
      </div>
      <form onSubmit={handleLogin} className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="username" className="block text-text-light dark:text-text-dark font-semibold mb-2">
            {getTranslation('username')}
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
            placeholder="Shyiramo izina ryawe"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-text-light dark:text-text-dark font-semibold mb-2">
            {getTranslation('password')}
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
            placeholder="••••••••"
            defaultValue="123456"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-secondary-DEFAULT text-white font-bold py-3 px-4 rounded-lg hover:bg-secondary-dark transition-colors duration-300 shadow-lg"
        >
          {getTranslation('login')}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
