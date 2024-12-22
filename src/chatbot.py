"""Main chatbot application"""
from src.services.openai_service import OpenAIService
from src.services.conversation_service import ConversationService
from src.ui.cli_interface import (
    print_welcome_message,
    print_bot_response,
    print_error,
    get_user_input
)

class Chatbot:
    def __init__(self):
        self.openai_service = OpenAIService()
        self.conversation = ConversationService()
    
    def process_command(self, user_input: str) -> bool:
        """Process special commands"""
        if user_input.lower() == 'clear':
            self.conversation.clear_conversation()
            print_bot_response("Conversation cleared. Let's start fresh!")
            return True
        return False
    
    async def run(self) -> None:
        """Run the chatbot"""
        print_welcome_message()
        
        while True:
            try:
                user_input = get_user_input()
                
                if user_input.lower() == 'exit':
                    print_bot_response("Goodbye! Have a great day!")
                    break
                
                if self.process_command(user_input):
                    continue
                
                # Add user message and get response
                self.conversation.add_message("user", user_input)
                response = await self.openai_service.generate_response(
                    self.conversation.get_messages()
                )
                
                # Add and display assistant response
                self.conversation.add_message("assistant", response)
                print_bot_response(response)
                
            except Exception as e:
                print_error(str(e))