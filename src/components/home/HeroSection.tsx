
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return <section className="bg-white text-black py-32 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({
        length: 15
      }).map((_, i) => <div key={i} className="absolute opacity-10 rounded-full border border-black/10 shadow-xl animate-float" style={{
        width: `${Math.random() * 200 + 50}px`,
        height: `${Math.random() * 200 + 50}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`
      }}>
          </div>)}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight transform transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Capture ideas,
            <span className="block text-flipboard-purple">Organize knowledge</span>
          </h1>
          
          <p className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-600 transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Your digital notebook where ideas stick. Create, organize and share your notes with powerful AI features to enhance your learning.
          </p>
          
          <div className={`flex flex-wrap justify-center gap-4 transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {isAuthenticated ? (
              <Button asChild size="lg" className="bg-flipboard-purple hover:bg-flipboard-dark-purple text-white px-8 py-6 h-auto rounded">
                <Link to="/subjects" className="mx-0 py-[10px]">
                  My Subjects
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="bg-flipboard-purple hover:bg-flipboard-dark-purple text-white px-8 py-6 h-auto rounded">
                  <Link to="/signup" className="mx-0 py-[10px]">
                    Get Started
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="border-gray-300 bg-white text-gray-800 hover:bg-gray-100 px-8 py-6 h-auto rounded">
                  <Link to="/signin" className="mx-0 py-[10px]">
                    Sign In
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>;
}
