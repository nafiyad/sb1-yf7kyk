import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
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

export async function generateStudyMaterials(topic: string): Promise<StudyMaterials> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
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
          3. At least 5 flashcards with key concepts`
        }
      ]
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error('No content generated');

    // Parse the content into structured data
    const sections = content.split('---').map(s => s.trim());
    const notesSection = sections.find(s => s.toLowerCase().includes('notes'))?.split('\n').slice(1).join('\n') || '';
    const quizSection = sections.find(s => s.toLowerCase().includes('quiz'))?.split('\n').slice(1).join('\n') || '';
    const flashcardsSection = sections.find(s => s.toLowerCase().includes('flashcards'))?.split('\n').slice(1).join('\n') || '';

    // Parse quiz questions
    const quizQuestions = quizSection.split('\n\n').filter(Boolean).map(q => {
      const lines = q.split('\n');
      const question = lines[0].replace(/^\d+\.\s*/, '');
      const options = lines.slice(1, -1).map(o => o.replace(/^[a-d]\)\s*/, ''));
      const correctAnswer = options[lines.findIndex(l => l.includes('*')) - 1];
      return { question, options, correctAnswer };
    });

    // Parse flashcards
    const flashcards = flashcardsSection.split('\n\n').filter(Boolean).map(f => {
      const [question, answer] = f.split('\nA: ');
      return {
        question: question.replace(/^Q:\s*/, ''),
        answer: answer || ''
      };
    });

    return {
      notes: notesSection,
      quiz: quizQuestions,
      flashcards: flashcards
    };
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    if (error.code === 'insufficient_quota') {
      throw new Error('OpenAI API quota exceeded. Please check your billing details.');
    }
    if (error.code === 'invalid_api_key') {
      throw new Error('Invalid OpenAI API key. Please check your API key configuration.');
    }
    throw new Error(error.message || 'Failed to generate study materials');
  }
}