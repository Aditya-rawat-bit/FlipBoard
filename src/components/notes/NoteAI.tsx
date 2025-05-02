
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { Brain } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ApiKeyInput } from './ai/ApiKeyInput';
import { AiQuestionForm } from './ai/AiQuestionForm';
import { AiResponseDisplay } from './ai/AiResponseDisplay';
import { AiTabSelector } from './ai/AiTabSelector';
import { useGroqAi } from '@/hooks/useGroqAi';

interface NoteAIProps {
  noteContent: string;
  onInsertText: (text: string) => void;
}

export function NoteAI({ noteContent, onInsertText }: NoteAIProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [activeTab, setActiveTab] = useState<'question' | 'summarize'>('question');
  const [showApiInput, setShowApiInput] = useState(!localStorage.getItem('groq_api_key'));
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { 
    apiKey, 
    setApiKey, 
    isLoading, 
    setIsLoading, 
    generateAIResponse, 
    processContent 
  } = useGroqAi();

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
      const content = processContent(noteContent);
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
      const content = processContent(noteContent);
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
          <AiTabSelector 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        )}
      </div>
      
      {showApiInput ? (
        <ApiKeyInput 
          apiKey={apiKey} 
          setApiKey={setApiKey} 
          onSave={handleApiKeySave} 
        />
      ) : (
        <>
          {activeTab === 'question' && (
            <AiQuestionForm 
              question={question} 
              setQuestion={setQuestion} 
              onSubmit={handleQuestionSubmit} 
              isLoading={isLoading} 
              inputRef={inputRef} 
            />
          )}
          
          {activeTab === 'summarize' && (
            <div className="mb-4">
              <button
                onClick={handleSummarize}
                disabled={isLoading || !noteContent.trim()}
                className="w-full bg-flipboard-purple hover:bg-flipboard-dark-purple text-white py-2 px-4 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Generating Summary...' : 'Summarize Note Content'}
              </button>
              {!noteContent.trim() && (
                <p className="text-xs text-red-500 mt-1">Note has no content to summarize</p>
              )}
            </div>
          )}
        </>
      )}

      <AiResponseDisplay 
        answer={answer} 
        isLoading={isLoading} 
        onAddToNotes={handleAddToNotes} 
      />
      
      {!showApiInput && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowApiInput(true)}
            className="text-xs text-gray-500 hover:text-gray-700 py-1 px-2 rounded-md"
          >
            Change API key
          </button>
        </div>
      )}
    </Card>
  );
}
