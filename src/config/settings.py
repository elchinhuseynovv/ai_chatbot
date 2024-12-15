from pathlib import Path
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# API Configuration
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
MODEL_NAME = "gpt-4"
MAX_TOKENS = 150
TEMPERATURE = 0.7

# System message to set the AI's behavior
SYSTEM_MESSAGE = """You are a helpful and friendly AI assistant. 
Provide concise and informative responses while maintaining a conversational tone."""