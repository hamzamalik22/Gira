import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { HomeIcon, KanbanIcon, PlusCircleIcon, FolderIcon } from 'lucide-react';

const SideBar = () => {
  const { user } = useUser();
  const userInitials = user?.firstName
    ? `${user.firstName[0]}${user.lastName ? user.lastName[0] : ''}`.toUpperCase()
    : 'U';

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-gray-200 flex flex-col shadow-lg">
      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt="User profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {userInitials}
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-white">
              {user?.firstName || 'User'} {user?.lastName || ''}
            </p>
            <p className="text-xs text-gray-400">{user?.emailAddresses[0]?.emailAddress || 'No email'}</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-200 hover:bg-gray-700 hover:text-blue-400'
                }`
              }
            >
              <HomeIcon className="w-5 h-5" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/kanban"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-200 hover:bg-gray-700 hover:text-blue-400'
                }`
              }
            >
              <KanbanIcon className="w-5 h-5" />
              <span>Kanban Board</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create-task"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-200 hover:bg-gray-700 hover:text-blue-400'
                }`
              }
            >
              <PlusCircleIcon className="w-5 h-5" />
              <span>Create Task</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-200 hover:bg-gray-700 hover:text-blue-400'
                }`
              }
            >
              <FolderIcon className="w-5 h-5" />
              <span>Projects</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-700">
        <p className="text-xs text-gray-400 text-center">© 2025 Gira</p>
      </div>
    </aside>
  );
};

export default SideBar;