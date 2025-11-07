import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  // This function adds a style to the *active* navigation link
  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive
        ? 'bg-zinc-700 text-white' // Active link style
        : 'text-zinc-300 hover:bg-zinc-800 hover:text-white' // Inactive link style
    }`;

  return (
    <header className="w-full p-4 text-white border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Left Side: App Name & Nav */}
        <div className="flex items-center gap-8">
          <h1 className="text-3xl text-white">ToDone</h1>
          
          <nav className="flex items-center gap-4">
            <NavLink to="/" end className={navLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/summary" className={navLinkClass}>
              Summary
            </NavLink>
          </nav>
        </div>

        {/* Right Side: Logout Button Only */}
        <div className="flex items-center">
          <button
            onClick={handleLogout}
            title="Logout"
            className="flex items-center gap-2 p-2 rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;