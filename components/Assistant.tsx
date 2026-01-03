
import React, { useState, useRef, useEffect } from 'react';
import { chatWithAssistant, getProjectInsights } from '../services/geminiService';
import { ChatMessage, Task } from '../types';

const Assistant: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hello! I'm your Nexus AI Assistant. How can I help you manage your projects today?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithAssistant([
        ...messages.map(m => ({ role: m.role === 'assistant' ? 'model' as const : 'user' as const, parts: [{ text: m.content }] })),
        { role: 'user', parts: [{ text: input }] }
      ]);
      setMessages(prev => [...prev, { role: 'assistant', content: response || "I'm sorry, I couldn't process that.", timestamp: new Date() }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Error communicating with AI. Please check your API key.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateReport = async () => {
    setIsLoading(true);
    try {
      const report = await getProjectInsights(tasks);
      setMessages(prev => [...prev, { role: 'assistant', content: `**Project Health Report:**\n\n${report}`, timestamp: new Date() }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-slate-700 bg-slate-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <h3 className="font-bold text-sm">Nexus Core AI</h3>
        </div>
        <button 
          onClick={generateReport}
          className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors font-medium"
        >
          Quick Audit
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
            }`}>
              <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
              <div className={`text-[10px] mt-1 opacity-50 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-4 rounded-2xl flex gap-1">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-800/80 backdrop-blur-sm border-t border-slate-700">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about the project..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-slate-500"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/></svg>
          </button>
        </div>
        <p className="text-[10px] text-slate-500 mt-2 text-center">AI generated responses can be inaccurate. Verify important details.</p>
      </div>
    </div>
  );
};

export default Assistant;
