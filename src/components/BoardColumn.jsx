import React from "react";

function BoardColumn({ title, count, total, jobs, activeJobId, onJobClick }) {
  return (
    <div className="column">
      <div className="column-header">
        <div className="column-title">{title}</div>
        <div className="column-count">
          {count}/{total}
        </div>
      </div>
      <div className="jobs-list">
        {jobs.length === 0 ? (
          <div className="empty-column">No jobs match filters.</div>
        ) : (
          jobs.map((job) => (
            <article
              key={job.id}
              className={"job-card" + (job.id === activeJobId ? " active" : "")}
              onClick={() => onJobClick(job.id)}
            >
              <div className="job-title">{job.title}</div>
              <div className="job-meta">
                <span>
                  {job.company}
                  {job.location ? ` · ${job.location}` : ""}
                </span>
                <span className="match-pill">{job.match}% match</span>
              </div>
              <div className="job-tags">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className={job.isMain && tag === "React" ? "tag-pill" : "tag"}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export default BoardColumn;
