
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="h-8 w-8 bg-flipboard-purple rounded-md flex items-center justify-center text-white">
              <BookOpen size={20} />
            </div>
            <span className="font-bold text-xl text-flipboard-dark-bg">Flipboard</span>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-flipboard-purple transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-flipboard-purple transition-colors">
              About
            </Link>
            <a href="#features" className="text-gray-600 hover:text-flipboard-purple transition-colors">
              Features
            </a>
          </div>
        </div>
        
        <div className="border-t mt-6 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Flipboard. All rights reserved.</p>
          <p className="mt-1">A beautiful note-taking application for everyone.</p>
        </div>
      </div>
    </footer>
  );
}
