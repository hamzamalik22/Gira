import React from 'react';
import TaskForm from './TaskForm';

const TaskModal = ({ isOpen, task, onSave, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold text-white mb-4">
          {task ? 'Edit Task' : 'Create Task'}
        </h2>
        <TaskForm task={task} onSubmit={onSave} onCancel={onClose} />
      </div>
    </div>
  );
};

export default TaskModal;
