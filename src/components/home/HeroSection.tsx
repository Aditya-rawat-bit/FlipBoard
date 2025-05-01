
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Edit, Share, Download, Search } from 'lucide-react';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="hero-gradient text-white py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <div 
            key={i}
            className="absolute opacity-10 rounded-xl bg-white shadow-xl animate-float"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className={`mb-6 mx-auto w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <BookOpen size={40} className="text-flipboard-purple" />
          </div>
          
          <h1 
            className={`text-4xl md:text-6xl font-bold mb-6 leading-tight transform transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            Organize your thoughts with Flipboard
          </h1>
          
          <p 
            className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90 transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            Your digital notebook where ideas stick. Create, organize and share your notes with powerful AI features to enhance your learning.
          </p>
          
          <div 
            className={`flex flex-wrap justify-center gap-4 transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <Button asChild size="lg" className="bg-white text-flipboard-purple hover:bg-gray-100 hover:text-flipboard-dark-purple">
              <Link to="/signup">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-10 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background"></div>
    </section>
  );
}
