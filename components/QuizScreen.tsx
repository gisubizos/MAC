
import React, { useState, useEffect, useContext } from 'react';
import { Question } from '../types';
import { LanguageContext } from '../App';
import { QUIZ_TIME_SECONDS } from '../constants';

interface QuizScreenProps {
  questions: Question[];
  onSubmit: (answers: Map<number, number>) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onSubmit }) => {
  const { t } = useContext(LanguageContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, number>>(new Map());
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_SECONDS);

  useEffect(() => {
    if (timeLeft <= 0) {
      onSubmit(answers);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    const newAnswers = new Map(answers);
    newAnswers.set(questionId, optionIndex);
    setAnswers(newAnswers);
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const selectedOption = answers.get(currentQuestion.id);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('quiz_title')}</h2>
          <div className="text-lg font-semibold bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 px-3 py-1 rounded-md">
            {t('time_left')}: {formatTime(timeLeft)}
          </div>
        </div>
        
        <div className="my-6">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>{`${t('question')} ${currentQuestionIndex + 1} ${t('of')} ${questions.length}`}</span>
                <span className="font-semibold">{currentQuestion.category}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
            </div>
        </div>
        
        <div key={currentQuestion.id} className="animate-fade-in">
          <h3 className="text-xl font-semibold mb-6 text-gray-700 dark:text-gray-200">{currentQuestion.question}</h3>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                  selectedOption === index
                    ? 'bg-primary-light border-primary-dark text-white'
                    : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
            <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed">
              {t('previous')}
            </button>
            
            {currentQuestionIndex === questions.length - 1 ? (
                <button onClick={handleSubmit} className="px-8 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-lg">
                    {t('submit')}
                </button>
            ) : (
                <button onClick={handleNext} className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-light dark:hover:bg-primary-dark transition-colors">
                    {t('next')}
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
