import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useBoard } from '../contexts/BoardContext';
import { useAuth } from '../contexts/AuthContext';

/**
 * @module ProtectedRoute
 */

/**
 * A higher-order component that protects routes based on authentication status and board selection.
 * It redirects unauthenticated users to the login page and users without a selected board to the IDE page.
 *
 * @param {object} props - The properties for the component.
 * @param {JSX.Element} props.children - The child components to render if the conditions are met.
 * @param {boolean} [props.requireBoard=false] - Whether a board selection is required to access the route.
 * @param {boolean} [props.requireAuth=false] - Whether authentication is required to access the route.
 * @returns {JSX.Element} The child components, a redirect, or a loading indicator.
 */
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