
import React from 'react';
import { Link } from 'react-router-dom';
import { Story } from '../types';
import { useAppContext } from '../hooks/useAppContext';
import { HeartIcon } from './icons/HeartIcon';

interface StoryCardProps {
  story: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const { language, toggleFavorite } = useAppContext();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <Link to={`/story/${story.id}`}>
        <img src={story.coverImage} alt={story.title[language]} className="w-full h-40 object-cover" />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold mb-1 text-text-light dark:text-text-dark">{story.title[language]}</h3>
            <button onClick={() => toggleFavorite(story.id)} className="p-1 -mr-1 -mt-1" aria-label="Favorite story">
              <HeartIcon className={`h-6 w-6 transition-colors ${story.isFavorite ? 'text-red-500 fill-current' : 'text-slate-400'}`} />
            </button>
        </div>
        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{story.description[language]}</p>
      </div>
    </div>
  );
};

export default StoryCard;
