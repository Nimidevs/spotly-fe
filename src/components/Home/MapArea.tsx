import { useState } from "react";
import UserMarker from "./UserMarker";
import ProfilePreview from "./ProfilePreview";

interface MapAreaProps {
  hasChatSidebar: boolean;
}

interface NearbyUser {
  id: string;
  name: string;
  distance: number;
  intent: string[];
  bio: string;
  isOnline: boolean;
  lat: number;
  lng: number;
}

export default function MapArea({ hasChatSidebar }: MapAreaProps) {
  const [selectedUser, setSelectedUser] = useState<NearbyUser | null>(null);
  const [hoveredUser, setHoveredUser] = useState<NearbyUser | null>(null);

  // Mock nearby users data
  const [nearbyUsers] = useState<NearbyUser[]>([
    {
      id: "1",
      name: "Alex",
      distance: 0.3,
      intent: ["Coffee", "Networking"],
      bio: "Looking for coffee buddies and professional connections",
      isOnline: true,
      lat: 0.4,
      lng: 0.5,
    },
    {
      id: "2",
      name: "Jordan",
      distance: 0.8,
      intent: ["Activity Partner", "Friendship"],
      bio: "Love hiking and making new friends",
      isOnline: true,
      lat: 0.6,
      lng: 0.3,
    },
    {
      id: "3",
      name: "Sam",
      distance: 1.2,
      intent: ["Casual Meetups"],
      bio: "Just looking to meet cool people nearby",
      isOnline: false,
      lat: 0.3,
      lng: 0.7,
    },
    {
      id: "4",
      name: "Taylor",
      distance: 0.5,
      intent: ["Networking"],
      bio: "Tech professional looking to expand my network",
      isOnline: true,
      lat: 0.7,
      lng: 0.4,
    },
  ]);

  return (
    <div className="flex-1 relative bg-[#0a0a0a] overflow-hidden">
      {/* Map Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        
        {/* Subtle map-like texture overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-white blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-white blur-2xl" />
        </div>

        {/* User Markers */}
        {nearbyUsers.map((user) => (
          <UserMarker
            key={user.id}
            user={user}
            position={{ x: user.lat * 100, y: user.lng * 100 }}
            onHover={() => setHoveredUser(user)}
            onHoverEnd={() => setHoveredUser(null)}
            onClick={() => setSelectedUser(user)}
          />
        ))}
      </div>

      {/* Profile Preview Drawer */}
      {selectedUser && (
        <ProfilePreview user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}

