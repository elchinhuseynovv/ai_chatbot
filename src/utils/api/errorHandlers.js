/**
 * Handles API-specific errors
 * @param {Error} error - The error object to handle
 * @returns {Error} A formatted error with a user-friendly message
 */
export function handleApiError(error) {
  // OpenAI specific errors
  if (error.error?.type === 'invalid_request_error') {
    return new Error('Invalid request to OpenAI API');
  }
  if (error.error?.type === 'invalid_api_key') {
    return new Error('The provided OpenAI API key is invalid');
  }
  if (error.error?.type === 'rate_limit_exceeded') {
    return new Error('Rate limit exceeded. Please try again later');
  }
  if (error.error?.type === 'insufficient_quota') {
    return new Error('API quota exceeded. Please check your OpenAI account');
  }

  // Network errors
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return new Error('Network error. Please check your internet connection');
  }

  // Configuration errors
  if (error.message.includes('API key')) {
    return new Error('OpenAI API key is not properly configured. Please check your .env file');
  }

  // Default error message
  return new Error(error.message || 'An unexpected error occurred');
}