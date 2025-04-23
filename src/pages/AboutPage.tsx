
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-16 w-16 bg-flipboard-soft-purple rounded-xl flex items-center justify-center text-flipboard-purple mx-auto mb-6">
              <BookOpen size={32} />
            </div>
            <h1 className="text-4xl font-bold mb-4">About Flipboard</h1>
            <p className="text-lg text-gray-600">
              The smart note-taking app designed for students and lifelong learners
            </p>
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At Flipboard, we believe that organized notes are the foundation of effective learning. 
                Our mission is to provide a simple yet powerful platform for students and professionals 
                to capture, organize, and enhance their ideas.
              </p>
              <p className="text-gray-700">
                With our AI-powered features, we aim to make studying more efficient and help users 
                extract maximum value from their notes.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><span className="font-medium">Subject Organization</span> - Group your notes by subject for easy navigation</li>
                <li><span className="font-medium">Rich Text Notes</span> - Create beautiful, formatted notes</li>
                <li><span className="font-medium">AI Assistant</span> - Get answers to your questions based on your notes</li>
                <li><span className="font-medium">Auto Summarization</span> - Generate concise summaries of your lengthy notes</li>
                <li><span className="font-medium">Export & Share</span> - Download notes as PDFs or share them with friends</li>
                <li><span className="font-medium">Cloud Sync</span> - Access your notes from any device</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Get Started Today</h2>
              <p className="text-gray-700 mb-6">
                Join thousands of students and professionals who use Flipboard to enhance their 
                learning and productivity. Sign up for free and experience the power of 
                organized, AI-enhanced note-taking.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-flipboard-purple hover:bg-flipboard-dark-purple">
                  <Link to="/signup">
                    Create free account
                  </Link>
                </Button>
                
                <Button asChild variant="outline">
                  <Link to="/subjects">
                    Explore the app
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
