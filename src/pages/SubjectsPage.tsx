
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
import { supabase } from '@/integrations/supabase/client';

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

  // Load subjects from Supabase
  useEffect(() => {
    if (!user) return;

    const fetchSubjects = async () => {
      try {
        setIsLoading(true);
        
        // Fetch subjects
        const { data: subjectsData, error: subjectsError } = await supabase
          .from('subjects')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (subjectsError) throw subjectsError;
        
        // Fetch note counts for each subject
        const subjectsWithCounts = await Promise.all(
          (subjectsData || []).map(async (subject) => {
            const { count, error: countError } = await supabase
              .from('notes')
              .select('*', { count: 'exact', head: true })
              .eq('subject_id', subject.id);
            
            if (countError) {
              console.error('Error fetching note count:', countError);
              return { ...subject, notesCount: 0 };
            }
            
            return { ...subject, notesCount: count || 0 };
          })
        );
        
        setSubjects(subjectsWithCounts);
      } catch (error) {
        console.error('Error loading subjects:', error);
        toast.error('Failed to load subjects');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSubjects();
  }, [user]);

  const handleCreateSubject = () => {
    setEditingSubject(null);
    setIsFormOpen(true);
  };

  const handleEditSubject = (subject: Subject) => {
    setEditingSubject(subject);
    setIsFormOpen(true);
  };

  const handleDeleteSubject = async (id: string) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this subject? All associated notes will be lost.');
      if (!confirmDelete) return;
      
      // First, delete all notes associated with this subject
      const { error: notesDeleteError } = await supabase
        .from('notes')
        .delete()
        .eq('subject_id', id);
      
      if (notesDeleteError) throw notesDeleteError;
      
      // Then delete the subject
      const { error: subjectDeleteError } = await supabase
        .from('subjects')
        .delete()
        .eq('id', id);
      
      if (subjectDeleteError) throw subjectDeleteError;
      
      setSubjects(prev => prev.filter(subject => subject.id !== id));
      toast.success('Subject deleted successfully');
    } catch (error) {
      console.error('Error deleting subject:', error);
      toast.error('Failed to delete subject');
    }
  };

  const handleSaveSubject = async (subjectData: Subject) => {
    try {
      if (editingSubject) {
        // Update existing subject
        const { error } = await supabase
          .from('subjects')
          .update({
            name: subjectData.name,
            description: subjectData.description,
            color: subjectData.color,
            updated_at: new Date().toISOString()
          })
          .eq('id', subjectData.id);
        
        if (error) throw error;
        
        setSubjects(prev => prev.map(subject => 
          subject.id === subjectData.id ? { ...subjectData, notesCount: subject.notesCount } : subject
        ));
        
        toast.success('Subject updated successfully');
      } else {
        // Create new subject
        const { data, error } = await supabase
          .from('subjects')
          .insert({
            name: subjectData.name,
            description: subjectData.description,
            color: subjectData.color,
            user_id: user?.id
          })
          .select()
          .single();
        
        if (error) throw error;
        
        setSubjects(prev => [{ ...data, notesCount: 0 }, ...prev]);
        toast.success('Subject created successfully');
      }
    } catch (error: any) {
      console.error('Error saving subject:', error);
      toast.error(`Failed to save subject: ${error.message}`);
    } finally {
      setIsFormOpen(false);
    }
  };

  const filteredSubjects = subjects.filter(subject => 
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (subject.description?.toLowerCase() || '').includes(searchQuery.toLowerCase())
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
