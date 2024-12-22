const API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-3.5-turbo';
const MAX_TOKENS = 150;

export class OpenAIClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async generateResponse(message) {
    if (!this.apiKey || this.apiKey === 'your_api_key_here') {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: 'user', content: message }],
          max_tokens: MAX_TOKENS
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'OpenAI API error');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  }
}