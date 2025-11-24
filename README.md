# SkillQuest  
A structured, data-driven dashboard for job tracking, skill development, and application insights.

SkillQuest is a full-stack productivity tool built to bring structure to the job-search process.  
It combines a job board, skills insights, a learning-task planner, note-taking, and a calendar view — all backed by a real Express API and Prisma/SQLite database.

The project is designed to simulate a real SaaS product with modern architecture and clean separation between frontend and backend.

---

## Features Overview

### 1. Job Board
Organize applications across four stages:
- **Wishlist**
- **Applied**
- **Interview**
- **Outcome (Offer / Rejected)**

Features:
- Add/delete jobs  
- View job details dynamically  
- Search by title/company/tech  
- Filter by location (Remote, Hybrid, On-Site)  

---

### 2. Job Detail + Skill Requirements
Each job includes:
- Required skills vs your skill level  
- Tech tags  
- Match % score  
- Gaps indicators  
- Notes per job (stored in DB)

---

### 3. Notes per Job
Each job has a personal notes area:
- Add unlimited notes  
- Notes saved in SQLite via Prisma
- Shown live inside the Job Detail panel

---

### 4. Learning Tasks System
A productivity planner for improving your skills:
- Add tasks linked to jobs or independent
- Track status (Not started / In progress / Done)
- Track progress percentage
- Add time/effort estimates

---

### 5. Calendar View
Visualize all jobs over time using a custom calendar interface.

---

### Import / Export Data
- Export all app data to JSON
- Import JSON to restore previous sessions

---

## Tech Stack

### **Frontend**
- React (Vite)
- Custom CSS
- Fetch API for backend integration

### **Backend**
- **Node.js** — runtime environment  
- **Express.js** — REST API routes  
- **Prisma ORM** — database layer  
- **SQLite** — local relational database  

---

## Installation & Running

### 1. Install dependencies
-  npm install

## 2. Run database migrations
-  npx prisma migrate dev --name init

## 3. Seed DB with demo data (optional but recommended)
- node prisma/seed.js

## 4. Start backend server
- node server/index.js

Backend runs at: **http://localhost:4000**

## 5. Start React frontend
- npm run dev
  
Frontend runs at: **http://localhost:5173**

