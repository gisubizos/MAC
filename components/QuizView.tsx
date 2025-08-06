import React, { useState, useEffect, useRef } from 'react';
import type { Message } from '../types';
import { SparklesIcon, SendIcon, RefreshIcon, LoaderIcon } from './icons';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  onNewChat: () => void;
  isResponding: boolean;
}

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isAI = message.sender === 'ai';
  return (
    <div className={`flex items-start gap-3 ${!isAI && 'justify-end'}`}>
      {isAI && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
          <SparklesIcon className="w-5 h-5 text-white" />
        </div>
      )}
      <div
        className={`px-4 py-3 rounded-2xl max-w-lg md:max-w-xl ${
          isAI
            ? 'bg-gray-700 rounded-bl-none'
            : 'bg-indigo-600 rounded-br-none'
        }`}
      >
        <p className="text-white whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};


export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, onNewChat, isResponding }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto';
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  const handleSend = () => {
    if (inputText.trim() && !isResponding) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800">
      <header className="p-4 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Quick Chat AI</h1>
            <span className="text-xs bg-indigo-500/20 text-indigo-300 font-medium px-2 py-0.5 rounded-full">Beta</span>
          </div>
          <button
            onClick={onNewChat}
            disabled={isResponding}
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isResponding ? <LoaderIcon className="w-5 h-5 animate-spin" /> : <RefreshIcon className="w-5 h-5" />}
            New Chat
          </button>
      </header>
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="space-y-6 max-w-4xl mx-auto">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isResponding && messages.length > 0 && (
             <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                    <SparklesIcon className="w-5 h-5 text-white" />
                </div>
                 <div className="px-4 py-3 rounded-2xl bg-gray-700 rounded-bl-none">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></span>
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></span>
                    </div>
                 </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <footer className="p-4 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700">
        <div className="max-w-4xl mx-auto bg-gray-700 rounded-xl p-2 flex items-end gap-2">
            <textarea
                ref={textAreaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isResponding ? "Sparky is typing..." : "Type your message..."}
                rows={1}
                className="flex-1 bg-transparent text-white placeholder-gray-400 resize-none max-h-40 p-2"
                disabled={isResponding}
            />
            <button 
                onClick={handleSend}
                disabled={!inputText.trim() || isResponding}
                className="w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-lg text-white transition-colors duration-200 hover:bg-indigo-500 disabled:bg-gray-600 disabled:text-gray-400"
                aria-label="Send message"
            >
                <SendIcon className="w-5 h-5" />
            </button>
        </div>
         <p className="text-center text-gray-500 text-xs mt-2">Press Shift+Enter for a new line.</p>
      </footer>
    </div>
  );
};