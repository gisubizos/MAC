
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { lessons } from '../lib/data';
import { BookOpenIcon } from '../components/icons/BookOpenIcon';

const LearningHubPage: React.FC = () => {
  const { getTranslation, language } = useAppContext();

  const lessonsForChildren = lessons.filter(l => l.category === 'children');
  const lessonsForAdults = lessons.filter(l => l.category === 'adults');
  const healthLessons = lessons.filter(l => l.category === 'health');

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-3xl font-extrabold text-primary-DEFAULT dark:text-primary-light text-center">{getTranslation('learningHub')}</h1>
      
      <section>
        <h2 className="text-2xl font-bold mb-4 text-secondary-DEFAULT">{getTranslation('lessonsForChildren')}</h2>
        <div className="space-y-3">
          {lessonsForChildren.map(lesson => (
            <div key={lesson.id} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
              <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full">
                <BookOpenIcon className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <h3 className="font-bold">{lesson.title[language]}</h3>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{lesson.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-secondary-DEFAULT">{getTranslation('lessonsForAdults')}</h2>
        <div className="space-y-3">
          {lessonsForAdults.map(lesson => (
            <div key={lesson.id} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
                <BookOpenIcon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <h3 className="font-bold">{lesson.title[language]}</h3>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{lesson.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4 text-secondary-DEFAULT">{getTranslation('healthEducation')}</h2>
         <div className="space-y-3">
          {healthLessons.map(lesson => (
            <div key={lesson.id} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
              <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-full">
                <BookOpenIcon className="h-6 w-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <h3 className="font-bold">{lesson.title[language]}</h3>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{lesson.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default LearningHubPage;
