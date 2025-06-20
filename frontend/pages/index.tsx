import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getTasks, deleteTask } from '../utils/api';
import { Task } from '../types/Task';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState('all');
  const router = useRouter();

  const load = async () => {
    const data = await fetchTasks();
    setTasks(data);
    setFilteredTasks(data);
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    load();
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilter(value);
    if (value === 'all') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.status === value));
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div className="filter">
        <button onClick={() => router.push('/add')}>➕ Add Task</button>
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {filteredTasks.map((task) => (
        <div className="card" key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: <span className={`status ${task.status}`}>{task.status}</span></p>
          <p>Due: {task.dueDate || 'N/A'}</p>
          <div className="actions">
            <button onClick={() => router.push(`/edit/${task.id}`)}>Edit</button>
            <button className="delete" onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
