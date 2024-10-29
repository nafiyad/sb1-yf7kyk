import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useStudyStore } from '../../store/studyStore';

const KeyPoints = () => {
  const { materials } = useStudyStore();

  if (!materials?.keyPoints) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl p-6 backdrop-blur-sm
               border border-white/10 mb-8"
    >
      <h3 className="text-lg font-medium mb-4">Key Learning Points</h3>
      <div className="space-y-3">
        {materials.keyPoints.map((point, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-white/80">{point}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default KeyPoints;