import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useUser, SignIn, SignUp } from '@clerk/clerk-react';
import HomePage from '../pages/HomePage';
import Dashboard from '../pages/Dashboard';
import KanbanBoard from '../pages/KanbanBoard';
import NotFound from '../pages/NotFound';

// Placeholder components for missing routes
const CreateTask = () => <div>Create Task Page (Placeholder)</div>;
const Projects = () => <div>Projects Page (Placeholder)</div>;
const Pricing = () => <div>Pricing Page (Placeholder)</div>;
const Help = () => <div>Help Center Page (Placeholder)</div>;
const Contact = () => <div>Contact Page (Placeholder)</div>;
const Privacy = () => <div>Privacy Policy Page (Placeholder)</div>;
const Terms = () => <div>Terms of Service Page (Placeholder)</div>;

const ProtectedRoute = ({ element }) => {
  const { isSignedIn } = useUser();
  return isSignedIn ? element : null; // RedirectToSignIn handled in App.jsx
};

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      <Route path="/kanban" element={<ProtectedRoute element={<KanbanBoard />} />} />
      <Route path="/create-task" element={<ProtectedRoute element={<CreateTask />} />} />
      <Route path="/projects" element={<ProtectedRoute element={<Projects />} />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/help" element={<Help />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;