
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  signUp: (email: string, password: string, userData?: { full_name?: string }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const auth = localStorage.getItem('flipboard_auth');
        if (auth) {
          const authData = JSON.parse(auth);
          setUser(authData.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Check on initial load
    checkAuth();
    
    // Listen for storage changes
    window.addEventListener('storage', checkAuth);
    
    // Custom event for auth changes within the same page
    window.addEventListener('authChange', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const signUp = async (email: string, password: string, userData?: { full_name?: string }) => {
    try {
      setIsLoading(true);
      
      // Get existing users or start with defaults
      const storedUsers = localStorage.getItem('flipboard_registered_users');
      let users = storedUsers ? JSON.parse(storedUsers) : [
        {
          id: 'user_123456',
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
          createdAt: new Date().toISOString()
        },
        {
          id: 'user_789012',
          email: 'demo@example.com',
          password: 'demo123',
          name: 'Demo User',
          createdAt: new Date().toISOString()
        }
      ];
      
      // Check if email exists already
      if (users.some((user: any) => user.email === email)) {
        toast.error('This email is already registered');
        throw new Error('This email is already registered');
      }
      
      // Add new user
      const newUser = {
        id: 'user_' + Math.random().toString(36).substring(2, 9),
        email: email,
        password: password,
        name: userData?.full_name || '',
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem('flipboard_registered_users', JSON.stringify(users));
      
      toast.success('Account created successfully!');
      navigate('/signin');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Get registered users from localStorage
      const storedUsers = localStorage.getItem('flipboard_registered_users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      // Find matching user
      const user = users.find((u: any) => 
        u.email === email && u.password === password
      );
      
      if (!user) {
        toast.error("Invalid login credentials");
        throw new Error("Invalid login credentials");
      }
      
      // Create session
      const authData = {
        user: {
          id: user.id,
          email: user.email,
          name: user.name || '',
        },
        authenticated: true,
        timestamp: Date.now()
      };
      
      localStorage.setItem('flipboard_auth', JSON.stringify(authData));
      setUser(authData.user);
      
      // Dispatch auth change event
      window.dispatchEvent(new Event('authChange'));
      
      toast.success('Signed in successfully');
      navigate('/subjects');
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || 'Failed to sign in');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      localStorage.removeItem('flipboard_auth');
      setUser(null);
      
      // Dispatch auth change event
      window.dispatchEvent(new Event('authChange'));
      
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Error signing out');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
