/**
 * @typedef {Object} Conversation
 * @property {string} id
 * @property {string} title
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @param {Conversation} conversation
 * @returns {HTMLElement}
 */
export function createConversationElement(conversation) {
  const div = document.createElement('div');
  div.className = 'flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer group';
  div.setAttribute('data-conversation-id', conversation.id);
  
  const icon = document.createElement('div');
  icon.className = 'mr-2 text-gray-400';
  icon.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>`;
  
  const title = document.createElement('span');
  title.className = 'truncate flex-1';
  title.textContent = conversation.title;
  
  div.appendChild(icon);
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