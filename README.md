# 📝 Task Manager (Full-Stack App)

A simple full-stack Task Manager built with:

- Backend: **Node.js**, **Express**, **TypeORM**, **PostgreSQL** (or SQLite)
- Frontend: **Next.js (React)** with **plain CSS**
- No authentication required

---

## 📁 Project Structure

Restomart-Task_manager/
├── backend/ # Express + TypeORM API
└── frontend/ # Next.js client

yaml
Copy
Edit

---

## 🚀 Features

- Create, edit, delete tasks
- Task status: `todo`, `in_progress`, `done`
- Due date support
- Filter tasks by status
- Responsive UI

---

## 🛠️ Backend Setup (Node.js + TypeORM)

### 📦 Prerequisites

- Node.js installed
- PostgreSQL (or SQLite for local testing)

### 🔧 Setup Instructions

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# or manually create .env with:
# PORT=4000
# DB_HOST=localhost
# DB_PORT=5432
# DB_USERNAME=your_username
# DB_PASSWORD=your_password
# DB_DATABASE=taskmanager

# Run server (with auto-reload)
npm run dev
Server will start on: http://localhost:4000

💻 Frontend Setup (Next.js)
📦 Prerequisites
Node.js installed

🔧 Setup Instructions
bash
Copy
Edit
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
Frontend runs at: http://localhost:3000

Make sure backend is running on http://localhost:4000

🌐 API Endpoints
Method	Endpoint	    Description
GET	     /tasks	       List all tasks
POST	   /tasks	       Create a task
GET	     /tasks/:id	   Get single task
PUT	     /tasks/:id	   Update task
DELETE	 /tasks/:id	   Delete task

📦 Deployment
Frontend → Vercel

Backend → Render

