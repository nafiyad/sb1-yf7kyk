import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useStudyStore } from '../../store/studyStore';

const LevelProgress = () => {
  const { gamification } = useStudyStore();
  const { level, experience, experienceToNextLevel } = gamification;
  const progress = (experience / experienceToNextLevel) * 100;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-4
                border border-blue-500/20 backdrop-blur-xl"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Trophy className="w-6 h-6 text-blue-400" />
        </div>
        
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-blue-400">
              Level {level}
            </span>
          </div>
          <p className="text-xs text-white/40">
            {experience} / {experienceToNextLevel} XP
          </p>
        </div>
      </div>

      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export default LevelProgress;