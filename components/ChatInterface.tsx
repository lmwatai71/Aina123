import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, User, Bot } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToAinaMind } from '../services/geminiService';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: `Aloha mai kāua! I am AinaMind. 

ʻŌlelo Hawaiʻi:
Eia au e kōkua iā ʻoe me ka mahi ʻai a me ka mālama ʻāina. He aha kāu e hana nei i kēia lā?

English:
I am here to help you with farming and land stewardship. What are you working on today?`,
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToAinaMind(messages, userMsg.content);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: responseText,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error sending message", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Helper to format the message content for better readability
  // Detects the labels "ʻŌlelo Hawaiʻi:" and "English:" and bolds them if not already markdown
  const formatContent = (content: string) => {
    return content.split('\n').map((line, i) => {
        if (line.trim().startsWith('ʻŌlelo Hawaiʻi:') || line.trim().startsWith('English:') || line.trim().startsWith('Next Actions:')) {
            return <p key={i} className="font-bold text-emerald-800 mt-4 mb-1">{line}</p>;
        }
        return <p key={i} className="mb-1 min-h-[1rem]">{line}</p>;
    });
  };

  return (
    <div className="flex flex-col h-full bg-stone-50">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`
              flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
              ${msg.role === 'user' ? 'bg-stone-300 text-stone-700' : 'bg-emerald-700 text-emerald-50'}
            `}>
              {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>

            <div className={`
              max-w-[85%] md:max-w-[70%] rounded-2xl px-5 py-4 shadow-sm text-sm md:text-base leading-relaxed whitespace-pre-wrap
              ${msg.role === 'user' 
                ? 'bg-white text-stone-800 border border-stone-200 rounded-tr-none' 
                : 'bg-emerald-50 text-stone-800 border border-emerald-100 rounded-tl-none'}
            `}>
              {formatContent(msg.content)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-emerald-700 text-emerald-50 flex items-center justify-center">
               <Bot size={20} />
             </div>
             <div className="bg-emerald-50 px-5 py-4 rounded-2xl rounded-tl-none border border-emerald-100 flex items-center">
                <Loader2 className="animate-spin text-emerald-600" size={20} />
                <span className="ml-3 text-stone-500 text-sm">Thinking (noʻonoʻo ana)...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto relative flex items-center gap-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about crops, livestock, or grants..."
            className="flex-1 resize-none h-14 max-h-32 py-3 px-4 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-stone-800 placeholder-stone-400"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className={`
              w-14 h-14 rounded-xl flex items-center justify-center transition-all
              ${!inputValue.trim() || isLoading 
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed' 
                : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-md'}
            `}
          >
            {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
          </button>
        </div>
        <p className="text-center text-xs text-stone-400 mt-2">
          AinaMind uses Gemini AI. Please verify important information with local extension agents.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
