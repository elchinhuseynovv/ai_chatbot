from rich.console import Console
from rich.markdown import Markdown

console = Console()

def print_welcome_message():
    welcome_text = """
# Welcome to GPT-4 Chatbot

- Type your message and press Enter to chat
- Type 'exit' to end the conversation
- Type 'clear' to start a new conversation
    """
    console.print(Markdown(welcome_text))

def print_bot_response(response):
    console.print("\n[bold blue]Assistant:[/bold blue]", style="bold")
    console.print(response, style="italic")

def print_error(error_message):
    console.print(f"\n[bold red]Error:[/bold red] {error_message}", style="bold red")

def get_user_input():
    return console.input("\n[bold green]You:[/bold green] ").strip()