import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface AchievementPopupProps {
  achievement: {
    title: string;
    description: string;
    icon: string;
  };
  onClose: () => void;
}

const AchievementPopup = ({ achievement, onClose }: AchievementPopupProps) => {
  React.useEffect(() => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Auto-close after 5 seconds
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: 50 }}
      className="fixed bottom-6 right-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20
                backdrop-blur-xl border border-yellow-500/20 rounded-lg p-4 shadow-xl
                max-w-sm w-full z-50"
    >
      <div className="flex items-center gap-4">
        <div className="text-4xl">{achievement.icon}</div>
        <div>
          <h3 className="font-bold text-yellow-400">{achievement.title}</h3>
          <p className="text-sm text-white/80">{achievement.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementPopup;