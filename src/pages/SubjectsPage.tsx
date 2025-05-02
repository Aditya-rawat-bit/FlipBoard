import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from "@/components/layout/MainLayout";
import { SubjectCard } from '@/components/subjects/SubjectCard';
import { SubjectForm } from '@/components/subjects/SubjectForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

interface Subject {
  id: string;
  name: string;
  description: string | null;
  color: string;
  notesCount?: number;
}

const SubjectsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load subjects from localStorage
  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }

    const fetchSubjects = () => {
      try {
        setIsLoading(true);
        
        // Fetch subjects from localStorage
        const savedSubjects = localStorage.getItem('flipboard_subjects');
        let subjectsData = [];
        
        if (savedSubjects) {
          subjectsData = JSON.parse(savedSubjects);
        } else {
          // Initialize with empty array if no subjects exist yet
          subjectsData = [];
          localStorage.setItem('flipboard_subjects', JSON.stringify(subjectsData));
        }
        
        // Get note counts for each subject
        const savedNotes = localStorage.getItem('flipboard_notes');
        const allNotes = savedNotes ? JSON.parse(savedNotes) : {};
        
        const subjectsWithCounts = subjectsData.map(subject => {
          const notesCount = allNotes[subject.id]?.length || 0;
          return { ...subject, notesCount };
        });
        
        setSubjects(subjectsWithCounts);
      } catch (error) {
        console.error('Error loading subjects:', error);
        toast.error('Failed to load subjects');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSubjects();
  }, [user, navigate]);

  const handleCreateSubject = () => {
    setEditingSubject(null);
    setIsFormOpen(true);
  };

  const handleEditSubject = (subject: Subject) => {
    setEditingSubject(subject);
    setIsFormOpen(true);
  };

  const handleDeleteSubject = (id: string) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this subject? All associated notes will be lost.');
      if (!confirmDelete) return;
      
      // Remove the subject from localStorage
      const filteredSubjects = subjects.filter(subject => subject.id !== id);
      localStorage.setItem('flipboard_subjects', JSON.stringify(filteredSubjects));
      
      // Remove all notes for this subject
      const savedNotes = localStorage.getItem('flipboard_notes');
      if (savedNotes) {
        const allNotes = JSON.parse(savedNotes);
        delete allNotes[id];
        localStorage.setItem('flipboard_notes', JSON.stringify(allNotes));
      }
      
      setSubjects(filteredSubjects);
      toast.success('Subject deleted successfully');
    } catch (error) {
      console.error('Error deleting subject:', error);
      toast.error('Failed to delete subject');
    }
  };

  const handleSaveSubject = (subjectData: Subject) => {
    try {
      if (editingSubject) {
        // Update existing subject
        const updatedSubjects = subjects.map(subject => 
          subject.id === subjectData.id ? { ...subjectData, notesCount: subject.notesCount } : subject
        );
        
        localStorage.setItem('flipboard_subjects', JSON.stringify(updatedSubjects));
        setSubjects(updatedSubjects);
        toast.success('Subject updated successfully');
      } else {
        // Create new subject
        const newSubject = {
          ...subjectData,
          id: `subject_${Date.now()}`, // Generate unique ID
          notesCount: 0,
        };
        
        const updatedSubjects = [newSubject, ...subjects];
        localStorage.setItem('flipboard_subjects', JSON.stringify(updatedSubjects));
        setSubjects(updatedSubjects);
        toast.success('Subject created successfully');
      }
    } catch (error: any) {
      console.error('Error saving subject:', error);
      toast.error(`Failed to save subject: ${error.message}`);
    } finally {
      setIsFormOpen(false);
    }
  };

  // Fix the filtering to handle undefined values properly
  const filteredSubjects = subjects.filter(subject => {
    // Make sure name exists before calling toLowerCase
    const nameMatch = subject.name ? 
      subject.name.toLowerCase().includes((searchQuery || '').toLowerCase()) : false;
    
    // Make sure description exists before calling toLowerCase
    const descriptionMatch = subject.description ? 
      subject.description.toLowerCase().includes((searchQuery || '').toLowerCase()) : false;
    
    return nameMatch || descriptionMatch;
  });

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Subjects</h1>
            <p className="text-gray-600">Organize your notes by subjects</p>
          </div>
          
          <Button
            onClick={handleCreateSubject}
            className="mt-4 md:mt-0 bg-flipboard-purple hover:bg-flipboard-dark-purple"
          >
            <Plus size={18} className="mr-1" />
            New Subject
          </Button>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search subjects..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 text-flipboard-purple animate-spin" />
          </div>
        ) : filteredSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map(subject => (
              <SubjectCard 
                key={subject.id} 
                subject={{
                  id: subject.id,
                  title: subject.name,
                  description: subject.description || '',
                  notesCount: subject.notesCount || 0,
                  color: subject.color
                }}
                onEdit={handleEditSubject}
                onDelete={handleDeleteSubject}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            {searchQuery ? (
              <>
                <p className="text-lg font-medium mb-2">No subjects match your search</p>
                <p className="text-gray-600">Try a different search term</p>
              </>
            ) : (
              <>
                <p className="text-lg font-medium mb-2">You don't have any subjects yet</p>
                <p className="text-gray-600 mb-4">Create your first subject to get started</p>
                <Button 
                  onClick={handleCreateSubject}
                  className="bg-flipboard-purple hover:bg-flipboard-dark-purple"
                >
                  <Plus size={18} className="mr-1" />
                  Create Subject
                </Button>
              </>
            )}
          </div>
        )}
      </div>
      
      <SubjectForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveSubject}
        initialData={editingSubject}
      />
    </MainLayout>
  );
};

export default SubjectsPage;
