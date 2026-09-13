import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';
import {
  Bot,
  User,
  Send,
  Sparkles,
  RotateCcw,
  Compass,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const SUGGESTED_CHIPS = [
  'Recommend a 100% free stack for a SaaS MVP',
  'Best UI/UX tools for a solo developer',
  'Supabase vs Firebase for mobile apps',
  'How can I edit 4K video for free?',
  'Recommend tools for an automated newsletter',
];

export const AIAssistantPage: React.FC = () => {
  const { user, userProfile } = useAuth();
  const location = useLocation();
  const initialPromptFromNav = (location.state as { initialPrompt?: string })?.initialPrompt;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm your **ToolFinder AI Stack Assistant**. 

Tell me about the project you're building, your target budget (even $0), and skill level. I'll recommend the optimal tools, free tiers, and potential drawbacks.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Handle prompt passed from dashboard search bar
  useEffect(() => {
    if (initialPromptFromNav && initialPromptFromNav.trim()) {
      handleSendMessage(initialPromptFromNav);
    }
  }, [initialPromptFromNav]);

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      // Prepare conversation payload for the secure backend proxy
      const payloadMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      const aiReply = data.reply || 'Sorry, I could not generate a response at this time.';

      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content:
          '⚠️ I ran into an error connecting to the backend intelligence service. Please check your network or try again in a few moments.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: `Hello! I'm your **ToolFinder AI Stack Assistant**. 

Tell me about the project you're building, your target budget (even $0), and skill level. I'll recommend the optimal tools, free tiers, and potential drawbacks.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const displayName =
    userProfile?.displayName || user?.displayName || user?.email?.split('@')[0] || 'You';

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-2rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">
              AI Stack Assistant
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Full directory & roadmaps grounded</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="py-3 overflow-x-auto flex items-center gap-2 shrink-0 text-xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
          Try asking:
        </span>
        {SUGGESTED_CHIPS.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(chip)}
            disabled={loading}
            className="px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-700 whitespace-nowrap transition-all shrink-0 font-medium disabled:opacity-50"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-1 shadow-xs ${
                  isUser
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gradient-to-br from-slate-900 to-indigo-950 text-indigo-300'
                }`}
              >
                {isUser ? displayName.charAt(0).toUpperCase() : <Compass className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-xs shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-xs'
                }`}
              >
                {isUser ? (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <div className="prose prose-xs sm:prose-sm max-w-none text-slate-800">
                    <Markdown>{msg.content}</Markdown>
                  </div>
                )}
                <div
                  className={`mt-2 text-[10px] ${
                    isUser ? 'text-indigo-200 text-right' : 'text-slate-400 text-left'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950 text-indigo-300 flex items-center justify-center text-xs shrink-0 mt-1 shadow-xs">
              <Compass className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-4 shadow-xs flex items-center gap-2 text-xs text-slate-500">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
              <span>Analyzing stack requirements...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="pt-3 border-t border-slate-200 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Describe what you want to build (e.g. 'I need a free stack for a mobile food delivery app')..."
            className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-xs disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition-colors shadow-xs"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="text-[11px] text-slate-400 text-center mt-2">
          Responses are tailored using ToolFinder&apos;s verified 60+ database and official pricing limits.
        </div>
      </div>
    </div>
  );
};
