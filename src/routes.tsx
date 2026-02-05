import { createBrowserRouter } from "react-router";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import JoinReason from "./pages/onboarding/JoinReason";
import ProfileInfo from "./pages/onboarding/ProfileInfo";
import { ProfileImage } from "./pages/onboarding/ProfileImage";
import { LocationPermission } from "./pages/onboarding/LocationPermission";
import ProtectedRoute from "./components/ProtectedRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    /**Consider converting this to react-router v6 auth guards/ loaders instead of a ProtectedRoute component*/
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
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

