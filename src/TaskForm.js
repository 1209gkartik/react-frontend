import React, { useState } from 'react';

function TaskForm({ token, onTaskAdded }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [userEstimation, setUserEstimation] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    description,
                    user_estimation: parseInt(userEstimation),
                }),
            });

            if (!response.ok) {
                // Handle HTTP errors
                const errorData = await response.json();
                console.error('Server error:', errorData);
                setError(errorData.error || 'Failed to add task');
                return;
            }

            const data = await response.json();
            onTaskAdded(); // Refresh the task list
            setTitle('');
            setDescription('');
            setUserEstimation('');
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Network error:', error);
            setError('An error occurred while adding the task. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add a Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Your Estimation (in minutes)"
                    value={userEstimation}
                    onChange={(e) => setUserEstimation(e.target.value)}
                    required
                />
                <button type="submit">Add Task</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default TaskForm;


