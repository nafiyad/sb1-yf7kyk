import React, { useRef, useEffect } from 'react';
import { useStudyStore } from '../../store/studyStore';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Settings, RefreshCw } from 'lucide-react';

const ChatSidebar = () => {
  const { messages = [], loading } = useStudyStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const groupMessagesByDate = () => {
    const groups: { [key: string]: typeof messages } = {};
    messages.forEach(msg => {
      const date = new Date(msg.timestamp).toLocaleDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(msg);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate();

  return (
    <div className="flex flex-col h-full bg-[#151929]/95 backdrop-blur-xl border-r border-white/5 w-[320px]">
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg
                          border border-white/5">
              <Bot className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h2 className="font-medium text-lg text-white">NAF AI</h2>
              <div className="flex items-center gap-1.5 text-xs text-white/50">
                <span className="flex items-center gap-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Active
                </span>
                <span>•</span>
                <span>GPT-4</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors duration-200">
              <RefreshCw className="h-4 w-4 text-white/50 hover:text-white/80" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors duration-200">
              <Settings className="h-4 w-4 text-white/50 hover:text-white/80" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {Object.entries(messageGroups).map(([date, msgs]) => (
          <div key={date} className="relative">
            <div className="sticky top-0 z-10 px-4 py-2 bg-[#151929]/95 backdrop-blur-sm border-y border-white/5">
              <span className="text-xs text-white/40 font-medium">{date}</span>
            </div>
            <AnimatePresence>
              {msgs.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg.content}
                  isBot={msg.role === 'assistant'}
                  timestamp={msg.timestamp}
                />
              ))}
            </AnimatePresence>
          </div>
        ))}
        <div ref={messagesEndRef} />
        
        {/* Typing indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 p-4 bg-[#1f2437]"
          >
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Bot className="h-4 w-4 text-blue-400 animate-pulse" />
            </div>
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-blue-400/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-blue-400/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-blue-400/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/5">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatSidebar;