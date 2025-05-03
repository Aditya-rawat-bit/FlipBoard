
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Image } from 'lucide-react';
import { toast } from 'sonner';

interface NoteMediaInputProps {
  onImageAdd: (imageUrl: string) => void;
  onTextAdd: (text: string) => void;
}

export function NoteMediaInput({ onImageAdd, onTextAdd }: NoteMediaInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const transcriptRef = useRef<string>('');

  // Check for speech recognition support on component mount
  useEffect(() => {
    const isSpeechRecognitionSupported = 
      'SpeechRecognition' in window || 
      'webkitSpeechRecognition' in window;
      
    setRecognitionSupported(isSpeechRecognitionSupported);
    
    // Clean up on unmount
    return () => {
      if (recognitionRef.current && isRecording) {
        recognitionRef.current.stop();
      }
    };
  }, []);

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
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    try {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionAPI();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        transcriptRef.current = ''; // Reset transcript
        
        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join(' ');
            
          transcriptRef.current = transcript;
          
          // Only submit final results
          const isFinal = event.results[event.results.length - 1].isFinal;
          if (isFinal) {
            onTextAdd(transcriptRef.current.trim());
          }
        };

        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error);
          toast.error(`Speech recognition error: ${event.error}`);
          setIsRecording(false);
        };

        recognitionRef.current.onend = () => {
          setIsRecording(false);
          // If we have transcript content and it wasn't previously submitted
          if (transcriptRef.current.trim()) {
            onTextAdd(transcriptRef.current.trim());
            transcriptRef.current = ''; // Clear after submission
          }
        };

        recognitionRef.current.start();
        setIsRecording(true);
        toast.success('Started recording...');
      }
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      toast.error('Failed to start speech recognition');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      toast.success('Recording stopped');
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
        disabled={!recognitionSupported}
        title={recognitionSupported ? 
          (isRecording ? 'Stop recording' : 'Start recording') : 
          'Speech recognition not supported in this browser'}
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
