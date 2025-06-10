import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

const KanbanColumn = ({ column, tasks, onEditTask, onDeleteTask }) => {
  return (
    <div className="bg-gray-800 rounded-lg w-80 flex-shrink-0 p-4">
      <h2 className="text-xl font-semibold text-white mb-4">{column.title}</h2>
      <Droppable droppableId={column.id} type="TASK">
        {(provided, snapshot) => (
          <div
            className={`space-y-3 min-h-[100px] transition-colors ${
              snapshot.isDraggingOver ? 'bg-gray-700' : ''
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={() => onEditTask(task)}
                onDelete={() => onDeleteTask(column.id, task.id)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
