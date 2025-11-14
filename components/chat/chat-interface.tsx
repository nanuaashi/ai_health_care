'use client';

import { useState, useRef, useEffect } from 'react';
import { useGeminiChat, Message as ChatMessage } from '@/hooks/use-gemini-chat';
import { LanguageSelector, type SupportedLanguage } from './language-selector';

interface Chat {
  id: string;
  name: string;
  messages: ChatMessage[];
  createdAt: Date;
}

export default function ChatInterface({ onBack }: { onBack?: () => void }) {
  const { messages: hookMessages, isLoading, error, sendMessage, clearError } = useGeminiChat();
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('en-US');
  
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'New Chat',
      messages: hookMessages,
      createdAt: new Date(),
    },
  ]);
  const [activeChatId, setActiveChatId] = useState('1');
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find((c) => c.id === activeChatId);

  // Update active chat with latest messages from hook
  useEffect(() => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: hookMessages }
          : chat
      )
    );
  }, [hookMessages, activeChatId]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      name: `Chat ${chats.length + 1}`,
      messages: [
        {
          id: '1',
          type: 'ai',
          text: "Hello! I'm your AI health assistant. I'm here to help you with health guidance, symptom information, and general wellness advice. How can I help you today?",
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
    };
    setChats([...chats, newChat]);
    setActiveChatId(newChat.id);
  };

  const deleteChat = (id: string) => {
    if (chats.length === 1) return;
    const updatedChats = chats.filter((c) => c.id !== id);
    setChats(updatedChats);
    if (activeChatId === id) {
      setActiveChatId(updatedChats[0].id);
    }
  };

  if (!activeChat) return null;

  return (
    <div className="flex h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          {onBack && (
            <button
              onClick={onBack}
              className="text-primary font-semibold text-sm flex items-center gap-1 hover:text-primary/80 mb-3 w-full"
            >
              ← Back
            </button>
          )}
          <button
            onClick={createNewChat}
            className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 text-sm"
          >
            + New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`p-3 rounded-lg cursor-pointer transition-all flex items-start justify-between group ${
                activeChatId === chat.id
                  ? 'bg-primary/20 border-2 border-primary'
                  : 'bg-muted hover:bg-muted/80 border-2 border-transparent'
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground truncate">
                  {chat.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {chat.messages[chat.messages.length - 1]?.text.slice(0, 30) || 'New chat'}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id);
                }}
                className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive/80 font-bold ml-2 text-lg"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-card">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeChat.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                <p className="text-xs mt-1 opacity-60">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="px-4 py-3 bg-muted text-foreground rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-foreground rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-foreground rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-foreground rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex justify-start">
              <div className="px-4 py-3 bg-destructive/10 text-destructive rounded-lg max-w-xs lg:max-w-md">
                <p className="text-sm font-semibold">Error:</p>
                <p className="text-sm">{error}</p>
                <button
                  onClick={clearError}
                  className="text-xs mt-2 underline hover:no-underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border space-y-3">
          {/* Language Selector */}
          <div className="flex gap-2 items-center">
            <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
              Language:
            </span>
            <LanguageSelector
              value={selectedLanguage}
              onChange={setSelectedLanguage}
              disabled={isLoading}
            />
          </div>

          {/* Text Input */}
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask me anything about your health... (Shift+Enter for new line)"
              disabled={isLoading}
              rows={2}
              className="flex-1 px-4 py-3 rounded-lg bg-background border-2 border-border text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed resize-none"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all self-end"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
