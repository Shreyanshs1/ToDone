import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const TimerContext = createContext(null);

export const TimerProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [activeTimer, setActiveTimer] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { isLoggedIn } = useAuth(); // Depend on auth status

  useEffect(() => {
    // This effect runs when the user logs in
    if (isLoggedIn) {
      const bootstrap = async () => {
        setLoading(true);
        try {
          // Check for an active timer first
          const { data: timer } = await api.get('/timelogs/active');
          setActiveTimer(timer); // This will be null or the timer object
          
          // Then fetch all tasks
          const { data: tasks } = await api.get('/tasks');
          setTasks(tasks);

        } catch (error) {
          console.error('Failed to load app data', error);
        } finally {
          setLoading(false);
        }
      };
      bootstrap();
    } else {
      // If user logs out, clear everything
      setTasks([]);
      setActiveTimer(null);
      setLoading(false);
    }
  }, [isLoggedIn]); // Re-run this entire logic when auth state changes

  const startTimer = async (taskId) => {
    try {
      const { data } = await api.post('/timelogs/start', { taskId });
      // We need to fetch the task info for the timer
      const task = tasks.find(t => t._id === taskId);
      setActiveTimer({ ...data, task }); // Add task details to the timer object
    } catch (error) {
      console.error('Error starting timer', error);
    }
  };

  const stopTimer = async () => {
    if (!activeTimer) return;
    try {
      await api.put(`/timelogs/stop/${activeTimer._id}`);
      setActiveTimer(null); // Clear the active timer
    } catch (error) {
      console.error('Error stopping timer', error);
    }
  };

  // Function for components to manually update tasks (e.g., after create/delete)
  const fetchTasks = async () => {
    try {
      const { data: tasks } = await api.get('/tasks');
      setTasks(tasks);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const createTask = async (title, description) => {
    try {
      // 1. Call the API to create the task in the database
      const { data: newTask } = await api.post('/tasks', { title, description });
      
      // 2. Add the new task to the top of our local state
      //    This is WAY faster than re-fetching.
      setTasks((prevTasks) => [newTask, ...prevTasks]);
    } catch (error) {
      console.error('Error creating task', error);
      // Re-throw the error so the form can catch it
      throw error;
    }
  };

  return (
    <TimerContext.Provider
      value={{
        tasks,
        activeTimer,
        loading,
        startTimer,
        stopTimer,
        fetchTasks,
        createTask,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

// Custom hook to use the TimerContext
export const useTimer = () => {
  return useContext(TimerContext);
};