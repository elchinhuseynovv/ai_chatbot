/**
 * Chat UI utilities
 */
import { createMessageElement } from './domUtils.js';
import { scrollToBottom } from './scrollUtils.js';

export function clearChat() {
  const chatWindow = document.getElementById('chat-window');
  if (chatWindow) {
    chatWindow.innerHTML = '';
  }
}

export function loadConversation(messages) {
  const chatWindow = document.getElementById('chat-window');
  if (chatWindow && messages) {
    clearChat();
    messages.forEach(message => {
      if (message.role !== 'system') {
        const messageElement = createMessageElement(message.content, message.role === 'user');
        chatWindow.appendChild(messageElement);
      }
    });
    scrollToBottom();
  }
}