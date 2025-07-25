
import React, { useState, useContext } from 'react';
import { Question } from '../types';
import { LanguageContext } from '../App';
import { TrashIcon, EditIcon } from './icons';

interface AdminPanelProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ questions, setQuestions }) => {
  const { t } = useContext(LanguageContext);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [newQuestion, setNewQuestion] = useState({
    category: '',
    question: '',
    options: ['', '', '', ''],
    correctAnswerIndex: 0,
  });

  const handleAddQuestion = () => {
    if (newQuestion.question.trim() === '' || newQuestion.options.some(o => o.trim() === '')) return;
    const newQ: Question = {
      id: Date.now(),
      ...newQuestion
    };
    setQuestions(prev => [...prev, newQ]);
    setNewQuestion({ category: '', question: '', options: ['', '', '', ''], correctAnswerIndex: 0 });
  };
  
  const handleUpdateQuestion = () => {
    if (!editingQuestion) return;
    setQuestions(prev => prev.map(q => q.id === editingQuestion.id ? editingQuestion : q));
    setEditingQuestion(null);
  }

  const handleDeleteQuestion = (id: number) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleEditInputChange = <K extends keyof Question>(key: K, value: Question[K]) => {
      if (editingQuestion) {
          setEditingQuestion({...editingQuestion, [key]: value});
      }
  };
  
  const handleNewInputChange = (field: 'category' | 'question' | 'options' | 'correctAnswerIndex', value: any, index?: number) => {
      if(field === 'options' && typeof index === 'number'){
          const updatedOptions = [...newQuestion.options];
          updatedOptions[index] = value;
          setNewQuestion({...newQuestion, options: updatedOptions});
      } else {
        setNewQuestion({...newQuestion, [field]: value});
      }
  };

  const categories = [...new Set(questions.map(q => q.category))];

  const renderQuestionForm = (
    q: typeof newQuestion | Question, 
    onInputChange: (field: any, value: any, index?: number) => void,
    onCorrectChange: (index: number) => void
  ) => (
    <>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">{t('question_text')}</label>
        <input type="text" value={q.question} onChange={e => onInputChange('question', e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">{t('category')}</label>
        <input type="text" value={q.category} onChange={e => onInputChange('category', e.target.value)} list="categories" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
        <datalist id="categories">
            {categories.map(cat => <option key={cat} value={cat} />)}
        </datalist>
      </div>
      {q.options.map((opt, i) => (
        <div key={i} className="mb-2 flex items-center gap-2">
          <input type="radio" name={`correct_answer_${'id' in q ? q.id : 'new'}`} checked={q.correctAnswerIndex === i} onChange={() => onCorrectChange(i)} />
          <input type="text" value={opt} onChange={e => onInputChange('options', e.target.value, i)} placeholder={`${t('option')} ${i + 1}`} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
        </div>
      ))}
    </>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-bold mb-4">{t('add_question')}</h3>
        {renderQuestionForm(newQuestion, handleNewInputChange, (index) => handleNewInputChange('correctAnswerIndex', index))}
        <button onClick={handleAddQuestion} className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-light">{t('add_question')}</button>
      </div>

      <div className="space-y-4">
        {questions.map(q => (
          <div key={q.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            {editingQuestion?.id === q.id ? (
               <div>
                  {renderQuestionForm(editingQuestion, (field, value, index) => {
                     if (field === 'options' && typeof index === 'number') {
                         const updatedOptions = [...editingQuestion.options];
                         updatedOptions[index] = value;
                         handleEditInputChange('options', updatedOptions);
                     } else if (field !== 'options') {
                         handleEditInputChange(field as keyof Question, value);
                     }
                  }, (index) => handleEditInputChange('correctAnswerIndex', index))}
                  <div className="mt-4 flex gap-2">
                    <button onClick={handleUpdateQuestion} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">{t('save')}</button>
                    <button onClick={() => setEditingQuestion(null)} className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">{t('cancel')}</button>
                  </div>
               </div>
            ) : (
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-200">{q.question}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{q.category}</p>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {q.options.map((opt, i) => (
                    <li key={i} className={i === q.correctAnswerIndex ? 'font-bold text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'}>{opt}</li>
                  ))}
                </ul>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => setEditingQuestion(q)} className="p-2 text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"><EditIcon className="w-5 h-5"/></button>
                  <button onClick={() => handleDeleteQuestion(q.id)} className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400"><TrashIcon className="w-5 h-5"/></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
