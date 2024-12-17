import { createMessageElement } from './ui/domUtils.js';
import { scrollToBottom } from './ui/scrollUtils.js';
import { generateBotResponse } from './chat/chatbot.js';
import { updateConversationList, showContextMenu, hideContextMenu } from './ui/sidebarUtils.js';
import { chatService } from './chat/ChatService.js';

export function setupEventListeners() {
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const chatWindow = document.getElementById('chat-window');
  const newChatBtn = document.getElementById('new-chat-btn');
  const conversationList = document.getElementById('conversation-list');
  const searchInput = document.getElementById('search-input');
  const contextMenu = document.getElementById('context-menu');

  async function refreshConversationList(searchQuery = '') {
    const conversations = await chatService.getConversations();
    updateConversationList(conversations, searchQuery);
  }

  async function handleSendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    chatWindow.appendChild(createMessageElement(message, true));
    scrollToBottom();
    messageInput.value = '';

    try {
      await chatService.addMessage('user', message);
      const botResponse = await generateBotResponse(message);
      chatWindow.appendChild(createMessageElement(botResponse, false));
      scrollToBottom();
      await refreshConversationList();
    } catch (error) {
      console.error('Error sending message:', error);
      chatWindow.appendChild(
        createMessageElement('Sorry, there was an error processing your message.', false)
      );
    }
  }

  // Search functionality
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      refreshConversationList(e.target.value.trim());
    }, 300);
  });

  // Context menu
  conversationList.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const conversationElement = e.target.closest('[data-conversation-id]');
    if (conversationElement) {
      showContextMenu(e.pageX, e.pageY, conversationElement.dataset.conversationId);
    }
  });

  // Hide context menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#context-menu')) {
      hideContextMenu();
    }
  });

  // Context menu actions
  contextMenu.addEventListener('click', async (e) => {
    const action = e.target.closest('[data-action]')?.dataset.action;
    const conversationId = contextMenu.dataset.conversationId;
    
    if (!action || !conversationId) return;

    switch (action) {
      case 'rename':
        const newTitle = prompt('Enter new title:');
        if (newTitle?.trim()) {
          await chatService.renameConversation(conversationId, newTitle.trim());
          await refreshConversationList(searchInput.value.trim());
        }
        break;
      
      case 'share':
        const messages = await chatService.getConversationMessages(conversationId);
        const text = messages.map(m => `${m.role}: ${m.content}`).join('\n');
        await navigator.clipboard.writeText(text);
        alert('Conversation copied to clipboard!');
        break;
      
      case 'delete':
        if (confirm('Are you sure you want to delete this conversation?')) {
          await chatService.deleteConversation(conversationId);
          await refreshConversationList(searchInput.value.trim());
        }
        break;
    }
    
    hideContextMenu();
  });

  // Existing event listeners
  sendButton.addEventListener('click', () => {
    handleSendMessage().catch(console.error);
  });
  
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSendMessage().catch(console.error);
    }
  });

  newChatBtn.addEventListener('click', () => {
    chatWindow.innerHTML = '';
    chatService.startNewConversation()
      .then(() => refreshConversationList(searchInput.value.trim()))
      .catch(console.error);
  });

  conversationList.addEventListener('click', (e) => {
    const conversationElement = e.target.closest('[data-conversation-id]');
    if (!conversationElement) return;

    const conversationId = conversationElement.dataset.conversationId;
    chatService.loadConversation(conversationId)
      .then(messages => {
        chatWindow.innerHTML = '';
        messages.forEach(msg => {
          chatWindow.appendChild(createMessageElement(msg.content, msg.role === 'user'));
        });
        scrollToBottom();
      })
      .catch(console.error);
  });

  refreshConversationList().catch(console.error);
}