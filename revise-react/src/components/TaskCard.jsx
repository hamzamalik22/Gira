import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Trash2Icon, EditIcon, UserIcon, FlagIcon } from 'lucide-react';

const TaskCard = ({ task, index, onEdit, onDelete }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ${
            snapshot.isDragging ? 'bg-gray-600' : ''
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-white">{task.title}</h3>
            <div className="flex space-x-2">
              <button
                onClick={onEdit}
                className="text-gray-400 hover:text-blue-400"
                aria-label={`Edit ${task.title}`}
              >
                <EditIcon className="w-4 h-4" />
              </button>
              <button
                onClick={onDelete}
                className="text-gray-400 hover:text-red-400"
                aria-label={`Delete ${task.title}`}
              >
                <Trash2Icon className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-1">{task.description}</p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              <UserIcon className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">{task.assignee}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FlagIcon className="w-4 h-4 text-blue-400" />
              <span
                className={`text-sm ${
                  task.priority === 'High'
                    ? 'text-red-400'
                    : task.priority === 'Medium'
                    ? 'text-yellow-400'
                    : 'text-green-400'
                }`}
              >
                {task.priority}
              </span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
