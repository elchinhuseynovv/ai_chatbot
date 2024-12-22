import { botResponses } from '../config/responses.js';

export function handleBasicResponse(message) {
  const lowercaseMessage = message.toLowerCase();
  
  // Check greetings
  for (const [key, response] of Object.entries(botResponses.greetings)) {
    if (lowercaseMessage.includes(key)) {
      return response;
    }
  }
  
  // Check follow-ups
  if (botResponses.followUp.patterns.some(pattern => lowercaseMessage.includes(pattern))) {
    const responses = botResponses.followUp.responses;
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  return null;
}