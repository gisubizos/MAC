
import React from 'react';
import StoryCard from '../components/StoryCard';
import { useAppContext } from '../hooks/useAppContext';
import { StarIcon } from '../components/icons/StarIcon';

const FavoritesPage: React.FC = () => {
  const { getTranslation, stories } = useAppContext();
  const favoriteStories = stories.filter(story => story.isFavorite);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-extrabold text-primary-DEFAULT dark:text-primary-light mb-6 flex items-center gap-2">
        <StarIcon className="h-8 w-8 text-yellow-400" />
        {getTranslation('favorites')}
      </h1>
      
      {favoriteStories.length > 0 ? (
        <div className="space-y-4">
          {favoriteStories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-text-muted-light dark:text-text-muted-dark">
            You haven't added any stories to your favorites yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
