import { useState, useEffect, useRef } from "react";
import UtilityRail from "../components/Home/UtilityRail";
import ChatSidebar from "../components/Home/ChatSidebar";
import MapArea from "../components/Home/MapArea";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { ONBOARDING_ROUTES } from "../utils/onboardingRoutes";
import { useNavigate } from "react-router";
import { useWebSocketContext } from "../ws/WebSocketContext";

export default function Home() {
  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.token);
  const isAvailable = useSelector((state: RootState) => state.availability.isAvailable);
  const navigate = useNavigate();
  const { isConnected, sendMessage } = useWebSocketContext();

  const [hasChats] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(() => {
    const saved = localStorage.getItem("chatSidebarOpen");
    return saved ? JSON.parse(saved) : true;
  });

  const hasSentAuth = useRef(false);

  useEffect(() => {
    if (!isConnected) hasSentAuth.current = false;
  }, [isConnected]);

  useEffect(() => {
    if (user?.onboardingStatus !== "COMPLETED") {
      switch (user?.onboardingStep) {
        case 0:
          navigate(ONBOARDING_ROUTES.JOIN_REASON);
          break;
        case 1:
          navigate(ONBOARDING_ROUTES.PROFILE_INFO);
          break;
        case 2:
          navigate(ONBOARDING_ROUTES.PROFILE_IMAGE);
          break;
        case 3:
          navigate(ONBOARDING_ROUTES.LOCATION_PERMISSION);
          break;
        default:
          navigate("/");
          break;
      }
    }

    if (user?.location_permission !== "GRANTED") {
      navigate(ONBOARDING_ROUTES.LOCATION_PERMISSION);
    }
  }, [user, navigate]);

  // Send auth once when connected (global WS = one connection, so one auth send)
  useEffect(() => {
    if (!isConnected || !token || hasSentAuth.current) return;

    hasSentAuth.current = true;
    sendMessage({
      event: "auth",
      payload: {
        token,
        firstName: user?.firstName,
        lastName: user?.lastName,
        bio: user?.bio,
        avatarUrl: user?.avatarUrl,
        joinReason: user?.joinReason,
        availability: isAvailable,
      },
    });
  }, [isConnected, token, sendMessage, user, isAvailable]);



  // useEffect(() => {
  //   localStorage.setItem("chatSidebarOpen", JSON.stringify(isChatOpen));
  // }, [isChatOpen]);

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

