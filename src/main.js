import { initializeChat } from './components/chat.js';
import { initializeSidebar } from './components/sidebar.js';
import { setupEventListeners } from './utils/eventHandlers.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeSidebar();
  initializeChat();
  setupEventListeners();
});