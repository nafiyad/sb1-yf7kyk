import { z } from 'zod';

const configSchema = z.object({
  openai: z.object({
    apiKey: z.string().min(1, "OpenAI API key is required"),
    model: z.enum(["gpt-3.5-turbo", "gpt-4"]).default("gpt-3.5-turbo"),
    temperature: z.number().min(0).max(2).default(0.7),
    maxTokens: z.number().min(100).max(4000).default(2500)
  })
});

export const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const config = {
  openai: {
    apiKey: OPENAI_API_KEY || '',
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    maxTokens: 2500
  }
} as const;

export const isValidApiKey = (key: string | undefined): boolean => {
  return typeof key === 'string' && key.startsWith('sk-') && key.length > 40;
};

export const getApiKeyError = (): string | null => {
  if (!OPENAI_API_KEY) return 'OpenAI API key is missing';
  if (!isValidApiKey(OPENAI_API_KEY)) return 'Invalid OpenAI API key format';
  return null;
};

export const validateConfig = () => {
  const error = getApiKeyError();
  if (error) {
    throw new Error(error);
  }
  try {
    configSchema.parse(config);
  } catch (error) {
    throw new Error('Invalid configuration: ' + (error as Error).message);
  }
};