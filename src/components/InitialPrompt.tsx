import React, { useState } from 'react';
import { Brain, Upload, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStudyStore } from '../store/studyStore';
import { toast } from 'sonner';
import GenerationProgress from './GenerationProgress';

const InitialPrompt = () => {
  const [input, setInput] = useState('');
  const { generateMaterials, loading } = useStudyStore();

  const handleSubmit = async () => {
    if (!input.trim()) {
      toast.error('Please enter a topic or paste study material');
      return;
    }
    
    try {
      await generateMaterials(input);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate study materials');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-[#1a1f36] via-[#1f2544] to-[#1a1f36] flex flex-col"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba')] 
                    opacity-5 bg-cover bg-center mix-blend-overlay" />
      
      <div className="relative flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl space-y-12">
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Brain className="w-12 h-12 text-blue-400" />
              </motion.div>
              <h1 className="text-5xl font-bold text-white tracking-tight">
                NAF AI
              </h1>
            </div>
            <p className="text-lg text-blue-200/80">Your intelligent study companion. What would you like to learn?</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                          rounded-2xl blur-xl transform -rotate-1" />
            <div className="relative bg-black/20 rounded-2xl p-8 backdrop-blur-xl border border-white/10">
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter a topic or paste your study material..."
                  className="w-full h-40 bg-white/5 rounded-xl p-4 text-white placeholder-blue-200/50 
                           resize-none focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-lg
                           transition-all duration-300"
                  disabled={loading}
                />
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 text-blue-200/70 hover:text-blue-200 
                           transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/5
                           border border-white/0 hover:border-white/10"
                >
                  <Upload className="w-4 h-4" />
                  <span className="text-sm">Upload file</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={loading}
                  className="group px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white 
                           rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300
                           disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none 
                           focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-lg shadow-blue-500/20"
                >
                  <span className="flex items-center gap-2">
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <span>Generate</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {loading && <GenerationProgress />}
        </div>
      </div>
    </motion.div>
  );
};

export default InitialPrompt;