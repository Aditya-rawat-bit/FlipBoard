
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MainLayout } from '@/components/layout/MainLayout';
import { toast } from 'sonner';
import { Mail, Lock } from 'lucide-react';

const SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      // Get registered users from localStorage
      const storedUsers = localStorage.getItem('flipboard_registered_users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      
      // Find matching user
      const user = users.find((u: any) => 
        u.email === formData.email && u.password === formData.password
      );
      
      if (!user) {
        toast.error("Invalid login credentials");
        return;
      }
      
      // Create session
      localStorage.setItem('flipboard_auth', JSON.stringify({
        user: {
          id: user.id,
          email: user.email,
          name: user.name || '',
        },
        authenticated: true,
        timestamp: Date.now()
      }));
      
      toast.success('Signed in successfully');
      navigate('/subjects');
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your Flipboard account</p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-10"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="flex justify-between text-sm font-medium text-gray-700">
                  <span>Password</span>
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="pl-10"
                    placeholder="Your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-flipboard-purple hover:bg-flipboard-dark-purple"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-opacity-50 border-t-transparent rounded-full mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
            
            <div className="text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-flipboard-purple hover:text-flipboard-dark-purple">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default SignIn;
