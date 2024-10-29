import React from 'react';
import { useStudyStore } from '../../store/studyStore';
import { motion } from 'framer-motion';
import { Trophy, Target, Clock } from 'lucide-react';

const StudyProgress = () => {
  const { studyProgress, materials } = useStudyStore();

  if (!materials) return null;

  const totalItems = materials.flashcards.length + materials.quiz.length;
  const completedItems = studyProgress?.completedFlashcards || 0;
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <div className="bg-[#1f2437] rounded-lg p-6 border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Study Progress</h3>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-white/60" />
          <span className="text-sm text-white/60">
            {Math.floor((studyProgress?.studyTime || 0) / 60)}m studied
          </span>
        </div>
      </div>

      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-4">
        <motion.div
          className="absolute left-0 top-0 h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-white/60">
          {completedItems} of {totalItems} items completed
        </span>
        <span className="text-white/60">{Math.round(progress)}%</span>
      </div>

      {progress >= 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 p-4 bg-green-500/20 rounded-lg border border-green-500/30 flex items-center gap-3"
        >
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="text-green-400">Congratulations! You've completed all study materials!</span>
        </motion.div>
      )}

      {studyProgress?.studyGoals?.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium text-white/80 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Study Goals
          </h4>
          {studyProgress.studyGoals.map((goal) => (
            <div
              key={goal.id}
              className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
            >
              <span className="text-sm text-white/80">{goal.description}</span>
              <span className="text-xs text-white/60">{goal.targetDate}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudyProgress;