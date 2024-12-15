from src.config.settings import SYSTEM_MESSAGE

class ConversationManager:
    def __init__(self):
        self.messages = [
            {"role": "system", "content": SYSTEM_MESSAGE}
        ]
    
    def add_message(self, role, content):
        self.messages.append({"role": role, "content": content})
    
    def get_messages(self):
        return self.messages
    
    def clear_conversation(self):
        self.messages = [self.messages[0]]  # Keep only the system message