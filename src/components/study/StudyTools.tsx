import React from 'react';
import { Download, Share2, Printer, FileText, Book, Library, Timer } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStudyStore } from '../../store/studyStore';
import { exportNotes, exportFlashcards, exportQuiz } from '../../utils/export';
import { toast } from 'sonner';

const StudyTools = () => {
  const { notes, flashcards, quiz, togglePomodoroTimer } = useStudyStore();

  const handleExportNotes = async (format: 'md' | 'pdf' | 'txt') => {
    if (!notes) {
      toast.error('No notes available to export');
      return;
    }

    const success = exportNotes(notes, format);
    if (success) {
      toast.success(`Notes exported successfully as ${format.toUpperCase()}`);
    } else {
      toast.error('Failed to export notes');
    }
  };

  const handleExportFlashcards = () => {
    if (!flashcards?.length) {
      toast.error('No flashcards available to export');
      return;
    }

    const success = exportFlashcards(flashcards);
    if (success) {
      toast.success('Flashcards exported successfully');
    } else {
      toast.error('Failed to export flashcards');
    }
  };

  const handleExportQuiz = () => {
    if (!quiz?.length) {
      toast.error('No quiz available to export');
      return;
    }

    const success = exportQuiz(quiz);
    if (success) {
      toast.success('Quiz exported successfully');
    } else {
      toast.error('Failed to export quiz');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'NAF AI Study Materials',
          text: 'Check out my study materials!',
          url: window.location.href,
        });
        toast.success('Shared successfully');
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          toast.error('Failed to share');
        }
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        <button
          onClick={() => handleExportNotes('md')}
          className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400
                   rounded-lg flex items-center gap-2 transition-colors duration-200"
        >
          <Download className="w-4 h-4" />
          <span>Export Notes</span>
        </button>
        <div className="absolute right-0 mt-2 w-48 py-2 bg-[#1f2437] rounded-lg shadow-xl
                      opacity-0 group-hover:opacity-100 invisible group-hover:visible
                      transition-all duration-200 z-10">
          <button
            onClick={() => handleExportNotes('md')}
            className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Markdown (.md)</span>
          </button>
          <button
            onClick={() => handleExportNotes('pdf')}
            className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center gap-2"
          >
            <Book className="w-4 h-4" />
            <span>PDF (.pdf)</span>
          </button>
          <button
            onClick={() => handleExportNotes('txt')}
            className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Text (.txt)</span>
          </button>
        </div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleExportFlashcards}
        className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400
                 rounded-lg flex items-center gap-2 transition-colors duration-200"
      >
        <Library className="w-4 h-4" />
        <span>Export Flashcards</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleShare}
        className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400
                 rounded-lg flex items-center gap-2 transition-colors duration-200"
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePomodoroTimer}
        className="px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400
                 rounded-lg flex items-center gap-2 transition-colors duration-200"
      >
        <Timer className="w-4 h-4" />
        <span>Pomodoro Timer</span>
      </motion.button>
    </div>
  );
};

export default StudyTools;