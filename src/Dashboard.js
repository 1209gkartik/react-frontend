import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import useFetchTasks from './useFetchTasks . js';  // Import the custom hook

function Dashboard({ token }) {
    const { tasks, error: fetchError } = useFetchTasks(token);
    const [showTaskForm, setShowTaskForm] = useState(true);

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
                <TaskForm token={token} />
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
