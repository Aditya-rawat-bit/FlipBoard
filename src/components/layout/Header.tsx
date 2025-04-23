
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  BookOpen, 
  LogIn, 
  User,
  Menu,
  X 
} from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  const isLoggedIn = localStorage.getItem('flipboard_auth') ? true : false;

  return (
    <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-flipboard-purple rounded-md flex items-center justify-center text-white">
            <BookOpen size={20} className="animate-float" />
          </div>
          <span className="font-bold text-xl text-flipboard-dark-bg">Flipboard</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`hover:text-flipboard-purple transition-colors ${isActive('/') ? 'text-flipboard-purple font-medium' : ''}`}>
            Home
          </Link>
          
          {isLoggedIn && (
            <>
              <Link to="/subjects" className={`hover:text-flipboard-purple transition-colors ${isActive('/subjects') ? 'text-flipboard-purple font-medium' : ''}`}>
                Subjects
              </Link>
              <Link to="/profile" className={`hover:text-flipboard-purple transition-colors ${isActive('/profile') ? 'text-flipboard-purple font-medium' : ''}`}>
                Profile
              </Link>
            </>
          )}

          {isLoggedIn ? (
            <Button asChild variant="default" className="bg-flipboard-purple hover:bg-flipboard-dark-purple">
              <Link to="/subjects">
                My Notes
              </Link>
            </Button>
          ) : (
            <div className="flex items-center space-x-3">
              <Button asChild variant="ghost">
                <Link to="/signin">
                  <LogIn size={18} className="mr-1" />
                  Sign in
                </Link>
              </Button>
              <Button asChild variant="default" className="bg-flipboard-purple hover:bg-flipboard-dark-purple">
                <Link to="/signup">
                  <User size={18} className="mr-1" />
                  Sign up
                </Link>
              </Button>
            </div>
          )}
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden p-4 bg-white border-t animate-fade-in">
          <ul className="space-y-3">
            <li>
              <Link 
                to="/" 
                className={`flex items-center p-2 rounded-md hover:bg-flipboard-soft-purple transition-colors ${isActive('/') ? 'bg-flipboard-soft-purple text-flipboard-purple font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={18} className="mr-2" />
                Home
              </Link>
            </li>
            
            {isLoggedIn && (
              <>
                <li>
                  <Link 
                    to="/subjects" 
                    className={`flex items-center p-2 rounded-md hover:bg-flipboard-soft-purple transition-colors ${isActive('/subjects') ? 'bg-flipboard-soft-purple text-flipboard-purple font-medium' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BookOpen size={18} className="mr-2" />
                    Subjects
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/profile" 
                    className={`flex items-center p-2 rounded-md hover:bg-flipboard-soft-purple transition-colors ${isActive('/profile') ? 'bg-flipboard-soft-purple text-flipboard-purple font-medium' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} className="mr-2" />
                    Profile
                  </Link>
                </li>
              </>
            )}
            
            {!isLoggedIn && (
              <>
                <li>
                  <Link 
                    to="/signin" 
                    className="flex items-center p-2 rounded-md hover:bg-flipboard-soft-purple transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn size={18} className="mr-2" />
                    Sign in
                  </Link>
                </li>
                <li>
                  <Button 
                    asChild 
                    variant="default" 
                    className="w-full bg-flipboard-purple hover:bg-flipboard-dark-purple"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/signup">
                      <User size={18} className="mr-2" />
                      Sign up
                    </Link>
                  </Button>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
