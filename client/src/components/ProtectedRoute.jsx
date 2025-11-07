import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    // We're still checking if the user is logged in
    return (
      <div className="h-screen w-full flex items-center justify-center bg-zinc-900 text-white">
        Loading...
      </div>
    );
  }

  if (!isLoggedIn) {
    // User is not logged in, redirect to auth page
    return <Navigate to="/auth" replace />;
  }

  // User is logged in, show the child route (Dashboard, Summary, etc.)
  console.log("User is authenticated, accessing protected route.");
  return <Outlet />;
};

export default ProtectedRoute;