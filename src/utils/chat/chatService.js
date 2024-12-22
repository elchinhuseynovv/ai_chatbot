import { Types } from './types.js';
import { handleBasicResponse } from './responseHandler.js';
import { OpenAIClient } from './openAIClient.js';

export class ChatService {
  constructor() {
    this.openAI = new OpenAIClient(import.meta.env.VITE_OPENAI_API_KEY);
  }

  /**
   * @param {string} message
   * @returns {Promise<string>}
   */
  async generateResponse(message) {
    // Try basic responses first
    const basicResponse = handleBasicResponse(message);
    if (basicResponse) {
      return basicResponse;
    }

    // Fall back to OpenAI for complex queries
    try {
      return await this.openAI.generateResponse(message);
    } catch (error) {
      if (error.message === 'OpenAI API key not configured') {
        return "I apologize, but I haven't been configured with an API key yet. Please add your OpenAI API key to the .env file.";
      }
      return "I apologize, but I'm having trouble connecting to my knowledge base right now. Could you please try again?";
    }
  }
}