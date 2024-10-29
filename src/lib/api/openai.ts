import OpenAI from 'openai';
import { config } from '../../config/env';

const openai = new OpenAI({
  apiKey: config.openai.apiKey,
  dangerouslyAllowBrowser: true
});

export interface StudyMaterials {
  notes: string;
  quiz: Array<{
    question: string;
    options: string[];
    correctAnswer: string;
  }>;
  flashcards: Array<{
    question: string;
    answer: string;
  }>;
}

export class OpenAIError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'OpenAIError';
  }
}

function parseNotes(sections: string[]): string {
  return sections.find(s => s.toLowerCase().includes('notes'))
    ?.split('\n')
    .slice(1)
    .join('\n') || '';
}

function parseQuiz(sections: string[]): StudyMaterials['quiz'] {
  const quizSection = sections.find(s => s.toLowerCase().includes('quiz'))
    ?.split('\n')
    .slice(1)
    .join('\n') || '';

  return quizSection.split('\n\n')
    .filter(Boolean)
    .map(q => {
      const lines = q.split('\n');
      const question = lines[0].replace(/^\d+\.\s*/, '');
      const options = lines.slice(1, -1).map(o => o.replace(/^[a-d]\)\s*/, ''));
      const correctAnswer = options[lines.findIndex(l => l.includes('*')) - 1];
      return { question, options, correctAnswer };
    });
}

function parseFlashcards(sections: string[]): StudyMaterials['flashcards'] {
  const flashcardsSection = sections.find(s => s.toLowerCase().includes('flashcards'))
    ?.split('\n')
    .slice(1)
    .join('\n') || '';

  return flashcardsSection.split('\n\n')
    .filter(Boolean)
    .map(f => {
      const [question, answer] = f.split('\nA: ');
      return {
        question: question.replace(/^Q:\s*/, ''),
        answer: answer || ''
      };
    });
}

function parseStudyMaterials(content: string): StudyMaterials {
  const sections = content.split('---').map(s => s.trim());
  
  return {
    notes: parseNotes(sections),
    quiz: parseQuiz(sections),
    flashcards: parseFlashcards(sections)
  };
}

export async function generateStudyMaterials(topic: string): Promise<StudyMaterials> {
  try {
    const completion = await openai.chat.completions.create({
      model: config.openai.defaultModel,
      messages: [
        {
          role: "system",
          content: `You are an expert tutor. Generate comprehensive study materials about the given topic. Include detailed notes in markdown format, quiz questions with multiple choice answers, and flashcards for key concepts.`
        },
        {
          role: "user",
          content: `Generate study materials for: ${topic}. Include:
          1. Detailed notes with markdown formatting
          2. At least 5 multiple choice questions
          3. At least 5 flashcards with key concepts

          Format the response with --- between sections:
          NOTES
          ---
          QUIZ
          ---
          FLASHCARDS`
        }
      ]
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new OpenAIError('No content generated');
    }

    return parseStudyMaterials(content);
  } catch (error: any) {
    if (error.code === 'insufficient_quota') {
      throw new OpenAIError(
        'OpenAI API quota exceeded. Please check your billing details.',
        'insufficient_quota'
      );
    }
    if (error.code === 'invalid_api_key') {
      throw new OpenAIError(
        'Invalid OpenAI API key. Please check your API key configuration.',
        'invalid_api_key'
      );
    }
    throw new OpenAIError(
      error.message || 'Failed to generate study materials',
      error.code
    );
  }
}

export async function generateMoreFlashcards(topic: string, existingFlashcards: StudyMaterials['flashcards']): Promise<StudyMaterials['flashcards']> {
  try {
    const completion = await openai.chat.completions.create({
      model: config.openai.defaultModel,
      messages: [
        {
          role: "system",
          content: "Generate additional flashcards for the given topic, avoiding duplicates with existing flashcards."
        },
        {
          role: "user",
          content: `Generate 5 more flashcards for: ${topic}\n\nExisting flashcards:\n${
            existingFlashcards.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')
          }`
        }
      ]
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new OpenAIError('No content generated');
    }

    const sections = content.split('---');
    return parseFlashcards(sections);
  } catch (error: any) {
    throw new OpenAIError(
      error.message || 'Failed to generate additional flashcards',
      error.code
    );
  }
}