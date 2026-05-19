import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const project = await prisma.project.create({
    data: {
      title: 'Seed Project',
      role: 'Fullstack Developer',
      duration: '2 months',
      overview: 'This is a seed project for initial database setup.',
      responsibilities: [],
      keyResults: [],
      challenges: [],
      solutions: [],
      technologies: [],
    },
  })
  console.log('Created project:', project)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })