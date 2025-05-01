
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

// Pages
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import SubjectsPage from "./pages/SubjectsPage";
import NotesPage from "./pages/NotesPage";
import NoteDetailPage from "./pages/NoteDetailPage";
import ProfilePage from "./pages/ProfilePage";
import ProjectQA from "./assets/project-q-and-a";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/subjects/:subjectId" element={<NotesPage />} />
          <Route path="/subjects/:subjectId/notes/:noteId" element={<NoteDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/project-qa" element={<ProjectQA />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
