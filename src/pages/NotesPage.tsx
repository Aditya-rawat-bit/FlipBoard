
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from "@/components/layout/MainLayout";
import { NoteCard } from '@/components/notes/NoteCard';
import { NoteForm } from '@/components/notes/NoteForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface Note {
  id: string;
  title: string;
  content: string;
  color?: string;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
}

interface Subject {
  id: string;
  title: string;
  description: string;
  color?: string;
}

// Sample initial data for testing
const sampleNotes = {
  "subject_1": [
    {
      id: "note_1_1",
      title: "Introduction to Calculus",
      content: "Calculus is the mathematical study of continuous change. It has two major branches: differential calculus and integral calculus.",
      subjectId: "subject_1",
      color: "bg-flipboard-soft-purple",
      createdAt: "2023-01-15T12:30:00Z",
      updatedAt: "2023-01-15T12:30:00Z"
    },
    {
      id: "note_1_2",
      title: "Linear Algebra Basics",
      content: "Linear algebra is a branch of mathematics that focuses on linear equations and their representations through matrices and vector spaces.",
      subjectId: "subject_1",
      color: "bg-flipboard-soft-pink",
      createdAt: "2023-01-17T10:15:00Z",
      updatedAt: "2023-01-18T09:30:00Z"
    }
  ],
  "subject_2": [
    {
      id: "note_2_1",
      title: "Newton's Laws of Motion",
      content: "Newton's three laws of motion describe the relationship between the motion of an object and the forces acting on it.",
      subjectId: "subject_2",
      color: "bg-flipboard-soft-blue",
      createdAt: "2023-02-05T14:20:00Z",
      updatedAt: "2023-02-06T11:45:00Z"
    }
  ],
  "subject_3": [
    {
      id: "note_3_1",
      title: "Data Structures Overview",
      content: "Data structures are specialized formats for organizing, processing, retrieving and storing data. Common data structures include arrays, linked lists, stacks, queues, trees, and graphs.",
      subjectId: "subject_3",
      color: "bg-flipboard-soft-purple",
      createdAt: "2023-03-10T09:00:00Z",
      updatedAt: "2023-03-12T16:20:00Z"
    }
  ]
};

const NotesPage = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  
  const [subject, setSubject] = useState<Subject | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Check if user is authenticated and load data
  useEffect(() => {
    const auth = localStorage.getItem('flipboard_auth');
    if (!auth) {
      navigate('/signin');
      toast.error('Please sign in to access your notes');
      return;
    }
    
    if (!subjectId) {
      navigate('/subjects');
      return;
    }
    
    // Load subject
    const savedSubjects = localStorage.getItem('flipboard_subjects');
    if (savedSubjects) {
      const subjects = JSON.parse(savedSubjects);
      const currentSubject = subjects.find((s: any) => s.id === subjectId);
      
      if (currentSubject) {
        setSubject({
          id: currentSubject.id,
          title: currentSubject.name,
          description: currentSubject.description || '',
          color: currentSubject.color
        });
      } else {
        navigate('/subjects');
        toast.error('Subject not found');
        return;
      }
    }
    
    // Load notes for this subject
    const savedNotes = localStorage.getItem('flipboard_notes');
    if (savedNotes) {
      const allNotes = JSON.parse(savedNotes);
      const subjectNotes = allNotes[subjectId] || [];
      setNotes(subjectNotes);
    } else {
      // Use sample data for first load
      const subjectNotes = sampleNotes[subjectId as keyof typeof sampleNotes] || [];
      setNotes(subjectNotes);
      
      // Save to localStorage
      const notesData = { ...sampleNotes };
      localStorage.setItem('flipboard_notes', JSON.stringify(notesData));
    }
  }, [subjectId, navigate]);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (notes.length > 0 && subjectId) {
      const savedNotes = localStorage.getItem('flipboard_notes');
      const allNotes = savedNotes ? JSON.parse(savedNotes) : {};
      
      allNotes[subjectId] = notes;
      localStorage.setItem('flipboard_notes', JSON.stringify(allNotes));
      
      // Update subject's notesCount
      const savedSubjects = localStorage.getItem('flipboard_subjects');
      if (savedSubjects) {
        const subjects = JSON.parse(savedSubjects);
        const updatedSubjects = subjects.map((s: any) => {
          if (s.id === subjectId) {
            return { ...s, notesCount: notes.length };
          }
          return s;
        });
        
        localStorage.setItem('flipboard_subjects', JSON.stringify(updatedSubjects));
      }
    }
  }, [notes, subjectId]);

  const handleCreateNote = () => {
    setEditingNote(null);
    setIsFormOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  const handleDeleteNote = (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');
    if (confirmDelete) {
      setNotes(prev => prev.filter(note => note.id !== id));
      toast.success('Note deleted successfully');
    }
  };

  const handleSaveNote = (noteData: Note) => {
    if (editingNote) {
      // Update existing note
      setNotes(prev => prev.map(note => 
        note.id === noteData.id ? noteData : note
      ));
    } else {
      // Create new note
      setNotes(prev => [...prev, noteData]);
    }
    
    setIsFormOpen(false);
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!subject) return null;

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <Button 
          variant="ghost" 
          className="mb-4 hover:bg-flipboard-soft-purple"
          onClick={() => navigate('/subjects')}
        >
          <ArrowLeft size={18} className="mr-1" />
          Back to Subjects
        </Button>
      
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className={`inline-block w-3 h-3 rounded-full ${subject.color || 'bg-flipboard-soft-purple'} mr-2`}></div>
            <h1 className="text-3xl font-bold mb-2 inline">{subject.title}</h1>
            {subject.description && (
              <p className="text-gray-600 mt-1">{subject.description}</p>
            )}
          </div>
          
          <Button
            onClick={handleCreateNote}
            className="mt-4 md:mt-0 bg-flipboard-purple hover:bg-flipboard-dark-purple"
          >
            <Plus size={18} className="mr-1" />
            New Note
          </Button>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search notes..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map(note => (
              <NoteCard 
                key={note.id} 
                note={note}
                subjectId={subjectId || ''}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            {searchQuery ? (
              <>
                <p className="text-lg font-medium mb-2">No notes match your search</p>
                <p className="text-gray-600">Try a different search term</p>
              </>
            ) : (
              <>
                <p className="text-lg font-medium mb-2">You don't have any notes in this subject yet</p>
                <p className="text-gray-600 mb-4">Create your first note to get started</p>
                <Button 
                  onClick={handleCreateNote}
                  className="bg-flipboard-purple hover:bg-flipboard-dark-purple"
                >
                  <Plus size={18} className="mr-1" />
                  Create Note
                </Button>
              </>
            )}
          </div>
        )}
      </div>
      
      {subjectId && (
        <NoteForm
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveNote}
          initialData={editingNote}
          subjectId={subjectId}
        />
      )}
    </MainLayout>
  );
};

export default NotesPage;
