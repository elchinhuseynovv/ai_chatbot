export function handleApiError(error) {
  // Handle OpenAI specific errors
  if (error.error?.type === 'invalid_request_error') {
    return new Error('Invalid request to OpenAI API');
  }
  if (error.error?.type === 'invalid_api_key') {
    return new Error('Invalid OpenAI API key');
  }
  if (error.error?.type === 'rate_limit_exceeded') {
    return new Error('Rate limit exceeded. Please try again later');
  }
  if (error.error?.type === 'insufficient_quota') {
    return new Error('API quota exceeded. Please check your OpenAI account');
  }

  // Handle network errors
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return new Error('Network error. Please check your internet connection');
  }

  // Default error message
  return new Error(error.message || 'Unable to get a response. Please try again');
}