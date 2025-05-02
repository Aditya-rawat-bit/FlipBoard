
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function CTASection() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('flipboard_auth');
      setIsAuthenticated(!!auth);
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

  return (
    <section className="bg-flipboard-soft-purple py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-3xl font-bold mb-4">Ready to get organized?</h2>
            <p className="text-lg text-gray-700 max-w-lg">
              Join thousands of students and professionals who use Flipboard to stay organized, boost productivity, and enhance their learning.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {isAuthenticated ? (
              <Button asChild size="lg" className="bg-flipboard-purple hover:bg-flipboard-dark-purple text-white">
                <Link to="/subjects">
                  Go to my subjects
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="bg-flipboard-purple hover:bg-flipboard-dark-purple text-white">
                  <Link to="/signup">
                    Sign up for free
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="border-flipboard-purple text-flipboard-purple hover:bg-flipboard-purple hover:text-white">
                  <Link to="/signin">
                    Sign in
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
