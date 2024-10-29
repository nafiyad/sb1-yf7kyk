import React from 'react';
import { useStudyStore } from './store/studyStore';
import { Toaster } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './components/LandingPage';
import StudyInterface from './components/StudyInterface';
import { ErrorDisplay } from './components/ErrorDisplay';

function App() {
  const { initialized, error, loading } = useStudyStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1f36] via-[#1f2544] to-[#1a1f36] text-white">
      <AnimatePresence mode="wait">
        {!initialized ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LandingPage />
          </motion.div>
        ) : (
          <motion.div
            key="study"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StudyInterface />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && <ErrorDisplay error={error} />}
      </AnimatePresence>
      
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'white',
          }
        }}
      />

      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="text-center space-y-4">
              <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-white/80">Generating your study materials...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;