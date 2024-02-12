import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
    children?: ReactElement;
    isAuthenticated: boolean;
    adminOnly?: boolean;
    isAdmin?: boolean;
    redirect?: string;
}

const ProtectedRoute = ({
    children,
    isAuthenticated,
    adminOnly,
    isAdmin,
    redirect = "/",
}: Props) => {
    if (!isAuthenticated) {
        return <Navigate to={redirect} />;
    }
    if (adminOnly && !isAdmin) {
        return <Navigate to={redirect} />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
