import React, { useState } from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../ui/Badge';

interface HeaderProps {
  openSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ openSidebar }) => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications for demonstration
  const notifications = [
    { id: 1, title: 'New duty assigned', message: 'You have been assigned to Main Gate for tomorrow', time: '5 mins ago' },
    { id: 2, title: 'Leave request approved', message: 'Your leave request has been approved', time: '1 hour ago' },
    { id: 3, title: 'Loan request pending', message: 'Your loan request is under review', time: '2 hours ago' },
  ];

  return (
    <header className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary lg:hidden"
        onClick={openSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          <h1 className="text-xl font-semibold text-gray-800">Campus Security MS</h1>
        </div>
        <div className="ml-4 flex items-center md:ml-6 space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
            </button>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>

            {showNotifications && (
              <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="text-sm font-medium text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="px-4 py-3 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <Badge variant="info" className="mt-1">New</Badge>
                        </div>
                        <div className="ml-3 w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-sm text-gray-500">{notification.message}</p>
                          <p className="mt-1 text-xs text-gray-400">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-100 text-center">
                  <a href="#" className="text-sm text-primary hover:underline">
                    View all notifications
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Profile dropdown */}
          <div className="relative">
            <div>
              <button
                type="button"
                className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                id="user-menu-button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <span className="sr-only">Open user menu</span>
                {user?.profileImage ? (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.profileImage}
                    alt="User avatar"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                )}
                <span className="ml-2 text-gray-700 hidden md:block">{user?.name}</span>
              </button>
            </div>

            {showProfileMenu && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm text-gray-700">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role} Role</p>
                </div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Settings
                </a>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;