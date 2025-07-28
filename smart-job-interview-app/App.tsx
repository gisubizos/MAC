
import React, { useState, useCallback, useEffect } from 'react';
import type { UserInfo, Message } from './types';
import { Onboarding } from './components/Onboarding';
import { Chat } from './components/Chat';
import { initChatSession, getInitialMessage, sendMessageToAI } from './services/geminiService';
import type { Chat as GeminiChat } from '@google/genai';
import { BookIcon, CloseIcon } from './components/icons';

// Resources Modal Component
const ResourcesModal: React.FC<{onClose: () => void}> = ({ onClose }) => {
  const resources = [
    { title: "Mastering Common Interview Questions", url: "https://www.linkedin.com/business/talent/blog/talent-strategy/common-interview-questions" },
    { title: "How to Use the STAR Method", url: "https://www.themuse.com/advice/star-interview-method" },
    { title: "Tips for Writing a Great CV", url: "https://www.indeed.com/career-advice/resumes-cover-letters/how-to-make-a-resume" },
    { title: "Body Language Tips for your Next Interview", url: "https://www.forbes.com/sites/carolkinseygoman/2013/03/21/10-body-language-tips-for-your-next-job-interview/" }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose} aria-modal="true" role="dialog">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BookIcon className="w-6 h-6" />
            Interview Resources
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-1 rounded-full" aria-label="Close modal">
            <CloseIcon className="w-6 h-6"/>
          </button>
        </div>
        <div className="p-6">
          <ul className="space-y-3">
            {resources.map((res, index) => (
              <li key={index}>
                <a 
                  href={res.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {res.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [chatSession, setChatSession] = useState<GeminiChat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isResourcesModalOpen, setIsResourcesModalOpen] = useState(false);

  // Load session from localStorage on initial render
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem('interviewSession');
      if (savedSession) {
        const { userInfo: savedUserInfo, messages: savedMessages } = JSON.parse(savedSession);
        if (savedUserInfo && savedMessages && Array.isArray(savedMessages) && savedMessages.length > 0) {
          setUserInfo(savedUserInfo);
          setMessages(savedMessages);
          const chat = initChatSession(savedUserInfo, savedMessages);
          setChatSession(chat);
        }
      }
    } catch (e) {
      console.error("Failed to load session from localStorage", e);
      localStorage.removeItem('interviewSession'); // Clear corrupted session
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save session to localStorage whenever messages or user info change
  useEffect(() => {
    if (isInitialized && userInfo && messages.length > 0) {
      try {
        const sessionData = JSON.stringify({ userInfo, messages });
        localStorage.setItem('interviewSession', sessionData);
      } catch (e) {
        console.error("Failed to save session to localStorage", e);
      }
    }
  }, [messages, userInfo, isInitialized]);


  const handleStartInterview = useCallback(async (info: UserInfo) => {
    // Clear any previous session from local storage before starting a new one
    localStorage.removeItem('interviewSession');
    setIsAiTyping(true);
    setError(null);
    setMessages([]); // Clear previous messages
    
    try {
      const chat = initChatSession(info);
      setChatSession(chat);
      
      const initialMessageText = await getInitialMessage(chat);
      const aiMessage: Message = { id: Date.now(), text: initialMessageText, sender: 'ai' };
      
      // Setting user info after getting the first message ensures that if it fails, we stay on the onboarding screen.
      setUserInfo(info); 
      setMessages([aiMessage]);
    } catch (err) {
      console.error("Failed to initialize chat:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Failed to start interview. Please check your API key and network connection. Details: ${errorMessage}`);
      setUserInfo(null); // Go back to onboarding
    } finally {
      setIsAiTyping(false);
    }
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!chatSession || isAiTyping) return;

    const userMessage: Message = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsAiTyping(true);
    setError(null);

    try {
      const aiResponse = await sendMessageToAI(chatSession, text);
      const aiMessage: Message = { id: Date.now() + 1, text: aiResponse, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error("Failed to send message:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      const errorResponseMessage: Message = {
        id: Date.now() + 1,
        text: `Sorry, I encountered an error. Please try again. (${errorMessage})`,
        sender: 'ai'
      };
      setMessages(prev => [...prev, errorResponseMessage]);
    } finally {
      setIsAiTyping(false);
    }
  }, [chatSession, isAiTyping]);

  const handleEndInterview = useCallback(() => {
    if (window.confirm("Are you sure you want to end this interview session? This will clear your current progress.")) {
      localStorage.removeItem('interviewSession');
      setUserInfo(null);
      setMessages([]);
      setChatSession(null);
      setError(null);
    }
  }, []);

  if (!isInitialized) {
    return <div className="bg-gray-100 dark:bg-gray-900 min-h-screen"></div>;
  }
  
  if (error && !userInfo) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-800 p-6 rounded-lg shadow-xl text-center">
            <h2 className="text-2xl font-bold mb-4">Initialization Error</h2>
            <p>{error}</p>
            <button
                onClick={() => { setError(null); setIsInitialized(true); }}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
                Try Again
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-2xl h-screen md:h-[90vh] md:max-h-[700px] bg-white dark:bg-gray-800 shadow-2xl rounded-lg flex flex-col">
        {!userInfo ? (
          <Onboarding onStart={handleStartInterview} />
        ) : (
          <Chat
            userInfo={userInfo}
            messages={messages}
            onSendMessage={handleSendMessage}
            isAiTyping={isAiTyping}
            onEndInterview={handleEndInterview}
            onOpenResources={() => setIsResourcesModalOpen(true)}
          />
        )}
      </div>
      {isResourcesModalOpen && <ResourcesModal onClose={() => setIsResourcesModalOpen(false)} />}
    </div>
  );
};

export default App;
