// @ts-check

/**
 * @typedef {Object} Conversation
 * @property {string} id
 * @property {string} title
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {string} conversation_id
 * @property {string} role
 * @property {string} content
 * @property {string} timestamp
 */

export class DatabaseManager {
  constructor() {
    this.conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
    this.messages = JSON.parse(localStorage.getItem('messages') || '[]');
  }

  _saveData() {
    localStorage.setItem('conversations', JSON.stringify(this.conversations));
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }

  /**
   * @param {string} title
   * @returns {string}
   */
  createConversation(title) {
    const conversation = {
      id: Date.now().toString(),
      title,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.conversations.push(conversation);
    this._saveData();
    return conversation.id;
  }

  /**
   * @param {string} conversationId
   * @param {string} newTitle
   */
  renameConversation(conversationId, newTitle) {
    const conversation = this.conversations.find(c => c.id === conversationId);
    if (conversation) {
      conversation.title = newTitle;
      conversation.updated_at = new Date().toISOString();
      this._saveData();
    }
  }

  /**
   * @returns {Array<Conversation>}
   */
  getConversations() {
    return this.conversations.sort((a, b) => 
      new Date(b.updated_at) - new Date(a.updated_at)
    );
  }

  /**
   * @param {string} conversation_id
   * @param {string} role
   * @param {string} content
   * @returns {Message}
   */
  addMessage(conversation_id, role, content) {
    const message = {
      id: Date.now().toString(),
      conversation_id,
      role,
      content,
      timestamp: new Date().toISOString()
    };
    this.messages.push(message);
    
    const conversation = this.conversations.find(c => c.id === conversation_id);
    if (conversation) {
      conversation.updated_at = message.timestamp;
    }
    
    this._saveData();
    return message;
  }

  /**
   * @param {string} conversation_id
   * @returns {Array<Message>}
   */
  getConversationMessages(conversation_id) {
    return this.messages
      .filter(m => m.conversation_id === conversation_id)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  /**
   * @param {string} conversation_id
   */
  deleteConversation(conversation_id) {
    this.conversations = this.conversations.filter(c => c.id !== conversation_id);
    this.messages = this.messages.filter(m => m.conversation_id !== conversation_id);
    this._saveData();
  }
}