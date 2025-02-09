import React, { useEffect, useState } from 'react';

function TaskList({ token }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('/api/tasks', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const result = await response.json();

                if (response.ok) {
                    console.log("Fetched tasks:", result);  // Debugging: Log fetched tasks
                    setTasks(result);
                } else {
                    alert('Failed to fetch tasks');
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);  // Debugging: Log any errors
            }
        };

        fetchTasks();
    }, [token]);

    return (
        <div>
            <h2>Your Tasks</h2>
            <ul>
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <li key={task.id}>
                            <strong>{task.title}</strong> - {task.description} (Estimated: {task.calculated_estimation} mins)
                        </li>
                    ))
                ) : (
                    <p>No tasks available. Add a new task!</p>  // Display a message if no tasks are available
                )}
            </ul>
        </div>
    );
}

export default TaskList;


