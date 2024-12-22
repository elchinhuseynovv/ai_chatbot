import { createMessageElement } from './ui/domUtils.js';
import { scrollToBottom } from './ui/scrollUtils.js';
import { updateConversationList, hideContextMenu } from './ui/sidebarUtils.js';
import { 
  handleNewChat, 
  handleDeleteConversation, 
  handleRenameConversation, 
  handleShareConversation 
} from './conversation/conversationHandlers.js';
import { loadConversation } from './ui/chatUtils.js';

export function setupEventListeners(chatService) {
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const chatWindow = document.getElementById('chat-window');
  const newChatBtn = document.getElementById('new-chat-btn');
  const conversationList = document.getElementById('conversation-list');
  const contextMenu = document.getElementById('context-menu');

  async function handleSendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;

    messageInput.value = '';
    chatWindow.appendChild(createMessageElement(message, true));
    scrollToBottom();

    try {
      const response = await chatService.generateResponse(message);
      chatWindow.appendChild(createMessageElement(response, false));
      scrollToBottom();
      
      const conversations = await chatService.conversationService.getConversations();
      updateConversationList(conversations);
    } catch (error) {
      console.error('Error:', error);
      chatWindow.appendChild(
        createMessageElement("I'm sorry, I encountered an error. Please try again.", false)
      );
    }
  }

  // Send message handlers
  sendButton?.addEventListener('click', handleSendMessage);
  messageInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendMessage();
  });

  // New chat handler
  newChatBtn?.addEventListener('click', () => handleNewChat(chatService));

  // Conversation click handler
  conversationList?.addEventListener('click', async (e) => {
    const conversationElement = e.target.closest('[data-conversation-id]');
    if (conversationElement) {
      const conversationId = conversationElement.dataset.conversationId;
      const messages = await chatService.conversationService.loadConversation(conversationId);
      loadConversation(messages);
    }
  });

  // Context menu handlers
  contextMenu?.addEventListener('click', async (e) => {
    const action = e.target.closest('[data-action]')?.dataset.action;
    const conversationId = contextMenu.dataset.conversationId;
    
    if (action && conversationId) {
      switch (action) {
        case 'rename':
          const newTitle = prompt('Enter new conversation title:');
          if (newTitle) {
            await handleRenameConversation(chatService, conversationId, newTitle);
          }
          break;
        case 'share':
          handleShareConversation(conversationId);
          break;
        case 'delete':
          if (confirm('Are you sure you want to delete this conversation?')) {
            await handleDeleteConversation(chatService, conversationId);
          }
          break;
      }
      hideContextMenu();
    }
  });

  // Initialize conversation list
  chatService.conversationService.getConversations().then(conversations => {
    updateConversationList(conversations);
  });
}