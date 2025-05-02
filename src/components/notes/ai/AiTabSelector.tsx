
import { Button } from '@/components/ui/button';

interface AiTabSelectorProps {
  activeTab: 'question' | 'summarize';
  setActiveTab: (tab: 'question' | 'summarize') => void;
}

export function AiTabSelector({ activeTab, setActiveTab }: AiTabSelectorProps) {
  return (
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
  );
}
