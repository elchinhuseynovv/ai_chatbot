/**
 * Format error messages for user display
 * @param {string} message - The error message
 * @returns {string} Formatted error message
 */
export function createErrorMessage(message) {
  if (message.includes('API key')) {
    return 'Please configure your OpenAI API key in the .env file to continue chatting.';
  }
  return `I apologize, but I encountered an error: ${message}. Please try again.`;
}