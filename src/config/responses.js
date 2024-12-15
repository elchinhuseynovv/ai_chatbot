export const botResponses = {
  // Greetings
  greetings: {
    hello: 'Hi there! How can I help you today?',
    hi: 'Hello! What can I do for you?',
    bye: 'Goodbye! Have a great day!',
    goodbye: 'Take care! Come back soon!'
  },

  // Weather related
  weather: {
    patterns: ['weather', 'temperature', 'forecast', 'rain', 'sunny'],
    responses: [
      "I apologize, but I don't have access to real-time weather data. You might want to check a weather service or website for accurate information about the weather in {city}.",
      "For current weather information in {city}, I recommend checking a weather app or website.",
      "I wish I could tell you about the weather in {city}, but I don't have access to that information. Try checking a weather forecast service!"
    ]
  },

  // Conversation continuers
  followUp: {
    patterns: ['tell me more', 'interesting', 'cool', 'nice'],
    responses: [
      "What would you like to know more about specifically?",
      "I'd be happy to discuss this further. What aspects interest you the most?",
      "Could you be more specific about what you'd like to know?"
    ]
  },

  // Default responses for unknown queries
  default: [
    "I'm not sure I understand. Could you rephrase that?",
    "That's an interesting topic. Could you elaborate?",
    "I'd like to help, but I need more specific information.",
    "Could you provide more details about what you're asking?"
  ]
};