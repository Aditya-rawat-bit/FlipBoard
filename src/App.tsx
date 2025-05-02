
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

// Pages
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
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
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/project-qa" element={<ProjectQA />} />
        
        {/* Previously protected routes - now accessible */}
        <Route path="/subjects" element={<SubjectsPage />} />
        <Route path="/subjects/:subjectId" element={<NotesPage />} />
        <Route path="/subjects/:subjectId/notes/:noteId" element={<NoteDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="bottom-right" />
    </Router>
  );
}

export default App;
