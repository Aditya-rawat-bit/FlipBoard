
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from "@/components/layout/MainLayout";
import { SubjectCard } from '@/components/subjects/SubjectCard';
import { SubjectForm } from '@/components/subjects/SubjectForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { toast } from 'sonner';

interface Subject {
  id: string;
  title: string;
  description: string;
  notesCount: number;
  color?: string;
}

// Sample initial data
const initialSubjects = [
  {
    id: "subject_1",
    title: "Mathematics",
    description: "Calculus, Algebra, and Statistics",
    notesCount: 5,
    color: "bg-flipboard-soft-purple"
  },
  {
    id: "subject_2",
    title: "Physics",
    description: "Classical Mechanics and Electromagnetism",
    notesCount: 3,
    color: "bg-flipboard-soft-pink"
  },
  {
    id: "subject_3",
    title: "Computer Science",
    description: "Programming, Data Structures and Algorithms",
    notesCount: 7,
    color: "bg-flipboard-soft-blue"
  },
];

const SubjectsPage = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Check if user is authenticated
  useEffect(() => {
    const auth = localStorage.getItem('flipboard_auth');
    if (!auth) {
      navigate('/signin');
      toast.error('Please sign in to access your subjects');
    } else {
      // Load subjects from localStorage or use initial data
      const savedSubjects = localStorage.getItem('flipboard_subjects');
      if (savedSubjects) {
        setSubjects(JSON.parse(savedSubjects));
      } else {
        setSubjects(initialSubjects);
      }
    }
  }, [navigate]);

  // Save subjects to localStorage whenever they change
  useEffect(() => {
    if (subjects.length > 0) {
      localStorage.setItem('flipboard_subjects', JSON.stringify(subjects));
    }
  }, [subjects]);

  const handleCreateSubject = () => {
    setEditingSubject(null);
    setIsFormOpen(true);
  };

  const handleEditSubject = (subject: Subject) => {
    setEditingSubject(subject);
    setIsFormOpen(true);
  };

  const handleDeleteSubject = (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this subject? All notes will be lost.');
    if (confirmDelete) {
      setSubjects(prev => prev.filter(subject => subject.id !== id));
      toast.success('Subject deleted successfully');
    }
  };

  const handleSaveSubject = (subjectData: Subject) => {
    if (editingSubject) {
      // Update existing subject
      setSubjects(prev => prev.map(subject => 
        subject.id === subjectData.id ? subjectData : subject
      ));
    } else {
      // Create new subject
      setSubjects(prev => [...prev, { ...subjectData, notesCount: 0 }]);
    }
  };

  const filteredSubjects = subjects.filter(subject => 
    subject.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    subject.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        
        {filteredSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map(subject => (
              <SubjectCard 
                key={subject.id} 
                subject={subject}
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
