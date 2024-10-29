import React from 'react';
import { motion } from 'framer-motion';
import { FileText, BrainCircuit, ScrollText } from 'lucide-react';
import { useStudyStore } from '../store/studyStore';

const steps = [
  { id: 'notes', icon: FileText, label: 'Generating comprehensive notes' },
  { id: 'quiz', icon: BrainCircuit, label: 'Creating quiz questions' },
  { id: 'flashcards', icon: ScrollText, label: 'Preparing flashcards' }
];

const GenerationProgress = () => {
  const currentStep = useStudyStore(state => state.currentStep);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/20 rounded-2xl p-8 backdrop-blur-xl border border-white/10 mt-8"
    >
      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isComplete = index < currentStep;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center gap-4"
            >
              <div className={`relative flex items-center justify-center w-10 h-10 rounded-full 
                            ${isActive ? 'bg-blue-500' : isComplete ? 'bg-green-500' : 'bg-white/10'} 
                            transition-colors duration-300`}
              >
                <Icon className="w-5 h-5 text-white" />
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-blue-400"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${isActive ? 'text-white' : 'text-white/60'}`}>
                  {step.label}
                </p>
                {isActive && (
                  <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-500"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2, ease: 'linear' }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default GenerationProgress;