import React from 'react';

const FilterControls = ({ onFilterChange }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value || null);
  };

  return (
    <div className="flex space-x-4 mb-4">
      <div>
        <label className="block text-sm text-gray-300 mb-1" htmlFor="priorityFilter">
          Priority
        </label>
        <select
          id="priorityFilter"
          name="priority"
          onChange={handleFilterChange}
          className="p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-300 mb-1" htmlFor="assigneeFilter">
          Assignee
        </label>
        <select
          id="assigneeFilter"
          name="assignee"
          onChange={handleFilterChange}
          className="p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All</option>
          <option value="John Doe">John Doe</option>
          <option value="Jane Smith">Jane Smith</option>
          {/* TODO: Populate dynamically */}
        </select>
      </div>
    </div>
  );
};

export default FilterControls;
