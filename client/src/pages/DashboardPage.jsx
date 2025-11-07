import React from 'react';
import TimerControl from '../components/TimerControl';
import TaskList from '../components/TaskList';

const DashboardPage = () => {
  return (
    // Main container with vertical layout and a gap
    <div className="flex flex-col gap-8">
      {/* Top Part: Timer / Welcome */}
      <TimerControl />

      {/* Bottom Part: Task List */}
      <TaskList />
    </div>
  );
};

export default DashboardPage;