import sqlite3
from datetime import datetime
from typing import List, Dict, Optional

class DatabaseManager:
    def __init__(self, db_path: str = "chat_history.db"):
        self.db_path = db_path
        self.init_database()
    
    def init_database(self):
        """Initialize the database with required tables."""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            
            # Create conversations table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS conversations (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            
            # Create messages table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS messages (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    conversation_id INTEGER,
                    role TEXT NOT NULL,
                    content TEXT NOT NULL,
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (conversation_id) REFERENCES conversations (id)
                )
            """)
            
            conn.commit()
    
    def create_conversation(self, title: str) -> int:
        """Create a new conversation and return its ID."""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO conversations (title) VALUES (?)",
                (title,)
            )
            conn.commit()
            return cursor.lastrowid
    
    def add_message(self, conversation_id: int, role: str, content: str):
        """Add a message to a conversation."""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO messages (conversation_id, role, content) VALUES (?, ?, ?)",
                (conversation_id, role, content)
            )
            cursor.execute(
                "UPDATE conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = ?",
                (conversation_id,)
            )
            conn.commit()
    
    def get_conversations(self) -> List[Dict]:
        """Get all conversations ordered by most recent."""
        with sqlite3.connect(self.db_path) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("""
                SELECT id, title, created_at, updated_at
                FROM conversations
                ORDER BY updated_at DESC
            """)
            return [dict(row) for row in cursor.fetchall()]
    
    def get_conversation_messages(self, conversation_id: int) -> List[Dict]:
        """Get all messages for a specific conversation."""
        with sqlite3.connect(self.db_path) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("""
                SELECT role, content, timestamp
                FROM messages
                WHERE conversation_id = ?
                ORDER BY timestamp
            """, (conversation_id,))
            return [dict(row) for row in cursor.fetchall()]
    
    def delete_conversation(self, conversation_id: int):
        """Delete a conversation and its messages."""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM messages WHERE conversation_id = ?", (conversation_id,))
            cursor.execute("DELETE FROM conversations WHERE id = ?", (conversation_id,))
            conn.commit()