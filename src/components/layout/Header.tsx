
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, User, X, BookOpen, Info, FileQuestion } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('flipboard_auth');
      if (auth) {
        try {
          const authData = JSON.parse(auth);
          setUser(authData.user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing auth data:', error);
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
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

  const handleLogout = () => {
    localStorage.removeItem('flipboard_auth');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('You have been signed out');
    navigate('/');
    
    // Dispatch event for other components to know
    window.dispatchEvent(new Event('authChange'));
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-flipboard-purple">Flipboard</span>
          </Link>
          
          {isMobile ? (
            <div className="flex items-center">
              <button 
                onClick={toggleMenu} 
                className="p-2 text-gray-600 focus:outline-none"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          ) : (
            <nav className="flex items-center space-x-6">
              <Link to="/about" className="text-gray-600 hover:text-flipboard-purple transition-colors">
                About
              </Link>
              
              <Link to="/project-qa" className="text-gray-600 hover:text-flipboard-purple transition-colors flex items-center">
                <FileQuestion size={16} className="mr-1" />
                Project Q&A
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/subjects" className="text-gray-600 hover:text-flipboard-purple transition-colors flex items-center">
                    <BookOpen size={16} className="mr-1" />
                    My Subjects
                  </Link>
                  
                  <div className="flex items-center space-x-2">
                    <Link to="/profile">
                      <Button variant="ghost" size="sm" className="flex items-center">
                        <User size={18} className="mr-1" />
                        <span>{user?.name || 'Profile'}</span>
                      </Button>
                    </Link>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleLogout}
                      className="flex items-center"
                    >
                      <LogOut size={18} className="mr-1" />
                      <span>Sign Out</span>
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/signin">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="bg-flipboard-purple hover:bg-flipboard-purple/90">Sign Up</Button>
                  </Link>
                </div>
              )}
            </nav>
          )}
        </div>
        
        {/* Mobile menu */}
        {isMobile && menuOpen && (
          <nav className="mt-4 py-2 border-t">
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className="block py-2 px-4 hover:bg-gray-100 rounded text-gray-600"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Info size={16} className="mr-2" />
                    About
                  </div>
                </Link>
              </li>
              
              <li>
                <Link 
                  to="/project-qa" 
                  className="block py-2 px-4 hover:bg-gray-100 rounded text-gray-600"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <FileQuestion size={16} className="mr-2" />
                    Project Q&A
                  </div>
                </Link>
              </li>
              
              {isAuthenticated && (
                <>
                  <li>
                    <Link 
                      to="/subjects" 
                      className="block py-2 px-4 hover:bg-gray-100 rounded text-gray-600"
                      onClick={() => setMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <BookOpen size={16} className="mr-2" />
                        My Subjects
                      </div>
                    </Link>
                  </li>
                  
                  <li>
                    <Link 
                      to="/profile" 
                      className="block py-2 px-4 hover:bg-gray-100 rounded text-gray-600"
                      onClick={() => setMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <User size={16} className="mr-2" />
                        Profile
                      </div>
                    </Link>
                  </li>
                  
                  <li>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      className="flex items-center w-full text-left py-2 px-4 hover:bg-gray-100 rounded text-gray-600"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </li>
                </>
              )}
              
              {!isAuthenticated && (
                <>
                  <li>
                    <Link 
                      to="/signin" 
                      className="block py-2 px-4 hover:bg-gray-100 rounded text-gray-600"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </li>
                  
                  <li>
                    <Link 
                      to="/signup" 
                      className="block py-2 px-4 bg-flipboard-purple text-white rounded"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
