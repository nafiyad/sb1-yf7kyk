import { create } from 'zustand';
import { generateStudyMaterials, generateMoreFlashcards } from '../lib/api/openai';
import { toast } from 'sonner';

interface StudyState {
  initialized: boolean;
  loading: boolean;
  error: string | null;
  materials: {
    notes: string;
    quiz: Array<{
      question: string;
      options: string[];
      correctAnswer: string;
      answered?: boolean;
      isCorrect?: boolean;
    }>;
    flashcards: Array<{
      question: string;
      answer: string;
      reviewed?: boolean;
    }>;
  } | null;
  messages: Array<{
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: number;
  }>;
  studyProgress: {
    studyTime: number;
    completedFlashcards: number;
    reviewedFlashcards: string[];
    studyGoals: Array<{
      id: string;
      description: string;
      targetDate: string;
      completed: boolean;
    }>;
  };
  achievements: string[];
  currentStep: number;
  generateMaterials: (topic: string) => Promise<void>;
  addMessage: (content: string, role: 'user' | 'assistant') => void;
  updateQuizProgress: (index: number, isCorrect: boolean) => void;
  markFlashcardReviewed: (id: string) => void;
  generateMoreFlashcards: () => Promise<void>;
  setError: (error: string | null) => void;
}

export const useStudyStore = create<StudyState>((set, get) => ({
  initialized: false,
  loading: false,
  error: null,
  materials: null,
  messages: [],
  studyProgress: {
    studyTime: 0,
    completedFlashcards: 0,
    reviewedFlashcards: [],
    studyGoals: []
  },
  achievements: [],
  currentStep: 0,

  generateMaterials: async (topic: string) => {
    set({ loading: true, error: null, currentStep: 0 });
    try {
      set({ currentStep: 0 });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ currentStep: 1 });
      const materials = await generateStudyMaterials(topic);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ currentStep: 2 });
      await new Promise(resolve => setTimeout(resolve, 1000));

      set({
        initialized: true,
        loading: false,
        materials: {
          ...materials,
          quiz: materials.quiz.map(q => ({ ...q, answered: false })),
          flashcards: materials.flashcards.map(f => ({ ...f, reviewed: false }))
        },
        currentStep: 3
      });

      toast.success('Study materials generated successfully!');
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to generate study materials'
      });
      toast.error('Failed to generate study materials');
    }
  },

  addMessage: (content: string, role: 'user' | 'assistant') => {
    set(state => ({
      messages: [
        ...state.messages,
        {
          id: Date.now().toString(),
          content,
          role,
          timestamp: Date.now()
        }
      ]
    }));
  },

  updateQuizProgress: (index: number, isCorrect: boolean) => {
    set(state => {
      if (!state.materials) return state;
      
      const updatedQuiz = state.materials.quiz.map((q, i) => 
        i === index ? { ...q, answered: true, isCorrect } : q
      );

      return {
        materials: {
          ...state.materials,
          quiz: updatedQuiz
        }
      };
    });
  },

  markFlashcardReviewed: (id: string) => {
    set(state => ({
      studyProgress: {
        ...state.studyProgress,
        reviewedFlashcards: [...state.studyProgress.reviewedFlashcards, id],
        completedFlashcards: state.studyProgress.completedFlashcards + 1
      }
    }));
  },

  generateMoreFlashcards: async () => {
    set({ loading: true, error: null });
    try {
      const state = get();
      if (!state.materials) throw new Error('No existing materials');

      const newFlashcards = await generateMoreFlashcards(
        'Continue with current topic',
        state.materials.flashcards
      );

      set(state => ({
        loading: false,
        materials: state.materials ? {
          ...state.materials,
          flashcards: [...state.materials.flashcards, ...newFlashcards]
        } : null
      }));

      toast.success('Generated additional flashcards!');
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to generate additional flashcards'
      });
      toast.error('Failed to generate additional flashcards');
    }
  },

  setError: (error: string | null) => set({ error })
}));