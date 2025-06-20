import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchTasks, updateTask } from '../../utils/api';
import { Task } from '../../types/Task';

export default function EditTask() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'todo',
    dueDate: '',
  });

  useEffect(() => {
    if (typeof id === 'string') {
      fetchTasks().then((tasks: Task[]) => {
        const task = tasks.find(t => t.id === id);
        if (task) {
          setForm({
            title: task.title,
            description: task.description || '',
            status: task.status,
            dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
          });
        }
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof id !== 'string') return;
    await updateTask(id, form);
    router.push('/');
  };

  return (
    <div className="container">
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Enter description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />
        </div>

        <button type="submit">Update Task</button>
      </form>

      <div className="back-link">
        <a href="/">← Back to Home</a>
      </div>
    </div>
  );
}
