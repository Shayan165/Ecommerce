import React from "react";
import { useAuth } from "../context/usercontext";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  let auth = useAuth();
  if (auth.conData === null || auth.conData.isLoggedIn ===  false) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoutes;
