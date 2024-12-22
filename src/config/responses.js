export const botResponses = {
  // Basic conversational responses
  greetings: {
    hello: "Hello! How can I help you today?",
    hi: "Hi there! What's on your mind?",
    hey: "Hey! How can I assist you?",
    "what's up": "Hey! I'm doing well, thanks for asking. How can I help you?",
    "how are you": "I'm doing great, thank you for asking! How are you today?",
    "what is your name": "I'm your friendly AI chat assistant. You can call me ChatBot!",
    bye: "Goodbye! Have a great day!",
    goodbye: "Take care! Come back soon!"
  },

  // Follow-up responses
  followUp: {
    patterns: ["tell me more", "interesting", "cool", "nice"],
    responses: [
      "What would you like to know more about specifically?",
      "I'd be happy to discuss this further. What aspects interest you the most?",
      "Could you be more specific about what you'd like to know?"
    ]
  },

  // Default responses for unknown queries
  default: [
    "I'm here to help! Could you please be more specific about what you'd like to know?",
    "I'd love to help you. Could you provide more details about your question?",
    "I'm listening! What would you like to discuss?",
    "Feel free to ask me anything specific you'd like to know!"
  ]
};