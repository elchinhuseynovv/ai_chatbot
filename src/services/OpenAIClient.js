import { handleApiError } from '../utils/api/errorHandlers.js';
import { API_CONFIG } from '../config/api.js';

export class OpenAIClient {
  constructor() {
    this.apiKey = API_CONFIG.OPENAI_API_KEY;
  }

  async generateResponse(message) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: API_CONFIG.MODEL,
          messages: [{ role: 'user', content: message }],
          max_tokens: API_CONFIG.MAX_TOKENS
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw error;
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}