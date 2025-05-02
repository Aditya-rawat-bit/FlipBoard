
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface AiResponseDisplayProps {
  answer: string;
  isLoading: boolean;
  onAddToNotes: () => void;
}

export function AiResponseDisplay({ 
  answer, 
  isLoading, 
  onAddToNotes 
}: AiResponseDisplayProps) {
  return (
    <>
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
            onClick={onAddToNotes}
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
    </>
  );
}
