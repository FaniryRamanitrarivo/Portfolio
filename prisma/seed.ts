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

  const services = await prisma.service.createMany({
    data: [
      {
        title: 'Data Extraction & Web Scraping',
        icon: 'FiDatabase',
        description: 'Advanced JavaScript scraping solutions for complex websites. Large-scale data pipelines with automated data cleaning and normalization.',
        lists: [
          'Custom scraping scripts',
          'API integration',
          'Data validation',
          'Scheduled automation',
        ],
        order: 0,
      },
      {
        title: 'Full-Stack Web Development',
        icon: 'FaCode',
        description: 'Production-grade web applications built with modern technologies and best practices.',
        lists: [
          'React & Tailwind CSS',
          'Laravel & Symfony',
          'RESTful APIs',
          'Database design',
        ],
        order: 1,
      },
      {
        title: 'Optimization & Maintenance',
        icon: 'RiSpeedUpLine',
        description: 'Performance improvements and clean, maintainable architecture for existing systems.',
        lists: [
          'Code refactoring',
          'Performance tuning',
          'Bug fixes',
          'Technical debt reduction',
        ],
        order: 2,
      },
    ],
  })
  console.log('Created services:', services.count)

  const skills = await prisma.skill.createMany({
    data: [
      {
        title: 'Primary Expertise — Data Extraction',
        icon: 'FiDatabase',
        description: 'Building reliable, scalable data extraction systems that handle complex websites and deliver clean, structured data.',
        lists: [
          'Advanced JavaScript Scraping',
          'Large-scale Pipelines',
          'Data Parsing & Cleaning',
          'Performance Optimization',
        ],
        isSpeciality: true,
        order: 0,
      },
      {
        title: 'Frontend Development',
        icon: 'FiLayout',
        description: 'Creating modern, responsive user interfaces with component-based architecture and utility-first styling.',
        lists: ['React', 'Tailwind CSS', 'SCSS', 'Component Architecture'],
        order: 1,
      },
      {
        title: 'Backend Development',
        icon: 'FiServer',
        description: 'Developing robust server-side applications with clean architecture and RESTful API design.',
        lists: ['Laravel', 'Symfony', 'REST API Design', 'Authentication'],
        order: 2,
      },
      {
        title: 'Databases',
        icon: 'GrDatabase',
        description: 'Designing efficient database schemas and optimizing queries for performance and scalability.',
        lists: ['PostgreSQL', 'MySQL', 'SQLite', 'Query Optimization'],
        order: 3,
      },
      {
        title: 'Languages',
        icon: 'RiGlobalLine',
        description: 'Communicating effectively with international clients and teams in professional settings.',
        lists: ['English (Professional)', 'French (Native)'],
        order: 4,
      },
    ],
  })
  console.log('Created skills:', skills.count)
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