import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getTaskById, updateTask } from '../../utils/api';
import { Task } from '../../types/Task';

const EditTask = () => {
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
      getTaskById(id).then((task: Task) => {
        setForm({
          title: task.title,
          description: task.description,
          status: task.status,
          dueDate: task.dueDate?.slice(0, 10) || '', // Format YYYY-MM-DD
        });
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof id !== 'string') return;

    await updateTask(id, {
      ...form,
      status: form.status as 'todo' | 'in_progress' | 'done', // 👈 Fix type error
    });

    router.push('/');
  };

  return (
    <div className="container">
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          required
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
