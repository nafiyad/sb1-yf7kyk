import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useStudyStore } from '../../store/studyStore';

const StreakDisplay = () => {
  const { gamification } = useStudyStore();
  const { streak } = gamification;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg p-4
                border border-orange-500/20 backdrop-blur-xl"
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -10, 10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="p-2 bg-orange-500/20 rounded-lg"
        >
          <Flame className="w-6 h-6 text-orange-400" />
        </motion.div>
        
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-orange-400">
              {streak.currentStreak}
            </span>
            <span className="text-sm text-white/60">day streak</span>
          </div>
          <p className="text-xs text-white/40">
            Best: {streak.bestStreak} days
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StreakDisplay;