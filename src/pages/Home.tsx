import { useState, useEffect } from "react";
import UtilityRail from "../components/Home/UtilityRail";
import ChatSidebar from "../components/Home/ChatSidebar";
import MapArea from "../components/Home/MapArea";

export default function Home() {
  // In a real app, this would come from Redux/API
  const [hasChats] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(() => {
    // Remember last state from localStorage
    const saved = localStorage.getItem("chatSidebarOpen");
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("chatSidebarOpen", JSON.stringify(isChatOpen));
  }, [isChatOpen]);

  return (
    <div className="h-screen w-screen bg-[#0a0a0a] flex overflow-hidden">
      {/* Utility Rail - Always Visible */}
      <UtilityRail />

      {/* Conditional Chat Sidebar - Only shows if user has chats */}
      {hasChats && (
        <ChatSidebar isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
      )}

      {/* Main Map Area - Dominant */}
      <MapArea hasChatSidebar={hasChats && isChatOpen} />
    </div>
  );
}

