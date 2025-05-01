import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from "@/components/layout/MainLayout";
import { NoteForm } from '@/components/notes/NoteForm';
import { NoteAI } from '@/components/notes/NoteAI';
import { TodoList, Todo } from '@/components/notes/TodoList';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Share, 
  Download,
  Search,
  ListTodo
} from 'lucide-react';
import { toast } from 'sonner';
import { downloadNotePdf } from '@/utils/pdfUtils';

interface Note {
  id: string;
  title: string;
  content: string;
  color?: string;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
  todos?: Todo[];
}

interface Subject {
  id: string;
  title: string;
}

const NoteDetailPage = () => {
  const { subjectId, noteId } = useParams<{ subjectId: string, noteId: string }>();
  const navigate = useNavigate();
  
  const [note, setNote] = useState<Note | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAI, setShowAI] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('flipboard_auth');
    if (!auth) {
      navigate('/signin');
      toast.error('Please sign in to access your notes');
      return;
    }
    
    if (!subjectId || !noteId) {
      navigate('/subjects');
      return;
    }
    
    const savedSubjects = localStorage.getItem('flipboard_subjects');
    if (savedSubjects) {
      const subjects = JSON.parse(savedSubjects);
      const currentSubject = subjects.find((s: Subject) => s.id === subjectId);
      
      if (currentSubject) {
        setSubject(currentSubject);
      } else {
        navigate('/subjects');
        toast.error('Subject not found');
        return;
      }
    }
    
    const savedNotes = localStorage.getItem('flipboard_notes');
    if (savedNotes) {
      const allNotes = JSON.parse(savedNotes);
      const subjectNotes = allNotes[subjectId] || [];
      const currentNote = subjectNotes.find((n: Note) => n.id === noteId);
      
      if (currentNote) {
        setNote(currentNote);
      } else {
        navigate(`/subjects/${subjectId}`);
        toast.error('Note not found');
      }
    }
  }, [subjectId, noteId, navigate]);

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');
    if (confirmDelete && subjectId) {
      const savedNotes = localStorage.getItem('flipboard_notes');
      if (savedNotes && noteId) {
        const allNotes = JSON.parse(savedNotes);
        const subjectNotes = allNotes[subjectId] || [];
        
        allNotes[subjectId] = subjectNotes.filter((note: Note) => note.id !== noteId);
        localStorage.setItem('flipboard_notes', JSON.stringify(allNotes));
        
        const savedSubjects = localStorage.getItem('flipboard_subjects');
        if (savedSubjects) {
          const subjects = JSON.parse(savedSubjects);
          const updatedSubjects = subjects.map((s: Subject) => {
            if (s.id === subjectId) {
              return { 
                ...s, 
                notesCount: (allNotes[subjectId] || []).length 
              };
            }
            return s;
          });
          
          localStorage.setItem('flipboard_subjects', JSON.stringify(updatedSubjects));
        }
        
        toast.success('Note deleted successfully');
        navigate(`/subjects/${subjectId}`);
      }
    }
  };

  const handleSaveNote = (updatedNote: Note) => {
    if (!subjectId) return;
    
    const savedNotes = localStorage.getItem('flipboard_notes');
    if (savedNotes) {
      const allNotes = JSON.parse(savedNotes);
      const subjectNotes = allNotes[subjectId] || [];
      
      allNotes[subjectId] = subjectNotes.map((n: Note) => 
        n.id === updatedNote.id ? updatedNote : n
      );
      
      localStorage.setItem('flipboard_notes', JSON.stringify(allNotes));
      setNote(updatedNote);
    }
  };
  
  const handleTodoChange = (todos: Todo[]) => {
    if (!note) return;
    
    const updatedNote = {
      ...note,
      todos: todos,
      updatedAt: new Date().toISOString()
    };
    
    handleSaveNote(updatedNote);
  };

  const handleShare = () => {
    toast.success('Sharing link copied to clipboard!');
  };

  const handleDownload = () => {
    if (!note || !subject) return;
    
    try {
      downloadNotePdf(note, subject.title);
      toast.success('Note PDF downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  const handleInsertAIText = (text: string) => {
    if (!note) return;
    
    const updatedNote = {
      ...note,
      content: note.content + '\n\n' + text,
      updatedAt: new Date().toISOString()
    };
    
    handleSaveNote(updatedNote);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderContent = (content: string) => {
    return content.split('\n').map((line, idx) => {
      if (line.startsWith('![image]')) {
        const imageUrl = line.match(/\((.*?)\)/)?.[1];
        return imageUrl ? (
          <img 
            key={idx} 
            src={imageUrl} 
            alt="Note attachment" 
            className="max-w-full rounded-lg shadow-sm my-4"
          />
        ) : null;
      }
      return <p key={idx} className="mb-4">{line}</p>;
    });
  };

  if (!note || !subject) return null;

  const todos = note.todos || [];
  const completedTodos = todos.filter(todo => todo.isCompleted).length;
  const hasTodos = todos.length > 0;

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <Button 
          variant="ghost" 
          className="mb-4 hover:bg-flipboard-soft-purple"
          onClick={() => navigate(`/subjects/${subjectId}`)}
        >
          <ArrowLeft size={18} className="mr-1" />
          Back to Notes
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{note.title}</h1>
            <p className="text-sm text-gray-600">
              Updated {formatDate(note.updatedAt)}
            </p>
          </div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="border-flipboard-purple text-flipboard-purple hover:bg-flipboard-soft-purple hover:text-flipboard-purple"
              onClick={() => setShowAI(!showAI)}
            >
              <Search size={18} className="mr-1" />
              {showAI ? 'Hide AI' : 'AI Assistant'}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleDownload}
            >
              <Download size={18} className="mr-1" />
              Download
            </Button>
            
            <Button
              variant="outline"
              onClick={handleShare}
            >
              <Share size={18} className="mr-1" />
              Share
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
            >
              <Edit size={18} className="mr-1" />
              Edit
            </Button>
            
            <Button
              variant="outline"
              className="border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700"
              onClick={handleDelete}
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className={`${showAI ? 'lg:w-2/3' : 'w-full'} space-y-6`}>
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className={`p-4 mb-4 rounded-lg ${note.color || 'bg-flipboard-soft-purple'}`}>
                <h2 className="font-semibold text-xl mb-1">{note.title}</h2>
                <p className="text-sm text-gray-700">in {subject.title}</p>
              </div>
              
              <div className="prose max-w-none">
                {renderContent(note.content)}
              </div>
            </div>
            
            {hasTodos && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <ListTodo size={18} className="mr-2 text-flipboard-purple" />
                    <h3 className="font-semibold">Tasks</h3>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {completedTodos} of {todos.length} completed
                  </div>
                </div>
                
                <TodoList 
                  todos={todos} 
                  onChange={handleTodoChange}
                  readOnly={false}
                />
              </Card>
            )}
          </div>
          
          {showAI && (
            <div className="lg:w-1/3">
              <NoteAI 
                noteContent={note.content} 
                onInsertText={handleInsertAIText}
              />
            </div>
          )}
        </div>
      </div>
      
      {note && subjectId && (
        <NoteForm
          open={isEditing}
          onClose={() => setIsEditing(false)}
          onSave={handleSaveNote}
          initialData={note}
          subjectId={subjectId}
        />
      )}
    </MainLayout>
  );
};

export default NoteDetailPage;
