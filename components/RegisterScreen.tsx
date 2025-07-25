
import React, { useState, useContext } from 'react';
import { LanguageContext } from '../App';

interface RegisterScreenProps {
  onRegister: (name: string, contact: string, position: string) => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegister }) => {
  const { t } = useContext(LanguageContext);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [position, setPosition] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact || !position) {
      setError('All fields are required.');
      return;
    }
    onRegister(name, contact, position);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">{t('register')}</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">{t('name')}</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="contact" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">{t('contact')}</label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">{t('position')}</label>
            <input
              type="text"
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-light dark:hover:bg-primary-dark transition-colors"
          >
            {t('start_quiz')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
