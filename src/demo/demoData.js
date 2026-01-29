export const jobsDemo = {
  wishlist: [
    {
      id: 1,
      title: "Frontend Developer",
      company: "PixelWave Studio",
      location: "Remote",
      tags: ["React", "CSS", "UI focus"],
      match: 68,
    },
    {
      id: 2,
      title: "Product Designer (Junior)",
      company: "Northline",
      location: "Remote",
      tags: ["Figma", "UX flows", "Design systems"],
      match: 54,
    },
    {
      id: 3,
      title: "Frontend Engineer",
      company: "CloudSeed",
      location: "Hybrid",
      tags: ["React", "Next.js", "Tailwind"],
      match: 72,
    },
  ],
  applied: [
    {
      id: 4,
      title: "Junior Frontend Engineer",
      company: "BrightTech",
      location: "Hybrid",
      tags: ["React", "TypeScript", "Node", "Figma"],
      match: 84,
      isMain: true,
    },
    {
      id: 5,
      title: "Frontend Developer (React)",
      company: "BlueKite",
      location: "Hybrid",
      tags: ["React", "REST APIs", "Testing"],
      match: 77,
    },
    {
      id: 6,
      title: "Full Stack Intern",
      company: "Startuply",
      location: "Remote",
      tags: ["React", "Express", "MongoDB"],
      match: 63,
    },
  ],
  interview: [
    {
      id: 7,
      title: "Frontend Developer (UI-heavy)",
      company: "GlowCommerce",
      location: "On-Site",
      tags: ["React", "Animations", "Figma"],
      match: 79,
    },
    {
      id: 8,
      title: "React Developer",
      company: "Finlytics",
      location: "On-Site",
      tags: ["React", "Charts", "API calls"],
      match: 70,
    },
  ],
  outcome: [
    {
      id: 9,
      title: "Frontend Intern",
      company: "Lumen",
      location: "Remote",
      tags: ["HTML/CSS", "Basic JS"],
      match: 61,
    },
    {
      id: 10,
      title: "Junior UI Developer",
      company: "Verve",
      location: "Remote",
      tags: ["React", "Design systems"],
      match: 75,
    },
  ],
};

// Base detail (used for BrightTech and as fallback)
export const mainJobDetail = {
  title: "Junior Frontend Engineer @ BrightTech",
  subtitle: "React · TypeScript · Node · UI collaboration",
  status: "Applied · 5 days ago",
  matchPercent: 84,
  gapsCount: 3,
  skills: [
    { name: "React", required: "4/5", user: "4/5", status: "OK" },
    { name: "TypeScript", required: "4/5", user: "3/5", status: "Gap: -1" },
    {
      name: "Node.js / API basics",
      required: "3/5",
      user: "2/5",
      status: "Gap: -1",
    },
    {
      name: "Figma collaboration",
      required: "3/5",
      user: "2/5",
      status: "Gap: -1",
    },
    {
      name: "Testing (Jest / RTL)",
      required: "3/5",
      user: "1/5",
      status: "Gap: -2",
    },
  ],
  gaps: [
    { skill: "TypeScript", jobLevel: "4/5", userLevel: "3/5", delta: "-1" },
    { skill: "Node.js basics", jobLevel: "3/5", userLevel: "2/5", delta: "-1" },
    {
      skill: "Figma collaboration",
      jobLevel: "3/5",
      userLevel: "2/5",
      delta: "-1",
    },
  ],
  suggested: ["TS fundamentals", "Build small Node API", "Figma handoff flow"],
};

// Different details per job id (demo data)
export const jobDetails = {
  1: {
    title: "Frontend Developer @ PixelWave Studio",
    subtitle: "React · CSS · UI focus",
    status: "Wishlist · added 1 week ago",
    matchPercent: 68,
    gapsCount: 3,
    skills: [
      { name: "React", required: "4/5", user: "3/5", status: "Gap: -1" },
      { name: "CSS", required: "4/5", user: "3/5", status: "Gap: -1" },
      {
        name: "UI design focus",
        required: "3/5",
        user: "2/5",
        status: "Gap: -1",
      },
    ],
    gaps: [
      { skill: "React", jobLevel: "4/5", userLevel: "3/5", delta: "-1" },
      { skill: "CSS", jobLevel: "4/5", userLevel: "3/5", delta: "-1" },
      {
        skill: "UI design focus",
        jobLevel: "3/5",
        userLevel: "2/5",
        delta: "-1",
      },
    ],
    suggested: ["React mini-project", "Advanced CSS course", "UI design principles"],
  },

  2: {
    title: "Product Designer (Junior) @ Northline",
    subtitle: "Figma · UX flows · Design systems",
    status: "Wishlist · added 3 days ago",
    matchPercent: 54,
    gapsCount: 4,
    skills: [
      { name: "Figma", required: "4/5", user: "2/5", status: "Gap: -2" },
      { name: "UX flows", required: "4/5", user: "2/5", status: "Gap: -2" },
      {
        name: "Design systems",
        required: "3/5",
        user: "2/5",
        status: "Gap: -1",
      },
    ],
    gaps: [
      { skill: "Figma", jobLevel: "4/5", userLevel: "2/5", delta: "-2" },
      { skill: "UX flows", jobLevel: "4/5", userLevel: "2/5", delta: "-2" },
      {
        skill: "Design systems",
        jobLevel: "3/5",
        userLevel: "2/5",
        delta: "-1",
      },
    ],
    suggested: ["Figma practice projects", "Study UX case studies", "Design system basics"],
  },

  3: {
    title: "Frontend Engineer @ CloudSeed",
    subtitle: "React · Next.js · Tailwind",
    status: "Wishlist · added 2 weeks ago",
    matchPercent: 72,
    gapsCount: 2,
    skills: [
      { name: "React", required: "4/5", user: "4/5", status: "OK" },
      { name: "Next.js", required: "4/5", user: "3/5", status: "Gap: -1" },
      {
        name: "Tailwind CSS",
        required: "3/5",
        user: "2/5",
        status: "Gap: -1",
      },
    ],
    gaps: [
      { skill: "Next.js", jobLevel: "4/5", userLevel: "3/5", delta: "-1" },
      {
        skill: "Tailwind CSS",
        jobLevel: "3/5",
        userLevel: "2/5",
        delta: "-1",
      },
    ],
    suggested: ["Next.js tutorial project", "Tailwind CSS course"],
  },

  4: mainJobDetail,

  5: {
    title: "Frontend Developer (React) @ BlueKite",
    subtitle: "React · REST APIs · Testing focus",
    status: "Applied · 2 days ago",
    matchPercent: 77,
    gapsCount: 2,
    skills: [
      { name: "React", required: "4/5", user: "4/5", status: "OK" },
      { name: "TypeScript", required: "3/5", user: "3/5", status: "OK" },
      { name: "REST APIs", required: "4/5", user: "3/5", status: "Gap: -1" },
      {
        name: "Testing (Jest / RTL)",
        required: "3/5",
        user: "2/5",
        status: "Gap: -1",
      },
    ],
    gaps: [
      { skill: "REST APIs", jobLevel: "4/5", userLevel: "3/5", delta: "-1" },
      {
        skill: "Testing (Jest / RTL)",
        jobLevel: "3/5",
        userLevel: "2/5",
        delta: "-1",
      },
    ],
    suggested: ["API integration mini-project", "Write tests for components"],
  },

  7: {
    title: "Frontend Developer (UI-heavy) @ GlowCommerce",
    subtitle: "Animations · UI polish · Figma handoff",
    status: "Interview · next week",
    matchPercent: 79,
    gapsCount: 2,
    skills: [
      { name: "React", required: "4/5", user: "4/5", status: "OK" },
      {
        name: "CSS animations",
        required: "4/5",
        user: "3/5",
        status: "Gap: -1",
      },
      {
        name: "Figma collaboration",
        required: "3/5",
        user: "2/5",
        status: "Gap: -1",
      },
    ],
    gaps: [
      {
        skill: "CSS animations",
        jobLevel: "4/5",
        userLevel: "3/5",
        delta: "-1",
      },
      {
        skill: "Figma collaboration",
        jobLevel: "3/5",
        userLevel: "2/5",
        delta: "-1",
      },
    ],
    suggested: ["Landing page animation", "Practice Figma → dev handoff"],
  },

  8: {
    title: "React Developer @ Finlytics",
    subtitle: "React · Data visualization · API calls",
    status: "Interview · in 3 days",
    matchPercent: 70,
    gapsCount: 3,
    skills: [
      { name: "React", required: "4/5", user: "4/5", status: "OK" },
      {
        name: "Data visualization",
        required: "4/5",
        user: "2/5",
        status: "Gap: -2",
      },
      {
        name: "API integration",
        required: "4/5",
        user: "3/5",
        status: "Gap: -1",
      },
    ],
    gaps: [
      {
        skill: "Data visualization",
        jobLevel: "4/5",
        userLevel: "2/5",
        delta: "-2",
      },
      {
        skill: "API integration",
        jobLevel: "4/5",
        userLevel: "3/5",
        delta: "-1",
      },
    ],
    suggested: ["Build charts with libraries", "Practice API data fetching"],
  },

  9: {
    title: "Frontend Intern @ Lumen",
    subtitle: "HTML/CSS · Basic JavaScript",
    status: "Rejected · 1 week ago",
    matchPercent: 61,
    gapsCount: 2,
    skills: [
      { name: "HTML/CSS", required: "3/5", user: "3/5", status: "OK" },
      {
        name: "JavaScript basics",
        required: "3/5",
        user: "2/5",
        status: "Gap: -1",
      },
    ],
    gaps: [
      {
        skill: "JavaScript basics",
        jobLevel: "3/5",
        userLevel: "2/5",
        delta: "-1",
      },
    ],
    suggested: ["JS fundamentals course", "Build small interactive UI"],
  },

  10: {
    title: "Junior UI Developer @ Verve",
    subtitle: "React · Design systems",
    status: "Offered · 3 days ago",
    matchPercent: 75,
    gapsCount: 1,
    skills: [
      { name: "React", required: "4/5", user: "4/5", status: "OK" },
      {
        name: "Design systems",
        required: "3/5",
        user: "2/5",
        status: "Gap: -1",
      },
    ],
    gaps: [
      {
        skill: "Design systems",
        jobLevel: "3/5",
        userLevel: "2/5",
        delta: "-1",
      },
    ],
    suggested: ["Study design system principles", "Build reusable components"],
  },
};

// initial learning tasks (demo)
export const initialTasks = [
  {
    id: 1,
    skill: "TypeScript",
    title: "Finish TS fundamentals course",
    jobId: 4,
    jobTitle: "Junior Frontend Engineer @ BrightTech",
    status: "In progress",
    progress: 40,
    effort: "6h · this week",
  },
  {
    id: 2,
    skill: "Testing (Jest / RTL)",
    title: "Add tests to 3 React components",
    jobId: 5,
    jobTitle: "Frontend Developer (React) @ BlueKite",
    status: "Not started",
    progress: 0,
    effort: "4h · this week",
  },
  {
    id: 3,
    skill: "Figma collaboration",
    title: "Rebuild 1 Figma handoff into React UI",
    jobId: 7,
    jobTitle: "Frontend Developer (UI-heavy) @ GlowCommerce",
    status: "Not started",
    progress: 0,
    effort: "Weekend",
  },
];

// --- Smart recommendation hints for specific skills ---
export const SMART_SKILL_HINTS = {
  TypeScript:
    "Finish a TS fundamentals course and migrate 2–3 React components to use proper types, interfaces and enums.",
  "Node.js / API basics":
    "Build a tiny Node/Express API with 2 endpoints and connect it to your React app.",
  "Node.js basics":
    "Practice building a simple API (CRUD for todos) and call it from a React page.",
  "Testing (Jest / RTL)":
    "Write tests for 3 existing components (render, props, simple user interactions).",
  "Figma collaboration":
    "Take one Figma file and reproduce the layout in React, paying attention to spacing and typography.",
  "CSS animations":
    "Add a small animation (hover, fade-in, slide) to a landing page hero and a call-to-action button.",
  "Data visualization":
    "Use a chart library (e.g. Recharts) to build 1–2 charts from mock API data.",
};

export function buildSmartRecommendation(gap) {
  const baseHint =
    SMART_SKILL_HINTS[gap.skill] ||
    `Split ${gap.skill} into 1 small tutorial and 1 mini-project where you apply it in a realistic UI.`;

  const numericDelta = Number(gap.delta) || -1;
  const severity = Math.abs(numericDelta);

  const priorityLevel = severity >= 2 ? "High" : "Medium";
  const priorityLabel =
    priorityLevel === "High" ? "High priority" : "Medium priority";
  const effort = severity >= 2 ? "6–8h" : "3–4h";

  return {
    id: gap.skill,
    skill: gap.skill,
    text: baseHint,
    priorityLevel,
    priorityLabel,
    effort,
    gapLabel: `Job ${gap.jobLevel} · You ${gap.userLevel}`,
  };
}