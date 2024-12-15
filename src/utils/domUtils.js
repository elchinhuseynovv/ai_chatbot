export function createMessageElement(message, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `mb-4 ${isUser ? 'text-right' : 'text-left'}`;
  
  const messageContent = document.createElement('div');
  messageContent.className = `inline-block p-3 rounded-lg ${
    isUser 
      ? 'bg-cyan-500 text-white' 
      : 'bg-gray-100 text-gray-800'
  }`;
  messageContent.textContent = message;
  
  messageDiv.appendChild(messageContent);
  return messageDiv;
}