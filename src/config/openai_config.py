"""OpenAI API configuration settings"""
from os import getenv
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Configuration
OPENAI_API_KEY = getenv('OPENAI_API_KEY')
MODEL_NAME = "gpt-4"
MAX_TOKENS = 150
TEMPERATURE = 0.7

# System message for AI behavior
SYSTEM_MESSAGE = """You are a helpful and friendly AI assistant. 
Provide concise and informative responses while maintaining a conversational tone."""