import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, isRoleLoading] = useRole();
    const location = useLocation();

    if (loading || isRoleLoading) {
        return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner text-primary"></span></div>;
    }

    if (user && role === 'admin') {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;