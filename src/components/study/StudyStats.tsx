import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Target, Brain, Calendar } from 'lucide-react';
import { useStudyStore } from '../../store/studyStore';

const StudyStats = () => {
  const { studyProgress } = useStudyStore();
  const {
    weeklyStudyHours,
    weeklyGoalHours,
    masteredConcepts,
    focusSessions
  } = studyProgress;

  const totalFocusTime = focusSessions.reduce((acc, session) => acc + session.duration, 0);
  const averageSessionLength = focusSessions.length > 0
    ? totalFocusTime / focusSessions.length
    : 0;

  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-[#1f2437] rounded-lg p-4 border border-white/5"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Clock className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-white/60">Weekly Progress</p>
            <p className="text-lg font-medium">
              {Math.round(weeklyStudyHours)} / {weeklyGoalHours}h
            </p>
          </div>
        </div>
        <div className="mt-2 w-full bg-white/10 rounded-full h-2">
          <motion.div
            className="h-full bg-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(weeklyStudyHours / weeklyGoalHours) * 100}%` }}
          />
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-[#1f2437] rounded-lg p-4 border border-white/5"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Brain className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-white/60">Mastered Concepts</p>
            <p className="text-lg font-medium">{masteredConcepts.length}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-[#1f2437] rounded-lg p-4 border border-white/5"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <Target className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-sm text-white/60">Focus Sessions</p>
            <p className="text-lg font-medium">{focusSessions.length}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-[#1f2437] rounded-lg p-4 border border-white/5"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 rounded-lg">
            <Calendar className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <p className="text-sm text-white/60">Avg. Session</p>
            <p className="text-lg font-medium">
              {Math.round(averageSessionLength / 60)}m
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudyStats;