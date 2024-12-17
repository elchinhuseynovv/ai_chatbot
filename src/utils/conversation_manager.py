from datetime import datetime
from src.config.settings import SYSTEM_MESSAGE
from src.utils.database import DatabaseManager

class ConversationManager:
    def __init__(self):
        self.db = DatabaseManager()
        self.current_conversation_id = None
        self.messages = [
            {"role": "system", "content": SYSTEM_MESSAGE}
        ]
    
    def start_new_conversation(self):
        """Start a new conversation with a default title."""
        title = f"Chat {datetime.now().strftime('%Y-%m-%d %H:%M')}"
        self.current_conversation_id = self.db.create_conversation(title)
        self.messages = [{"role": "system", "content": SYSTEM_MESSAGE}]
    
    def load_conversation(self, conversation_id: int):
        """Load an existing conversation."""
        self.current_conversation_id = conversation_id
        messages = self.db.get_conversation_messages(conversation_id)
        self.messages = [{"role": "system", "content": SYSTEM_MESSAGE}]
        for msg in messages:
            self.messages.append({
                "role": msg["role"],
                "content": msg["content"]
            })
    
    def add_message(self, role: str, content: str):
        """Add a message to the current conversation."""
        if not self.current_conversation_id:
            self.start_new_conversation()
        
        self.messages.append({"role": role, "content": content})
        self.db.add_message(self.current_conversation_id, role, content)
    
    def get_messages(self):
        """Get all messages in the current conversation."""
        return self.messages
    
    def get_conversation_list(self):
        """Get list of all conversations."""
        return self.db.get_conversations()
    
    def delete_conversation(self, conversation_id: int):
        """Delete a conversation."""
        self.db.delete_conversation(conversation_id)
        if conversation_id == self.current_conversation_id:
            self.clear_conversation()
    
    def clear_conversation(self):
        """Clear the current conversation."""
        self.current_conversation_id = None
        self.messages = [{"role": "system", "content": SYSTEM_MESSAGE}]