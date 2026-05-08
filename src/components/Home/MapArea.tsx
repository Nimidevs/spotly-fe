import { useState, useCallback } from "react";
import type { NearbyUser, NearbyUserPayload } from "../../types/map.types";
import { normalizeNearbyUser } from "../../types/map.types";
import { useMapInstance } from "../Map/UseMapInstance";
import { useUserMarkers } from "../Map/UseUserMarker";
import ProfilePreview from "./ProfilePreview";
import { useWsEvent } from "../../ws/useWsEvent";

interface MapAreaProps {
  hasChatSidebar: boolean;
}

/** Mock nearby users with real lat/lng near Lagos (map center). */
const MOCK_NEARBY_USERS: NearbyUser[] = [
  {
    id: "1",
    lat: 6.5284,
    lng: 3.3752,
    availability: "available",
    firstName: "Alex",
    lastName: "Rivers",
    bio: "Looking for coffee buddies and professional connections",
    joinReason: "Coffee, Networking",
    avatarUrl: "",
  },
  {
    id: "2",
    lat: 6.5184,
    lng: 3.3892,
    availability: "available",
    firstName: "Jordan",
    lastName: "Lee",
    bio: "Love hiking and making new friends",
    joinReason: "Activity Partner, Friendship",
    avatarUrl: "",
  },
  {
    id: "3",
    lat: 6.5344,
    lng: 3.3692,
    availability: "busy",
    firstName: "Sam",
    lastName: "Taylor",
    bio: "Just looking to meet cool people nearby",
    joinReason: "Casual Meetups",
    avatarUrl: "",
  },
  {
    id: "4",
    lat: 6.5204,
    lng: 3.3952,
    availability: "available",
    firstName: "Taylor",
    lastName: "Kim",
    bio: "Tech professional looking to expand my network",
    joinReason: "Networking",
    avatarUrl: "",
  },
];

export default function MapArea({ hasChatSidebar }: MapAreaProps) {
  const [nearbyUsers, setNearbyUsers] = useState<NearbyUser[]>(MOCK_NEARBY_USERS);
  const [selectedUser, setSelectedUser] = useState<NearbyUser | null>(null);

  useWsEvent("nearby:users", (data: NearbyUserPayload[]) => {
    console.log("nearby:users", data);
    setNearbyUsers(data.map(normalizeNearbyUser));
  });
  useWsEvent("nearby:user:leave", (id: string) => {
    setNearbyUsers((prev) => prev.filter((user) => user.id !== id));
  });
  useWsEvent("nearby:user:enter", (data: NearbyUserPayload) => {
    setNearbyUsers((prev) => [...prev, normalizeNearbyUser(data)]);
  });

  const { containerRef, mapReady } = useMapInstance();
  const onUserClick = useCallback((user: NearbyUser) => setSelectedUser(user), []);
  useUserMarkers(mapReady, nearbyUsers, onUserClick);

  return (
    <div
      className="flex-1 relative bg-[#0a0a0a] overflow-hidden"
      data-has-chat-sidebar={hasChatSidebar}
    >
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {selectedUser && (
        <ProfilePreview
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
