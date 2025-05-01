
import React from 'react';
import { 
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { 
  Share, 
  Facebook, 
  Twitter, 
  Linkedin,
  Mail,
  Whatsapp
} from "lucide-react";
import { toast } from "sonner";
import { generateShareableLink, downloadNotePdf } from "@/utils/pdfUtils";

interface Note {
  id: string;
  title: string;
  content: string;
  color?: string;
  subjectId?: string;
  createdAt: string;
  updatedAt: string;
  todos?: {
    id: string;
    text: string;
    isCompleted: boolean;
  }[];
}

interface ShareMenuProps {
  note: Note;
  subjectTitle?: string;
  compact?: boolean;
}

export const ShareMenu = ({ note, subjectTitle, compact = false }: ShareMenuProps) => {
  const handleShare = async (platform: string) => {
    try {
      // First generate the PDF
      await downloadNotePdf(note, subjectTitle);
      
      // Get the note title for the message
      const noteTitle = note.title;
      const message = `Check out my note: ${noteTitle}`;
      let shareUrl = '';

      // Create platform-specific share links
      switch (platform) {
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(message)}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(window.location.href)}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
          break;
        case 'email':
          shareUrl = `mailto:?subject=${encodeURIComponent(`Shared Note: ${noteTitle}`)}&body=${encodeURIComponent(`${message}\n\n${window.location.href}`)}`;
          break;
        default:
          // Copy link to clipboard
          await navigator.clipboard.writeText(window.location.href);
          toast.success('Link copied to clipboard!');
          return;
      }
      
      // Open share URL in a new window
      window.open(shareUrl, '_blank');
      toast.success(`Shared via ${platform}!`);
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share. Please try again.');
    }
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={compact ? "ghost" : "outline"}
          size={compact ? "sm" : "default"}
          className={compact ? "h-7 w-7 p-0" : ""}
        >
          <Share size={compact ? 14 : 18} className={compact ? "" : "mr-1"} />
          {!compact && "Share"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="space-y-2">
          <h4 className="font-medium text-sm mb-3">Share via</h4>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => handleShare('whatsapp')}
          >
            <Whatsapp className="mr-2" size={18} />
            WhatsApp
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => handleShare('facebook')}
          >
            <Facebook className="mr-2" size={18} />
            Facebook
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => handleShare('twitter')}
          >
            <Twitter className="mr-2" size={18} />
            Twitter
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => handleShare('linkedin')}
          >
            <Linkedin className="mr-2" size={18} />
            LinkedIn
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => handleShare('email')}
          >
            <Mail className="mr-2" size={18} />
            Email
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start" 
            onClick={() => handleShare('copy')}
          >
            <Share className="mr-2" size={18} />
            Copy Link
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
