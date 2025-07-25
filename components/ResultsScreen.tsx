import React, { useContext } from 'react';
import { QuizResult, Applicant, ChatMessage } from '../types';
import { LanguageContext } from '../App';
import { MAX_ATTEMPTS } from '../constants';
import { CheckCircleIcon, XCircleIcon } from './icons';

interface ResultsScreenProps {
  result: QuizResult;
  applicant: Applicant;
  onRetake: () => void;
  onStartInterview: () => void;
  canInterview: boolean;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ result, applicant, onRetake, onStartInterview, canInterview }) => {
  const { t } = useContext(LanguageContext);
  const { score, totalQuestions, answers, interviewTranscript } = result;
  const percentage = Math.round((score / totalQuestions) * 100);

  const getEncouragementMessage = () => {
    if (percentage >= 80) return t('interview_offer');
    if (score === totalQuestions) return t('congrats_message');
    if (score >= 5) return t('retake_message');
    return t('sorry_message');
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleEmail = () => {
    let transcriptText = '';
    if (interviewTranscript) {
        transcriptText = '\n\n--- Interview Transcript ---\n' + interviewTranscript.map(m => `${m.role === 'user' ? 'Applicant' : 'Interviewer'}: ${m.text}`).join('\n');
    }
    const subject = encodeURIComponent(t('email_subject'));
    const body = encodeURIComponent(
        `${t('email_body')}\n\nName: ${applicant.name}\nPosition: ${applicant.position}\nScore: ${score}/${totalQuestions} (${percentage}%)\n${transcriptText}\n\nThank you.`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const showInterviewButton = canInterview && percentage >= 80 && !interviewTranscript;

  const TranscriptViewer = ({ transcript }: { transcript: ChatMessage[] }) => (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t('interview_transcript')}</h3>
      <div className="space-y-4 max-h-96 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
        {transcript.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
              <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto" id="results-content">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md print:shadow-none">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">{t('results_title')}</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6 print:hidden">For {applicant.name}</p>
        
        <div className="text-center bg-gray-100 dark:bg-gray-700 p-6 rounded-lg mb-6">
          <p className="text-lg text-gray-600 dark:text-gray-300">{t('score')}</p>
          <p className="text-6xl font-bold text-primary my-2">{score} <span className="text-3xl text-gray-500 dark:text-gray-400">/ {totalQuestions}</span></p>
          <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">{percentage}%</p>
          <p className="mt-4 text-lg italic text-gray-600 dark:text-gray-400">{getEncouragementMessage()}</p>
        </div>
        
        <div className="my-8 print:hidden">
          <div className="flex justify-center gap-4 flex-wrap">
            {showInterviewButton && (
                <button onClick={onStartInterview} className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg">{t('start_interview')}</button>
            )}
            {!showInterviewButton && applicant.attempts < MAX_ATTEMPTS && (
              <button onClick={onRetake} className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light dark:hover:bg-primary-dark transition-colors">{t('retake_quiz')}</button>
            )}
            <button onClick={handlePrint} className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors">{t('export_pdf')}</button>
            <button onClick={handleEmail} className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors">{t('email_results')}</button>
          </div>
           {applicant.attempts >= MAX_ATTEMPTS && !showInterviewButton && <p className="text-red-500 font-semibold text-center mt-4">{t('no_more_attempts')}</p>}
        </div>

        {interviewTranscript && <TranscriptViewer transcript={interviewTranscript} />}

        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t('feedback')}</h3>
          <div className="space-y-6">
            {answers.map((answer, index) => (
              <div key={answer.questionId} className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border-l-4" style={{ borderColor: answer.isCorrect ? '#22c55e' : '#ef4444' }}>
                <p className="font-semibold text-gray-700 dark:text-gray-200 mb-2">{index + 1}. {answer.questionText}</p>
                <div className="space-y-2 text-sm">
                   <div className={`flex items-center gap-2 ${answer.selectedOptionIndex === answer.correctAnswerIndex ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {answer.isCorrect ? <CheckCircleIcon className="h-5 w-5"/> : <XCircleIcon className="h-5 w-5"/>}
                      <span><strong>{t('your_answer')}:</strong> {answer.selectedOptionIndex > -1 ? answer.options[answer.selectedOptionIndex] : 'Not Answered'}</span>
                   </div>
                   {!answer.isCorrect && (
                       <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                         <CheckCircleIcon className="h-5 w-5"/>
                         <span><strong>{t('correct_answer')}:</strong> {answer.options[answer.correctAnswerIndex]}</span>
                       </div>
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;