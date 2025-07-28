
import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { generateStory } from '../services/geminiService';
import { SparklesIcon } from '../components/icons/SparklesIcon';

const CreateStoryPage: React.FC = () => {
  const { getTranslation, language } = useAppContext();
  const [prompt, setPrompt] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setGeneratedStory('');
    try {
      const storyText = await generateStory(prompt, language);
      setGeneratedStory(storyText);
    } catch (error) {
      console.error(error);
      setGeneratedStory('Failed to generate story. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-extrabold text-primary-DEFAULT dark:text-primary-light mb-2 flex items-center gap-2">
        <SparklesIcon className="h-8 w-8 text-secondary-DEFAULT" />
        {getTranslation('createYourOwnStory')}
      </h1>
      <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
        Let AI help you create a new and exciting story for everyone to enjoy.
      </p>

      <form onSubmit={handleGenerateStory}>
        <div className="mb-4">
          <label htmlFor="prompt" className="block font-bold mb-2">
            {getTranslation('storyPrompt')}
          </label>
          <textarea
            id="prompt"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
            placeholder={getTranslation('promptPlaceholder')}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-secondary-DEFAULT text-white font-bold py-3 px-4 rounded-lg hover:bg-secondary-dark transition-colors duration-300 disabled:bg-slate-400"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {getTranslation('generating')}
            </>
          ) : (
            getTranslation('generateStory')
          )}
        </button>
      </form>

      {generatedStory && (
        <div className="mt-8 p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">{getTranslation('yourGeneratedStory')}</h2>
          <p className="whitespace-pre-wrap leading-relaxed">{generatedStory}</p>
        </div>
      )}
    </div>
  );
};

export default CreateStoryPage;
