/**
 * Handlers for conversation management
 */
import { clearChat } from '../ui/chatUtils.js';
import { updateConversationList } from '../ui/sidebarUtils.js';

export async function handleNewChat(chatService) {
  try {
    await chatService.conversationService.startNewConversation();
    clearChat();
    const conversations = await chatService.conversationService.getConversations();
    updateConversationList(conversations);
  } catch (error) {
    console.error('Error creating new chat:', error);
  }
}

export async function handleDeleteConversation(chatService, conversationId) {
  try {
    await chatService.conversationService.deleteConversation(conversationId);
    clearChat();
    const conversations = await chatService.conversationService.getConversations();
    updateConversationList(conversations);
  } catch (error) {
    console.error('Error deleting conversation:', error);
  }
}

export async function handleRenameConversation(chatService, conversationId, newTitle) {
  try {
    await chatService.conversationService.renameConversation(conversationId, newTitle);
    const conversations = await chatService.conversationService.getConversations();
    updateConversationList(conversations);
  } catch (error) {
    console.error('Error renaming conversation:', error);
  }
}

export function handleShareConversation(conversationId) {
  // Create shareable URL with conversation ID
  const shareUrl = `${window.location.origin}?conversation=${conversationId}`;
  
  // Copy to clipboard
  navigator.clipboard.writeText(shareUrl)
    .then(() => alert('Conversation link copied to clipboard!'))
    .catch(error => console.error('Error copying to clipboard:', error));
}