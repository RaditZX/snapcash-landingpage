import React from 'react';
import { Settings, Users, BarChart3, Puzzle, User, AlertTriangle } from 'lucide-react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook

export function Sidebar() {
    const location = useLocation(); // Get current location
    
    const sidebarItems = [
      { icon: BarChart3, label: 'Overview', link: '/dashboard/overview' },
      { icon: Users, label: 'Users', link: '/dashboard/users' },
    ];

    // Function to check if current path matches the item link
    const isActive = (itemLink) => {
      return location.pathname === itemLink;
    };

    return (
      <div className="w-64 bg-gray-900 text-white">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <img src="/img/logo.png" alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-semibold">SnapCash</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          {sidebarItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive(item.link)
                  ? 'bg-blue-600 text-white border-r-2 border-blue-400' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    );
}

export default Sidebar;