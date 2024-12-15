import { createMessageElement } from '../utils/domUtils.js';
import { scrollToBottom } from '../utils/scrollUtils.js';

export function initializeChat() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div class="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4 sm:px-0">
        <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div class="max-w-md mx-auto">
            <div class="divide-y divide-gray-200">
              <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 class="text-2xl font-bold mb-8 text-center text-gray-800">Chat Application</h1>
                <div id="chat-window" class="h-96 overflow-y-auto mb-4 p-4 border rounded-lg"></div>
                <div class="flex gap-2">
                  <input 
                    type="text" 
                    id="message-input" 
                    class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Type your message..."
                  >
                  <button 
                    id="send-button"
                    class="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}