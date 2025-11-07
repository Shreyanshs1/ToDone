import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    // This div is now just for structure, not background
    <div className="min-h-screen w-full">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;