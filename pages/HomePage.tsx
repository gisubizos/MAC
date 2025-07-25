
import React from 'react';
import StoryCard from '../components/StoryCard';
import { useAppContext } from '../hooks/useAppContext';

const HomePage: React.FC = () => {
  const { getTranslation, stories, user } = useAppContext();

  return (
    <div className="p-4 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4 text-primary-DEFAULT dark:text-primary-light">{getTranslation('storiesForYou')}</h2>
        <div className="space-y-4">
          {stories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4 text-primary-DEFAULT dark:text-primary-light">{getTranslation('popularStories')}</h2>
        <div className="grid grid-cols-2 gap-4">
          {[...stories].reverse().map(story => (
             <div key={story.id + '-popular'} className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
                <img src={story.coverImage} alt="cover" className="w-full h-24 object-cover"/>
                <div className="p-2">
                    <h3 className="font-bold text-sm truncate">{story.title.rw}</h3>
                </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
