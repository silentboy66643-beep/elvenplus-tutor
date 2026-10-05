import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  X,
  Send,
  Phone,
  RotateCcw,
  RefreshCw,
  ArrowRight,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { ChatMessage, MapSource } from '../types';

interface AIAssistantProps {
  onPreFillEnquiry: (details: { subject?: string; goal?: string }) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onPreFillEnquiry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content:
        "Hi — I'm here to help with 11+ exam preparation in Manchester. What year is your child in, or what would you like to explore?",
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [hasError, setHasError] = useState(false);
  const [lastUserPrompt, setLastUserPrompt] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedQuestions = [
    'My child is in Year 5',
    'What does 11+ tutoring cover?',
    'Where is Swan Buildings located?',
    'Struggling with maths word problems',
    'Do you offer mock exams?',
  ];

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('auto');
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, streamedText, isStreaming]);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isStreaming) return;

    setHasError(false);
    setLastUserPrompt(textToSend);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setIsStreaming(true);
    setStreamedText('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Send last 6 messages for fast processing while maintaining essential context
          messages: newHistory.slice(-6).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulated = '';
      let buffer = '';
      let receivedMapSources: MapSource[] = [];

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.slice(6);
            try {
              const data = JSON.parse(dataStr);
              if (data.mapSources && Array.isArray(data.mapSources)) {
                receivedMapSources = data.mapSources;
              }
              if (data.text) {
                accumulated += data.text;
                // As soon as first chunk arrives, update streamedText
                setStreamedText(accumulated);
              }
              if (data.error) {
                throw new Error(data.error);
              }
            } catch (jsonErr) {
              // Ignore partial JSON chunks
            }
          }
        }
      }

      if (!accumulated.trim()) {
        throw new Error('Empty response received');
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: accumulated.trim(),
        mapSources: receivedMapSources.length > 0 ? receivedMapSources : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setStreamedText('');
    } catch (err: unknown) {
      console.error('Chat stream error:', err);
      setHasError(true);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content:
          "I've hit a little connection problem there. Try that again, or you can call us on +44 7482 640654.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      setStreamedText('');
    } finally {
      setIsStreaming(false);
    }
  };

  const handleRetry = () => {
    if (lastUserPrompt) {
      // Remove the last error message from history
      setMessages((prev) => prev.slice(0, -1));
      handleSend(lastUserPrompt);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        content:
          "Hi — I'm here to help with 11+ exam preparation in Manchester. What year is your child in, or what would you like to explore?",
        timestamp: 'Just now',
      },
    ]);
    setStreamedText('');
    setHasError(false);
    setIsStreaming(false);
  };

  return (
    <>
      {/* Small Floating AI Dock Button (Fixed bottom-right) */}
      <div className="fixed bottom-[16px] right-[16px] sm:bottom-[22px] sm:right-[22px] z-50 flex items-center">
        {/* Optional Micro Tooltip on Desktop Hover (Hidden on mobile) */}
        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 8, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 4, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="hidden md:flex items-center mr-3 px-3 py-1.5 rounded-full bg-[#0a1226]/95 border border-slate-700/80 text-xs font-sans text-slate-200 shadow-xl shadow-black/40 pointer-events-none select-none backdrop-blur-sm"
            >
              <span>Ask me anything</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Dock Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative group w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a880] shadow-lg shadow-black/50 ${
            isOpen
              ? 'bg-[#121c38] border border-slate-600/90 text-white'
              : 'bg-[#091124] hover:bg-[#0d1833] border border-slate-700/80 hover:border-[#c5a880]/60 text-slate-200 hover:scale-[1.06]'
          }`}
          aria-label={isOpen ? 'Close 11+ Tutor Assistant' : 'Open 11+ Tutor Assistant'}
        >
          {/* Subtle gentle pulse ring every few seconds (non-distracting) */}
          {!isOpen && (
            <span
              className="absolute inset-0 rounded-full border border-[#c5a880]/25 pointer-events-none animate-ping opacity-25"
              style={{ animationDuration: '4s' }}
            />
          )}

          {/* Morphing / Transitioning Icon */}
          <div className="relative flex items-center justify-center transition-transform duration-200 group-hover:rotate-6">
            {isOpen ? (
              <X className="w-5 h-5 text-slate-200 transition-transform duration-200 rotate-0" />
            ) : (
              <Sparkles className="w-5 h-5 text-[#e2d5c3] transition-colors group-hover:text-white" />
            )}
          </div>
        </button>
      </div>

      {/* Compact Premium Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[72px] right-[16px] sm:bottom-[84px] sm:right-[22px] z-50 w-[calc(100vw-32px)] sm:w-[370px] h-[min(560px,80vh)] rounded-2xl bg-[#091124] border border-slate-800/90 shadow-2xl shadow-black/80 flex flex-col overflow-hidden text-left font-sans backdrop-blur-md"
          >
            {/* Chat Header */}
            <div className="px-4 py-3.5 bg-[#0c1630] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#142347] border border-slate-700/80 flex items-center justify-center text-[#c5a880] shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-bold text-white leading-tight">
                    11+ Tutor Assistant
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-[11px] text-slate-300">Online</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-[11px] text-slate-400">Here to help</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Restart chat"
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Contact & Info Bar */}
            <div className="px-4 py-1.5 bg-[#070d1d] border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Swan Buildings, Manchester</span>
              <a
                href="tel:+447482640654"
                className="text-[#c5a880] hover:text-white flex items-center gap-1 font-medium transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span>+44 7482 640654</span>
              </a>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-3">
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                const isFirstAssistantInTurn =
                  !isUser && (idx === 0 || messages[idx - 1]?.role === 'user');

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2 ${
                      isUser ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {!isUser && (
                      <div className="w-6 h-6 rounded-full bg-[#142347] border border-slate-800 flex items-center justify-center text-[#c5a880] shrink-0 mt-0.5">
                        <Sparkles className="w-3 h-3" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${
                        isUser
                          ? 'bg-[#c5a880] text-[#070c1a] font-medium rounded-tr-sm'
                          : 'bg-[#0f1b38] border border-slate-800/90 text-slate-200 rounded-tl-sm'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>

                      {msg.mapSources && msg.mapSources.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-slate-700/60 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-[#c5a880]">
                            <MapPin className="w-3 h-3 text-red-400" />
                            <span>Google Maps Verified</span>
                          </div>
                          {msg.mapSources.map((source, sIdx) => (
                            <a
                              key={sIdx}
                              href={source.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#081022] border border-slate-700/80 hover:border-[#c5a880] text-xs text-slate-200 transition-colors group"
                            >
                              <div className="flex items-center gap-1.5 truncate">
                                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                                <span className="truncate font-medium group-hover:text-white">
                                  {source.title}
                                </span>
                              </div>
                              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#c5a880] shrink-0" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Streaming Content: Show immediately once text arrives */}
              {isStreaming && streamedText && (
                <div className="flex items-start gap-2 justify-start">
                  <div className="w-6 h-6 rounded-full bg-[#142347] border border-slate-800 flex items-center justify-center text-[#c5a880] shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <div className="max-w-[85%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed bg-[#0f1b38] border border-slate-800/90 text-slate-200 rounded-tl-sm">
                    <p className="whitespace-pre-wrap">{streamedText}</p>
                    <span className="inline-block w-1 h-3 bg-[#c5a880] animate-pulse ml-0.5 align-middle" />
                  </div>
                </div>
              )}

              {/* Typing indicator ● ● ● : ONLY shown before the first chunk arrives */}
              {isStreaming && !streamedText && (
                <div className="flex items-start gap-2 justify-start">
                  <div className="w-6 h-6 rounded-full bg-[#142347] border border-slate-800 flex items-center justify-center text-[#c5a880] shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <div className="rounded-2xl px-3.5 py-2.5 bg-[#0f1b38] border border-slate-800/90 rounded-tl-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.18s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.36s]" />
                  </div>
                </div>
              )}

              {/* Retry button on error */}
              {hasError && !isStreaming && (
                <div className="flex items-center gap-2 pl-8 pt-1">
                  <button
                    onClick={handleRetry}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Retry</span>
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Quick Questions (When conversation is fresh) */}
            {messages.length <= 2 && !isStreaming && (
              <div className="px-3.5 pb-2 pt-1 border-t border-slate-800/80 bg-[#080d1d]">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-medium">
                  Suggested:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-[11px] text-slate-300 hover:text-white bg-slate-900 hover:bg-[#142347] border border-slate-700/70 rounded-md px-2 py-0.5 text-left transition-colors cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Subtle enquiry link */}
            <div className="px-3.5 py-1.5 bg-[#060a17] border-t border-slate-800/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Ready to discuss tuition?</span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  const el = document.getElementById('contact');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#c5a880] hover:text-white font-medium flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Enquiry form</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Input Form */}
            <div className="p-2.5 bg-[#0c1630] border-t border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-1.5"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question or share your child's year..."
                  disabled={isStreaming}
                  className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#c5a880] disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  className="p-2 rounded-xl bg-[#c5a880] hover:bg-[#d6bc96] text-[#070c1a] disabled:opacity-40 transition-colors shrink-0 cursor-pointer"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
