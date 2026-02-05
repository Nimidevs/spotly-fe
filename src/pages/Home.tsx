import { useState, useEffect} from "react";
import UtilityRail from "../components/Home/UtilityRail";
import ChatSidebar from "../components/Home/ChatSidebar";
import MapArea from "../components/Home/MapArea";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { ONBOARDING_ROUTES } from "../utils/onboardingRoutes";
import { useNavigate } from "react-router";
import { useWebSocket } from "../hooks/useWebSocket";

export default function Home() {
    const user = useSelector((state: RootState) => state.user.user);
    console.log('🔍 User:', user);
    const token = useSelector((state: RootState) => state.token);
    const isAvailable = useSelector((state: RootState) => state.availability.isAvailable);
    const navigate = useNavigate();
  // In a real app, this would come from Redux/API
  const [hasChats] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(() => {
    // Remember last state from localStorage
    const saved = localStorage.getItem("chatSidebarOpen");
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    if(user?.onboardingStatus !== "COMPLETED") {
      switch(user?.onboardingStep){
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
          navigate('/');
          break;
      }
    }

    if(user?.location_permission !== 'GRANTED'){
      navigate(ONBOARDING_ROUTES.LOCATION_PERMISSION);
    }
  }, [user]);

  const wsUrl = import.meta.env.VITE_WEBSOCKET_API_URL;
console.log('ENV VAR:', wsUrl);
console.log('FULL ENV:', import.meta.env);

  const { isConnected, sendMessage, disconnect, reconnect } = useWebSocket({
    url: wsUrl,
    onMessage: (data) => {
      console.log(data);
    },
    onConnect: () => {
      sendMessage({
        event: "auth",
        payload: {
          token: token,
          firstName: user?.firstName,
          lastName: user?.lastName,
          bio: user?.bio,
          avatarUrl: user?.avatarUrl,
          joinReason: user?.joinReason,
          availability: isAvailable,
        },
      });
    },
    onDisconnect: () => {
      console.log("Disconnected from WebSocket");
    },
    autoReconnect: true,
  });



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

