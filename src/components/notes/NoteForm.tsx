
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { NoteMediaInput } from './NoteMediaInput';
import { TodoList, Todo } from './TodoList';
import { ListTodo, FileText } from 'lucide-react';

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
    subjectId: subjectId,
    images: [] as string[],
    todos: [] as Todo[]
  });
  
  const [activeTab, setActiveTab] = useState<'content' | 'todos'>('content');
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
        subjectId: subjectId,
        images: initialData.images || [],
        todos: initialData.todos || []
      });
    } else {
      setFormData({
        id: '',
        title: '',
        content: '',
        color: colors[0].value,
        subjectId: subjectId,
        images: [],
        todos: []
      });
    }
  }, [initialData, open, subjectId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageAdd = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      content: prev.content + `\n![image](${imageUrl})`,
      images: [...prev.images, imageUrl]
    }));
  };

  const handleTextAdd = (text: string) => {
    setFormData(prev => ({
      ...prev,
      content: prev.content + (prev.content ? '\n' : '') + text
    }));
  };

  const handleColorChange = (color: string) => {
    setFormData(prev => ({ ...prev, color }));
  };
  
  const handleTodosChange = (todos: Todo[]) => {
    setFormData(prev => ({ ...prev, todos }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Please enter a note title');
      return;
    }
    
    setIsSubmitting(true);
    
    const noteData = {
      ...formData,
      id: formData.id || `note_${Date.now()}`,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
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
          <DialogDescription>
            Add content using text, voice, images, or tasks
          </DialogDescription>
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
          
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'content' | 'todos')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="content" className="flex items-center">
                <FileText size={16} className="mr-1" />
                Note Content
              </TabsTrigger>
              <TabsTrigger value="todos" className="flex items-center">
                <ListTodo size={16} className="mr-1" />
                Tasks
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="mt-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <NoteMediaInput 
                    onImageAdd={handleImageAdd}
                    onTextAdd={handleTextAdd}
                  />
                </div>
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
            </TabsContent>
            
            <TabsContent value="todos" className="mt-4">
              <div className="border rounded-md p-3 min-h-[220px]">
                <p className="text-sm text-gray-600 mb-3">Add tasks to track progress</p>
                <TodoList 
                  todos={formData.todos} 
                  onChange={handleTodosChange}
                />
              </div>
            </TabsContent>
          </Tabs>
          
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
