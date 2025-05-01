
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, Brain } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface NoteAIProps {
  noteContent: string;
  onInsertText: (text: string) => void;
}

export function NoteAI({ noteContent, onInsertText }: NoteAIProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'question' | 'summarize'>('question');
  const inputRef = useRef<HTMLInputElement>(null);

  // Process the note content for AI requests
  const processContent = () => {
    // Make sure we have content to process
    if (!noteContent || noteContent.trim() === '') {
      return 'No content available to process.';
    }
    
    // Limit content length for performance
    const maxLength = 5000;
    if (noteContent.length > maxLength) {
      return noteContent.substring(0, maxLength) + "...";
    }
    return noteContent;
  };

  const generateAIResponse = async (prompt: string, contentToProcess: string): Promise<string> => {
    // This is a simulation of AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // If there's no content, return an error message
    if (contentToProcess === 'No content available to process.' || !contentToProcess.trim()) {
      return "I couldn't find any content to analyze. Please add some text to your note first.";
    }
    
    // Generate different response patterns based on the prompt
    if (prompt.toLowerCase().includes('summarize')) {
      // Extract actual content from the note for summarization
      const contentSample = contentToProcess.substring(0, 200).replace(/\n/g, ' ');
      
      return "# Summary of Your Note\n\n" +
        "## Key Points\n\n" +
        `- This note starts with: "${contentSample}..."\n` +
        `- The note contains approximately ${contentToProcess.length} characters\n` +
        "- The content appears to discuss topics related to your subject\n\n" +
        "## Content Analysis\n\n" +
        "1. Main Ideas: Your note contains information that seems important for this subject\n" +
        "2. Structure: The note has " + (contentToProcess.split('\n').length) + " paragraphs or sections\n" +
        "3. Key Elements: There are " + (contentToProcess.match(/[.!?]/g)?.length || 0) + " sentences in your note\n\n" +
        "## Conclusion\n\n" +
        "This note provides information on your topic. Consider expanding certain sections or adding examples for clarity.";
    } else if (prompt.toLowerCase().includes('explain') || prompt.toLowerCase().includes('what is')) {
      return `${prompt.trim()}?\n\nBased on the content, here's a simplified explanation:\n\n` +
        "This topic refers to an important concept in this subject. " +
        "I've analyzed your notes and found relevant information about this topic. " +
        "In essence, it works by following principles outlined in your notes. " +
        "The key elements mentioned in your content suggest this is a significant area of study.";
    } else {
      return `${prompt.trim()}?\n\nBased on your note content (${contentToProcess.length} characters), here's a response:\n\n` +
        "After analyzing your notes, I can provide these insights:\n" +
        "1. Your notes contain information that relates to this question\n" +
        "2. There appear to be several concepts mentioned that would help address this query\n" +
        "3. The context suggests this is an important topic in your subject\n" +
        "4. Consider reviewing sections of your notes that discuss related principles";
    }
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }
    
    setIsLoading(true);
    setAnswer('');
    
    try {
      const content = processContent();
      const prompt = question.trim();
      const response = await generateAIResponse(prompt, content);
      setAnswer(response);
      
      // Focus back on input for better UX
      setTimeout(() => inputRef.current?.focus(), 100);
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
      const content = processContent();
      const prompt = "Summarize the following content";
      const summary = await generateAIResponse(prompt, content);
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
    <Card className="p-4 bg-white shadow-sm">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center">
          <Brain size={18} className="mr-2 text-flipboard-purple" />
          AI Assistant
        </h3>
        
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
              ref={inputRef}
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
            disabled={isLoading || !noteContent.trim()}
            className="w-full bg-flipboard-purple hover:bg-flipboard-dark-purple"
          >
            {isLoading ? 'Generating Summary...' : 'Summarize Note Content'}
          </Button>
          {!noteContent.trim() && (
            <p className="text-xs text-red-500 mt-1">Note has no content to summarize</p>
          )}
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
    </Card>
  );
}
