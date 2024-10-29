import { saveAs } from 'file-saver';
import { marked } from 'marked';

export const exportNotes = (notes: string, format: 'md' | 'pdf' | 'txt' = 'md') => {
  try {
    let content = notes;
    let filename = `notes-${Date.now()}`;
    let mimeType = 'text/plain';

    switch (format) {
      case 'md':
        filename += '.md';
        mimeType = 'text/markdown';
        break;
      case 'pdf':
        // Convert markdown to HTML first
        const html = marked(notes);
        content = html;
        filename += '.pdf';
        mimeType = 'application/pdf';
        break;
      case 'txt':
        // Strip markdown formatting
        content = notes.replace(/[#*_`]/g, '');
        filename += '.txt';
        mimeType = 'text/plain';
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    saveAs(blob, filename);
    return true;
  } catch (error) {
    console.error('Failed to export notes:', error);
    return false;
  }
};

export const exportFlashcards = (flashcards: Array<{ question: string; answer: string }>) => {
  try {
    const content = flashcards.map(card => 
      `Q: ${card.question}\nA: ${card.answer}\n---`
    ).join('\n\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    saveAs(blob, `flashcards-${Date.now()}.txt`);
    return true;
  } catch (error) {
    console.error('Failed to export flashcards:', error);
    return false;
  }
};

export const exportQuiz = (quiz: Array<{ question: string; options: string[]; correctAnswer: string }>) => {
  try {
    const content = quiz.map(q => 
      `Q: ${q.question}\n${q.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\nCorrect: ${q.correctAnswer}\n---`
    ).join('\n\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    saveAs(blob, `quiz-${Date.now()}.txt`);
    return true;
  } catch (error) {
    console.error('Failed to export quiz:', error);
    return false;
  }
};