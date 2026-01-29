// src/components/TasksView.jsx
import React from "react";

function TasksView({ tasks, onUpdateTask }) {
  const statuses = ["Not started", "In progress", "Done"];

  const tasksByStatus = (status) =>
    tasks.filter((t) => t.status === status);

  const handleStatusChange = (taskId, newStatus) => {
    const progress =
      newStatus === "Done" ? 100 : newStatus === "In progress" ? 50 : 0;
    onUpdateTask(taskId, { status: newStatus, progress });
  };

  return (
    <div className="tasks-view">
      <div className="skills-header">
        <div>
          <h2 className="panel-title">Learning tasks</h2>
          <p className="panel-subtitle">
            Track concrete tasks to close your skill gaps across all roles.
          </p>
        </div>
      </div>

      <div className="tasks-grid">
        {statuses.map((status) => {
          const list = tasksByStatus(status);
          return (
            <div key={status} className="tasks-column">
              <div className="tasks-column-header">
                <span>{status}</span>
                <span className="tasks-count">{list.length}</span>
              </div>
              <div className="tasks-list">
                {list.length === 0 ? (
                  <div className="empty-column">No tasks in this column.</div>
                ) : (
                  list.map((task) => (
                    <div key={task.id} className="task-card">
                      <div className="task-title">{task.title}</div>
                      <div className="task-meta">
                        <span className="task-skill">{task.skill}</span>
                        {task.jobTitle && (
                          <span className="task-job">{task.jobTitle}</span>
                        )}
                      </div>
                      <div className="task-footer">
                        <div className="task-progress">
                          <div className="task-progress-bar">
                            <div
                              className="task-progress-fill"
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                          <span className="task-progress-label">
                            {task.progress}%
                          </span>
                        </div>
                        <div className="task-actions">
                          {task.effort && (
                            <span className="task-effort">{task.effort}</span>
                          )}
                          <select
                            className="task-status-select"
                            value={task.status}
                            onChange={(e) =>
                              handleStatusChange(task.id, e.target.value)
                            }
                          >
                            {statuses.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TasksView;
