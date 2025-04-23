
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { LogOut, User, Edit } from 'lucide-react';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  email: string;
  name: string;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  
  // Get stats
  const [stats, setStats] = useState({
    subjects: 0,
    notes: 0
  });

  // Check if user is authenticated
  useEffect(() => {
    const auth = localStorage.getItem('flipboard_auth');
    if (!auth) {
      navigate('/signin');
      toast.error('Please sign in to view your profile');
    } else {
      try {
        const userData = JSON.parse(auth);
        setUser(userData.user);
        setFormData({
          name: userData.user.name || '',
          email: userData.user.email || ''
        });

        // Calculate stats
        calculateStats();
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('flipboard_auth');
        navigate('/signin');
      }
    }
  }, [navigate]);

  const calculateStats = () => {
    // Get subjects count
    const savedSubjects = localStorage.getItem('flipboard_subjects');
    const subjects = savedSubjects ? JSON.parse(savedSubjects) : [];
    
    // Get notes count
    const savedNotes = localStorage.getItem('flipboard_notes');
    let notesCount = 0;
    
    if (savedNotes) {
      const allNotes = JSON.parse(savedNotes);
      Object.keys(allNotes).forEach(subjectId => {
        notesCount += allNotes[subjectId]?.length || 0;
      });
    }
    
    setStats({
      subjects: subjects.length,
      notes: notesCount
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem('flipboard_auth');
    toast.success('You have been signed out');
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    if (!user) return;
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return;
    }

    // Update profile in localStorage
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email
    };
    
    localStorage.setItem('flipboard_auth', JSON.stringify({ user: updatedUser }));
    setUser(updatedUser);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  if (!user) return null;

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Profile</h1>
            
            <Button
              variant="outline"
              className="border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700"
              onClick={handleSignOut}
            >
              <LogOut size={18} className="mr-2" />
              Sign Out
            </Button>
          </div>
          
          <Card className="p-6 mb-8">
            <div className="flex items-center mb-6">
              <div className="h-16 w-16 bg-flipboard-soft-purple rounded-full flex items-center justify-center text-flipboard-purple mr-4">
                <User size={32} />
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  
                  <Button 
                    className="bg-flipboard-purple hover:bg-flipboard-dark-purple"
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                variant="outline" 
                className="mt-2"
                onClick={() => setIsEditing(true)}
              >
                <Edit size={18} className="mr-1" />
                Edit Profile
              </Button>
            )}
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-flipboard-soft-purple">
              <h3 className="text-lg font-semibold mb-1">Subjects</h3>
              <p className="text-3xl font-bold">{stats.subjects}</p>
              <Button 
                className="mt-4 bg-white text-flipboard-purple hover:bg-gray-100"
                onClick={() => navigate('/subjects')}
              >
                View All Subjects
              </Button>
            </Card>
            
            <Card className="p-6 bg-flipboard-soft-pink">
              <h3 className="text-lg font-semibold mb-1">Notes</h3>
              <p className="text-3xl font-bold">{stats.notes}</p>
              <Button 
                className="mt-4 bg-white text-flipboard-purple hover:bg-gray-100"
                onClick={() => navigate('/subjects')}
              >
                View All Notes
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
