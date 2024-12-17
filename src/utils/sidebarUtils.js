export function createConversationElement(conversation) {
  const div = document.createElement('div');
  div.className = 'flex justify-between items-center p-2 hover:bg-gray-700 rounded cursor-pointer group';
  div.setAttribute('data-conversation-id', conversation.id);
  
  const title = document.createElement('span');
  title.className = 'truncate flex-1';
  title.textContent = conversation.title;
  
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'text-red-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity';
  deleteBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
    </svg>
  `;
  
  div.appendChild(title);
  div.appendChild(deleteBtn);
  return div;
}

export function updateConversationList(conversations) {
  const conversationList = document.getElementById('conversation-list');
  conversationList.innerHTML = '';
  
  conversations.forEach(conversation => {
    const element = createConversationElement(conversation);
    conversationList.appendChild(element);
  });
}