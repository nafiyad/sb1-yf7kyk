import React from 'react';
import { Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

interface ChatMessageProps {
  message: string;
  isBot?: boolean;
  timestamp: number;
}

const ChatMessage = ({ message, isBot = false, timestamp }: ChatMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group flex gap-2 p-3 hover:bg-white/5 transition-colors duration-200 ${
        isBot && "bg-[#1f2437]"
      }`}
    >
      <div className="shrink-0">
        <div className={`p-1.5 rounded-lg border ${
          isBot 
            ? "bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-white/5" 
            : "bg-gradient-to-br from-violet-500/10 to-pink-500/10 border-white/5"
        }`}>
          {isBot ? (
            <Bot className="h-3.5 w-3.5 text-blue-400" />
          ) : (
            <User className="h-3.5 w-3.5 text-violet-400" />
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-medium text-white/90">
            {isBot ? 'NAF AI' : 'You'}
          </span>
          <span className="text-[10px] text-white/40">
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </span>
        </div>

        <div className="text-xs text-white/80 leading-relaxed">
          {message}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;