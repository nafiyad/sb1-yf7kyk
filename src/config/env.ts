export const config = {
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
    defaultModel: 'gpt-3.5-turbo'
  }
} as const;

export function validateConfig() {
  if (!config.openai.apiKey) {
    throw new Error(
      'OpenAI API key is missing. Please add VITE_OPENAI_API_KEY to your .env file.'
    );
  }
}