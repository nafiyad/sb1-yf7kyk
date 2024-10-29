import { z } from 'zod';

const configSchema = z.object({
  openai: z.object({
    apiKey: z.string().min(1, "OpenAI API key is required"),
    model: z.enum(["gpt-3.5-turbo", "gpt-4"]).default("gpt-3.5-turbo"),
    temperature: z.number().min(0).max(2).default(0.7),
    maxTokens: z.number().min(100).max(4000).default(2500)
  })
});

export const config = {
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    maxTokens: 2500
  }
} as const;

export function validateConfig() {
  try {
    configSchema.parse(config);
  } catch (error) {
    throw new Error('Invalid configuration: ' + (error as Error).message);
  }
}