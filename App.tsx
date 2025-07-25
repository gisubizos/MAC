import React, { useState, useEffect, createContext, useCallback, useMemo } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { Screen, Question, Applicant, Language, Theme, Answer, QuizResult, ChatMessage } from './types';
import { INITIAL_QUESTIONS, translations, QUIZ_LENGTH, MAX_ATTEMPTS, QUIZ_TIME_SECONDS } from './constants';
import { SunIcon, MoonIcon, LogoIcon, GlobeIcon, ArrowLeftIcon } from './components/icons';

// Components
import WelcomeScreen from './components/WelcomeScreen';
import RegisterScreen from './components/RegisterScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import AdminPanel from './components/AdminPanel';
import InterviewScreen from './components/InterviewScreen';

// Contexts
export const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({ theme: 'light', toggleTheme: () => {} });
export const LanguageContext = createContext<{ language: Language; setLanguage: (lang: Language) => void; t: (key: string) => string; }>({ language: 'en', setLanguage: () => {}, t: (key: string) => '' });

const App: React.FC = () => {
    // Global State
    const [theme, setTheme] = useState<Theme>('light');
    const [language, setLanguage] = useState<Language>('en');
    const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Welcome);
    
    // Data State
    const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
    const [applicant, setApplicant] = useState<Applicant | null>(null);
    const [currentQuizQuestions, setCurrentQuizQuestions] = useState<Question[]>([]);
    
    // Interview State
    const [ai, setAi] = useState<GoogleGenAI | null>(null);
    const [chat, setChat] = useState<Chat | null>(null);
    const [interviewTranscript, setInterviewTranscript] = useState<ChatMessage[]>([]);
    const [isAiResponding, setIsAiResponding] = useState(false);

    useEffect(() => {
        if (process.env.API_KEY) {
            setAi(new GoogleGenAI({ apiKey: process.env.API_KEY }));
        }
    }, []);
    
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    
    const t = useCallback((key: string): string => {
        return translations[language][key] || key;
    }, [language]);

    const languageContextValue = useMemo(() => ({ language, setLanguage, t }), [language, t]);
    const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

    const shuffleArray = <T,>(array: T[]): T[] => {
        return [...array].sort(() => Math.random() - 0.5);
    };

    const handleStartAssessment = () => setCurrentScreen(Screen.Register);

    const handleRegister = (name: string, contact: string, position: string) => {
        const newApplicant = applicant && applicant.name === name ? applicant : { name, contact, position, attempts: 0, results: [] };
        setApplicant(newApplicant);
        startQuiz(newApplicant);
    };

    const startQuiz = (currentApplicant: Applicant) => {
        if (currentApplicant.attempts < MAX_ATTEMPTS) {
            const shuffled = shuffleArray(questions).slice(0, QUIZ_LENGTH);
            setCurrentQuizQuestions(shuffled);
            setCurrentScreen(Screen.Quiz);
        }
    };
    
    const handleQuizSubmit = (answers: Map<number, number>) => {
        const score = Array.from(answers.entries()).reduce((acc, [questionId, selectedOptionIndex]) => {
            const question = currentQuizQuestions.find(q => q.id === questionId);
            return (question && question.correctAnswerIndex === selectedOptionIndex) ? acc + 1 : acc;
        }, 0);

        const detailedAnswers: Answer[] = currentQuizQuestions.map(q => {
            const selectedOptionIndex = answers.get(q.id) ?? -1;
            return {
                questionId: q.id,
                questionText: q.question,
                options: q.options,
                selectedOptionIndex,
                correctAnswerIndex: q.correctAnswerIndex,
                isCorrect: q.correctAnswerIndex === selectedOptionIndex
            };
        });

        const result: QuizResult = { score, totalQuestions: QUIZ_LENGTH, answers: detailedAnswers, timestamp: Date.now() };
        
        setApplicant(prev => prev ? ({ ...prev, attempts: prev.attempts + 1, results: [...prev.results, result] }) : null);
        setCurrentScreen(Screen.Results);
    };
    
    const handleRetakeQuiz = () => applicant && startQuiz(applicant);

    const handleStartInterview = async () => {
        if (!ai || !applicant) return;
        
        const systemInstruction = `You are a friendly and professional HR interviewer from TechHire Hub. Your goal is to conduct a brief screening interview. Start by greeting the applicant by name, ${applicant.name}, who is applying for the position of ${applicant.position}. Then, ask your first question. Ask only one question at a time. Keep your responses concise. After about 4 questions from you, conclude the interview gracefully, wish the applicant luck, and say 'This concludes our interview.'.`;

        const newChat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: { systemInstruction },
        });
        setChat(newChat);
        setIsAiResponding(true);
        setCurrentScreen(Screen.Interview);

        const response = await newChat.sendMessageStream({ message: "Start the interview." });
        let fullResponse = "";
        for await (const chunk of response) {
            fullResponse += chunk.text;
        }
        setInterviewTranscript([{ role: 'model', text: fullResponse }]);
        setIsAiResponding(false);
    };

    const handleSendMessage = async (message: string) => {
        if (!chat) return;

        const updatedTranscript: ChatMessage[] = [...interviewTranscript, { role: 'user', text: message }];
        setInterviewTranscript(updatedTranscript);
        setIsAiResponding(true);

        const response = await chat.sendMessageStream({ message });
        
        let fullResponse = "";
        setInterviewTranscript(prev => [...prev, { role: 'model', text: '' }]);

        for await (const chunk of response) {
            fullResponse += chunk.text;
            setInterviewTranscript(prev => {
                const newTranscript = [...prev];
                newTranscript[newTranscript.length - 1].text = fullResponse;
                return newTranscript;
            });
        }
        setIsAiResponding(false);
    };

    const handleEndInterview = () => {
        setApplicant(prev => {
            if (!prev) return null;
            const latestResultIndex = prev.results.length - 1;
            const updatedResults = [...prev.results];
            updatedResults[latestResultIndex].interviewTranscript = interviewTranscript;
            return { ...prev, results: updatedResults };
        });
        setInterviewTranscript([]);
        setChat(null);
        setCurrentScreen(Screen.Results);
    };

    const renderScreen = () => {
        switch (currentScreen) {
            case Screen.Welcome:
                return <WelcomeScreen onStart={handleStartAssessment} />;
            case Screen.Register:
                return <RegisterScreen onRegister={handleRegister} />;
            case Screen.Quiz:
                return <QuizScreen questions={currentQuizQuestions} onSubmit={handleQuizSubmit} />;
            case Screen.Results:
                 const latestResult = applicant?.results[applicant.results.length - 1];
                 if (applicant && latestResult) {
                    return <ResultsScreen result={latestResult} applicant={applicant} onRetake={handleRetakeQuiz} onStartInterview={handleStartInterview} canInterview={!!ai} />;
                 }
                 return <WelcomeScreen onStart={handleStartAssessment} />;
            case Screen.Admin:
                return <AdminPanel questions={questions} setQuestions={setQuestions} />;
            case Screen.Interview:
                return <InterviewScreen 
                    transcript={interviewTranscript} 
                    onSendMessage={handleSendMessage} 
                    onEndInterview={handleEndInterview} 
                    isAiResponding={isAiResponding} 
                />;
            default:
                return <WelcomeScreen onStart={handleStartAssessment} />;
        }
    };
    
    const Header = () => (
        <header className="p-4 shadow-md bg-white dark:bg-gray-800 flex justify-between items-center print:hidden">
            <div className="flex items-center gap-3">
                <LogoIcon className="h-8 w-8 text-primary" />
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">TechHire Hub</h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative group">
                    <GlobeIcon className="h-6 w-6 text-gray-600 dark:text-gray-300"/>
                    <div className="absolute right-0 top-8 hidden group-hover:flex hover:flex flex-col bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 z-10">
                        <button onClick={() => setLanguage('en')} className="px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600">English</button>
                        <button onClick={() => setLanguage('fr')} className="px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600">Français</button>
                        <button onClick={() => setLanguage('rw')} className="px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600">Kinyarwanda</button>
                    </div>
                </div>
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
                </button>
            </div>
        </header>
    );

    const mainHeader = currentScreen !== Screen.Admin && currentScreen !== Screen.Interview;
    const adminHeader = currentScreen === Screen.Admin;
    const interviewHeader = currentScreen === Screen.Interview;

    return (
        <ThemeContext.Provider value={themeContextValue}>
            <LanguageContext.Provider value={languageContextValue}>
                <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-background">
                    {mainHeader && <Header />}
                    {adminHeader && (
                        <header className="p-4 shadow-md bg-white dark:bg-gray-800 flex justify-between items-center print:hidden">
                           <button onClick={() => setCurrentScreen(Screen.Welcome)} className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary-light">
                                <ArrowLeftIcon className="h-5 w-5" />
                                <span>{t('go_back')}</span>
                           </button>
                           <h1 className="text-xl font-bold text-gray-800 dark:text-white">{t('admin_panel')}</h1>
                        </header>
                    )}
                    {interviewHeader && (
                         <header className="p-4 shadow-md bg-white dark:bg-gray-800 flex justify-center items-center print:hidden">
                            <h1 className="text-xl font-bold text-gray-800 dark:text-white">{t('interview_title')}</h1>
                         </header>
                    )}
                    <main className="flex-grow p-4 sm:p-6 md:p-8 flex flex-col">
                        {renderScreen()}
                    </main>
                    {mainHeader && (
                        <footer className="text-center p-4 text-sm text-gray-500 dark:text-gray-400 print:hidden">
                            <button onClick={() => setCurrentScreen(Screen.Admin)} className="hover:underline">{t('admin_login')}</button>
                        </footer>
                    )}
                </div>
            </LanguageContext.Provider>
        </ThemeContext.Provider>
    );
};

export default App;