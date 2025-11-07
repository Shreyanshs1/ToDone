import React from 'react';
import { useTimer } from '../context/TimerContext';
import TaskItem from './TaskItem';
import CreateTaskForm from './CreateTaskForm'; // <-- 1. IMPORT

const TaskList = () => {
  const { tasks, loading } = useTimer();

  if (loading) {
    return <div className="text-center text-zinc-400">Loading tasks...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold border-b border-zinc-700 pb-2">
        Your Tasks
      </h2>
      
      <CreateTaskForm />

      {tasks.length === 0 ? (
        <p className="text-zinc-500 text-center py-4">
          You haven't created any tasks yet.
        </p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))
      )}
    </div>
  );
};

export default TaskList;