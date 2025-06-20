import { Task } from '../types/Task';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks`);
  return await res.json();
}

export async function fetchTask(id: string): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${id}`);
  return await res.json();
}

export async function createTask(task: Partial<Task>): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return await res.json();
}

export async function updateTask(id: string, task: Partial<Task>): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return await res.json();
}

export async function deleteTask(id: string): Promise<void> {
  await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
}
