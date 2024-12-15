import { botResponses } from '../config/responses.js';

function getRandomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}

function extractCity(message) {
  const words = message.split(' ');
  const prepositions = ['in', 'at', 'from'];
  
  for (let i = 0; i < words.length; i++) {
    if (prepositions.includes(words[i].toLowerCase()) && words[i + 1]) {
      return words[i + 1].replace(/[.,!?]$/, '');
    }
  }
  return null;
}

function checkForPatterns(message, patterns) {
  return patterns.some(pattern => message.toLowerCase().includes(pattern));
}

export function determineResponseType(message) {
  const lowercaseMessage = message.toLowerCase();
  
  // Check for greetings
  for (const [key, response] of Object.entries(botResponses.greetings)) {
    if (lowercaseMessage.includes(key)) {
      return response;
    }
  }
  
  // Check for weather-related queries
  if (checkForPatterns(message, botResponses.weather.patterns)) {
    const city = extractCity(message);
    if (city) {
      const response = getRandomResponse(botResponses.weather.responses);
      return response.replace('{city}', city);
    }
  }
  
  // Check for follow-up patterns
  if (checkForPatterns(message, botResponses.followUp.patterns)) {
    return getRandomResponse(botResponses.followUp.responses);
  }
  
  // Default response
  return getRandomResponse(botResponses.default);
}