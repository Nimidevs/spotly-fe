export const ONBOARDING_ROUTES = {
  JOIN_REASON: "/onboarding/join-reason",
  PROFILE_INFO: "/onboarding/profile-info",
  PROFILE_IMAGE: "/onboarding/profile-image",
  LOCATION_PERMISSION: "/onboarding/location-permission",
} as const;

export const ONBOARDING_FLOW = [
  ONBOARDING_ROUTES.JOIN_REASON,
  ONBOARDING_ROUTES.PROFILE_INFO,
  ONBOARDING_ROUTES.PROFILE_IMAGE,
  ONBOARDING_ROUTES.LOCATION_PERMISSION,
] as const;


