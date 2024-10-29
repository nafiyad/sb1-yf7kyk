import React from 'react';
import { useStudyStore } from '../../store/studyStore';
import { marked } from 'marked';
import { motion } from 'framer-motion';

const NotesTab = () => {
  const { materials, loading } = useStudyStore();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-16rem)]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
          <p className="text-white/60">Generating comprehensive notes...</p>
        </div>
      </div>
    );
  }

  if (!materials?.notes) {
    return (
      <div className="text-center text-white/60 py-12">
        No notes available. Try generating new study materials.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="prose prose-invert max-w-none prose-headings:text-white/90 prose-p:text-white/70
                prose-strong:text-white/90 prose-code:text-blue-300 prose-pre:bg-black/20
                prose-pre:backdrop-blur-xl prose-pre:border prose-pre:border-white/10
                prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-500/5
                prose-blockquote:backdrop-blur-xl"
      dangerouslySetInnerHTML={{ __html: marked(materials.notes) }}
    />
  );
};

export default NotesTab;