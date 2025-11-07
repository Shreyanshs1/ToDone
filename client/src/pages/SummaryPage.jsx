import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import {
  Clock,
  CheckCircle2,
  TrendingUp,
  PauseCircle,
} from 'lucide-react';


// 1. A small helper to format the seconds into HH:MM:SS
const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .map((v) => v.toString().padStart(2, '0'))
    .join(':');
};

// 2. A re-usable card for showing a single statistic
const StatCard = ({ title, value, icon }) => (
  <div className="bg-zinc-800 p-6 rounded-lg shadow-lg flex items-center gap-4">
    {/* The 'icon' prop is passed as a JSX element */}
    <div className="shrink-0">{icon}</div>
    <div>
      <div className="text-sm font-medium text-zinc-400">{title}</div>
      <div className="text-3xl font-bold text-white">{value}</div>
    </div>
  </div>
);

// 3. A re-usable badge for showing task status (consistent with TaskItem)
const StatusBadge = ({ status }) => {
  const statusStyles = {
    Pending: 'bg-red-500/20 text-red-300',
    'In Progress': 'bg-yellow-500/20 text-yellow-300',
    Completed: 'bg-green-500/20 text-green-300',
  };
  const style = statusStyles[status] || 'bg-gray-500/20 text-gray-300';
  
  return (
    <span
      className={`px-2 py-0.5 text-xs font-medium rounded-full ${style}`}
    >
      {status}
    </span>
  );
};

// --- The Main Page Component ---

const SummaryPage = () => {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the summary data when the component loads
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await api.get('/summary/today');
        setSummary(data);
      } catch (err) {
        setError('Failed to load summary. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSummary();
  }, []); // Empty array means this runs once on mount

  // --- Render States ---

  if (isLoading) {
    return <div className="text-center text-zinc-400">Loading summary...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400">{error}</div>;
  }

  if (!summary) {
    return null; // Should be covered by loading/error
  }

  // --- Main Content ---
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Today's Summary</h1>

      {/* Grid of 4 stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Time Today"
          value={formatTime(summary.totalTimeTrackedToday)}
          icon={<Clock className="w-8 h-8 text-blue-400" />}
        />
        <StatCard
          title="Total Completed"
          value={summary.taskCounts.completed}
          icon={<CheckCircle2 className="w-8 h-8 text-green-400" />}
        />
        <StatCard
          title="In Progress"
          value={summary.taskCounts.inProgress}
          icon={<TrendingUp className="w-8 h-8 text-yellow-400" />}
        />
        <StatCard
          title="Pending Tasks"
          value={summary.taskCounts.pending}
          icon={<PauseCircle className="w-8 h-8 text-red-400" />}
        />
      </div>

      {/* List of tasks worked on today */}
      <div className="bg-zinc-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Tasks Worked On Today</h2>
        {summary.tasksWorkedOnToday.length === 0 ? (
          <p className="text-zinc-500">
            You haven't tracked time for any specific tasks today.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {summary.tasksWorkedOnToday.map((task) => (
              <li
                key={task._id}
                className="flex items-center justify-between p-3 bg-zinc-700/50 rounded-md"
              >
                <span className="font-medium">{task.title}</span>
                <StatusBadge status={task.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SummaryPage;