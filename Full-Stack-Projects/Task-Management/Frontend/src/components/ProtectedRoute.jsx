import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    const loginPath = requiredRole === "admin" ? "/login/admin" : "/login/user";
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
