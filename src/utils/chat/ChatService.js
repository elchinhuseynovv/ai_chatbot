// @ts-check
import { DatabaseManager } from '../database/DatabaseManager.js';

/**
 * @typedef {Object} Message
 * @property {string} role
 * @property {string} content
 */

class ChatService {
  constructor() {
    this.db = new DatabaseManager();
    this.currentConversationId = null;
  }

  /**
   * @returns {Promise<Array<import('../database/DatabaseManager.js').Conversation>>}
   */
  async getConversations() {
    return this.db.getConversations();
  }

  /**
   * @returns {Promise<string>}
   */
  async startNewConversation() {
    const title = `Chat ${new Date().toLocaleString()}`;
    this.currentConversationId = await this.db.createConversation(title);
    return this.currentConversationId;
  }

  /**
   * @param {string} conversationId
   * @returns {Promise<Array<Message>>}
   */
  async loadConversation(conversationId) {
    this.currentConversationId = conversationId;
    return this.db.getConversationMessages(conversationId);
  }

  /**
   * @param {string} conversationId
   */
  async deleteConversation(conversationId) {
    await this.db.deleteConversation(conversationId);
    if (conversationId === this.currentConversationId) {
      this.currentConversationId = null;
    }
  }

  /**
   * @param {string} role
   * @param {string} content
   */
  async addMessage(role, content) {
    if (!this.currentConversationId) {
      await this.startNewConversation();
    }
    return this.db.addMessage(this.currentConversationId, role, content);
  }

  /**
   * @param {string} conversationId
   * @param {string} newTitle
   */
  async renameConversation(conversationId, newTitle) {
    return this.db.renameConversation(conversationId, newTitle);
  }

  /**
   * @param {string} conversationId
   * @returns {Promise<Array<Message>>}
   */
  async getConversationMessages(conversationId) {
    return this.db.getConversationMessages(conversationId);
  }
}

export const chatService = new ChatService();