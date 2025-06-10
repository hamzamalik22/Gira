import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const ProjectContext = createContext();

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const { user } = useUser();
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);

  // Load projects from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedProjects = localStorage.getItem(`projects_${user.id}`);
      if (savedProjects) {
        const parsedProjects = JSON.parse(savedProjects);
        setProjects(parsedProjects);
      } else {
        // Create a default project for new users
        const defaultProject = {
          id: `project-${Date.now()}`,
          name: 'My First Project',
          description: 'Welcome to your first project!',
          createdBy: user.id,
          createdAt: new Date().toISOString(),
          members: [user.id],
          color: 'blue',
        };
        setProjects([defaultProject]);
        localStorage.setItem(`projects_${user.id}`, JSON.stringify([defaultProject]));
      }
    }
  }, [user]);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    if (user && projects.length > 0) {
      localStorage.setItem(`projects_${user.id}`, JSON.stringify(projects));
    }
  }, [projects, user]);

  const createProject = (projectData) => {
    const newProject = {
      id: `project-${Date.now()}`,
      ...projectData,
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      members: [user.id],
    };
    setProjects((prev) => [...prev, newProject]);
    return newProject;
  };

  const updateProject = (projectId, updates) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId ? { ...project, ...updates } : project
      )
    );
  };

  const deleteProject = (projectId) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
    if (currentProject?.id === projectId) {
      setCurrentProject(null);
    }
  };

  const getProjectById = (projectId) => {
    return projects.find((project) => project.id === projectId);
  };

  const getUserProjects = () => {
    return projects.filter((project) => 
      project.members.includes(user?.id) || project.createdBy === user?.id
    );
  };

  const value = {
    projects: getUserProjects(),
    currentProject,
    setCurrentProject,
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}; 