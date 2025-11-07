import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTimer } from '../context/TimerContext';
import ActiveTimer from './ActiveTimer'; // The component we built earlier

const TimerControl = () => {
  const { user } = useAuth();
  const { activeTimer, stopTimer } = useTimer();

  return (
    // This wrapper provides the fixed space to prevent layout shift.
    // 'min-h-[10rem]' (160px) gives it a fixed minimum height.
    <div className="w-full min-h-[10rem] flex items-center justify-center p-8 bg-zinc-800 rounded-lg shadow-lg">
      {activeTimer ? (
        // STATE 1: Timer is running
        <div className="w-full">
          <h2 className="text-xl font-semibold text-center text-zinc-300 mb-4">
            Currently Tracking
          </h2>
          <ActiveTimer timer={activeTimer} onStop={stopTimer} />
        </div>
      ) : (
        // STATE 2: No timer is running
        <div className="text-center">
          <h1 className="text-4xl">
            Welcome, {user?.name || 'User'}!
          </h1>
          <p className="text-xl text-zinc-400 mt-2">
            You have no timer running.
          </p>
        </div>
      )}
    </div>
  );
};

export default TimerControl;