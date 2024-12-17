// @ts-check
import { chatService } from './ChatService.js';
import { botResponses } from '../../config/responses.js';

/**
 * @param {Array<string>} responses
 * @returns {string}
 */
function getRandomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * @param {string} message
 * @returns {Promise<string>}
 */
export async function generateBotResponse(message) {
  const lowercaseMessage = message.toLowerCase();
  let response;

  // Check for greetings
  for (const [key, value] of Object.entries(botResponses.greetings)) {
    if (lowercaseMessage.includes(key)) {
      response = value;
      break;
    }
  }

  // If no greeting found, use default response
  if (!response) {
    response = getRandomResponse(botResponses.default);
  }

  // Save the bot's response
  await chatService.addMessage('assistant', response);
  
  return response;
}