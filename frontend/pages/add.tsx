import { useState } from 'react';
import { useRouter } from 'next/router';
import { createTask } from '../utils/api';
import { Task } from '../types/Task';

export default function AddTask() {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Task>>({
    title: '',
    description: '',
    status: 'todo',
    dueDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;
    await createTask(form);
    router.push('/');
  };

  return (
    <div className="form-container">
      <h1>Add New Task</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value as Task['status'] })
          }
        >
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
