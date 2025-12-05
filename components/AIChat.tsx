import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Mic, Sparkles } from 'lucide-react';
import { initializeChat, sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'model',
      text: 'Hello! I am your DDM Assistant. I can help analyze your driving score and suggest improvements. How can I help today?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      initializeChat();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(userMsg.text);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 bg-black text-white p-4 rounded-full shadow-lg shadow-gray-400/50 hover:scale-105 active:scale-95 transition-all z-40 flex items-center justify-center"
      >
        <Sparkles size={24} className="mr-2" />
        <span className="font-semibold text-sm">AI Helper</span>
      </button>

      {/* Chat Interface Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white sm:max-w-md sm:right-0 sm:left-auto sm:border-l shadow-2xl animate-in slide-in-from-bottom sm:slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-tr from-ios-blue to-purple-500 p-2 rounded-lg text-white">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">DDM AI Assistant</h3>
                <p className="text-xs text-ios-green flex items-center">
                  <span className="w-2 h-2 bg-ios-green rounded-full mr-1"></span>
                  Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-ios-blue text-white rounded-tr-sm' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm flex space-x-1 items-center">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100 pb-8">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
              <button className="text-gray-400 hover:text-gray-600">
                <Mic size={20} />
              </button>
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about your score..." 
                className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-sm text-gray-900 placeholder-gray-400"
              />
              <button 
                onClick={handleSend} 
                disabled={!inputText.trim()}
                className={`p-1 rounded-full transition-colors ${inputText.trim() ? 'text-ios-blue' : 'text-gray-300'}`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};