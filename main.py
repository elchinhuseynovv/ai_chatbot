"""Entry point for the chatbot application"""
import asyncio
from src.chatbot import Chatbot

async def main():
    chatbot = Chatbot()
    await chatbot.run()

if __name__ == "__main__":
    asyncio.run(main())