from src.utils.api_client import OpenAIClient
from src.utils.conversation_manager import ConversationManager
from src.utils.cli_interface import (
    print_welcome_message,
    print_bot_response,
    print_error,
    get_user_input
)

class Chatbot:
    def __init__(self):
        self.api_client = OpenAIClient()
        self.conversation = ConversationManager()
    
    def process_command(self, user_input):
        if user_input.lower() == 'clear':
            self.conversation.clear_conversation()
            print_bot_response("Conversation cleared. Let's start fresh!")
            return True
        return False
    
    def run(self):
        print_welcome_message()
        
        while True:
            try:
                user_input = get_user_input()
                
                if user_input.lower() == 'exit':
                    print_bot_response("Goodbye! Have a great day!")
                    break
                
                if self.process_command(user_input):
                    continue
                
                # Add user message to conversation
                self.conversation.add_message("user", user_input)
                
                # Get response from API
                response = self.api_client.generate_response(
                    self.conversation.get_messages()
                )
                
                # Add assistant response to conversation
                self.conversation.add_message("assistant", response)
                
                # Display response
                print_bot_response(response)
                
            except Exception as e:
                print_error(str(e))