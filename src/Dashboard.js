import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function Dashboard({ token }) {
    const [tasks, setTasks] = useState([]);
    const [showTaskForm, setShowTaskForm] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    const fetchTasks = async () => {
        try {
            const response = await fetch('/api/tasks', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                // Handle HTTP errors
                const errorData = await response.json();
                console.error('Server error:', errorData);
                setFetchError(errorData.error || 'Failed to fetch tasks.');
                return;
            }

            const result = await response.json();
            setTasks(result);
            setFetchError(null); // Clear any previous errors
        } catch (error) {
            console.error('Network error:', error);
            setFetchError('An error occurred while fetching tasks.');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [token]);

    const toggleView = () => {
        setShowTaskForm(!showTaskForm);
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={toggleView}>
                {showTaskForm ? 'View Tasks' : 'Add Task'}
            </button>
            {showTaskForm ? (
                <TaskForm token={token} onTaskAdded={fetchTasks} />
            ) : (
                <>
                    {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
                    <TaskList tasks={tasks} />
                </>
            )}
        </div>
    );
}

export default Dashboard;



