/**
 * Environment configuration management
 */
export const ENV = {
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY
};

export function validateEnvironment() {
  if (!ENV.OPENAI_API_KEY) {
    throw new Error('VITE_OPENAI_API_KEY environment variable is not set');
  }
  if (ENV.OPENAI_API_KEY === 'your_api_key_here') {
    throw new Error('Please replace the default API key in .env with your actual OpenAI API key');
  }
}