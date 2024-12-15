import { determineResponseType } from './responseUtils.js';

export function generateBotResponse(userMessage) {
  return new Promise((resolve) => {
    // Add slight delay to simulate processing
    setTimeout(() => {
      const response = determineResponseType(userMessage);
      resolve(response);
    }, 500);
  });
}