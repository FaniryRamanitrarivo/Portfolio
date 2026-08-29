import type { IconType } from "react-icons";
import { FiDatabase, FiLayout, FiServer } from "react-icons/fi";
import { FaCode } from "react-icons/fa6";
import { RiSpeedUpLine, RiGlobalLine } from "react-icons/ri";
import { GrDatabase } from "react-icons/gr";

export const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export type SectionId = typeof SECTIONS[number]["id"]

export type ServiceItem = {
  title: string;
  icon: IconType;
  description: string;
  lists: string[];
  link: string;
};

export const SERVICES: ServiceItem[] = [
  {
    title: "Data Extraction & Web Scraping",
    icon: FiDatabase,
    description: "Advanced JavaScript scraping solutions for complex websites. Large-scale data pipelines with automated data cleaning and normalization.",
    lists: [
      "Custom scraping scripts",
      "API integration",
      "Data validation",
      "Scheduled automation"
    ],
    link: '#'
  },
  {
    title: "Full-Stack Web Development",
    icon: FaCode,
    description: "Production-grade web applications built with modern technologies and best practices.",
    lists: [
      "React & Tailwind CSS",
      "Laravel & Symfony",
      "RESTful APIs",
      "Database design",
    ],
    link: '#'
  },
  {
    title: "Optimization & Maintenance",
    icon: RiSpeedUpLine,
    description: "Performance improvements and clean, maintainable architecture for existing systems.",
    lists: [
      "Code refactoring",
      "Performance tuning",
      "Bug fixes",
      "Technical debt reduction",
    ],
    link: '#'
  },
];

export type SkillItem = {
  isSpeciality?: boolean;
  title: string;
  icon: IconType;
  description: string;
  lists: string[];
};

export const SKILLS: SkillItem[] = [
  {
    isSpeciality: true,
    title: "Primary Expertise — Data Extraction",
    icon: FiDatabase,
    description: "Building reliable, scalable data extraction systems that handle complex websites and deliver clean, structured data.",
    lists: [
      "Advanced JavaScript Scraping",
      "Large-scale Pipelines",
      "Data Parsing & Cleaning",
      "Performance Optimization"
    ],
  },
  {
    title: "Frontend Development",
    icon: FiLayout,
    description: "Creating modern, responsive user interfaces with component-based architecture and utility-first styling.",
    lists: [
      "React",
      "Tailwind CSS",
      "SCSS",
      "Component Architecture",
    ],
  },
  {
    title: "Backend Development",
    icon: FiServer,
    description: "Developing robust server-side applications with clean architecture and RESTful API design.",
    lists: [
      "Laravel",
      "Symfony",
      "REST API Design",
      "Authentication",
    ],
  },
  {
    title: "Databases",
    icon: GrDatabase,
    description: "Designing efficient database schemas and optimizing queries for performance and scalability.",
    lists: [
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Query Optimization",
    ],
  },
  {
    title: "Languages",
    icon: RiGlobalLine,
    description: "Communicating effectively with international clients and teams in professional settings.",
    lists: [
      "English (Professional)",
      "French (Native)",
    ],
  },
];