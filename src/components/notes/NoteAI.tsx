
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface NoteAIProps {
  noteContent: string;
  onInsertText: (text: string) => void;
}

export function NoteAI({ noteContent, onInsertText }: NoteAIProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'question' | 'summarize'>('question');

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }
    
    setIsLoading(true);
    setAnswer('');
    
    try {
      // Simulate AI API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let response = '';
      if (question.toLowerCase().includes('explain') || question.toLowerCase().includes('what is')) {
        response = `${question.trim()}?\n\nBased on the content, here's a simplified explanation:\n\n`;
        response += "This topic refers to an important concept in this subject. ";
        response += "It's characterized by specific principles that you need to understand. ";
        response += "In essence, it works by following a structured approach to problem-solving. ";
        response += "Remember to apply these concepts when working on related problems.";
      } else {
        response = `${question.trim()}?\n\nBased on the available content, here's a concise answer:\n\n`;
        response += "The key points to remember are:\n";
        response += "1. This concept is fundamental to understanding the broader topic\n";
        response += "2. There are several approaches to solving these problems\n";
        response += "3. Remember to apply the formula correctly in each situation\n";
        response += "4. Practice with different examples to master this concept";
      }
      
      setAnswer(response);
    } catch (error) {
      console.error("Error processing question:", error);
      toast.error("Failed to process your question. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (!noteContent.trim()) {
      toast.error("There's no content to summarize");
      return;
    }
    
    setIsLoading(true);
    setAnswer('');
    
    try {
      // Simulate AI API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const summary = "# Summary of Your Note\n\n" +
        "## Key Points\n\n" +
        "- This note covers important concepts related to the subject\n" +
        "- Several key theories are discussed and explained\n" +
        "- Examples are provided to illustrate practical applications\n\n" +
        "## Important Definitions\n\n" +
        "1. Term One: A fundamental concept in this field\n" +
        "2. Term Two: An important methodology used for analysis\n" +
        "3. Term Three: A critical component of the overall system\n\n" +
        "## Conclusion\n\n" +
        "This note provides a comprehensive overview of the topic, highlighting key areas for further study.";
      
      setAnswer(summary);
    } catch (error) {
      console.error("Error summarizing content:", error);
      toast.error("Failed to summarize content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToNotes = () => {
    if (!answer) return;
    
    onInsertText(answer);
    toast.success("AI content added to your note");
    setAnswer('');
    setQuestion('');
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold text-gray-800">AI Assistant</h3>
        
        <div className="flex rounded-md overflow-hidden">
          <Button
            variant={activeTab === 'question' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('question')}
            className={activeTab === 'question' ? 'bg-flipboard-purple hover:bg-flipboard-dark-purple' : ''}
          >
            Ask Question
          </Button>
          <Button
            variant={activeTab === 'summarize' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('summarize')}
            className={activeTab === 'summarize' ? 'bg-flipboard-purple hover:bg-flipboard-dark-purple' : ''}
          >
            Summarize
          </Button>
        </div>
      </div>
      
      {activeTab === 'question' && (
        <form onSubmit={handleQuestionSubmit} className="mb-4">
          <div className="flex space-x-2">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about your notes..."
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-flipboard-purple hover:bg-flipboard-dark-purple whitespace-nowrap"
            >
              {isLoading ? 'Thinking...' : 'Ask AI'}
            </Button>
          </div>
        </form>
      )}
      
      {activeTab === 'summarize' && (
        <div className="mb-4">
          <Button
            onClick={handleSummarize}
            disabled={isLoading}
            className="w-full bg-flipboard-purple hover:bg-flipboard-dark-purple"
          >
            {isLoading ? 'Generating Summary...' : 'Summarize Note Content'}
          </Button>
        </div>
      )}
      
      {answer && (
        <div className="mt-4">
          <div className="p-3 bg-gray-50 rounded-md border mb-2">
            <Textarea 
              value={answer} 
              readOnly
              className="min-h-[150px] bg-transparent border-none focus-visible:ring-0 p-0"
            />
          </div>
          
          <Button
            onClick={handleAddToNotes}
            variant="outline"
            size="sm"
            className="w-full border-flipboard-purple text-flipboard-purple hover:bg-flipboard-purple hover:text-white"
          >
            Insert into Note
          </Button>
        </div>
      )}
      
      {isLoading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-flipboard-purple" />
        </div>
      )}
    </div>
  );
}
