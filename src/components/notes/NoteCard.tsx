
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Share, Download } from 'lucide-react';
import { toast } from 'sonner';

interface NoteCardProps {
  note: {
    id: string;
    title: string;
    content: string;
    color?: string;
    createdAt: string;
    updatedAt: string;
  };
  subjectId: string;
  onEdit: (note: any) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, subjectId, onEdit, onDelete }: NoteCardProps) {
  const [isHovering, setIsHovering] = useState(false);

  const colors = [
    "bg-flipboard-soft-purple",
    "bg-flipboard-soft-pink",
    "bg-flipboard-soft-blue"
  ];
  
  const bgColor = note.color || colors[Math.floor(Math.random() * colors.length)];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // In a real app, this would generate a sharing link
    toast.success('Sharing link copied to clipboard!');
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // In a real app, this would generate a PDF
    toast.success('Note PDF is being prepared for download!');
  };

  return (
    <Card 
      className={`${bgColor} hover-lift overflow-hidden`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link to={`/subjects/${subjectId}/notes/${note.id}`} className="block h-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold line-clamp-1">{note.title}</h3>
            
            <div className={`flex space-x-1 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit(note);
                }}
              >
                <Edit size={14} />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0"
                onClick={handleShare}
              >
                <Share size={14} />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0"
                onClick={handleDownload}
              >
                <Download size={14} />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-100"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(note.id);
                }}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>
          
          <div className="text-gray-700 mb-4 line-clamp-3 text-sm">
            {note.content.replace(/<[^>]*>?/gm, '')}
          </div>
          
          <div className="text-xs text-gray-600 mt-auto">
            Updated {formatDate(note.updatedAt)}
          </div>
        </div>
      </Link>
    </Card>
  );
}
