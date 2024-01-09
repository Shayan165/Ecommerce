import React from "react";
import { Route, Routes } from "react-router-dom";
import Error from "./components/Error";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./components/Dashboard";
import Store from "./components/Store";
import Admin from "./components/Admin";
import AdminProtectedRoutes from "./components/AdminProtectedRoutes";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/store"
          element={
            <ProtectedRoutes>
              <Store />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminProtectedRoutes>
              <Admin />
            </AdminProtectedRoutes>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
