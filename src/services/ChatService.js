import { OpenAIClient } from './OpenAIClient.js';
import { ConversationService } from './ConversationService.js';
import { validateApiConfig } from '../config/api.js';
import { createErrorMessage } from '../utils/messageFormatters.js';

export class ChatService {
  constructor() {
    this.conversationService = new ConversationService();
    try {
      validateApiConfig();
      this.openAI = new OpenAIClient();
    } catch (error) {
      console.error('OpenAI initialization error:', error.message);
      this.openAI = null;
    }
  }

  async generateResponse(message) {
    try {
      // Add user message to conversation
      await this.conversationService.addMessage('user', message);

      // Check if OpenAI client is available
      if (!this.openAI) {
        throw new Error('Please add your OpenAI API key to the .env file');
      }

      // Get AI response
      const response = await this.openAI.generateResponse(message);
      await this.conversationService.addMessage('assistant', response);
      return response;
    } catch (error) {
      console.error('Error generating response:', error);
      return createErrorMessage(error.message);
    }
  }
}