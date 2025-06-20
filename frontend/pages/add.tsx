import { useState } from 'react';
import { useRouter } from 'next/router';
import { createTask } from '../utils/api';

export default function AddTask() {
  const [form, setForm] = useState({ title: '', description: '', status: '', dueDate: '' });
  const router = useRouter();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.title || !form.status) {
      alert('Title and Status are required');
      return;
    }
    await createTask(form);
    router.push('/');
  };

  return (
    <div className="container">
      <h1>Add Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange} required>
            <option value="">Select status</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
        </div>
        <button type="submit">Create Task</button>
      </form>
      <div className="back-link">
        <a href="/">← Back to Home</a>
      </div>
    </div>
  );
}
