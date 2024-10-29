import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import NotesTab from './NotesTab';
import QuizTab from './QuizTab';
import FlashcardTab from './FlashcardTab';

interface StudyTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const StudyTabs = ({ activeTab, setActiveTab }: StudyTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white/60">Generated materials</h2>
        <TabsList className="bg-transparent border-0">
          <TabsTrigger 
            value="notes" 
            className="text-sm text-white/60 data-[state=active]:text-white data-[state=active]:bg-transparent"
          >
            notes
          </TabsTrigger>
          <TabsTrigger 
            value="quiz" 
            className="text-sm text-white/60 data-[state=active]:text-white data-[state=active]:bg-transparent"
          >
            quiz
          </TabsTrigger>
          <TabsTrigger 
            value="flashcard" 
            className="text-sm text-white/60 data-[state=active]:text-white data-[state=active]:bg-transparent"
          >
            flashcard
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="notes" className="min-h-[calc(100vh-16rem)]">
        <NotesTab />
      </TabsContent>

      <TabsContent value="quiz" className="min-h-[calc(100vh-16rem)]">
        <QuizTab />
      </TabsContent>

      <TabsContent value="flashcard" className="min-h-[calc(100vh-16rem)]">
        <FlashcardTab />
      </TabsContent>
    </Tabs>
  );
};

export default StudyTabs;