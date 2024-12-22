import { DatabaseManager } from '../utils/database/DatabaseManager.js';

export class ConversationService {
  constructor() {
    this.db = new DatabaseManager();
    this.currentConversationId = null;
  }

  async getConversations() {
    return this.db.getConversations();
  }

  async startNewConversation() {
    const title = `Chat ${new Date().toLocaleString()}`;
    this.currentConversationId = await this.db.createConversation(title);
    return this.currentConversationId;
  }

  async addMessage(role, content) {
    if (!this.currentConversationId) {
      await this.startNewConversation();
    }
    return this.db.addMessage(this.currentConversationId, role, content);
  }

  async loadConversation(conversationId) {
    this.currentConversationId = conversationId;
    return this.db.getConversationMessages(conversationId);
  }

  async deleteConversation(conversationId) {
    await this.db.deleteConversation(conversationId);
    if (conversationId === this.currentConversationId) {
      this.currentConversationId = null;
    }
  }
}