import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudyStore } from '../../store/studyStore';
import { CheckCircle, XCircle, ArrowRight, Award } from 'lucide-react';
import { toast } from 'sonner';

const QuizTab = () => {
  const { quiz = [], updateQuizProgress } = useStudyStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  if (!quiz.length) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-16rem)]">
        <div className="text-center space-y-4">
          <p className="text-white/60">No quiz questions available.</p>
          <button 
            onClick={() => toast.error('Please generate study materials first')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Generate Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const progress = (answeredQuestions.size / quiz.length) * 100;

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    setAnsweredQuestions(prev => new Set(prev).add(currentQuestionIndex));
    
    if (updateQuizProgress) {
      updateQuizProgress(currentQuestionIndex, answer === currentQuestion.correctAnswer);
    }

    if (answer === currentQuestion.correctAnswer) {
      toast.success('Correct answer! 🎉');
    } else {
      toast.error('Not quite right. Try again!');
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else if (answeredQuestions.size === quiz.length) {
      toast.success('Congratulations! You\'ve completed the quiz! 🎉', {
        duration: 5000,
        icon: '🏆'
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Progress</span>
          <span className="text-white/80">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 rounded-xl p-6 backdrop-blur-lg border border-white/10"
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-white/90">
              Question {currentQuestionIndex + 1} of {quiz.length}
            </h3>
            {answeredQuestions.has(currentQuestionIndex) && (
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                Answered
              </span>
            )}
          </div>

          <p className="text-xl text-white">{currentQuestion.question}</p>

          <div className="space-y-3">
            <AnimatePresence mode="wait">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                    showResult
                      ? option === currentQuestion.correctAnswer
                        ? 'bg-green-500/20 border-green-500'
                        : option === selectedAnswer
                        ? 'bg-red-500/20 border-red-500'
                        : 'bg-white/5 border-transparent'
                      : selectedAnswer === option
                      ? 'bg-blue-500/20 border-blue-500'
                      : 'bg-white/5 border-transparent hover:bg-white/10'
                  } border`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white/90">{option}</span>
                    {showResult && option === currentQuestion.correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                    {showResult && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-4 border-t border-white/10"
            >
              <div className="flex justify-between items-center">
                <p className={`text-sm ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {isCorrect ? 'Correct! Well done!' : 'Not quite right. The correct answer is highlighted above.'}
                </p>
                {currentQuestionIndex < quiz.length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg
                             hover:bg-blue-600 transition-colors"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Quiz Complete */}
      {answeredQuestions.size === quiz.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl
                   border border-yellow-500/20 backdrop-blur-lg"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500/20 rounded-full">
              <Award className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Quiz Complete!</h3>
              <p className="text-white/60">Great job! You've answered all questions.</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuizTab;