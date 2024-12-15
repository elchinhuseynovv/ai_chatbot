import { createMessageElement } from './domUtils.js';
import { scrollToBottom } from './scrollUtils.js';
import { generateBotResponse } from './chatbot.js';

export function setupEventListeners() {
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const chatWindow = document.getElementById('chat-window');

  async function handleSendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    // Add user message
    chatWindow.appendChild(createMessageElement(message, true));
    scrollToBottom();
    messageInput.value = '';

    // Get and add bot response
    const botResponse = await generateBotResponse(message);
    chatWindow.appendChild(createMessageElement(botResponse, false));
    scrollToBottom();
  }

  sendButton.addEventListener('click', handleSendMessage);
  
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  });
}