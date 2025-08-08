import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useBoard } from '../contexts/BoardContext';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requireBoard = false, requireAuth = false }) => {
  const { selectedBoard, isLoading: isBoardLoading } = useBoard();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking board state
  if (isBoardLoading || isAuthLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  // Require authentication
  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // If board is required but not selected, redirect to IDE home with current path in state
  if (requireBoard && !selectedBoard) {
    return (
      <Navigate 
        to="/ide" 
        state={{ 
          from: location.pathname,
          message: "Please select a board first to access peripheral configuration tools."
        }} 
        replace 
      />
    );
  }

  return children;
};

export default ProtectedRoute;