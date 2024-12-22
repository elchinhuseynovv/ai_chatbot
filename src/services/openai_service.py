"""OpenAI API service for chat completions"""
from openai import OpenAI
from typing import List, Dict
from src.config.openai_config import (
    OPENAI_API_KEY,
    MODEL_NAME,
    MAX_TOKENS,
    TEMPERATURE
)
from src.utils.validation import validate_api_key

class OpenAIService:
    def __init__(self):
        validate_api_key(OPENAI_API_KEY)
        self.client = OpenAI(api_key=OPENAI_API_KEY)
    
    async def generate_response(self, messages: List[Dict[str, str]]) -> str:
        """Generate response using OpenAI API"""
        try:
            response = self.client.chat.completions.create(
                model=MODEL_NAME,
                messages=messages,
                max_tokens=MAX_TOKENS,
                temperature=TEMPERATURE
            )
            return response.choices[0].message.content
        except Exception as e:
            raise Exception(f"Error generating response: {str(e)}")