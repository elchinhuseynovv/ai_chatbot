import { initializeChat } from './components/chat.js';
import { initializeSidebar } from './components/sidebar.js';
import { setupEventListeners } from './utils/eventHandlers.js';
import { ChatService } from './services/ChatService.js';

// Initialize the chat service
const chatService = new ChatService();

// Initialize UI and event handlers
document.addEventListener('DOMContentLoaded', () => {
  initializeSidebar();
  initializeChat();
  setupEventListeners(chatService);
});