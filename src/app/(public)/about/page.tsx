import Link from "next/link";
import type { Metadata } from "next";
import { IoArrowBack } from "react-icons/io5";
import { LuBriefcase, LuGraduationCap } from "react-icons/lu";
import Logo from "@/src/components/ui/logo";
import JourneyTimeline, { type TimelineItem } from "@/src/components/public/about/journey-timeline";
import { educationServiceServer } from "@/src/server/services/education.service";
import { experienceServiceServer } from "@/src/server/services/experience.service";

export const metadata: Metadata = {
  title: "My Journey",
  description:
    "A closer look at Faniry Ramanitrarivo's academic background and professional experience as a web data scraping and full-stack developer.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    url: "/about",
    title: "My Journey — Faniry Ramanitrarivo",
    description:
      "A closer look at Faniry Ramanitrarivo's academic background and professional experience as a web data scraping and full-stack developer.",
  },
};

export default async function AboutPage() {
  let education, experience;
  try {
    [education, experience] = await Promise.all([
      educationServiceServer.getAllEducation(),
      experienceServiceServer.getAllExperience(),
    ]);
  } catch (error) {
    console.error("Error loading journey:", error);
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-neutral-600 text-center">Failed to load this page.</p>
      </div>
    );
  }

  const experienceItems: TimelineItem[] = experience.map((entry) => ({
    id: entry.id,
    title: entry.role,
    organization: entry.company,
    location: entry.location,
    startDate: entry.startDate,
    endDate: entry.endDate,
    description: entry.description,
    highlights: entry.highlights,
  }));

  const educationItems: TimelineItem[] = education.map((entry) => ({
    id: entry.id,
    title: entry.degree,
    organization: entry.school,
    location: entry.location,
    startDate: entry.startDate,
    endDate: entry.endDate,
    description: entry.description,
    highlights: entry.highlights,
  }));

  return (
    <div className="bg-white min-h-screen">
      <header className="border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <IoArrowBack className="mr-2" />
            Back to home
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-neutral-900">My Journey</h1>
        <p className="mt-3 text-base sm:text-lg text-neutral-600 max-w-2xl">
          A closer look at my academic and professional background.
        </p>

        <section className="mt-12 sm:mt-16">
          <span className="text-2xs font-semibold uppercase tracking-widest text-accent-600">
            Career
          </span>
          <h2 className="mt-1 text-xl sm:text-2xl font-bold font-display text-neutral-900 mb-8">
            Professional Experience
          </h2>
          <JourneyTimeline items={experienceItems} icon={LuBriefcase} />
        </section>

        <section className="mt-12 sm:mt-16">
          <span className="text-2xs font-semibold uppercase tracking-widest text-accent-600">
            Academics
          </span>
          <h2 className="mt-1 text-xl sm:text-2xl font-bold font-display text-neutral-900 mb-8">
            Education
          </h2>
          <JourneyTimeline items={educationItems} icon={LuGraduationCap} />
        </section>
      </div>
    </div>
  );
}
