class DatabaseManager {
  constructor() {
    // In a real implementation, this would use SQLite or IndexedDB
    // For now, we'll use localStorage as a simple storage solution
    this.conversations = JSON.parse(localStorage.getItem('conversations') || '[]');
    this.messages = JSON.parse(localStorage.getItem('messages') || '[]');
  }

  _saveData() {
    localStorage.setItem('conversations', JSON.stringify(this.conversations));
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }

  create_conversation(title) {
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

  get_conversations() {
    return this.conversations.sort((a, b) => 
      new Date(b.updated_at) - new Date(a.updated_at)
    );
  }

  add_message(conversation_id, role, content) {
    const message = {
      id: Date.now().toString(),
      conversation_id,
      role,
      content,
      timestamp: new Date().toISOString()
    };
    this.messages.push(message);
    
    // Update conversation timestamp
    const conversation = this.conversations.find(c => c.id === conversation_id);
    if (conversation) {
      conversation.updated_at = message.timestamp;
    }
    
    this._saveData();
    return message;
  }

  get_conversation_messages(conversation_id) {
    return this.messages
      .filter(m => m.conversation_id === conversation_id)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  delete_conversation(conversation_id) {
    this.conversations = this.conversations.filter(c => c.id !== conversation_id);
    this.messages = this.messages.filter(m => m.conversation_id !== conversation_id);
    this._saveData();
  }
}