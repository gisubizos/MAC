
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { Comment, Story, StorySegment } from '../types';
import { comments as initialComments } from '../lib/data';
import { HeartIcon } from '../components/icons/HeartIcon';
import { DownloadIcon } from '../components/icons/DownloadIcon';

const StoryPlayer: React.FC<{ story: Story }> = ({ story }) => {
  const { language, getTranslation } = useAppContext();
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [highlighted, setHighlighted] = useState(false);

  const currentSegment = story.content[currentSegmentIndex];

  useEffect(() => {
    setHighlighted(false);
    const timer = setTimeout(() => setHighlighted(true), 300); // Simulate audio sync
    return () => clearTimeout(timer);
  }, [currentSegmentIndex]);

  const goToNext = () => {
    setCurrentSegmentIndex(prev => Math.min(prev + 1, story.content.length - 1));
  };

  const goToPrev = () => {
    setCurrentSegmentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-slate-800">
      <img src={currentSegment.image} alt="Story segment" className="w-full h-56 object-cover" />
      <div className="p-4">
        <p className={`text-lg transition-colors duration-500 ${highlighted ? 'text-primary-DEFAULT dark:text-primary-light' : ''}`}>
          {currentSegment.text[language]}
        </p>
      </div>
      <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-700/50">
        <button onClick={goToPrev} disabled={currentSegmentIndex === 0} className="px-4 py-2 bg-slate-200 dark:bg-slate-600 rounded-lg disabled:opacity-50">Prev</button>
        <span>{currentSegmentIndex + 1} / {story.content.length}</span>
        <button onClick={goToNext} disabled={currentSegmentIndex === story.content.length - 1} className="px-4 py-2 bg-slate-200 dark:bg-slate-600 rounded-lg disabled:opacity-50">Next</button>
      </div>
    </div>
  );
};


const CommentSection: React.FC<{ storyId: string }> = ({ storyId }) => {
    const { getTranslation, user } = useAppContext();
    const [comments, setComments] = useState<Comment[]>(() => initialComments.filter(c => c.storyId === storyId));
    const [newComment, setNewComment] = useState('');

    const handlePostComment = (e: React.FormEvent) => {
        e.preventDefault();
        if(newComment.trim() && user) {
            const comment: Comment = {
                id: `c${Date.now()}`,
                storyId,
                author: user.name,
                avatar: user.avatar,
                text: newComment,
                timestamp: 'Just now'
            };
            setComments(prev => [comment, ...prev]);
            setNewComment('');
        }
    };
    
    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">{getTranslation('comments')}</h3>
            <form onSubmit={handlePostComment} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={getTranslation('leaveComment')}
                    className="flex-grow px-4 py-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT"
                />
                <button type="submit" className="bg-primary-DEFAULT text-white font-semibold px-4 py-2 rounded-lg">{getTranslation('post')}</button>
            </form>
            <div className="space-y-4">
                {comments.map(comment => (
                    <div key={comment.id} className="flex items-start gap-3">
                        <img src={comment.avatar} alt={comment.author} className="h-10 w-10 rounded-full"/>
                        <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg flex-1">
                            <p className="font-bold">{comment.author}</p>
                            <p className="text-sm">{comment.text}</p>
                            <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1">{comment.timestamp}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { stories, language, getTranslation, toggleFavorite } = useAppContext();
  
  const story = stories.find(s => s.id === id);

  if (!story) {
    return <div className="p-4 text-center">{getTranslation('storyNotFound')}</div>;
  }
  
  return (
    <div className="p-4">
       <div className="mb-4">
        <h1 className="text-3xl font-extrabold text-primary-DEFAULT">{story.title[language]}</h1>
        <p className="text-text-muted-light dark:text-text-muted-dark">{story.description[language]}</p>
       </div>

      <StoryPlayer story={story} />
      
      <div className="mt-4 flex gap-4">
        <button onClick={() => toggleFavorite(story.id)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300 font-semibold">
          <HeartIcon className={`w-5 h-5 ${story.isFavorite ? 'fill-current' : ''}`}/>
          {story.isFavorite ? getTranslation('removeFromFavorites') : getTranslation('addToFavorites')}
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 font-semibold">
          <DownloadIcon className="w-5 h-5"/>
          {getTranslation('downloadStory')}
        </button>
      </div>

      <CommentSection storyId={story.id} />
    </div>
  );
};

export default StoryDetailPage;
