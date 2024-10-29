import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

const ChatSidebar = () => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setInput('');
  };

  return (
    <div className="w-[320px] bg-[#151929] flex flex-col">
      <div className="p-4">
        <div className="flex items-center gap-2 text-white/90">
          <MessageSquare className="h-5 w-5" />
          <h2 className="font-medium">Study Chat</h2>
        </div>
      </div>

      <div className="flex-1"></div>

      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything..."
            className="w-full bg-[#2a3147] rounded-lg py-3 pl-4 pr-10 text-sm text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-400
                     placeholder-white/50"
          />
          <button
            onClick={handleSend}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-blue-400 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;