import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTimer } from '../context/TimerContext';
import ActiveTimer from './ActiveTimer';
import { LogOut } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const { activeTimer, stopTimer } = useTimer();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  // NavLink adds 'active' class to the current page link
  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-white font-semibold'
      : 'text-zinc-400 hover:text-white';

  return (
    <header className="w-full p-4 bg-zinc-800 text-white border-b border-zinc-700">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Side: Navigation & User */}
        <div className="flex items-center gap-6">
          <span className="text-xl font-bold">TimeTrack</span>
          <nav className="flex items-center gap-4">
            <NavLink to="/" end className={navLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/summary" className={navLinkClass}>
              Summary
            </NavLink>
          </nav>
        </div>

        {/* Right Side: Timer & Logout */}
        <div className="flex items-center gap-4">
          {/* This is the magic part: */}
          {activeTimer && (
            <ActiveTimer timer={activeTimer} onStop={stopTimer} />
          )}

          <span className="text-sm text-zinc-300">
            Hi, {user?.name || 'User'}
          </span>
          <button
            onClick={handleLogout}
            title="Logout"
            className="flex items-center gap-2 text-zinc-400 hover:text-white"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;