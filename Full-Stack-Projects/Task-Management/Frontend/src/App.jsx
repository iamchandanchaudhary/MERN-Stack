import React from 'react';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from './pages/Dashboard';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div className=''>

      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute requiredRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </div>
  )
}

export default App;