import 'reflect-metadata';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import app from './app';

dotenv.config();
const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB init failed:', err);
  });
