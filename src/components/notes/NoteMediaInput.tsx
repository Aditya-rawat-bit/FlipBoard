
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Image } from 'lucide-react';
import { toast } from 'sonner';

interface NoteMediaInputProps {
  onImageAdd: (imageUrl: string) => void;
  onTextAdd: (text: string) => void;
}

export function NoteMediaInput({ onImageAdd, onTextAdd }: NoteMediaInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recognitionSupported] = useState('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  const recognitionRef = useRef<any>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onImageAdd(imageUrl);
        toast.success('Image added successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleRecording = () => {
    if (!recognitionSupported) {
      toast.error('Speech recognition is not supported in your browser');
      return;
    }

    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join(' ');
          
        if (event.results[0].isFinal) {
          onTextAdd(transcript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        toast.error('Error with speech recognition');
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current.start();
      setIsRecording(true);
      toast.success('Started recording...');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={toggleRecording}
        className={`${isRecording ? 'bg-red-100 text-red-600 hover:bg-red-200' : ''}`}
      >
        {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
      </Button>

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => document.getElementById('image-upload')?.click()}
      >
        <Image size={18} />
      </Button>

      <input
        type="file"
        id="image-upload"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );
}
