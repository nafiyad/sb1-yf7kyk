import React, { useState } from 'react';
import { useStudyStore } from '../../store/studyStore';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';

const FlashcardTab = () => {
  const { materials, loading, studyProgress, markFlashcardReviewed } = useStudyStore();
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-16rem)]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
          <p className="text-white/60">Generating flashcards...</p>
        </div>
      </div>
    );
  }

  if (!materials?.flashcards?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-16rem)] text-center">
        <p className="text-white/60 mb-4">No flashcards available.</p>
        <p className="text-sm text-white/40">Try generating new study materials first.</p>
      </div>
    );
  }

  const flashcards = materials.flashcards;
  const currentFlashcard = flashcards[currentCard];
  const isReviewed = studyProgress?.reviewedFlashcards?.includes(currentCard.toString()) || false;

  const handleNext = () => {
    if (currentCard < flashcards.length - 1) {
      if (markFlashcardReviewed) {
        markFlashcardReviewed(currentCard.toString());
      }
      setCurrentCard(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="relative perspective-1000">
        <motion.div
          className="relative h-64 cursor-pointer transform-style-preserve-3d"
          onClick={() => setIsFlipped(!isFlipped)}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Front of card */}
          <div className="absolute inset-0 backface-hidden">
            <div className="h-full rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                          border border-white/10 p-8 flex items-center justify-center text-center">
              <p className="text-xl">{currentFlashcard.question}</p>
            </div>
          </div>

          {/* Back of card */}
          <div className="absolute inset-0 backface-hidden rotate-y-180">
            <div className="h-full rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 
                          border border-white/10 p-8 flex items-center justify-center text-center">
              <p className="text-xl">{currentFlashcard.answer}</p>
            </div>
          </div>
        </motion.div>

        {/* Flip indicator */}
        <motion.div
          className="absolute bottom-4 right-4 text-white/40"
          animate={{ opacity: isFlipped ? 0 : 1 }}
        >
          <div className="flex items-center gap-2 text-sm">
            <RotateCw className="w-4 h-4" />
            <span>Click to flip</span>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentCard === 0}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg 
                   hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="text-center">
          <div className="text-lg font-medium">
            {currentCard + 1} / {flashcards.length}
          </div>
          <div className="text-sm text-white/60">
            {studyProgress?.completedFlashcards || 0} reviewed
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={currentCard === flashcards.length - 1}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg 
                   hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors duration-200"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {isReviewed && (
        <div className="text-center text-green-400 text-sm">
          ✓ Card reviewed
        </div>
      )}
    </div>
  );
};

export default FlashcardTab;