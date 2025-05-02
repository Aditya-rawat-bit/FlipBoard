
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Key } from 'lucide-react';
import { useState } from 'react';

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  onSave: () => void;
}

export function ApiKeyInput({ apiKey, setApiKey, onSave }: ApiKeyInputProps) {
  const [showKey, setShowKey] = useState(false);
  
  return (
    <div className="mb-4">
      <div className="mb-2 text-sm">
        Please enter your Groq API key to enable AI features:
      </div>
      <div className="flex space-x-2">
        <Input
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Paste your Groq API key here..."
          type={showKey ? "text" : "password"}
          className="flex-1"
        />
        <Button 
          onClick={onSave}
          className="bg-flipboard-purple hover:bg-flipboard-dark-purple"
        >
          <Key size={16} className="mr-1" />
          Save Key
        </Button>
      </div>
      <div className="flex justify-between mt-2">
        <p className="text-xs text-gray-500">
          Get an API key from <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-flipboard-purple">Groq's console</a>
        </p>
        <button 
          onClick={() => setShowKey(!showKey)} 
          className="text-xs text-flipboard-purple"
        >
          {showKey ? 'Hide key' : 'Show key'}
        </button>
      </div>
    </div>
  );
}
