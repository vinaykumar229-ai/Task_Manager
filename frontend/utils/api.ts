// utils/api.ts
import { Task } from '../types/Task';

const API_URL = 'https://task-manager-8-xxv3.onrender.com';

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function getTaskById(id: string): Promise<Task> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch task with id ${id}`);
  return res.json();
}

export async function createTask(task: Partial<Task>) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
}

export async function updateTask(id: string, task: Partial<Task>) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error(`Failed to update task with id ${id}`);
  return res.json();
}

export async function deleteTask(id: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Failed to delete task with id ${id}`);
}
