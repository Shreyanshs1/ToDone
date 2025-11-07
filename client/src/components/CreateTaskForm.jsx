import React, { useState } from 'react';
import { useTimer } from '../context/TimerContext';
import { Plus } from 'lucide-react';

const CreateTaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { createTask } = useTimer();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setError('Title is required.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      await createTask(title, description);
      // Reset the form on success
      setTitle('');
      setDescription('');
    } catch (err) {
      setError('Failed to create task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-zinc-800 rounded-lg shadow-inner">
      <h3 className="text-lg font-semibold text-white mb-2">Create New Task</h3>
      {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
      
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Task Title (e.g., Follow up with designer)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 text-white bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Description (Optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="2"
          className="w-full px-3 py-2 text-white bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isSubmitting || !title}
          className="flex items-center justify-center gap-2 px-4 py-2 font-semibold text-white bg-blue-600 rounded-md 
                     hover:bg-blue-700 
                     disabled:bg-zinc-600 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
          {isSubmitting ? 'Creating...' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default CreateTaskForm;