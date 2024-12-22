import { botResponses } from '../../config/responses.js';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

async function callOpenAI(message) {
  if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your_api_key_here') {
    throw new Error('OpenAI API key not configured');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        max_tokens: 150
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

export async function generateResponse(message) {
  const lowercaseMessage = message.toLowerCase();
  
  // Check for greetings first
  for (const [key, response] of Object.entries(botResponses.greetings)) {
    if (lowercaseMessage.includes(key)) {
      return response;
    }
  }
  
  // Check for follow-up patterns
  if (botResponses.followUp.patterns.some(pattern => lowercaseMessage.includes(pattern))) {
    return botResponses.followUp.responses[
      Math.floor(Math.random() * botResponses.followUp.responses.length)
    ];
  }
  
  // Use OpenAI for general knowledge questions
  try {
    return await callOpenAI(message);
  } catch (error) {
    if (error.message === 'OpenAI API key not configured') {
      return "I apologize, but I haven't been configured with an API key yet. Please add your OpenAI API key to the .env file.";
    }
    return "I apologize, but I'm having trouble connecting to my knowledge base right now. Could you please try again?";
  }
}