import { ENV, validateEnvironment } from './environment.js';

export const API_CONFIG = {
  OPENAI_API_KEY: ENV.OPENAI_API_KEY,
  MODEL: 'gpt-3.5-turbo',
  MAX_TOKENS: 150,
  TEMPERATURE: 0.7
};

export function validateApiConfig() {
  try {
    validateEnvironment();
  } catch (error) {
    throw new Error(`API Configuration Error: ${error.message}`);
  }
}