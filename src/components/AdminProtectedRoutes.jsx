import React from "react";
import { useAuth } from "../context/usercontext";
import { Navigate } from "react-router-dom";

function AdminProtectedRoutes({ children }) {
  let auth = useAuth();
  if (
    auth.conData.currentUserRole !== "admin" 
  ) {
    return <Navigate to="/" />;
  } 

  return children;
}

export default AdminProtectedRoutes;
