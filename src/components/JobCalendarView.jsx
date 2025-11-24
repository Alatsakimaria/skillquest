// src/components/JobCalendarView.jsx
import React from "react";

function JobCalendarView({ jobs }) {
  const allJobs = [
    ...jobs.wishlist,
    ...jobs.applied,
    ...jobs.interview,
    ...jobs.outcome,
  ];

  const findJob = (id) => allJobs.find((j) => j.id === id);

  // demo events (static for now)
  const events = [
    {
      id: 1,
      date: "2025-01-10",
      kind: "Interview",
      jobId: 7,
      note: "Technical interview",
    },
    {
      id: 2,
      date: "2025-01-08",
      kind: "Application deadline",
      jobId: 3,
      note: "Apply before end of day",
    },
    {
      id: 3,
      date: "2025-01-12",
      kind: "Follow-up email",
      jobId: 4,
      note: "Send follow-up after first interview",
    },
    {
      id: 4,
      date: "2025-01-15",
      kind: "Final interview",
      jobId: 8,
      note: "Prepare system design questions",
    },
  ];

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const groupedByDate = sortedEvents.reduce((acc, ev) => {
    if (!acc[ev.date]) acc[ev.date] = [];
    acc[ev.date].push(ev);
    return acc;
  }, {});

  const dates = Object.keys(groupedByDate).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  return (
    <div className="calendar-view">
      <div className="skills-header">
        <div>
          <h2 className="panel-title">Job calendar</h2>
          <p className="panel-subtitle">
            See upcoming interviews, deadlines and follow-ups for your roles.
          </p>
        </div>
        <span className="chip">Static demo · timeline style</span>
      </div>

      <div className="calendar-grid">
        <div className="calendar-legend">
          <div className="calendar-legend-title">Legend</div>
          <ul className="calendar-legend-list">
            <li>
              <span className="calendar-dot calendar-dot-interview" />
              Interview
            </li>
            <li>
              <span className="calendar-dot calendar-dot-deadline" />
              Application deadline
            </li>
            <li>
              <span className="calendar-dot calendar-dot-followup" />
              Follow-up / other
            </li>
          </ul>
          <p className="calendar-legend-note">
            Later you can connect real dates from your applications
            (backend or manual inputs).
          </p>
        </div>

        <div className="calendar-timeline">
          {dates.map((date) => (
            <div key={date} className="calendar-day">
              <div className="calendar-day-header">
                <div className="calendar-day-date">
                  {new Date(date).toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                  })}
                </div>
                <div className="calendar-day-count">
                  {groupedByDate[date].length} event
                  {groupedByDate[date].length > 1 ? "s" : ""}
                </div>
              </div>

              <div className="calendar-day-events">
                {groupedByDate[date].map((ev) => {
                  const job = findJob(ev.jobId);
                  const badgeClass =
                    ev.kind === "Interview"
                      ? "calendar-badge-interview"
                      : ev.kind === "Application deadline"
                      ? "calendar-badge-deadline"
                      : "calendar-badge-followup";

                  return (
                    <div key={ev.id} className="calendar-event-card">
                      <div className="calendar-event-header">
                        <span className={`calendar-badge ${badgeClass}`}>
                          {ev.kind}
                        </span>
                        {job && (
                          <span className="calendar-event-match">
                            {job.match}% match
                          </span>
                        )}
                      </div>
                      <div className="calendar-event-job">
                        {job ? (
                          <>
                            <strong>{job.title}</strong>
                            <span className="calendar-event-company">
                              {job.company}{" "}
                              {job.location ? `· ${job.location}` : ""}
                            </span>
                          </>
                        ) : (
                          <strong>Unknown role (demo)</strong>
                        )}
                      </div>
                      {ev.note && (
                        <div className="calendar-event-note">{ev.note}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {dates.length === 0 && (
            <div className="empty-column">
              No events to show in the calendar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobCalendarView;
