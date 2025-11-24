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

---

## Screenshots

### Job Board
![Job Board]([https://github.com/Alatsakimaria/skillquest/assets/123456789/abcdef12-3456-7890](https://private-user-images.githubusercontent.com/116966271/517989291-b3abf5eb-7eed-4ddd-8ec6-94fd83f615fb.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjM5NzAwMTYsIm5iZiI6MTc2Mzk2OTcxNiwicGF0aCI6Ii8xMTY5NjYyNzEvNTE3OTg5MjkxLWIzYWJmNWViLTdlZWQtNGRkZC04ZWM2LTk0ZmQ4M2Y2MTVmYi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTI0JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTEyNFQwNzM1MTZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xOTkyMGViOGZjMDJhYTUwNDY5MWZiZGJlNGNmMGNmN2JhNDZhZjg3NTU2NWZjZjg0MDVhYzQ1ZDc1NjFiOTQyJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.8K1BO8SxiK58U3Y2Cf4Atq-_EgDK2AteJpFJcalryG4))

### Skills Dashboard
![Skills Dashboard]([(https://github.com/Alatsakimaria/skillquest/assets/123456789/0987654321ab)](https://private-user-images.githubusercontent.com/116966271/517989459-70963a9c-e385-4108-9acf-2ab1363034fb.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjM5NzAyNzYsIm5iZiI6MTc2Mzk2OTk3NiwicGF0aCI6Ii8xMTY5NjYyNzEvNTE3OTg5NDU5LTcwOTYzYTljLWUzODUtNDEwOC05YWNmLTJhYjEzNjMwMzRmYi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTI0JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTEyNFQwNzM5MzZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wMmYzMmM0NzU1NmRmYWFiOThlMTIzYjdkNGRhYWJiNzhkNDdkOWU1YzczMzQyZTY3YmFlNThhY2M1NmZiMmEyJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.ZeKvEgP1gNBolAdplQTFHwc0Xy-IOplEmzA56nSBEns))

### Learning Tasks
![Leatning Tasks](https://private-user-images.githubusercontent.com/116966271/517989571-2bee65df-b566-420e-855b-b0c939ee667a.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjM5NzAyNzYsIm5iZiI6MTc2Mzk2OTk3NiwicGF0aCI6Ii8xMTY5NjYyNzEvNTE3OTg5NTcxLTJiZWU2NWRmLWI1NjYtNDIwZS04NTViLWIwYzkzOWVlNjY3YS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTI0JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTEyNFQwNzM5MzZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT00ZmFkMzI4YjY4ZGE3OTMwZGQ3MjlmNDMxZGQ0OGEwODFjMjA4MTYwYjBlMjk3YTJmM2E1YWZhODU5ZWRkZTM3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.NA4C798qad8ZVuwwmBjB4Fs3-LxvgZp85PvAzAnJ9Oo)

### Calendar
![Calendar](https://private-user-images.githubusercontent.com/116966271/517989699-29698946-44ed-46a1-a61d-e4b7cc408a51.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjM5NzAyNzYsIm5iZiI6MTc2Mzk2OTk3NiwicGF0aCI6Ii8xMTY5NjYyNzEvNTE3OTg5Njk5LTI5Njk4OTQ2LTQ0ZWQtNDZhMS1hNjFkLWU0YjdjYzQwOGE1MS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMTI0JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTEyNFQwNzM5MzZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT03NzkyZWMyOWNlZDEwZGVkNmI3MGYwMGQwZmQzM2I4NDQ4Zjg0ZGRjMGNlODE3ZmU0ZGRhYjAwOWM0MzQyZWM4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.nJLmbu5ZnBjTYWS1C3wfwuZzymjfb0-CaYdgiwM0R5w)

