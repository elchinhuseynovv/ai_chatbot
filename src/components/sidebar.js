export function initializeSidebar() {
  const sidebar = document.createElement('div');
  sidebar.className = 'fixed left-0 top-0 h-full w-64 bg-gray-800 text-white p-4 flex flex-col';
  sidebar.innerHTML = `
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Chat History</h2>
      <button 
        id="new-chat-btn"
        class="bg-cyan-500 text-white px-3 py-1 rounded-lg hover:bg-cyan-600 text-sm"
      >
        New Chat
      </button>
    </div>
    
    <div class="relative mb-4">
      <input
        type="text"
        id="search-input"
        placeholder="Search conversations..."
        class="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <button
        id="search-btn"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
    
    <div id="conversation-list" class="space-y-2 flex-1 overflow-y-auto"></div>
    
    <div id="context-menu" class="hidden fixed bg-gray-700 rounded-lg shadow-lg py-1 w-48">
      <button class="w-full px-4 py-2 text-left hover:bg-gray-600 flex items-center gap-2" data-action="rename">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Rename
      </button>
      <button class="w-full px-4 py-2 text-left hover:bg-gray-600 flex items-center gap-2" data-action="share">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share
      </button>
      <div class="h-px bg-gray-600 my-1"></div>
      <button class="w-full px-4 py-2 text-left hover:bg-gray-600 flex items-center gap-2 text-red-400 hover:text-red-300" data-action="delete">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete
      </button>
    </div>
  `;
  
  document.body.prepend(sidebar);
  
  // Adjust main content margin
  const app = document.getElementById('app');
  if (app) {
    app.style.marginLeft = '16rem';
  }
}