from openai import OpenAI
from src.config.settings import OPENAI_API_KEY, MODEL_NAME, MAX_TOKENS, TEMPERATURE

class OpenAIClient:
    def __init__(self):
        if not OPENAI_API_KEY:
            raise ValueError("OpenAI API key is not set in environment variables")
        self.client = OpenAI(api_key=OPENAI_API_KEY)
        
    def generate_response(self, messages):
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