import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { wsClient } from "./wsClient";
import { onMessageHandler } from "../ws-handlers/onMessage";

interface WebSocketContextValue {
  sendMessage: (data: unknown) => void;
  isConnected: boolean;
}

const WebSocketContext = createContext<WebSocketContextValue | null>(null);

interface WebSocketProviderProps {
  children: React.ReactNode;
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const token = useSelector((state: RootState) => state.token);
  const [isConnected, setIsConnected] = useState(false);

  const wsUrl = import.meta.env.VITE_WEBSOCKET_API_URL;

  useEffect(() => {
    if (!wsUrl || !token) {
      wsClient.disconnect();
      setIsConnected(false);
      return;
    }

    wsClient.setMessageHandler((data, ws) => {
      onMessageHandler(data, ws);
    });

    wsClient.connect({
      url: wsUrl,
      onOpen: () => setIsConnected(true),
      onClose: () => setIsConnected(false),
    });

    return () => {
      wsClient.disconnect();
      setIsConnected(false);
    };
  }, [wsUrl, token]);

  const sendMessage = wsClient.send;

  return (
    <WebSocketContext.Provider value={{ sendMessage, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocketContext() {
  const ctx = useContext(WebSocketContext);
  if (!ctx) {
    throw new Error("useWebSocketContext must be used inside WebSocketProvider");
  }
  return ctx;
}
