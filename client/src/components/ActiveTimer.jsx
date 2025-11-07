import React, { useState, useEffect } from 'react';
import { Clock, StopCircle } from 'lucide-react';

// Helper to format time
const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .map((v) => v.toString().padStart(2, '0'))
    .join(':');
};

const ActiveTimer = ({ timer, onStop }) => {
  // Get the start time (as a Date object) from the timer prop
  const startTime = new Date(timer.startTime);
  
  // Calculate initial seconds and set up the ticking state
  const [elapsedSeconds, setElapsedSeconds] = useState(
    Math.floor((new Date() - startTime) / 1000)
  );

  // The ticking interval
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((new Date() - startTime) / 1000));
    }, 1000);

    // Cleanup function
    return () => clearInterval(interval);
  }, [startTime]); // Re-run only if the startTime changes

  return (
    <div className="flex items-center p-2 bg-blue-500/20 text-white rounded-lg">
      <Clock className="w-5 h-5 mr-2 text-blue-300" />
      <div className="flex flex-col text-sm">
        <span className="font-medium text-white">
          {timer.task?.title || 'Loading...'}
        </span>
        <span className="text-xs text-blue-200">
          {formatTime(elapsedSeconds)}
        </span>
      </div>
      <button
        onClick={onStop}
        title="Stop Timer"
        className="ml-4 text-red-300 hover:text-red-200"
      >
        <StopCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ActiveTimer;