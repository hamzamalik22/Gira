import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { useUser } from '@clerk/clerk-react';
import { useTasks } from '../context/TaskContext';
import KanbanColumn from '../components/KanbanColumn';
import TaskModal from '../components/TaskModal';
import FilterControls from '../components/FilterControls';
import SearchBar from '../components/SearchBar';
import { 
  Plus, 
  CheckSquare, 
  Filter, 
  Search,
  MoreHorizontal,
  Settings,
  Star,
  Users,
  Calendar,
  Clock
} from 'lucide-react';

const TodosPage = () => {
  const { user } = useUser();
  const { 
    getPersonalTasksByStatus, 
    createTask, 
    updateTask, 
    deleteTask, 
    moveTask 
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ priority: null, assignee: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const columns = {
    'to-do': {
      id: 'to-do',
      title: 'To Do',
      tasks: getPersonalTasksByStatus('to-do'),
      color: 'gray',
      icon: Clock
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      tasks: getPersonalTasksByStatus('in-progress'),
      color: 'blue',
      icon: CheckSquare
    },
    'done': {
      id: 'done',
      title: 'Done',
      tasks: getPersonalTasksByStatus('done'),
      color: 'green',
      icon: CheckSquare
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
      // Create personal task (without projectId)
      createTask({
        ...formData,
        status: 'to-do',
        // Don't set projectId for personal tasks
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

  const totalTasks = Object.values(columns).reduce((total, column) => total + column.tasks.length, 0);

  return (
    <div className="max-w-full mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <CheckSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Tasks</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'} • Personal workspace
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
              showFilters 
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700'
                : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create task</span>
          </button>
          <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {showFilters && (
            <div className="flex items-center space-x-3">
              <FilterControls onFilterChange={handleFilterChange} />
            </div>
          )}
        </div>
      </div>

      {/* Board Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.values(columns).map((column) => {
          const Icon = column.icon;
          return (
            <div key={column.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    column.color === 'gray' ? 'bg-gray-100 dark:bg-gray-700' :
                    column.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/20' :
                    'bg-green-100 dark:bg-green-900/20'
                  }`}>
                    <Icon className={`w-4 h-4 ${
                      column.color === 'gray' ? 'text-gray-600 dark:text-gray-400' :
                      column.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                      'text-green-600 dark:text-green-400'
                    }`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{column.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{column.tasks.length} tasks</p>
                  </div>
                </div>
                <span className={`text-lg font-bold ${
                  column.color === 'gray' ? 'text-gray-600 dark:text-gray-400' :
                  column.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                  'text-green-600 dark:text-green-400'
                }`}>
                  {column.tasks.length}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Kanban Board */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex space-x-6 overflow-x-auto pb-4">
            {Object.values(filteredColumns).map((column) => (
              <div key={column.id} className="flex-shrink-0 w-80">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`w-3 h-3 rounded-full ${
                      column.color === 'gray' ? 'bg-gray-400' :
                      column.color === 'blue' ? 'bg-blue-500' :
                      'bg-green-500'
                    }`}></span>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wide">
                      {column.title}
                    </h3>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
                      {column.tasks.length}
                    </span>
                  </div>
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <KanbanColumn
                  column={column}
                  tasks={column.tasks}
                  onEditTask={(task) => {
                    setEditingTask(task);
                    setIsModalOpen(true);
                  }}
                  onDeleteTask={handleDeleteTask}
                />
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
      
      <TaskModal
        isOpen={isModalOpen}
        task={editingTask}
        onSave={handleSaveTask}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        projectId={null} // Personal tasks don't have a project
      />
    </div>
  );
};

export default TodosPage;
