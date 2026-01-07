import { useState, useEffect } from "react";

interface UserMarkerProps {
  user: {
    id: string;
    name: string;
    isOnline: boolean;
    intent: string[];
    distance: number;
  };
  position: { x: number; y: number };
  onHover: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}

export default function UserMarker({
  user,
  position,
  onHover,
  onHoverEnd,
  onClick,
}: UserMarkerProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    if (user.isOnline) {
      const interval = setInterval(() => {
        setIsPulsing((prev) => !prev);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [user.isOnline]);

  return (
    <div
      className="absolute cursor-pointer z-10 group"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      onMouseEnter={() => {
        setIsHovered(true)
        onHover()
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        onHoverEnd()
      }}
      onClick={onClick}
    >
      {/* Pulse Ring (only for online users) */}
      {user.isOnline && (
        <div
          className={`absolute inset-0 rounded-full border-2 border-[#4ade80] ${
            isPulsing ? "animate-ping opacity-75" : "opacity-0"
          }`}
          style={{
            width: "60px",
            height: "60px",
            marginLeft: "-20px",
            marginTop: "-20px",
          }}
        />
      )}

      {/* Avatar Marker */}
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EBF934] to-[#90EE90] flex items-center justify-center border-2 border-[#0a0a0a] shadow-lg group-hover:scale-110 transition-transform">
          <span className="text-black font-semibold text-sm">{user.name[0]}</span>
        </div>

        {/* Online Indicator */}
        {user.isOnline && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#4ade80] rounded-full border-2 border-[#0a0a0a]" />
        )}
      </div>

        <div
        className={`absolute bottom-full min-w-max left-1/2 mb-2 -translate-x-1/2 transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
          }`}
          >
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-4 rounded-xl shadow-2xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EBF934] to-[#90EE90] flex items-center justify-center">
                <span className="text-black font-semibold text-sm">
                  {user.name[0]}
                </span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">{user.name}</h3>
                <p className="text-gray-400 text-xs">{user.distance} km away</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {user.intent.map((intent, idx) => (
                <span
                  key={idx}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-[#2a2a2a] text-gray-300"
                >
                  {intent}
                </span>
              ))}
            </div>
            </div>
            
            <div className="mx-auto h-2 w-2 rotate-45 border-r border-b border-[#4e4e4e] bg-[#2c2c2c]" />
        </div>

    </div>
  );
}

