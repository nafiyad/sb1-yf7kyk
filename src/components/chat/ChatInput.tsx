import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Paperclip, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudyStore } from '../../store/studyStore';

const ChatInput = () => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { addMessage } = useStudyStore();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    addMessage(input.trim(), 'user');
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      addMessage("I'm here to help you study! What would you like to know?", 'assistant');
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
      <div className={`relative rounded-xl transition-all duration-200 ${
        isFocused ? 'ring-2 ring-blue-500/50 bg-[#2a3147]' : 'bg-[#2a3147]/80'
      }`}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask anything..."
          rows={1}
          className="w-full bg-transparent rounded-xl py-3.5 pl-4 pr-24 text-sm text-white
                   placeholder-white/40 resize-none focus:outline-none"
          style={{ maxHeight: '150px' }}
        />
        
        <div className="absolute right-2 bottom-2 flex items-center gap-1.5">
          <AnimatePresence>
            {input && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1.5"
              >
                <button
                  onClick={() => {/* TODO: Implement AI suggestions */}}
                  className="p-1.5 text-white/40 hover:text-white/80 hover:bg-white/10 rounded-lg
                           transition-colors duration-200"
                >
                  <Sparkles className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            className="p-1.5 text-white/40 hover:text-white/80 hover:bg-white/10 rounded-lg
                     transition-colors duration-200"
          >
            <Paperclip className="h-4 w-4" />
          </button>

          <button
            className="p-1.5 text-white/40 hover:text-white/80 hover:bg-white/10 rounded-lg
                     transition-colors duration-200"
          >
            <Mic className="h-4 w-4" />
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            className="p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg
                     transition-colors duration-200 disabled:opacity-50"
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      <div className="mt-2 text-xs text-white/40 text-center">
        <span>Press </span>
        <kbd className="px-1.5 py-0.5 bg-white/10 rounded-md font-mono">Enter</kbd>
        <span> to send, </span>
        <kbd className="px-1.5 py-0.5 bg-white/10 rounded-md font-mono">Shift + Enter</kbd>
        <span> for new line</span>
      </div>
    </div>
  );
};

export default ChatInput;