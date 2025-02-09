import React, { useState } from 'react';

function TaskForm({ token, onTaskAdded }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [userEstimation, setUserEstimation] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                const errorData = await response.json();
                setError(errorData.error || 'Failed to add task.');
                return;
            }

            setTitle('');
            setDescription('');
            setUserEstimation('');
            setError(null);

            if (onTaskAdded) onTaskAdded();
        } catch (error) {
            console.error('Error adding task:', error);
            setError('An error occurred while adding the task.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Task</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Estimated Time (hours):</label>
                <input
                    type="number"
                    value={userEstimation}
                    onChange={(e) => setUserEstimation(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Task</button>
        </form>
    );
}

export default TaskForm;

