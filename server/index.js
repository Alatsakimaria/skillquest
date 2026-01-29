import express, { json } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const PORT = 4000;
const JWT_SECRET = "super-secret-change-me";

app.use(cors());
app.use(json());

// ------------------------
// AUTH MIDDLEWARE
// ------------------------
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: "Missing Authorization header" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id: user.id }
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// ------------------------
// LOGIN ROUTE (PUBLIC)
// ------------------------
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, userId: user.id });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// ------------------------
// HELPER – MAP JOB
// ------------------------
function mapJobToClient(job) {
  return {
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    match: job.match,
    isMain: job.isMain,
    tags: job.tags ? job.tags.split(",").map((t) => t.trim()) : [],
  };
}

// ------------------------
// PROTECTED ROUTES BELOW
// ------------------------
app.use(authMiddleware);

// ------------------------
// GET ALL JOBS
// ------------------------
app.get("/api/jobs", async (req, res) => {
  try {
    const allJobs = await prisma.job.findMany({
      where: { userId: req.user.id },
      orderBy: { id: "asc" },
    });

    const grouped = {
      wishlist: [],
      applied: [],
      interview: [],
      outcome: [],
    };

    for (const job of allJobs) {
      grouped[job.status].push(mapJobToClient(job));
    }

    res.json(grouped);
  } catch {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// ------------------------
// CREATE JOB
// ------------------------
app.post("/api/jobs", async (req, res) => {
  const { title, company, location, column, match } = req.body;

  try {
    const created = await prisma.job.create({
      data: {
        title: title || "Untitled Job",
        company: company || "",
        location: location || "",
        match: Number(match) || 50,
        status: column || "wishlist",
        tags: "New",
        isMain: false,
        userId: req.user.id,
      },
    });

    const allJobs = await prisma.job.findMany({
      where: { userId: req.user.id },
    });

    const grouped = {
      wishlist: [],
      applied: [],
      interview: [],
      outcome: [],
    };

    for (const job of allJobs) {
      grouped[job.status].push(mapJobToClient(job));
    }

    res.status(201).json({ job: mapJobToClient(created), jobs: grouped });
  } catch {
    res.status(500).json({ error: "Failed to create job" });
  }
});

// ------------------------
// DELETE JOB
// ------------------------
app.delete("/api/jobs/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.job.delete({
      where: { id },
    });

    const allJobs = await prisma.job.findMany({
      where: { userId: req.user.id },
    });

    const grouped = {
      wishlist: [],
      applied: [],
      interview: [],
      outcome: [],
    };

    for (const job of allJobs) {
      grouped[job.status].push(mapJobToClient(job));
    }

    res.json({ success: true, jobs: grouped });
  } catch {
    res.status(500).json({ error: "Failed to delete job" });
  }
});

// ------------------------
// GET TASKS
// ------------------------
app.get("/api/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: { userId: req.user.id },
    orderBy: { id: "asc" },
  });
  res.json(tasks);
});

// ------------------------
// CREATE TASK
// ------------------------
app.post("/api/tasks", async (req, res) => {
  const { skill, title, jobId, jobTitle, status, progress, effort } = req.body;

  try {
    const created = await prisma.task.create({
      data: {
        skill: skill || "General",
        title: title || "New task",
        status: status || "Not started",
        progress: Number(progress) || 0,
        effort: effort || "",
        jobId: jobId ?? null,
        jobTitle: jobTitle || "",
        userId: req.user.id,
      },
    });

    res.status(201).json(created);
  } catch {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// ------------------------
// UPDATE TASK
// ------------------------
app.patch("/api/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const updated = await prisma.task.update({
      where: { id },
      data: req.body,
    });

    res.json(updated);
  } catch {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// ------------------------
// NOTES
// ------------------------
app.get("/api/jobs/:jobId/notes", async (req, res) => {
  const jobId = Number(req.params.jobId);

  const notes = await prisma.note.findMany({
    where: { jobId, userId: req.user.id },
    orderBy: { createdAt: "desc" },
  });

  res.json(notes);
});

app.post("/api/jobs/:jobId/notes", async (req, res) => {
  const jobId = Number(req.params.jobId);
  const { text } = req.body;

  const created = await prisma.note.create({
    data: {
      text,
      jobId,
      userId: req.user.id,
    },
  });

  res.status(201).json(created);
});

// ------------------------
// START SERVER
// ------------------------
app.listen(PORT, () =>
  console.log(`SkillQuest backend running at http://localhost:${PORT}`)
);
