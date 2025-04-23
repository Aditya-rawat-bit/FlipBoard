
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface NoteFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (note: any) => void;
  initialData?: any;
  subjectId: string;
}

export function NoteForm({ open, onClose, onSave, initialData, subjectId }: NoteFormProps) {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    content: '',
    color: '',
    subjectId: subjectId
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const colors = [
    { name: 'Purple', value: 'bg-flipboard-soft-purple' },
    { name: 'Pink', value: 'bg-flipboard-soft-pink' },
    { name: 'Blue', value: 'bg-flipboard-soft-blue' }
  ];

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        title: initialData.title || '',
        content: initialData.content || '',
        color: initialData.color || colors[0].value,
        subjectId: subjectId
      });
    } else {
      setFormData({
        id: '',
        title: '',
        content: '',
        color: colors[0].value,
        subjectId: subjectId
      });
    }
  }, [initialData, open, subjectId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (color: string) => {
    setFormData(prev => ({ ...prev, color }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Please enter a note title');
      return;
    }
    
    setIsSubmitting(true);
    
    // Generate ID if it doesn't exist (new note)
    const noteData = {
      ...formData,
      id: formData.id || `note_${Date.now()}`,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Simulate API call
    setTimeout(() => {
      try {
        onSave(noteData);
        toast.success(`Note ${initialData ? 'updated' : 'created'} successfully`);
        onClose();
      } catch (error) {
        console.error('Error saving note:', error);
        toast.error('Failed to save note');
      } finally {
        setIsSubmitting(false);
      }
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit' : 'Create'} Note
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Note Title
            </label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Chapter 1 Summary"
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <div className="border rounded-md">
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your note here..."
                disabled={isSubmitting}
                rows={10}
                className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-flipboard-purple focus:border-transparent rounded-md"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="flex space-x-3">
              {colors.map(color => (
                <button
                  key={color.value}
                  type="button"
                  className={`h-8 w-8 rounded-full border-2 transition-all ${formData.color === color.value ? 'border-flipboard-purple ring-2 ring-flipboard-purple/20' : 'border-transparent'}`}
                  onClick={() => handleColorChange(color.value)}
                >
                  <span className={`block h-full w-full rounded-full ${color.value}`}></span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-flipboard-purple hover:bg-flipboard-dark-purple"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Note'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
