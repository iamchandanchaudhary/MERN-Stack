import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const roleLoginPaths = {
  user: "/login/user",
  "store-owner": "/login/store-owner",
  admin: "/login/admin"
};

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    const fallback = roleLoginPaths[requiredRole] || "/";
    return <Navigate to={fallback} replace state={{ from: location }} />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
