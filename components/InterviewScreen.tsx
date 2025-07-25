import React, { useState, useContext, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { LanguageContext } from '../App';
import { SendIcon } from './icons';

interface InterviewScreenProps {
  transcript: ChatMessage[];
  onSendMessage: (message: string) => void;
  onEndInterview: () => void;
  isAiResponding: boolean;
}

const InterviewScreen: React.FC<InterviewScreenProps> = ({ transcript, onSendMessage, onEndInterview, isAiResponding }) => {
  const { t } = useContext(LanguageContext);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const interviewIsOver = transcript.some(msg => msg.role === 'model' && msg.text.includes("concludes our interview"));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [transcript]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isAiResponding && !interviewIsOver) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const TypingIndicator = () => (
    <div className="flex items-center gap-2 p-3">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
    </div>
  )

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md flex-grow">
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          {transcript.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold flex-shrink-0">AI</div>}
                <div className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-sm ${msg.role === 'user' ? 'bg-primary/90 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                  <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                </div>
            </div>
          ))}
          {isAiResponding && !transcript.some(m => m.role === 'model' && m.text.length > 0) &&
             <div className="flex items-end gap-2 justify-start">
                 <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold flex-shrink-0">AI</div>
                 <div className="max-w-xs md:max-w-md p-3 rounded-lg shadow-sm bg-gray-200 dark:bg-gray-700">
                    <TypingIndicator />
                 </div>
             </div>
          }
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {interviewIsOver ? (
          <div className="text-center">
            <p className="text-green-600 dark:text-green-400 font-semibold mb-3">{t('interview_complete')}</p>
            <button
                onClick={onEndInterview}
                className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-light dark:hover:bg-primary-dark transition-colors"
            >
                {t('finish_interview')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('type_message')}
              disabled={isAiResponding}
              className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isAiResponding || !message.trim()}
              className="bg-primary text-white rounded-full p-3 hover:bg-primary-light dark:hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={t('send')}
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default InterviewScreen;
