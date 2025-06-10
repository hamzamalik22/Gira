import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { DragDropContext } from '@hello-pangea/dnd';
import { useProjects } from '../context/ProjectContext';
import { useTasks } from '../context/TaskContext';
import KanbanColumn from '../components/KanbanColumn';
import TaskModal from '../components/TaskModal';
import FilterControls from '../components/FilterControls';
import SearchBar from '../components/SearchBar';
import { PlusCircleIcon, ArrowLeft, Settings } from 'lucide-react';

const ProjectKanban = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { getProjectById } = useProjects();
  const { 
    getTasksByProject, 
    getTasksByStatus, 
    createTask, 
    updateTask, 
    deleteTask, 
    moveTask 
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ priority: null, assignee: null });
  const [searchQuery, setSearchQuery] = useState('');

  const project = getProjectById(projectId);
  
  useEffect(() => {
    if (!project) {
      navigate('/projects');
    }
  }, [project, navigate]);

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

  const columns = {
    'to-do': {
      id: 'to-do',
      title: 'To Do',
      tasks: getTasksByStatus(projectId, 'to-do'),
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      tasks: getTasksByStatus(projectId, 'in-progress'),
    },
    'done': {
      id: 'done',
      title: 'Done',
      tasks: getTasksByStatus(projectId, 'done'),
    },
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // Move task to new status
    moveTask(draggableId, destination.droppableId);
  };

  const handleSaveTask = (formData) => {
    if (editingTask) {
      updateTask(editingTask.id, formData);
    } else {
      createTask({
        ...formData,
        projectId,
        status: 'to-do',
      });
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (columnId, taskId) => {
    deleteTask(taskId);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredColumns = Object.keys(columns).reduce((acc, key) => {
    const column = columns[key];
    const filteredTasks = column.tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery) ||
        task.description.toLowerCase().includes(searchQuery);
      const matchesPriority = !filters.priority || task.priority === filters.priority;
      const matchesAssignee = !filters.assignee || task.assignee === filters.assignee;
      return matchesSearch && matchesPriority && matchesAssignee;
    });
    return { ...acc, [key]: { ...column, tasks: filteredTasks } };
  }, {});

  const colorClasses = {
    blue: 'border-blue-600',
    green: 'border-green-600',
    purple: 'border-purple-600',
    red: 'border-red-600',
    yellow: 'border-yellow-600',
    indigo: 'border-indigo-600',
  };

  return (
    <div className="bg-gray-900 text-gray-200 p-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/projects"
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Projects</span>
          </Link>
          <div className={`w-1 h-8 ${colorClasses[project.color] || colorClasses.blue} border-l-4`}></div>
          <div>
            <h1 className="text-3xl font-bold text-white">{project.name}</h1>
            {project.description && (
              <p className="text-gray-400 text-sm">{project.description}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircleIcon className="w-5 h-5" />
            <span>Create Task</span>
          </button>
          
          <Link
            to={`/projects/${projectId}`}
            className="flex items-center space-x-2 bg-gray-700 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center space-x-4 mb-6 max-w-md">
        <SearchBar onSearch={handleSearch} />
        <FilterControls onFilterChange={handleFilterChange} />
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {Object.values(filteredColumns).map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={column.tasks}
              onEditTask={(task) => {
                setEditingTask(task);
                setIsModalOpen(true);
              }}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </DragDropContext>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        task={editingTask}
        onSave={handleSaveTask}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        projectId={projectId}
      />
    </div>
  );
};

export default ProjectKanban; 