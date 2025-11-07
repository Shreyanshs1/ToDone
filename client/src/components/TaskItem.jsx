import React, { useState } from 'react';
import { useTimer } from '../context/TimerContext';
import { Play, Square, Edit, Trash2, Save, X } from 'lucide-react';

const TaskItem = ({ task }) => {
  const { activeTimer, startTimer, stopTimer, updateTask, deleteTask } = useTimer();

  // State for the edit-in-place form
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  // State for the delete confirmation
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  // --- Logic for NEW Glow Effect ---
  // Red (Pending), Yellow (In Progress), Green (Completed)
  const statusStyles = {
    Pending: {
      glow: 'shadow-red-500/30',
      border: 'border-red-500/50',
      badge: 'bg-red-500/20 text-red-300',
    },
    'In Progress': {
      glow: 'shadow-yellow-500/30',
      border: 'border-yellow-500/50',
      badge: 'bg-yellow-500/20 text-yellow-300',
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

  // --- Handlers for new controls ---
  const handleStatusChange = (e) => {
    updateTask(task._id, { status: e.target.value });
  };

  const handleSave = () => {
    if (!editTitle) return; // Basic validation
    updateTask(task._id, { title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(task.title); // Reset form
    setEditDescription(task.description);
  };

  const handleDelete = () => {
    deleteTask(task._id);
    // No need to set state, as the component will be unmounted
  };

  // --- RENDER BLOCK: "EDIT MODE" ---
  // If we are editing, show a form instead of the task
  if (isEditing) {
    return (
      <div
        className={`p-4 bg-zinc-800 rounded-lg border ${styles.border} shadow-lg ${styles.glow}`}
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full text-xl font-semibold px-3 py-2 text-white bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows="2"
            className="w-full text-sm px-3 py-2 text-white bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-3 py-2 bg-zinc-600/50 text-zinc-300 rounded-md hover:bg-zinc-600"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-3 py-2 bg-green-600/50 text-green-300 rounded-md hover:bg-green-600"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER BLOCK: "DISPLAY MODE" (Default) ---
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-zinc-800 rounded-lg border ${styles.border} shadow-lg ${styles.glow} transition-all`}
    >
      {/* Left Side: Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-semibold truncate">{task.title}</h3>
        <p className="text-sm text-zinc-400 mt-1 truncate">
          {task.description || 'No description'}
        </p>
      </div>

      {/* Right Side: Control Panel (all our buttons) */}
      <div className="flex items-center gap-2 mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
        {/* Status Dropdown */}
        <select
          value={task.status}
          onChange={handleStatusChange}
          className={`px-2 py-2 text-xs font-medium rounded-md border ${styles.border} ${styles.badge} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        
        {/* Timer Button */}
        {isThisTimerActive ? (
          <button
            onClick={stopTimer}
            className="flex items-center gap-2 px-3 py-2 bg-red-600/20 text-red-300 rounded-md hover:bg-red-600/40"
          >
            <Square className="w-4 h-4" />
            Stop
          </button>
        ) : (
          <button
            onClick={() => startTimer(task._id)}
            disabled={isAnotherTimerActive}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600/20 text-blue-300 rounded-md hover:bg-blue-600/40 disabled:bg-zinc-700/50 disabled:text-zinc-500"
          >
            <Play className="w-4 h-4" />
            Start
          </button>
        )}

        {/* Edit Button */}
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-700"
        >
          <Edit className="w-4 h-4" />
        </button>

        {/* Delete Button (with confirmation) */}
        {isConfirmingDelete ? (
          <>
            <button
              onClick={handleDelete}
              className="px-3 py-2 text-red-300 bg-red-600/20 rounded-md hover:bg-red-600/40"
            >
              Confirm
            </button>
            <button
              onClick={() => setIsConfirmingDelete(false)}
              className="p-2 text-zinc-400"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsConfirmingDelete(true)}
            className="p-2 text-zinc-400 hover:text-red-400 rounded-md hover:bg-red-600/20"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;