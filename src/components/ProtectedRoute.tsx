import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import type { RootState } from "../store/store";

/**Consider converting this to react-router v6 auth guards/ loaders */

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {   
    const user = useSelector((state: RootState) => state.user.user);
    if(!user) {
        return <Navigate to="/?login=true" />
    }
    return children;
}

export default ProtectedRoute;