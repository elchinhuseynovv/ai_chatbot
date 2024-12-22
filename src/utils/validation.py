"""Validation utilities for configuration and input"""
from typing import Optional

def validate_api_key(api_key: Optional[str]) -> None:
    """Validate OpenAI API key"""
    if not api_key:
        raise ValueError("OpenAI API key is not set in environment variables")
    if api_key == "your_api_key_here":
        raise ValueError("Please replace the default API key with your actual OpenAI API key")