
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface SubjectCardProps {
  subject: {
    id: string;
    title: string;
    description: string;
    notesCount: number;
    color?: string;
  };
  onEdit: (subject: any) => void;
  onDelete: (id: string) => void;
}

export function SubjectCard({ subject, onEdit, onDelete }: SubjectCardProps) {
  const [isHovering, setIsHovering] = useState(false);

  const colors = [
    "bg-flipboard-soft-purple",
    "bg-flipboard-soft-pink",
    "bg-flipboard-soft-blue"
  ];
  
  const bgColor = subject.color || colors[Math.floor(Math.random() * colors.length)];

  return (
    <Card 
      className={`${bgColor} hover-lift overflow-hidden`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link to={`/subjects/${subject.id}`} className="block h-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold">{subject.title}</h3>
            
            <div className={`flex space-x-2 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit(subject);
                }}
              >
                <Edit size={16} />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-100"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(subject.id);
                }}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4 line-clamp-2">{subject.description}</p>
          
          <div className="text-sm text-gray-600">
            {subject.notesCount} {subject.notesCount === 1 ? 'Note' : 'Notes'}
          </div>
        </div>
      </Link>
    </Card>
  );
}
