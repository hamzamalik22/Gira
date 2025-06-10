import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import { useTasks } from '../context/TaskContext';
import ProjectForm from '../components/ProjectForm';
import { ArrowLeft, KanbanIcon, Calendar, Users, BarChart3, Edit, Trash2 } from 'lucide-react';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { getProjectById, updateProject, deleteProject } = useProjects();
  const { getTasksByProject } = useTasks();
  const [isEditing, setIsEditing] = useState(false);

  const project = getProjectById(projectId);
  const projectTasks = getTasksByProject(projectId);

  if (!project) {
    return (
      <div className="bg-gray-900 text-gray-200 p-6 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <Link to="/projects" className="text-blue-400 hover:text-blue-300">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const handleUpdateProject = (projectData) => {
    updateProject(project.id, projectData);
    setIsEditing(false);
  };

  const handleDeleteProject = () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone and will delete all tasks.')) {
      deleteProject(project.id);
      navigate('/projects');
    }
  };

  const taskStats = {
    total: projectTasks.length,
    todo: projectTasks.filter(task => task.status === 'to-do').length,
    inProgress: projectTasks.filter(task => task.status === 'in-progress').length,
    done: projectTasks.filter(task => task.status === 'done').length,
  };

  const progressPercentage = taskStats.total > 0 ? (taskStats.done / taskStats.total) * 100 : 0;

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600',
    indigo: 'bg-indigo-600',
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isEditing) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-2xl mx-auto">
          <ProjectForm
            project={project}
            onSubmit={handleUpdateProject}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-gray-200 p-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link
            to="/projects"
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Projects</span>
          </Link>
          <div className={`w-1 h-8 border-l-4 ${colorClasses[project.color]?.replace('bg-', 'border-') || 'border-blue-600'}`}></div>
          <div>
            <h1 className="text-3xl font-bold text-white">{project.name}</h1>
            <p className="text-gray-400">Project Details & Settings</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link
            to={`/projects/${project.id}/kanban`}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <KanbanIcon className="w-5 h-5" />
            <span>Open Board</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Project Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Project Information</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <p className="text-white">{project.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <p className="text-gray-200">{project.description || 'No description provided'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Color Theme</label>
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full ${colorClasses[project.color] || colorClasses.blue}`}></div>
                  <span className="text-gray-200 capitalize">{project.color}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Created</label>
                <div className="flex items-center space-x-2 text-gray-200">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(project.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Task Statistics */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Task Statistics</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{taskStats.total}</div>
                <div className="text-sm text-gray-400">Total Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">{taskStats.todo}</div>
                <div className="text-sm text-gray-400">To Do</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{taskStats.inProgress}</div>
                <div className="text-sm text-gray-400">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{taskStats.done}</div>
                <div className="text-sm text-gray-400">Completed</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Overall Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${colorClasses[project.color] || colorClasses.blue}`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to={`/projects/${project.id}/kanban`}
                className="flex items-center space-x-3 w-full text-left text-gray-200 hover:text-white hover:bg-gray-700 p-3 rounded-lg transition-colors"
              >
                <KanbanIcon className="w-5 h-5" />
                <span>Open Kanban Board</span>
              </Link>
              
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-3 w-full text-left text-gray-200 hover:text-white hover:bg-gray-700 p-3 rounded-lg transition-colors"
              >
                <Edit className="w-5 h-5" />
                <span>Edit Project</span>
              </button>
            </div>
          </div>

          {/* Project Members */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Project Members</h3>
            <div className="flex items-center space-x-2 text-gray-200">
              <Users className="w-5 h-5" />
              <span>{project.members?.length || 1} member(s)</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">Member management coming soon</p>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
            <button
              onClick={handleDeleteProject}
              className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Project</span>
            </button>
            <p className="text-xs text-gray-400 mt-2">This action cannot be undone</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;