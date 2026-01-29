// src/components/SkillsDashboard.jsx
import React from "react";

function SkillsDashboard() {
  const strengths = [
    { skill: "React", level: "4/5", roles: 7 },
    { skill: "HTML/CSS", level: "3/5", roles: 3 },
    { skill: "JavaScript basics", level: "3/5", roles: 4 },
  ];

  const focus = [
    { skill: "TypeScript", gapCount: 2 },
    { skill: "Testing (Jest / RTL)", gapCount: 2 },
    { skill: "Figma / collaboration", gapCount: 3 },
  ];

  const learningPlan = [
    {
      skill: "TypeScript",
      task: "Finish TS fundamentals course",
      effort: "6h · this week",
    },
    {
      skill: "Testing (Jest / RTL)",
      task: "Add tests to 3 React components",
      effort: "4h · this week",
    },
    {
      skill: "Figma collaboration",
      task: "Rebuild 1 Figma file into clean React UI",
      effort: "Weekend",
    },
  ];

  return (
    <div className="skills-dashboard">
      <div className="skills-header">
        <div>
          <h2 className="panel-title">Skills dashboard (preview)</h2>
          <p className="panel-subtitle">
            High-level view of your strengths and focus areas, based on the
            roles you track.
          </p>
        </div>
        <span className="chip">Snapshot · static demo</span>
      </div>

      <div className="skills-grid">
        <div className="skills-card">
          <div className="skills-card-title">Top strengths</div>
          <div className="skills-card-sub">
            Skills where your level is close to role requirements.
          </div>
          <ul className="skills-list-compact">
            {strengths.map((s) => (
              <li key={s.skill} className="skills-row">
                <div>
                  <strong>{s.skill}</strong>
                  <div className="note">Your level: {s.level}</div>
                </div>
                <div className="skills-tag">{s.roles} roles</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="skills-card">
          <div className="skills-card-title">Focus skills</div>
          <div className="skills-card-sub">
            Skills that appear most often in your gaps.
          </div>
          <ul className="skills-list-compact">
            {focus.map((f) => (
              <li key={f.skill} className="skills-row">
                <div>
                  <strong>{f.skill}</strong>
                  <div className="note">{f.gapCount} roles with gaps</div>
                </div>
                <div className="skills-tag skills-tag-warn">Priority</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="skills-card skills-card-wide">
          <div className="skills-card-title">Mini learning plan</div>
          <div className="skills-card-sub">
            3 concrete tasks to move your focus skills forward.
          </div>
          <ul className="skills-list-compact">
            {learningPlan.map((item) => (
              <li key={item.skill} className="skills-row">
                <div>
                  <strong>{item.skill}</strong>
                  <div className="note">{item.task}</div>
                </div>
                <div className="skills-tag">{item.effort}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SkillsDashboard;
