// src/components/JobDetail.jsx
import React, { useState } from "react";

import { buildSmartRecommendation } from "../demo/demoData.js";

function JobDetail({ job, detail, onDelete, onAddTask, notes, onAddNote }) {
  const [noteText, setNoteText] = useState("");

  const smartRecommendations = detail?.gaps
    ? detail.gaps.map(buildSmartRecommendation)
    : [];

  return (
    <div className="detail-wrapper">
      <div className="detail-header-row">
        <div>
          <div className="detail-title">
            {job ? job.title : detail.title}
          </div>
          <div className="detail-subtitle">
            {job
              ? `${job.company}${job.location ? " · " + job.location : ""}`
              : detail.subtitle}
          </div>
        </div>

        <div className="detail-header-actions">
          <div className="detail-badge">
            <span className="dot"></span>
            <span>{detail.status}</span>
          </div>

          {job && (
            <button
              type="button"
              className="btn-danger-outline"
              onClick={() => onDelete(job.id)}
            >
              Remove job
            </button>
          )}
        </div>
      </div>

      <div className="match-bar-wrapper">
        <div className="match-label-row">
          <span>Overall skill match</span>
          <span>
            {detail.matchPercent}% match · {detail.gapsCount} gaps
          </span>
        </div>
        <div className="bar-bg">
          <div
            className="bar-fill"
            style={{ width: `${detail.matchPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="detail-content-grid">
        {/* Card 1: Required vs your skills */}
        <div className="detail-card">
          <div className="detail-card-title">Required vs your skills</div>
          <div className="detail-card-sub">
            Compare what the job asks for with your current level.
          </div>
          <div className="skills-list">
            {detail.skills.map((skill) => (
              <div className="skill-row" key={skill.name}>
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span
                    className={skill.status === "OK" ? "gap-good" : "gap-bad"}
                  >
                    {skill.status}
                  </span>
                </div>
                <div className="skill-meta">
                  <span className="skill-meta-item">Req {skill.required}</span>
                  <span className="skill-meta-separator">•</span>
                  <span className="skill-meta-item">You {skill.user}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Focus skills & learning tasks */}
        <div className="detail-card">
          <div className="detail-card-title">Focus skills & learning tasks</div>
          <div className="detail-card-sub">
            Top skills to improve for this role.
          </div>
          <div className="gap-list">
            {detail.gaps.map((g) => (
              <div className="gap-item" key={g.skill}>
                <div>
                  <strong>{g.skill}</strong>
                  <div className="note">
                    Job: {g.jobLevel} · You: {g.userLevel}
                  </div>
                </div>
                <div className="gap-actions">
                  <span className="delta">Gap: {g.delta}</span>
                  <button
                    type="button"
                    className="btn-link-small"
                    onClick={() => onAddTask(g.skill, job)}
                  >
                    Add task
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="suggested-title">Suggested learning focus</div>
          <ul className="suggested-list">
            {detail.suggested.map((s) => (
              <li className="suggested-item" key={s}>
                <span className="suggested-dot" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 3: Smart recommendations */}
        {smartRecommendations.length > 0 && (
          <div className="detail-card detail-card-smart">
            <div className="detail-card-title">Smart recommendations</div>
            <div className="detail-card-sub">
              Auto-generated plan based on your current gaps for this role.
            </div>
            <ul className="smart-rec-list">
              {smartRecommendations.map((rec) => (
                <li key={rec.id} className="smart-rec-item">
                  <div className="smart-rec-header">
                    <span className="smart-rec-skill">{rec.skill}</span>
                    <span
                      className={
                        "smart-rec-priority " +
                        (rec.priorityLevel === "High"
                          ? "smart-rec-priority-high"
                          : "smart-rec-priority-medium")
                      }
                    >
                      {rec.priorityLabel}
                    </span>
                  </div>
                  <div className="smart-rec-body">{rec.text}</div>
                  <div className="smart-rec-meta">
                    <span>{rec.gapLabel}</span>
                    <span>Est. effort: {rec.effort}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Card 4: Notes / timeline */}
        <div className="detail-card detail-card-notes">
          <div className="detail-card-title">Notes</div>
          <div className="detail-card-sub">
            Keep track of emails, calls, and thoughts about this role.
          </div>

          <div className="notes-list">
            {notes && notes.length > 0 ? (
              notes
                .slice()
                .sort(
                  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                )
                .map((n) => (
                  <div key={n.id} className="note-item">
                    <div className="note-meta">
                      <span className="note-date">
                        {new Date(n.createdAt).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="note-text">{n.text}</div>
                  </div>
                ))
            ) : (
              <div className="empty-column">
                No notes yet. Add your first update below.
              </div>
            )}
          </div>

          <form
            className="notes-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!noteText.trim() || !job) return;
              onAddNote(job.id, noteText.trim());
              setNoteText("");
            }}
          >
            <textarea
              className="notes-textarea"
              rows={3}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="e.g. 6 Jan – sent follow-up email to recruiter on LinkedIn"
            />
            <div className="notes-actions">
              <button
                type="submit"
                className="btn-primary small"
                disabled={!noteText.trim() || !job}
              >
                Add note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
