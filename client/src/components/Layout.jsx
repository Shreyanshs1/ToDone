import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    // This div sets the dark background for the entire app
    <div className="min-h-screen w-full bg-zinc-900 text-white">
      <Header />
      {/* Outlet renders the child route (e.g., DashboardPage) */}
      <main className="container mx-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;