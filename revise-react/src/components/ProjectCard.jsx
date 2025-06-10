import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, MoreVertical, KanbanIcon } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const { getTasksByProject } = useTasks();
  const projectTasks = getTasksByProject(project.id);
  
  const completedTasks = projectTasks.filter(task => task.status === 'done').length;
  const totalTasks = projectTasks.length;
  
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

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
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors border border-gray-700">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-4 h-4 rounded-full ${colorClasses[project.color] || colorClasses.blue}`}></div>
          <h3 className="text-lg font-semibold text-white truncate">{project.name}</h3>
        </div>
        <div className="relative group">
          <button className="p-1 hover:bg-gray-700 rounded">
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
          <div className="absolute right-0 top-8 bg-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
            <button
              onClick={() => onEdit(project)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 rounded-t-lg"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-600 rounded-b-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {project.description || 'No description provided'}
      </p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Progress</span>
          <span>{completedTasks}/{totalTasks} tasks</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${colorClasses[project.color] || colorClasses.blue}`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(project.createdAt)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>{project.members?.length || 1}</span>
          </div>
        </div>
        
        <Link
          to={`/projects/${project.id}/kanban`}
          className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm font-medium"
        >
          <KanbanIcon className="w-4 h-4" />
          <span>Board</span>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
