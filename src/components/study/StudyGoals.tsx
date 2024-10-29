import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Calendar, Check, Plus } from 'lucide-react';
import { useStudyStore } from '../../store/studyStore';
import { format } from 'date-fns';

const StudyGoals = () => {
  const { studyProgress, addStudyGoal, completeStudyGoal } = useStudyStore();
  const [newGoal, setNewGoal] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleAddGoal = () => {
    if (newGoal && targetDate) {
      addStudyGoal(newGoal, targetDate);
      setNewGoal('');
      setTargetDate('');
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Study Goals</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg
                   transition-colors duration-200"
        >
          <Plus className="w-4 h-4 text-blue-400" />
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1f2437] rounded-lg p-4 space-y-4"
        >
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Enter your study goal..."
            className="w-full bg-[#2a3147] rounded-lg px-4 py-2 text-sm
                     placeholder-white/40 focus:outline-none focus:ring-2
                     focus:ring-blue-500/50"
          />
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full bg-[#2a3147] rounded-lg px-4 py-2 text-sm
                     text-white/80 focus:outline-none focus:ring-2
                     focus:ring-blue-500/50"
          />
          <button
            onClick={handleAddGoal}
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-lg
                     transition-colors duration-200"
          >
            Add Goal
          </button>
        </motion.div>
      )}

      <div className="space-y-3">
        {studyProgress.studyGoals.map((goal) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`bg-[#1f2437] rounded-lg p-4 border ${
              goal.completed ? 'border-green-500/20' : 'border-white/5'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm text-white/90">{goal.description}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-white/40">
                  <Calendar className="w-3 h-3" />
                  <span>Due {format(new Date(goal.targetDate), 'MMM d, yyyy')}</span>
                </div>
              </div>
              {!goal.completed && (
                <button
                  onClick={() => completeStudyGoal(goal.id)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Check className="w-4 h-4 text-white/60" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StudyGoals;