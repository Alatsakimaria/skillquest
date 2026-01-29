import React, { useState, useEffect, useRef } from "react";


import {
  jobsDemo,
  initialTasks,
  jobDetails,
  mainJobDetail,
} from "./demo/demoData";


import BoardColumn from "./components/BoardColumn.jsx";
import JobDetail from "./components/JobDetail.jsx";
import SkillsDashboard from "./components/SkillsDashboard.jsx";
import TasksView from "./components/TasksView.jsx";
import JobCalendarView from "./components/JobCalendarView.jsx";

function App() {
  // core data
  const [jobs, setJobs] = useState(null);
  const [tasks, setTasks] = useState(null);

  // UI state
  const [activeJobId, setActiveJobId] = useState(4);
  const [activeView, setActiveView] = useState("board");
  const [notesByJob, setNotesByJob] = useState({});

  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // modals
  const [showNewJobForm, setShowNewJobForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    column: "wishlist",
    match: 60,
  });

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskDraft, setTaskDraft] = useState({
    skill: "",
    title: "",
    jobId: null,
    jobTitle: "",
    status: "Not started",
    progress: 0,
    effort: "",
  });

  // loading / error
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // file input (export / import)
  const fileInputRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        setLoadError(null);

        const [jobsRes, tasksRes] = await Promise.all([
          fetch("http://localhost:4000/api/jobs"),
          fetch("http://localhost:4000/api/tasks"),
        ]);

        if (!jobsRes.ok || !tasksRes.ok) {
          throw new Error("API returned an error status");
        }

        const [jobsData, tasksData] = await Promise.all([
          jobsRes.json(),
          tasksRes.json(),
        ]);

        setJobs(jobsData);
        setTasks(tasksData);
      } catch (err) {
        console.error("Backend fetch failed, using demo data:", err);
        setLoadError("Could not reach backend. Showing demo data.");
        setJobs(jobsDemo);
        setTasks(initialTasks);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  // --- LOAD NOTES FOR ACTIVE JOB ---
  useEffect(() => {
    if (!activeJobId) return;

    async function loadNotes() {
      try {
        const res = await fetch(
          `http://localhost:4000/api/jobs/${activeJobId}/notes`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch notes");
        }

        const notes = await res.json();
        setNotesByJob((prev) => ({
          ...prev,
          [activeJobId]: notes,
        }));
      } catch (err) {
        console.error("Error loading notes", err);
      }
    }

    loadNotes();
  }, [activeJobId]);

  // --- LOADING SCREEN ---
  if (isLoading || !jobs || !tasks) {
    return (
      <div className="loading-screen">
        <div className="loading-card">
          <div className="loading-spinner" />
          <div>
            <div className="loading-title">SkillQuest</div>
            <div className="loading-subtitle">
              Preparing your jobs &amp; skill gaps…
            </div>
          </div>
        </div>
      </div>
    );
  }

  // derived data
  const allJobs = [
    ...jobs.wishlist,
    ...jobs.applied,
    ...jobs.interview,
    ...jobs.outcome,
  ];

  const selectedJob = allJobs.find((job) => job.id === activeJobId);
  const selectedDetail = jobDetails[activeJobId] || mainJobDetail;

  const remoteCount = allJobs.filter((job) => job.location === "Remote").length;
  const hybridCount = allJobs.filter((job) => job.location === "Hybrid").length;
  const onsiteCount = allJobs.filter(
    (job) => job.location === "On-Site"
  ).length;

  const lastUpdatedLabel = "Today · demo data";

  const matches = allJobs.map((job) => job.match);
  const averageMatch = matches.length
    ? Math.round(matches.reduce((sum, m) => sum + m, 0) / matches.length)
    : 0;

  const bestMatchJob = matches.length
    ? allJobs.reduce(
        (best, job) => (job.match > best.match ? job : best),
        allJobs[0]
      )
    : null;

  // filtered jobs for board view
  const normalizedQuery = searchQuery.toLowerCase();

  const filterJobsByQuery = (list) =>
    list.filter((job) => {
      const haystack = (
        job.title +
        " " +
        job.company +
        " " +
        job.location +
        " " +
        job.tags.join(" ")
      ).toLowerCase();

      const matchesText = !normalizedQuery || haystack.includes(normalizedQuery);
      const matchesLocation =
        !locationFilter ||
        job.location.toLowerCase().includes(locationFilter.toLowerCase());

      return matchesText && matchesLocation;
    });

  const filteredJobs = {
    wishlist: filterJobsByQuery(jobs.wishlist),
    applied: filterJobsByQuery(jobs.applied),
    interview: filterJobsByQuery(jobs.interview),
    outcome: filterJobsByQuery(jobs.outcome),
  };

  // note 
  const handleAddNote = async (jobId, text) => {
    if (!jobId || !text.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:4000/api/jobs/${jobId}/notes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add note");
      }

      const created = await res.json();

      setNotesByJob((prev) => ({
        ...prev,
        [jobId]: [...(prev[jobId] || []), created],
      }));
    } catch (err) {
      console.error(err);
      alert("Could not add note. Check console for details.");
    }
  };

  // delete job
  const handleDeleteJob = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      const data = await response.json();
      const updatedJobs = data.jobs;
      setJobs(updatedJobs);

      const allUpdatedJobs = [
        ...updatedJobs.wishlist,
        ...updatedJobs.applied,
        ...updatedJobs.interview,
        ...updatedJobs.outcome,
      ];
      setActiveJobId(allUpdatedJobs.length ? allUpdatedJobs[0].id : null);

      setTasks((prev) =>
        prev.map((t) =>
          t.jobId === id ? { ...t, jobId: null, jobTitle: "(job removed)" } : t
        )
      );
    } catch (err) {
      console.error(err);
      alert("Could not delete job. Check console for details.");
    }
  };

  const handleJobClick = (jobId) => {
    setActiveJobId(jobId);
  };

  const handleNewJobClick = () => {
    setShowNewJobForm(true);
  };

  const handleNewJobChange = (field, value) => {
    setNewJob((prev) => ({ ...prev, [field]: value }));
  };

  const handleNewJobSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });

      if (!response.ok) {
        throw new Error("Failed to create job");
      }

      const data = await response.json();
      const updatedJobs = data.jobs;

      setJobs(updatedJobs);

      const all = [
        ...updatedJobs.wishlist,
        ...updatedJobs.applied,
        ...updatedJobs.interview,
        ...updatedJobs.outcome,
      ];
      const maxId = all.length ? Math.max(...all.map((j) => j.id)) : null;
      setActiveJobId(maxId);

      setShowNewJobForm(false);
      setNewJob({
        title: "",
        company: "",
        location: "",
        column: "wishlist",
        match: 60,
      });
    } catch (err) {
      console.error(err);
      alert("Could not create job. Check console for details.");
    }
  };

  const handleNewJobCancel = () => {
    setShowNewJobForm(false);
  };

  // tasks
  const handleUpdateTask = async (id, updates) => {
    try {
      const response = await fetch(`http://localhost:4000/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updatedTask } : t))
      );
    } catch (err) {
      console.error(err);
      alert("Could not update task. Check console for details.");
    }
  };

  const openTaskModal = (skill, job) => {
    setTaskDraft({
      skill: skill || "",
      title: skill ? `Practice ${skill}` : "",
      jobId: job?.id || null,
      jobTitle: job ? `${job.title} @ ${job.company}` : "",
      status: "Not started",
      progress: 0,
      effort: "",
    });
    setShowTaskModal(true);
  };

  const handleTaskDraftChange = (field, value) => {
    setTaskDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskDraft),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const createdTask = await response.json();

      setTasks((prev) => [...prev, createdTask]);
      setShowTaskModal(false);

      setTaskDraft({
        skill: "",
        title: "",
        jobId: null,
        jobTitle: "",
        status: "Not started",
        progress: 0,
        effort: "",
      });
    } catch (err) {
      console.error(err);
      alert("Could not create task. Check console for details.");
    }
  };

  const handleTaskCancel = () => {
    setShowTaskModal(false);
  };

  // export / import
  const handleExportClick = () => {
    try {
      const payload = { jobs, tasks, activeJobId };
      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "skillquest-data.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed", err);
      alert("Export failed. Check console for details.");
    }
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleImportFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result;
        const parsed = JSON.parse(text);

        if (!parsed.jobs || !parsed.tasks) {
          alert("Invalid file: missing jobs or tasks.");
          return;
        }

        setJobs(parsed.jobs);
        setTasks(parsed.tasks);
        if (parsed.activeJobId) setActiveJobId(parsed.activeJobId);

        alert("Data imported successfully!");
      } catch (err) {
        console.error("Import failed", err);
        alert(
          "Import failed. Make sure you selected a valid SkillQuest export file."
        );
      }
    };
    reader.readAsText(file);
  };

  // --- RENDER ---
  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">SQ</div>
          <div className="sidebar-title">
            <h1>SkillQuest</h1>
            <span>Job search · Skill gaps</span>
          </div>
        </div>

        <div>
          <div className="nav-section-title">Navigation</div>
          <nav className="nav">
            <button
              className={activeView === "board" ? "active" : ""}
              onClick={() => setActiveView("board")}
            >
              <span className="nav-dot" />
              <span>Jobs board</span>
            </button>
            <button
              className={activeView === "skills" ? "active" : ""}
              onClick={() => setActiveView("skills")}
            >
              <span className="nav-dot" />
              <span>Skills dashboard</span>
            </button>
            <button
              className={activeView === "tasks" ? "active" : ""}
              onClick={() => setActiveView("tasks")}
            >
              <span className="nav-dot" />
              <span>Learning tasks</span>
            </button>
            <button
              className={activeView === "calendar" ? "active" : ""}
              onClick={() => setActiveView("calendar")}
            >
              <span className="nav-dot" />
              <span>Calendar</span>
            </button>

            <button>
              <span className="nav-dot" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-footer-title">Preview</div>
          <div className="sidebar-footer-text">
            Static UI mock · Frontend only
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">
        <header className="topbar">
          <div className="topbar-left">
            <div className="topbar-title">Job applications &amp; skill gaps</div>
            <div className="topbar-subtitle">
              See all your target roles, how well you match them, and which
              skills to learn next.
            </div>
          </div>
          <div className="topbar-right">
            <div className="topbar-meta">
              <span className="last-updated">{lastUpdatedLabel}</span>
              <div className="pill">
                <span>Target role:</span>
                <strong>Junior Frontend Developer</strong>
              </div>
            </div>

            <div className="topbar-actions">
              <button
                type="button"
                className="btn-secondary small"
                onClick={handleExportClick}
              >
                Export
              </button>
              <button
                type="button"
                className="btn-ghost small"
                onClick={handleImportClick}
              >
                Import
              </button>
              <button className="btn-primary" onClick={handleNewJobClick}>
                New job
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              style={{ display: "none" }}
              onChange={handleImportFile}
            />
          </div>
        </header>

        <section className="content">
          {loadError && (
            <div className="pill" style={{ marginBottom: "8px" }}>
              {loadError}
            </div>
          )}

          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-label">Jobs tracked</div>
              <div className="stat-value">{allJobs.length}</div>
              <div className="stat-extra">
                {jobs.wishlist.length} wishlist · {jobs.applied.length} applied ·{" "}
                {jobs.interview.length} interviews
              </div>
              <div className="stat-extra">
                {remoteCount} Remote · {hybridCount} Hybrid · {onsiteCount} On-site
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Average skill match</div>
              <div className="stat-value">
                {averageMatch ? `${averageMatch}%` : "–"}
              </div>
              <div className="stat-extra">
                {bestMatchJob ? (
                  <>
                    Best match: {bestMatchJob.title} @ {bestMatchJob.company} (
                    {bestMatchJob.match}%)
                  </>
                ) : (
                  "No jobs yet"
                )}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Learning tasks</div>
              <div className="stat-value">{tasks.length}</div>
              <div className="stat-extra">
                Track concrete actions for your focus skills.
              </div>
            </div>
          </div>

          {activeView === "board" && (
            <div className="main-split">
              {/* BOARD */}
              <section className="panel">
                <header className="panel-header">
                  <div>
                    <div className="panel-title">Job board</div>
                    <div className="panel-subtitle">
                      Organise every application by status.
                    </div>
                  </div>
                  <span className="chip">
                    <span className="indicator-dot"></span>
                    Live overview · demo data
                  </span>
                </header>

                <div className="board-filters">
                  <div className="filter-chips">
                    <button
                      type="button"
                      className={
                        "filter-chip" + (locationFilter === "" ? " active" : "")
                      }
                      onClick={() => setLocationFilter("")}
                    >
                      All
                    </button>
                    <button
                      type="button"
                      className={
                        "filter-chip" +
                        (locationFilter === "Remote" ? " active" : "")
                      }
                      onClick={() => setLocationFilter("Remote")}
                    >
                      Remote
                    </button>
                    <button
                      type="button"
                      className={
                        "filter-chip" +
                        (locationFilter === "Hybrid" ? " active" : "")
                      }
                      onClick={() => setLocationFilter("Hybrid")}
                    >
                      Hybrid
                    </button>
                    <button
                      type="button"
                      className={
                        "filter-chip" +
                        (locationFilter === "On-Site" ? " active" : "")
                      }
                      onClick={() => setLocationFilter("On-Site")}
                    >
                      On-site
                    </button>
                  </div>

                  <input
                    type="text"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, company, tech..."
                  />
                </div>

                <div className="board">
                  <BoardColumn
                    title="Wishlist"
                    count={filteredJobs.wishlist.length}
                    total={jobs.wishlist.length}
                    jobs={filteredJobs.wishlist}
                    activeJobId={activeJobId}
                    onJobClick={handleJobClick}
                  />
                  <BoardColumn
                    title="Applied"
                    count={filteredJobs.applied.length}
                    total={jobs.applied.length}
                    jobs={filteredJobs.applied}
                    activeJobId={activeJobId}
                    onJobClick={handleJobClick}
                  />
                  <BoardColumn
                    title="Interview"
                    count={filteredJobs.interview.length}
                    total={jobs.interview.length}
                    jobs={filteredJobs.interview}
                    activeJobId={activeJobId}
                    onJobClick={handleJobClick}
                  />
                  <BoardColumn
                    title="Offer / Rejected"
                    count={filteredJobs.outcome.length}
                    total={jobs.outcome.length}
                    jobs={filteredJobs.outcome}
                    activeJobId={activeJobId}
                    onJobClick={handleJobClick}
                  />
                </div>
              </section>

              {/* DETAIL PANEL */}
              <section className="panel">
                <JobDetail
                  job={selectedJob}
                  detail={selectedDetail}
                  onDelete={handleDeleteJob}
                  onAddTask={openTaskModal}
                  notes={notesByJob[activeJobId] || []}
                  onAddNote={handleAddNote}
                />
              </section>
            </div>
          )}

          {activeView === "skills" && (
            <section className="panel">
              <SkillsDashboard />
            </section>
          )}

          {activeView === "tasks" && (
            <section className="panel">
              <TasksView tasks={tasks} onUpdateTask={handleUpdateTask} />
            </section>
          )}

          {activeView === "calendar" && (
            <section className="panel">
              <JobCalendarView jobs={jobs} />
            </section>
          )}
        </section>
      </main>

      {/* NEW JOB MODAL */}
      {showNewJobForm && (
        <div className="modal-backdrop" onClick={handleNewJobCancel}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title">Add new job</h2>
                <p className="modal-subtitle">
                  Quickly add a job you&apos;re tracking and place it in a column.
                </p>
              </div>
              <button
                className="modal-close"
                type="button"
                onClick={handleNewJobCancel}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleNewJobSubmit}>
              <div className="modal-body">
                <div className="new-job-field">
                  <label className="new-job-label">Job title</label>
                  <input
                    type="text"
                    value={newJob.title}
                    onChange={(e) =>
                      handleNewJobChange("title", e.target.value)
                    }
                    placeholder="e.g. Junior React Developer"
                  />
                </div>

                <div className="modal-grid">
                  <div className="new-job-field">
                    <label className="new-job-label">Company</label>
                    <input
                      type="text"
                      value={newJob.company}
                      onChange={(e) =>
                        handleNewJobChange("company", e.target.value)
                      }
                      placeholder="e.g. Acme Inc."
                    />
                  </div>

                  <div className="new-job-field">
                    <label className="new-job-label">Location</label>
                    <input
                      type="text"
                      value={newJob.location}
                      onChange={(e) =>
                        handleNewJobChange("location", e.target.value)
                      }
                      placeholder="e.g. Remote"
                    />
                  </div>
                </div>

                <div className="modal-grid">
                  <div className="new-job-field">
                    <label className="new-job-label">Column</label>
                    <select
                      value={newJob.column}
                      onChange={(e) =>
                        handleNewJobChange("column", e.target.value)
                      }
                    >
                      <option value="wishlist">Wishlist</option>
                      <option value="applied">Applied</option>
                      <option value="interview">Interview</option>
                      <option value="outcome">Offer / Rejected</option>
                    </select>
                  </div>

                  <div className="new-job-field">
                    <label className="new-job-label">Match %</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newJob.match}
                      onChange={(e) =>
                        handleNewJobChange("match", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleNewJobCancel}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary small">
                  Add job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEW LEARNING TASK MODAL */}
      {showTaskModal && (
        <div className="modal-backdrop" onClick={handleTaskCancel}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title">Add learning task</h2>
                <p className="modal-subtitle">
                  Create a concrete task to improve a skill for a role.
                </p>
              </div>
              <button
                className="modal-close"
                type="button"
                onClick={handleTaskCancel}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleTaskSubmit}>
              <div className="modal-body">
                {taskDraft.jobTitle && (
                  <div className="new-job-field">
                    <label className="new-job-label">Linked role</label>
                    <div className="pill pill-soft">{taskDraft.jobTitle}</div>
                  </div>
                )}

                <div className="new-job-field">
                  <label className="new-job-label">Skill</label>
                  <input
                    type="text"
                    value={taskDraft.skill}
                    onChange={(e) =>
                      handleTaskDraftChange("skill", e.target.value)
                    }
                    placeholder="TypeScript, React, Figma..."
                  />
                </div>

                <div className="new-job-field">
                  <label className="new-job-label">Task</label>
                  <input
                    type="text"
                    value={taskDraft.title}
                    onChange={(e) =>
                      handleTaskDraftChange("title", e.target.value)
                    }
                    placeholder="e.g. Build small Node API using TS"
                  />
                </div>

                <div className="modal-grid">
                  <div className="new-job-field">
                    <label className="new-job-label">Status</label>
                    <select
                      value={taskDraft.status}
                      onChange={(e) =>
                        handleTaskDraftChange("status", e.target.value)
                      }
                    >
                      <option value="Not started">Not started</option>
                      <option value="In progress">In progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>
                  <div className="new-job-field">
                    <label className="new-job-label">Progress %</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={taskDraft.progress}
                      onChange={(e) =>
                        handleTaskDraftChange("progress", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="new-job-field">
                  <label className="new-job-label">Effort / when</label>
                  <input
                    type="text"
                    value={taskDraft.effort}
                    onChange={(e) =>
                      handleTaskDraftChange("effort", e.target.value)
                    }
                    placeholder="e.g. 4h · this week"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleTaskCancel}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary small">
                  Add task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
