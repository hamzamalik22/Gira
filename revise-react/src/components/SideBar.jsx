import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { 
  Home, 
  CheckSquare, 
  FolderIcon, 
  BarChart3, 
  Settings, 
  Users,
  Target,
  Calendar,
  GitBranch,
  ChevronDown
} from 'lucide-react';

const SideBar = () => {
  const { user } = useUser();

  const navigationItems = [
    {
      title: 'PLANNING',
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'Your Tasks', path: '/todos', icon: CheckSquare },
        { name: 'Projects', path: '/projects', icon: FolderIcon },
      ]
    },
    {
      title: 'DEVELOPMENT',
      items: [
        { name: 'Roadmap', path: '/roadmap', icon: Target },
        { name: 'Releases', path: '/releases', icon: GitBranch },
        { name: 'Reports', path: '/reports', icon: BarChart3 },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Project Selector */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button className="w-full flex items-center justify-between p-2 text-left text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors">
          <div className="flex items-center space-x-2">
            <img src="/Gira.svg" alt="Gira Logo" className="h-6 w-auto dark:invert dark:brightness-0 dark:contrast-200" />
            <span>Personal Workspace</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-6">
        {navigationItems.map((section) => (
          <div key={section.title}>
            <div className="px-4 mb-2">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {section.title}
              </h3>
            </div>
            <ul className="space-y-1 px-2">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-700'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`
                      }
                    >
                      <Icon className={`w-5 h-5 ${item.path === '/dashboard' ? 'text-blue-600' : ''}`} />
                      <span>{item.name}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-3">
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt="User profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                {user?.firstName?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.firstName || 'User'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              Free plan
            </p>
          </div>
        </div>
        
        <div className="space-y-1">
          <NavLink
            to="/team"
            className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Users className="w-4 h-4" />
            <span>Invite team</span>
          </NavLink>
          <NavLink
            to="/settings"
            className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;