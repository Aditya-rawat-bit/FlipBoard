
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";

interface AuthFormProps {
  isSignUp?: boolean;
}

export function AuthForm({ isSignUp = false }: AuthFormProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

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
    
    // Supabase integration would go here
    // For now we'll just simulate authentication
    setTimeout(() => {
      try {
        // Store auth in localStorage temporarily
        localStorage.setItem('flipboard_auth', JSON.stringify({
          user: {
            id: '123',
            email: formData.email,
            name: formData.name || 'User'
          }
        }));
        
        toast.success(`${isSignUp ? 'Sign up' : 'Sign in'} successful`);
        navigate('/subjects');
      } catch (error) {
        console.error('Auth error:', error);
        toast.error(`Failed to ${isSignUp ? 'sign up' : 'sign in'}`);
      } finally {
        setIsLoading(false);
      }
    }, 1500);
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
