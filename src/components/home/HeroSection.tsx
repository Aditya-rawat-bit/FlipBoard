
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="bg-black text-white py-32 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i}
            className="absolute opacity-10 rounded-full border border-white/10 shadow-xl animate-float"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className={`text-5xl md:text-7xl font-bold mb-6 leading-tight transform transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            Build in a weekend
            <span className="block text-emerald-400">Scale to millions</span>
          </h1>
          
          <p 
            className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white/80 transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            Your digital notebook where ideas stick. Create, organize and share your notes with powerful AI features to enhance your learning.
          </p>
          
          <div 
            className={`flex flex-wrap justify-center gap-4 transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 h-auto rounded">
              <Link to="/signup">
                Get Started
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="border-gray-700 bg-black text-white hover:bg-gray-900 px-8 py-6 h-auto rounded flex items-center gap-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
                <span>GitHub</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-24 text-center text-white/50 text-sm">
        <p>Trusted by fast-growing companies worldwide</p>
        <div className="flex justify-center items-center gap-8 mt-6 flex-wrap">
          {['Mozilla', 'GitHub', '1Password', 'Vercel', 'Netlify'].map((company) => (
            <span key={company} className="opacity-50 hover:opacity-80 transition-opacity">
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
