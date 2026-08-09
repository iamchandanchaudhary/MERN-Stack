import React from 'react';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import RoleSelectionPage from './pages/RoleSelectionPage';
import UserDashboard from './pages/UserDashboard';
import StoreDetails from './pages/StoreDetails';
import StoreOwner from './pages/StoreOwner';
import UserProfile from './pages/UserProfile';
import StoreOwnerProfile from './pages/StoreOwnerProfile';
import SystemAdministrator from './pages/SystemAdministrator';
import RegisteredUsers from './pages/RegisteredUsers';
import RegisteredStores from './pages/RegisteredStores';
import StoreList from './pages/StoreList';
import UserLogin from './pages/UserLogin';
import StoreOwnerLogin from './pages/StoreOwnerLogin';
import SystemAdministratorLogin from './pages/SystemAdministratorLogin';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <div className=''>

      <Routes>
        <Route path="/" element={<RoleSelectionPage />} />
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/login/store-owner" element={<StoreOwnerLogin />} />
        <Route path="/login/admin" element={<SystemAdministratorLogin />} />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute requiredRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stores/:storeId"
          element={
            <ProtectedRoute requiredRole="user">
              <StoreDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/store-owner"
          element={
            <ProtectedRoute requiredRole="store-owner">
              <StoreOwner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/user"
          element={
            <ProtectedRoute requiredRole="user">
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/store-owner"
          element={
            <ProtectedRoute requiredRole="store-owner">
              <StoreOwnerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <SystemAdministrator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRole="admin">
              <RegisteredUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/store-owners"
          element={
            <ProtectedRoute requiredRole="admin">
              <RegisteredStores />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/stores"
          element={
            <ProtectedRoute requiredRole="admin">
              <StoreList />
            </ProtectedRoute>
          }
        />
      </Routes>

    </div>
  )
}

export default App;