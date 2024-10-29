import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap, BookOpen, Target, Users } from 'lucide-react';
import { useStudyStore } from '../store/studyStore';
import { toast } from 'sonner';

const LandingPage = () => {
  const { generateMaterials } = useStudyStore();

  const handleGetStarted = async () => {
    try {
      await generateMaterials('Introduction to AI-Powered Learning');
      toast.success('Welcome to NAF AI! Your study materials are ready.');
    } catch (error) {
      toast.error('Failed to generate study materials. Please try again.');
    }
  };

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Advanced AI technology creates personalized study materials tailored to your needs.'
    },
    {
      icon: Target,
      title: 'Smart Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics and achievement systems.'
    },
    {
      icon: BookOpen,
      title: 'Interactive Study Tools',
      description: 'Engage with dynamic flashcards, quizzes, and comprehensive study notes.'
    },
    {
      icon: Zap,
      title: 'Instant Generation',
      description: 'Create study materials in seconds for any topic or subject matter.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1f36] via-[#1f2544] to-[#1a1f36]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba')] 
                      opacity-5 bg-cover bg-center mix-blend-overlay" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
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
              className="inline-block"
            >
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl
                            backdrop-blur-xl border border-white/10">
                <Brain className="w-12 h-12 text-blue-400" />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
              Transform Your Learning <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                with AI-Powered Study Tools
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-xl text-white/70">
              NAF AI turns any topic into an interactive learning experience. Generate study materials,
              track your progress, and master concepts faster than ever.
            </p>

            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="px-8 py-4 bg-blue-500 text-white rounded-xl font-medium
                         hover:bg-blue-600 transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         focus:ring-offset-[#1a1f36]"
              >
                Get Started Free
              </motion.button>

              <motion.a
                href="#features"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 text-white rounded-xl font-medium
                         hover:bg-white/10 transition-colors duration-200
                         backdrop-blur-xl border border-white/10
                         focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                Learn More
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      {/* Features Section */}
      <div id="features" className="py-24 bg-[#151929]">
        {/* ... */}
      </div>

      {/* Social Proof */}
      <div className="py-24">
        {/* ... */}
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-[#151929]">
        {/* ... */}
      </div>
    </div>
  );
};

export default LandingPage;