// Handles all chat-related operations
import { DatabaseManager } from './database.js';

class ChatService {
  constructor() {
    this.db = new DatabaseManager();
    this.currentConversationId = null;
  }

  async getConversations() {
    return this.db.get_conversations();
  }

  async startNewConversation() {
    const title = `Chat ${new Date().toLocaleString()}`;
    this.currentConversationId = await this.db.create_conversation(title);
    return this.currentConversationId;
  }

  async loadConversation(conversationId) {
    this.currentConversationId = conversationId;
    return this.db.get_conversation_messages(conversationId);
  }

  async deleteConversation(conversationId) {
    await this.db.delete_conversation(conversationId);
    if (conversationId === this.currentConversationId) {
      this.currentConversationId = null;
    }
  }
}

export const chatService = new ChatService();