import { generateResponse } from './openAIService.js';
import { chatService } from './ChatService.js';

export async function generateBotResponse(message) {
  try {
    const response = await generateResponse(message);
    await chatService.addMessage('assistant', response);
    return response;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}