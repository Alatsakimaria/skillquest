import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create a demo user
  const user = await prisma.user.create({
    data: {
      email: "demo@skillquest.com",
      password: "demo123",
    },
  });

  // Insert demo jobs
  await prisma.job.createMany({
    data: [
      {
        title: "Frontend Developer",
        company: "PixelWave Studio",
        location: "Remote",
        match: 68,
        tags: ["React", "CSS", "UI focus"],
        status: "wishlist",
        userId: user.id,
      },
      {
        title: "Junior Frontend Engineer",
        company: "BrightTech",
        location: "Hybrid",
        match: 84,
        tags: ["React", "TypeScript", "Node", "Figma"],
        status: "applied",
        userId: user.id,
      },
      {
        title: "Frontend Developer (UI-heavy)",
        company: "GlowCommerce",
        location: "On-Site",
        match: 79,
        tags: ["React", "Animations", "Figma"],
        status: "interview",
        userId: user.id,
      },
    ],
  });

  // Insert demo tasks
  await prisma.task.createMany({
    data: [
      {
        skill: "TypeScript",
        title: "Finish TS fundamentals course",
        status: "In progress",
        progress: 40,
        effort: "6h · this week",
        userId: user.id,
      },
      {
        skill: "Testing (Jest / RTL)",
        title: "Add tests to 3 React components",
        status: "Not started",
        progress: 0,
        userId: user.id,
      },
    ],
  });

  console.log("🌱 Database seeded with demo data!");
}

main()
  .catch((err) => console.error(err))
  .finally(async () => {
    await prisma.$disconnect();
  });
