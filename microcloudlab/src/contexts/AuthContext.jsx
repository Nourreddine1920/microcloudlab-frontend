import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(undefined);

/**
 * Custom hook to access the authentication context.
 * Provides access to the user's authentication state and methods to sign in, sign up, and sign out.
 *
 * @returns {{
 *   isLoading: boolean,
 *   isAuthenticated: boolean,
 *   token: string | null,
 *   user: object | null,
 *   signIn: (credentials: {email, password}) => Promise<{user: object}>,
 *   signUp: (details: {name, email, password}) => Promise<{user: object}>,
 *   signOut: () => void
 * }} The authentication context.
 * @throws {Error} If used outside of an `AuthProvider`.
 */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

/**
 * Provides authentication state to its children components.
 * It manages the user's session, including token and user data,
 * and persists the session to localStorage.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The child components to which the context will be provided.
 * @returns {JSX.Element} The AuthContext provider.
 */
export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Hydrate from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    if (storedToken) setToken(storedToken);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async ({ email, password }) => {
    // Placeholder: simulate auth. Replace with backend call when available.
    await new Promise((r) => setTimeout(r, 500));
    const fakeToken = `demo-token-${Date.now()}`;
    const fakeUser = { id: 'demo-user', email };

    setToken(fakeToken);
    setUser(fakeUser);
    localStorage.setItem('auth_token', fakeToken);
    localStorage.setItem('auth_user', JSON.stringify(fakeUser));
    return { user: fakeUser };
  };

  const signUp = async ({ name, email, password }) => {
    // Placeholder: simulate registration
    await new Promise((r) => setTimeout(r, 600));
    return signIn({ email, password });
  };

  const signOut = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  };

  const value = useMemo(() => ({
    isLoading,
    isAuthenticated: !!token,
    token,
    user,
    signIn,
    signUp,
    signOut,
  }), [isLoading, token, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

