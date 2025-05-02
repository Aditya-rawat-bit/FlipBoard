
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Subject {
  id: string;
  name: string;
  description: string | null;
  color: string;
}

interface SubjectFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (subject: Subject) => void;
  initialData?: Subject | null;
}

export function SubjectForm({ open, onClose, onSave, initialData }: SubjectFormProps) {
  const [formData, setFormData] = useState<Subject>({
    id: '',
    name: '',
    description: '',
    color: 'bg-flipboard-soft-purple'
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
        name: initialData.name || '',
        description: initialData.description || '',
        color: initialData.color || colors[0].value
      });
    } else {
      setFormData({
        id: '',
        name: '',
        description: '',
        color: colors[0].value
      });
    }
  }, [initialData, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (color: string) => {
    setFormData(prev => ({ ...prev, color }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Please enter a subject name');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      onSave(formData);
    } catch (error) {
      console.error('Error saving subject:', error);
      toast.error('Failed to save subject');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit' : 'Create'} Subject
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Subject Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Mathematics"
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Add a brief description of this subject"
              disabled={isSubmitting}
              rows={3}
            />
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
              {isSubmitting ? 'Saving...' : 'Save Subject'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
