// @ts-check
import { type Conversation } from '../database/DatabaseManager.js';

/**
 * @param {Conversation} conversation
 * @returns {HTMLElement}
 */
export function createConversationElement(conversation) {
  const div = document.createElement('div');
  div.className = 'flex justify-between items-center p-2 hover:bg-gray-700 rounded cursor-pointer group';
  div.setAttribute('data-conversation-id', conversation.id);
  
  const title = document.createElement('span');
  title.className = 'truncate flex-1';
  title.textContent = conversation.title;
  
  div.appendChild(title);
  return div;
}

/**
 * @param {Array<Conversation>} conversations
 * @param {string} [searchQuery]
 */
export function updateConversationList(conversations, searchQuery = '') {
  const conversationList = document.getElementById('conversation-list');
  if (!conversationList) return;
  
  conversationList.innerHTML = '';
  
  const filteredConversations = searchQuery
    ? conversations.filter(conv => 
        conv.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;
  
  filteredConversations.forEach(conversation => {
    const element = createConversationElement(conversation);
    conversationList.appendChild(element);
  });
}

/**
 * @param {number} x
 * @param {number} y
 * @param {string} conversationId
 */
export function showContextMenu(x, y, conversationId) {
  const contextMenu = document.getElementById('context-menu');
  if (!contextMenu) return;
  
  contextMenu.style.left = `${x}px`;
  contextMenu.style.top = `${y}px`;
  contextMenu.setAttribute('data-conversation-id', conversationId);
  contextMenu.classList.remove('hidden');
}

export function hideContextMenu() {
  const contextMenu = document.getElementById('context-menu');
  if (!contextMenu) return;
  
  contextMenu.classList.add('hidden');
}