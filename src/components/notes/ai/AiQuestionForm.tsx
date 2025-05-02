
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AiQuestionFormProps {
  question: string;
  setQuestion: (question: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

export function AiQuestionForm({ 
  question, 
  setQuestion, 
  onSubmit, 
  isLoading, 
  inputRef 
}: AiQuestionFormProps) {
  return (
    <form onSubmit={onSubmit} className="mb-4">
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
  );
}
