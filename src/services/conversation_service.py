"""Conversation management service"""
from datetime import datetime
from typing import List, Dict
from src.config.openai_config import SYSTEM_MESSAGE
from src.database.manager import DatabaseManager

class ConversationService:
    def __init__(self):
        self.db = DatabaseManager()
        self.current_conversation_id = None
        self.messages = [
            {"role": "system", "content": SYSTEM_MESSAGE}
        ]
    
    def start_new_conversation(self) -> int:
        """Start a new conversation"""
        title = f"Chat {datetime.now().strftime('%Y-%m-%d %H:%M')}"
        self.current_conversation_id = self.db.create_conversation(title)
        self.messages = [{"role": "system", "content": SYSTEM_MESSAGE}]
        return self.current_conversation_id
    
    def add_message(self, role: str, content: str) -> None:
        """Add a message to the current conversation"""
        if not self.current_conversation_id:
            self.start_new_conversation()
        
        message = {"role": role, "content": content}
        self.messages.append(message)
        self.db.add_message(self.current_conversation_id, role, content)
    
    def get_messages(self) -> List[Dict[str, str]]:
        """Get all messages in the current conversation"""
        return self.messages
    
    def clear_conversation(self) -> None:
        """Clear the current conversation"""
        self.current_conversation_id = None
        self.messages = [{"role": "system", "content": SYSTEM_MESSAGE}]