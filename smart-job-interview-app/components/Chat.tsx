
import React, { useState, useRef, useEffect } from 'react';
import type { UserInfo, Message } from '../types';
import { BotIcon, UserIcon, SendIcon, EndIcon, BookIcon } from './icons';

interface ChatProps {
  userInfo: UserInfo;
  messages: Message[];
  onSendMessage: (text: string) => void;
  isAiTyping: boolean;
  onEndInterview: () => void;
  onOpenResources: () => void;
}

export const Chat: React.FC<ChatProps> = ({ userInfo, messages, onSendMessage, isAiTyping, onEndInterview, onOpenResources }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isAiTyping) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Interview for <span className="text-blue-600 dark:text-blue-400">{userInfo.company}</span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Candidate: {userInfo.name}</p>
        </div>
        <div className="flex items-center gap-2">
            <button
                onClick={onOpenResources}
                title="Open Resources"
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Open interview resources"
            >
                <BookIcon className="w-5 h-5" />
            </button>
            <button
                onClick={onEndInterview}
                title="End Interview"
                className="p-2 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                aria-label="End interview session"
            >
                <EndIcon className="w-5 h-5" />
            </button>
        </div>
      </header>
      
      <main className="flex-grow p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex items-start gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'ai' ? 'bg-gray-600' : 'bg-blue-600'}`}>
                {message.sender === 'ai' ? <BotIcon className="w-5 h-5 text-white" /> : <UserIcon className="w-5 h-5 text-white" />}
              </div>
              <div className={`p-3 rounded-lg max-w-md ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}
          {isAiTyping && (
             <div className="flex items-start gap-3 flex-row">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-600">
                    <BotIcon className="w-5 h-5 text-white" />
                </div>
                <div className="p-3 rounded-lg bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    <div className="flex items-center space-x-1">
                        <span className="text-sm">Typing</span>
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your answer..."
            className="flex-grow px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            disabled={isAiTyping}
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
            disabled={!inputText.trim() || isAiTyping}
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </footer>
    </div>
  );
};
