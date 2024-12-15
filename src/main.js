import { initializeChat } from './components/chat.js';
import { setupEventListeners } from './utils/eventHandlers.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeChat();
  setupEventListeners();
});