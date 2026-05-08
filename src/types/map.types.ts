export interface NearbyUser {
    id: string
    lat: number
    lng: number
    availability: string
    firstName: string
    lastName: string
    bio: string
    joinReason: string
    avatarUrl: string
  }

/** Shape the WS/API may send before normalization. */
export type NearbyUserPayload = Omit<NearbyUser, "id" | "lat" | "lng"> & {
    id?: string
    userId?: string
    lat: string | number
    lng: string | number
}

/** Backend may send `userId` and string lat/lng; map markers key on `id`. */
export function normalizeNearbyUser(raw: NearbyUserPayload): NearbyUser {
    const id = raw.id ?? raw.userId ?? ""
    const lat = typeof raw.lat === "string" ? parseFloat(raw.lat) : raw.lat
    const lng = typeof raw.lng === "string" ? parseFloat(raw.lng) : raw.lng
    return {
        id,
        lat,
        lng,
        availability: raw.availability,
        firstName: raw.firstName,
        lastName: raw.lastName,
        bio: raw.bio,
        joinReason: raw.joinReason,
        avatarUrl: raw.avatarUrl,
    }
}