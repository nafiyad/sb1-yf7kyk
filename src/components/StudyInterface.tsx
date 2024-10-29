import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import NotesTab from './study/NotesTab';
import QuizTab from './study/QuizTab';
import FlashcardTab from './study/FlashcardTab';
import ChatSidebar from './chat/ChatSidebar';
import { useStudyStore } from '../store/studyStore';
import { motion } from 'framer-motion';
import { Brain, Target, Clock, Award } from 'lucide-react';
import StudyProgress from './study/StudyProgress';

const StudyInterface = () => {
  const { materials, studyProgress, achievements } = useStudyStore();

  const stats = [
    {
      icon: <Brain className="w-5 h-5 text-blue-400" />,
      label: 'Study Materials',
      value: materials ? `${materials.flashcards.length + materials.quiz.length} items` : '0 items'
    },
    {
      icon: <Target className="w-5 h-5 text-green-400" />,
      label: 'Completed',
      value: studyProgress?.completedFlashcards || 0
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-400" />,
      label: 'Study Time',
      value: `${Math.floor((studyProgress?.studyTime || 0) / 60)}m`
    },
    {
      icon: <Award className="w-5 h-5 text-yellow-400" />,
      label: 'Achievements',
      value: achievements?.length || 0
    }
  ];

  return (
    <div className="flex h-full">
      <ChatSidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1f2437] p-4 rounded-lg border border-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-lg">{stat.icon}</div>
                <div>
                  <p className="text-sm text-white/60">{stat.label}</p>
                  <p className="text-lg font-semibold text-white">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Study Progress */}
        <StudyProgress />

        {/* Main Content */}
        <Tabs defaultValue="notes" className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white/90">Study Materials</h2>
            <TabsList>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
              <TabsTrigger value="flashcard">Flashcards</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="notes">
            <NotesTab />
          </TabsContent>
          <TabsContent value="quiz">
            <QuizTab />
          </TabsContent>
          <TabsContent value="flashcard">
            <FlashcardTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudyInterface;