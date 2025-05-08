import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, X, Home, Calendar, Clock, CreditCard, Users, Clipboard, FileText, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  mobile?: boolean;
  closeSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobile = false, closeSidebar }) => {
  const { user } = useAuth();
  const isManager = user?.role === 'manager';

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Duty Management', href: '/duties', icon: Calendar },
    { name: 'Leave Management', href: '/leaves', icon: Clock },
    { name: 'Financial', href: '/financial', icon: CreditCard },
  ];

  const managerLinks = [
    { name: 'Personnel Directory', href: '/personnel', icon: Users },
    { name: 'Duty Assignment', href: '/duty-assignment', icon: Clipboard },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const allLinks = isManager ? [...navigation, ...managerLinks] : navigation;

  const NavItem = ({ item }: { item: typeof navigation[0] }) => {
    const Icon = item.icon;
    return (
      <NavLink
        to={item.href}
        className={({ isActive }) => `
          ${isActive ? 'bg-primary-700 text-white' : 'text-primary-100 hover:bg-primary-800 hover:text-white'}
          group flex items-center px-2 py-2 text-sm font-medium rounded-md mx-2
        `}
        onClick={mobile ? closeSidebar : undefined}
      >
        <Icon
          className="mr-3 h-5 w-5 flex-shrink-0"
          aria-hidden="true"
        />
        {item.name}
      </NavLink>
    );
  };

  return (
    <>
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-primary-100" />
          <span className="ml-2 text-white font-semibold text-lg">Security MS</span>
        </div>
        {mobile && (
          <button
            type="button"
            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={closeSidebar}
          >
            <span className="sr-only">Close sidebar</span>
            <X className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        )}
      </div>
      <div className="mt-5 overflow-y-auto h-0 flex-1 flex flex-col">
        <nav className="flex-1 space-y-1">
          {allLinks.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>
        <div className="p-4 mt-auto">
          <div className="bg-primary-700 rounded-md p-3">
            <div className="flex items-center">
              {user?.profileImage ? (
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.profileImage}
                  alt="User avatar"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary-600 text-white flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
              )}
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-primary-200 capitalize">{user?.role} Role</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;