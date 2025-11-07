import React, { useState, useEffect } from 'react';
import { Clock, StopCircle } from 'lucide-react';

// Helper to format time (no change)
const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .map((v) => v.toString().padStart(2, '0'))
    .join(':');
};

const ActiveTimer = ({ timer, onStop }) => {
  const startTime = new Date(timer.startTime);
  const [elapsedSeconds, setElapsedSeconds] = useState(
    Math.floor((new Date() - startTime) / 1000)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((new Date() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  return (
    // NEW LAYOUT: Centered, bigger, with stop button below
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 text-2xl font-medium text-blue-300">
        <Clock className="w-6 h-6" />
        <span>{timer.task?.title || 'Loading...'}</span>
      </div>
      
      <div className="font-mono text-6xl font-bold text-white">
        {formatTime(elapsedSeconds)}
      </div>

      <button
        onClick={onStop}
        title="Stop Timer"
        className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-300 rounded-md hover:bg-red-600/40"
      >
        <StopCircle className="w-5 h-5" />
        Stop Timer
      </button>
    </div>
  );
};

export default ActiveTimer;