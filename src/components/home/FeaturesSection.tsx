
import { Edit, Search, Share, Download, BookOpen } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <div 
      className="bg-white p-6 rounded-xl shadow-md hover-lift"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="h-12 w-12 bg-flipboard-soft-purple rounded-lg flex items-center justify-center text-flipboard-purple mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: <BookOpen size={24} />,
      title: "Organize by Subjects",
      description: "Create and organize notes by subject to keep your thoughts structured and easy to find.",
      delay: 100
    },
    {
      icon: <Edit size={24} />,
      title: "Rich Editing",
      description: "Write, format and edit your notes with our intuitive rich text editor.",
      delay: 200
    },
    {
      icon: <Search size={24} />,
      title: "Powerful Search",
      description: "Quickly find notes across all your subjects with our powerful search functionality.",
      delay: 300
    },
    {
      icon: <Search size={24} />,
      title: "AI Assistance",
      description: "Ask questions and get instant answers or summaries with our AI-powered features.",
      delay: 400
    },
    {
      icon: <Share size={24} />,
      title: "Easy Sharing",
      description: "Share your notes with friends or colleagues with just a few clicks.",
      delay: 500
    },
    {
      icon: <Download size={24} />,
      title: "Export Notes",
      description: "Export your notes as PDF files to read offline or print for studying.",
      delay: 600
    },
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Flipboard comes packed with features to help you capture, organize and share your ideas effectively.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
