import { useState, useRef } from 'react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

interface Chat {
  id: string;
  name: string;
  messages: Message[];
  createdAt: Date;
}

export default function ChatInterface({ onBack }: { onBack?: () => void }) {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'New Chat',
      messages: [
        {
          id: '1',
          type: 'ai',
          text: 'Hello! I\'m your AI health assistant. I\'m here to help you with health guidance, symptom information, and general wellness advice. How can I help you today?',
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
    },
  ]);
  const [activeChatId, setActiveChatId] = useState('1');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const activeChat = chats.find((c) => c.id === activeChatId);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        // In production, send to speech-to-text API
        setInput('(Voice message received - "I have a fever and cough")');
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.log('[v0] Microphone access denied:', error);
      alert('Microphone access denied');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      name: `Chat ${chats.length + 1}`,
      messages: [
        {
          id: '1',
          type: 'ai',
          text: 'Hello! I\'m your AI health assistant. How can I help you today?',
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

  const handleSendMessage = async () => {
    if (!input.trim() || !activeChat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
      timestamp: new Date(),
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat
      )
    );
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        text: 'I understand your concern. Based on your description, I recommend monitoring your symptoms and staying hydrated. If symptoms persist beyond 48 hours, please consult a health worker or visit the nearest clinic.',
        timestamp: new Date(),
      };
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, aiMessage] }
            : chat
        )
      );
      setIsLoading(false);
    }, 1500);
  };

  if (!activeChat) return null;

  return (
    <div className="flex h-[calc(100vh-200px)]">
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

      <div className="flex-1 flex flex-col bg-card">
        {/* Messages */}
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
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="px-4 py-3 bg-muted text-foreground rounded-lg">
                <p className="text-sm">AI is typing...</p>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-3 rounded-lg bg-background border-2 border-border text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
            />
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`px-4 py-3 rounded-lg font-bold transition-all ${
                isRecording
                  ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
              }`}
            >
              {isRecording ? 'Stop' : 'Mic'}
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
