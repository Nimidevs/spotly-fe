import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ChatSidebar({ isOpen, onToggle }: ChatSidebarProps) {
  // Mock chat data - in real app, this would come from state/API
  const [chats] = useState<Chat[]>([
    {
      id: "1",
      name: "Alex",
      lastMessage: "Hey! Want to grab coffee?",
      timestamp: "2m",
      unread: 2,
      isOnline: true,
    },
    {
      id: "2",
      name: "Jordan",
      lastMessage: "Thanks for the recommendation!",
      timestamp: "15m",
      unread: 0,
      isOnline: true,
    },
    {
      id: "3",
      name: "Sam",
      lastMessage: "See you there!",
      timestamp: "1h",
      unread: 1,
      isOnline: false,
    },
  ]);

  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="w-12 bg-[#111111] border-r border-[#1a1a1a] flex items-center justify-center hover:bg-[#1a1a1a] transition-colors group relative"
        title="Open chats"
      >
        <ChevronRight className="w-5 h-5 text-gray-400" />
        <span className="absolute left-full ml-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chats
        </span>
      </button>
    );
  }

  return (
    <div className="w-80 bg-[#111111] border-r border-[#1a1a1a] flex flex-col flex-shrink-0 transition-all duration-300">
      {/* Header */}
      <div className="h-16 border-b border-[#1a1a1a] flex items-center justify-between px-4">
        <h2 className="text-white font-semibold text-base">Messages</h2>
        <button
          onClick={onToggle}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#1a1a1a] transition-colors"
          title="Collapse chats"
        >
          <ChevronLeft className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      

      <div className="px-4 flex items-center gap-2 my-6 rounded-md p-2 border border-transparent transition-colors focus-within:border-border"> 
        <Search className="w-4 h-4 text-gray-400" />
        <input placeholder="Search messages" className="w-full text-gray-300 bg-transparent border-none outline-none focus:outline-none" />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setSelectedChat(chat.id)}
            className={`w-full px-4 py-3 flex items-start gap-3 hover:bg-[#1a1a1a] transition-colors text-left ${
              selectedChat === chat.id ? "bg-[#1a1a1a]" : ""
            }`}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EBF934] to-[#90EE90] flex items-center justify-center">
                <span className="text-black font-semibold text-sm">
                  {chat.name[0]}
                </span>
              </div>
              {chat.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#4ade80] rounded-full border-2 border-[#111111]" />
              )}
            </div>

            {/* Chat Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white font-medium text-sm truncate">
                  {chat.name}
                </span>
                <span className="text-gray-500 text-xs flex-shrink-0 ml-2">
                  {chat.timestamp}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-gray-400 text-sm truncate">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <span className="bg-[#EBF934] text-black text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

