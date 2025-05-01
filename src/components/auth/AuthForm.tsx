
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";

interface AuthFormProps {
  isSignUp?: boolean;
}

// Sample user data to simulate a small database of users
const DEMO_USERS = [
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

export function AuthForm({ isSignUp = false }: AuthFormProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [registeredUsers, setRegisteredUsers] = useState<Array<typeof DEMO_USERS[0]>>([]);

  // Initialize registered users from localStorage or default to demo users
  useEffect(() => {
    const storedUsers = localStorage.getItem('flipboard_registered_users');
    if (storedUsers) {
      setRegisteredUsers(JSON.parse(storedUsers));
    } else {
      setRegisteredUsers(DEMO_USERS);
      localStorage.setItem('flipboard_registered_users', JSON.stringify(DEMO_USERS));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (isSignUp && !formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    
    if (!formData.password.trim()) {
      toast.error("Please enter your password");
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    
    try {
      if (isSignUp) {
        // Check if the email is already registered
        if (registeredUsers.some(user => user.email === formData.email)) {
          toast.error("This email is already registered");
          setIsLoading(false);
          return;
        }

        // Create a new user
        const newUser = {
          id: 'user_' + Math.random().toString(36).substring(2, 9),
          email: formData.email,
          password: formData.password, // In a real app, this would be hashed
          name: formData.name,
          createdAt: new Date().toISOString()
        };

        // Add to registered users
        const updatedUsers = [...registeredUsers, newUser];
        localStorage.setItem('flipboard_registered_users', JSON.stringify(updatedUsers));
        
        // Log the user in
        localStorage.setItem('flipboard_auth', JSON.stringify({
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            createdAt: newUser.createdAt
          },
          token: 'simulated_token_' + Math.random().toString(36).substring(2, 15),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
        }));

        toast.success('Sign up successful');
        navigate('/subjects');
      } else {
        // Check if the user exists and password matches
        const user = registeredUsers.find(user => 
          user.email === formData.email && user.password === formData.password
        );

        if (!user) {
          toast.error("Invalid email or password");
          setIsLoading(false);
          return;
        }

        // Authentication successful, create session
        localStorage.setItem('flipboard_auth', JSON.stringify({
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt
          },
          token: 'simulated_token_' + Math.random().toString(36).substring(2, 15),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
        }));

        toast.success('Sign in successful');
        navigate('/subjects');
      }
      
      // Dispatch a storage event to notify other components
      window.dispatchEvent(new Event('storage'));

    } catch (error) {
      console.error('Auth error:', error);
      toast.error(`Failed to ${isSignUp ? 'sign up' : 'sign in'}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      localStorage.removeItem('flipboard_auth'); // Clean up any partial auth data
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isSignUp ? 'Create an Account' : 'Welcome Back'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              required={isSignUp}
            />
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder={isSignUp ? 'Create a password' : 'Enter your password'}
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>
        
        {!isSignUp && (
          <div className="text-sm text-gray-500 mt-2">
            <p>Demo accounts:</p>
            <p>test@example.com / password123</p>
            <p>demo@example.com / demo123</p>
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full bg-flipboard-purple hover:bg-flipboard-dark-purple"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            isSignUp ? 'Sign up' : 'Sign in'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <Button 
                variant="link" 
                className="p-0 text-flipboard-purple hover:text-flipboard-dark-purple"
                onClick={() => navigate('/signin')}
              >
                Sign in
              </Button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <Button 
                variant="link" 
                className="p-0 text-flipboard-purple hover:text-flipboard-dark-purple" 
                onClick={() => navigate('/signup')}
              >
                Sign up
              </Button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
