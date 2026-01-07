import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import JoinReason from "./pages/onboarding/JoinReason";
import ProfileInfo from "./pages/onboarding/ProfileInfo";
import { ProfileImage } from "./pages/onboarding/ProfileImage";
import { LocationPermission } from "./pages/onboarding/LocationPermission";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/onboarding/join-reason",
    element: <JoinReason />,
  },
  {
    path: "/onboarding/profile-info",
    element: <ProfileInfo />,
  },
  {
    path: "/onboarding/profile-image",
    element: <ProfileImage />,
  },
  {
    path: "/onboarding/location-permission",
    element: <LocationPermission />,
  },
]);

export default routes;

