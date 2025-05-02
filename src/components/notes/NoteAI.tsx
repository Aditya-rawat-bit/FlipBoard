
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, Brain, Key } from 'lucide-react';
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
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('groq_api_key') || '';
  });
  const [showApiInput, setShowApiInput] = useState(!localStorage.getItem('groq_api_key'));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('groq_api_key', apiKey);
    }
  }, [apiKey]);

  // Process the note content for AI requests
  const processContent = () => {
    // Make sure we have content to process
    if (!noteContent || noteContent.trim() === '') {
      return 'No content available to process.';
    }
    
    // Limit content length for performance
    const maxLength = 8000;
    if (noteContent.length > maxLength) {
      return noteContent.substring(0, maxLength) + "...";
    }
    return noteContent;
  };

  const generateAIResponse = async (prompt: string, contentToProcess: string): Promise<string> => {
    if (!apiKey) {
      return "Please provide a valid Groq API key to use the AI features.";
    }

    if (contentToProcess === 'No content available to process.' || !contentToProcess.trim()) {
      return "I couldn't find any content to analyze. Please add some text to your note first.";
    }

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            {
              role: 'system',
              content: 'You are an educational assistant that helps analyze notes and answer questions about content. Be concise, accurate, and helpful. Format your response in markdown.'
            },
            {
              role: 'user',
              content: prompt.toLowerCase().includes('summarize') 
                ? `Summarize the following note content: ${contentToProcess}` 
                : `Based on this note content: ${contentToProcess}\n\nPlease answer the following question: ${prompt}`
            }
          ],
          temperature: 0.5,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to generate response');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error: any) {
      console.error("Error calling Groq API:", error);
      throw new Error(error.message || 'Failed to generate response');
    }
  };

  const handleApiKeySave = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    localStorage.setItem('groq_api_key', apiKey);
    toast.success("API key saved successfully");
    setShowApiInput(false);
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }
    
    if (!apiKey) {
      toast.error("Please provide a Groq API key");
      setShowApiInput(true);
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
    } catch (error: any) {
      console.error("Error processing question:", error);
      toast.error(error.message || "Failed to process your question. Please try again.");
      if (error.message?.includes('API key')) {
        setShowApiInput(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (!noteContent.trim()) {
      toast.error("There's no content to summarize");
      return;
    }
    
    if (!apiKey) {
      toast.error("Please provide a Groq API key");
      setShowApiInput(true);
      return;
    }
    
    setIsLoading(true);
    setAnswer('');
    
    try {
      const content = processContent();
      const prompt = "Summarize the following content";
      const summary = await generateAIResponse(prompt, content);
      setAnswer(summary);
    } catch (error: any) {
      console.error("Error summarizing content:", error);
      toast.error(error.message || "Failed to summarize content. Please try again.");
      if (error.message?.includes('API key')) {
        setShowApiInput(true);
      }
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
          AI Assistant (Groq)
        </h3>
        
        {!showApiInput && (
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
        )}
      </div>
      
      {showApiInput ? (
        <div className="mb-4">
          <div className="mb-2 text-sm">
            Please enter your Groq API key to enable AI features:
          </div>
          <div className="flex space-x-2">
            <Input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste your Groq API key here..."
              type="password"
              className="flex-1"
            />
            <Button 
              onClick={handleApiKeySave}
              className="bg-flipboard-purple hover:bg-flipboard-dark-purple"
            >
              <Key size={16} className="mr-1" />
              Save Key
            </Button>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            You can get an API key from <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-flipboard-purple">Groq's console</a>
          </p>
        </div>
      ) : (
        <>
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
        </>
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
      
      {!showApiInput && (
        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowApiInput(true)}
            className="text-xs text-gray-500"
          >
            <Key size={12} className="mr-1" />
            Change API key
          </Button>
        </div>
      )}
    </Card>
  );
}
