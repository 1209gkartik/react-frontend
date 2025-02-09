// src/TaskInput.js
import React, { useState } from 'react';
import axios from 'axios';

const TaskInput = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskName || !description || !estimatedTime || !deadline) {
      setError('All fields are required.');
      return;
    }
    if (isNaN(estimatedTime) || estimatedTime <= 0) {
      setError('Estimated time must be a positive number.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', {
        name: taskName,
        description,
        estimated_time: parseFloat(estimatedTime),
        deadline,
      });
      if (response.status === 201) {
        alert('Task added successfully!');
        setTaskName('');
        setDescription('');
        setEstimatedTime('');
        setDeadline('');
      } else {
        setError('Failed to add the task. Try again.');
      }
    } catch (err) {
      setError('Error connecting to the server.');
    }
  };

  return (
    <div>
      <h2>Add New Task</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Estimated Time (hours)"
          value={estimatedTime}
          onChange={(e) => setEstimatedTime(e.target.value)}
          required
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};
