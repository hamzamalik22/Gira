import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { useUser } from '@clerk/clerk-react';
import KanbanColumn from '../components/KanbanColumn';
import TaskModal from '../components/TaskModal';
import FilterControls from '../components/FilterControls';
import SearchBar from '../components/SearchBar';
import { PlusCircleIcon } from 'lucide-react';

// Mock data
const initialColumns = {
  'to-do': {
    id: 'to-do',
    title: 'To Do',
    tasks: [
      {
        id: 'task-1',
        title: 'Design Homepage',
        description: 'Create wireframes for the homepage',
        assignee: 'John Doe',
        priority: 'High',
      },
      {
        id: 'task-2',
        title: 'Setup Backend',
        description: 'Configure Node.js server',
        assignee: 'Jane Smith',
        priority: 'Medium',
      },
    ],
  },
  'in-progress': {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      {
        id: 'task-3',
        title: 'Implement Auth',
        description: 'Add Clerk authentication',
        assignee: 'John Doe',
        priority: 'High',
      },
    ],
  },
  'done': {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        id: 'task-4',
        title: 'Write Docs',
        description: 'Document API endpoints',
        assignee: 'Jane Smith',
        priority: 'Low',
      },
    ],
  },
};

const KanbanBoard = () => {
  const { user } = useUser();
  const [columns, setColumns] = useState(initialColumns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ priority: null, assignee: null });
  const [searchQuery, setSearchQuery] = useState('');

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceTasks = [...sourceColumn.tasks];
    const destTasks = [...destColumn.tasks];

    const [movedTask] = sourceTasks.splice(source.index, 1);
    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, tasks: sourceTasks },
      });
    } else {
      destTasks.splice(destination.index, 0, movedTask);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, tasks: sourceTasks },
        [destination.droppableId]: { ...destColumn, tasks: destTasks },
      });
    }
    // TODO: Update backend
  };

  const handleSaveTask = (formData) => {
    if (editingTask) {
      const columnId = Object.keys(columns).find((key) =>
        columns[key].tasks.some((task) => task.id === editingTask.id)
      );
      const updatedTasks = columns[columnId].tasks.map((task) =>
        task.id === editingTask.id ? { ...task, ...formData } : task
      );
      setColumns({
        ...columns,
        [columnId]: { ...columns[columnId], tasks: updatedTasks },
      });
      // TODO: Update backend
    } else {
      const newTask = {
        id: `task-${Date.now()}`,
        ...formData,
      };
      const updatedTasks = [...columns['to-do'].tasks, newTask];
      setColumns({
        ...columns,
        'to-do': { ...columns['to-do'], tasks: updatedTasks },
      });
      // TODO: Create backend
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (columnId, taskId) => {
    const column = columns[columnId];
    const newTasks = column.tasks.filter((task) => task.id !== taskId);
    setColumns({
      ...columns,
      [columnId]: { ...column, tasks: newTasks },
    });
    // TODO: Delete backend
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

  return (
    <div className="bg-gray-900 text-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Kanban Board</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <PlusCircleIcon className="w-5 h-5" />
          <span>Create Task</span>
        </button>
      </div>
      <div className="flex items-center space-x-4 mb-6 max-w-md">
        <SearchBar onSearch={handleSearch} />
        <FilterControls onFilterChange={handleFilterChange} />
      </div>
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
      <TaskModal
        isOpen={isModalOpen}
        task={editingTask}
        onSave={handleSaveTask}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
      />
    </div>
  );
};

export default KanbanBoard;
