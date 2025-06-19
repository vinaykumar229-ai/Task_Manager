import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Task } from '../entity/Task';

const router = Router();
const taskRepo = AppDataSource.getRepository(Task);

router.get('/', async (req: Request, res: Response) => {
  const tasks = await taskRepo.find();
  res.json(tasks);
});


router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, status, dueDate } = req.body;
    if (!title || !status) {
      res.status(400).json({ message: 'Title and Status are required' });
      return;
    }
    const task = taskRepo.create({ title, description, status, dueDate });
    const result = await taskRepo.save(task);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
});


router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await taskRepo.findOneBy({ id: req.params.id });
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    taskRepo.merge(task, req.body);
    const result = await taskRepo.save(task);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
});


router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await taskRepo.delete(req.params.id);
    if (result.affected === 0) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

export default router;
