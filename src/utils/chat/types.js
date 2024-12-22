// Type definitions for chat-related data
export const MessageRole = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system'
};

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {string} role
 * @property {string} content
 * @property {string} timestamp
 */

/**
 * @typedef {Object} Conversation
 * @property {string} id
 * @property {string} title
 * @property {string} created_at
 * @property {string} updated_at
 */

export const Types = {
  MessageRole
};