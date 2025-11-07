import React from 'react';
import { useTimer } from '../context/TimerContext';
import { Play, Square } from 'lucide-react';

const TaskItem = ({ task }) => {
  const { activeTimer, startTimer, stopTimer } = useTimer();

  // --- Logic for Glow Effect ---
  // Maps status to Tailwind shadow (glow) and border colors
  const statusStyles = {
    Pending: {
      glow: 'shadow-gray-500/30',
      border: 'border-gray-500/50',
      badge: 'bg-gray-500/20 text-gray-300',
    },
    'In Progress': {
      glow: 'shadow-blue-500/30',
      border: 'border-blue-500/50',
      badge: 'bg-blue-500/20 text-blue-300',
    },
    Completed: {
      glow: 'shadow-green-500/30',
      border: 'border-green-500/50',
      badge: 'bg-green-500/20 text-green-300',
    },
  };
  const styles = statusStyles[task.status] || statusStyles.Pending;

  // --- Logic for Smart Button ---
  const isThisTimerActive = activeTimer && activeTimer.task._id === task._id;
  const isAnotherTimerActive = activeTimer && activeTimer.task._id !== task._id;

  return (
    // The Task Card with the glow effect
    <div
      className={`flex items-center justify-between p-4 bg-zinc-800 rounded-lg border ${styles.border} shadow-lg ${styles.glow} transition-all`}
    >
      {/* Left Side: Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold truncate">{task.title}</h3>
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded-full ${styles.badge}`}
          >
            {task.status}
          </span>
        </div>
        <p className="text-sm text-zinc-400 mt-1 truncate">
          {task.description || 'No description'}
        </p>
      </div>

      {/* Right Side: Button */}
      <div className="ml-4 flex-shrink-0">
        {isThisTimerActive ? (
          // Show STOP button
          <button
            onClick={stopTimer}
            className="flex items-center gap-2 px-3 py-2 bg-red-600/20 text-red-300 rounded-md hover:bg-red-600/40"
          >
            <Square className="w-4 h-4" />
            Stop
          </button>
        ) : (
          // Show START button (and disable if another is active)
          <button
            onClick={() => startTimer(task._id)}
            disabled={isAnotherTimerActive}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600/20 text-blue-300 rounded-md 
                       hover:bg-blue-600/40 
                       disabled:bg-zinc-700/50 disabled:text-zinc-500 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4" />
            Start
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;