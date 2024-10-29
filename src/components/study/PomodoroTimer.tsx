import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, X, Volume2, VolumeX } from 'lucide-react';
import { useStudyStore } from '../../store/studyStore';
import { toast } from 'sonner';

interface PomodoroTimerProps {
  onClose: () => void;
}

const PomodoroTimer = ({ onClose }: PomodoroTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { incrementStudyTime } = useStudyStore();

  const playSound = useCallback(() => {
    if (!isMuted) {
      const audio = new Audio('/notification.mp3');
      audio.play().catch(() => {
        toast.error('Unable to play notification sound');
      });
    }
  }, [isMuted]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
        if (!isBreak) {
          incrementStudyTime(1/60); // Increment study time by 1 second
        }
      }, 1000);
    } else if (timeLeft === 0) {
      playSound();
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60);
      setIsRunning(false);
      toast.success(isBreak ? 'Focus time started!' : 'Break time started!');
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak, incrementStudyTime, playSound]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      toast.success(isBreak ? 'Break timer started' : 'Focus timer started');
    }
  };

  const resetTimer = () => {
    setTimeLeft(25 * 60);
    setIsRunning(false);
    setIsBreak(false);
    toast.info('Timer reset');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-6 right-6 bg-[#1f2437] rounded-xl p-6 shadow-xl
                border border-white/10 backdrop-blur-xl w-72"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">
          {isBreak ? 'Break Time' : 'Focus Time'}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="text-4xl font-bold text-center mb-6">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      <div className="flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTimer}
          className="p-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {isRunning ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={resetTimer}
          className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="mt-4 text-center text-sm text-white/60">
        {isBreak ? 'Time to relax!' : 'Stay focused!'}
      </div>
    </motion.div>
  );
};

export default PomodoroTimer;