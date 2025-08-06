import React, { useState, useEffect, useCallback } from 'react';
import type { Message } from './types';
import { getChatResponse } from './services/geminiService';
import { LoaderIcon } from './components/icons';
import { ChatInterface } from './components/QuizView';

const INITIAL_GREETING: Message = {
    id: `ai-${Date.now()}`,
    text: "Hey there! I'm Sparky, your friendly AI chat partner. What's on your mind today? 😊",
    sender: 'ai',
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isResponding, setIsResponding] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
        setMessages([INITIAL_GREETING]);
        setIsResponding(false);
    }, 1200);
  }, []);
  
  const handleSendMessage = useCallback(async (text: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      sender: 'user',
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsResponding(true);
    setError(null);
    
    try {
        const responseText = await getChatResponse(newMessages);
        const aiMessage: Message = {
            id: `ai-${Date.now()}`,
            text: responseText,
            sender: 'ai'
        };
        setMessages(prev => [...prev, aiMessage]);
    } catch(err: any) {
        const errorMessageText = err.message || 'Could not get a response.';
        setError(errorMessageText);
        const errorMessage: Message = {
            id: `err-${Date.now()}`,
            text: `Error: ${errorMessageText}`,
            sender: 'ai'
        };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsResponding(false);
    }
  }, [messages]);
  
  const handleNewChat = () => {
     if(!isResponding){
        setIsResponding(true);
        setTimeout(() => {
            setMessages([INITIAL_GREETING]);
            setIsResponding(false);
        }, 500);
     }
  }

  if (messages.length === 0 && isResponding) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen text-white">
        <LoaderIcon className="w-16 h-16 animate-spin text-indigo-400" />
        <p className="text-xl">Connecting to Sparky...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <ChatInterface 
        messages={messages}
        onSendMessage={handleSendMessage}
        onNewChat={handleNewChat}
        isResponding={isResponding}
      />
    </div>
  );
};

export default App;
