import { LuMapPin } from "react-icons/lu";
import SectionTitle from "../ui/section-title";
import { TbWorld } from "react-icons/tb";
import { FaRegClock } from "react-icons/fa6";

export default function About() {
    return (
        <section id="about" className="py-16 sm:py-24 lg:py-32 bg-white relative overflow-hidden">
            <div className="absolute top-20 right-0 w-96 h-96 bg-accent-100/30 rounded-full blur-3xl"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                    {/* Left */}
                    <div className="lg:col-span-2 sm:px-4 md:px-10 lg:px-0">
                        <div className="relative">
                            <span className="text-7xl sm:text-8xl lg:text-9xl font-bold text-accent-600 font-display">5+</span>
                            <span className="absolute -left-4 top-0 text-6xl sm:text-7xl lg:text-8xl text-accent-200 font-display">[</span>
                            <span className="absolute -right-4 bottom-0 text-6xl sm:text-7xl lg:text-8xl text-accent-200 font-display">]</span>
                            <p className="mt-4 text-lg sm:text-xl text-neutral-600 font-medium">Years of Experience</p>
                        </div>
                    </div>
                    {/* Right */}
                    <div className="lg:col-span-3 space-y-6">
                        <SectionTitle name="About Me" title="Turning Complex Data Challenges Into Simple Solutions" />
                        <div className="space-y-4 text-justify text-base sm:text-lg text-neutral-600 leading-relaxed">
                            <p>I'm a <strong className="bg-accent-100 text-accent-900 px-2 py-1 rounded">freelance developer</strong> specializing in web data scraping and full-stack development. With over 5 years of experience, I help businesses collect reliable data from websites and build robust, scalable web applications.</p>
                            <p>My expertise lies in <strong className="bg-accent-100 text-accent-900 px-2 py-1 rounded">advanced scraping solutions</strong>, creating large-scale data collection pipelines, and developing production-grade applications using modern technologies like React, Laravel, and Symfony.</p>
                            <p>Whether you need to collect data from complex websites, build a custom web application, or optimize your existing systems, I deliver clean, maintainable solutions that drive real business value.</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 pt-4">
                            <div className="flex items-center space-x-2 text-sm sm:text-base text-neutral-700">
                                <LuMapPin size={20} className="text-accent-600" />
                                <span>Based in Antananarivo, Madagascar</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm sm:text-base text-neutral-700">
                                <TbWorld size={20} className="text-accent-600" />
                                <span>Working Worldwide</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm sm:text-base text-neutral-700">
                                <FaRegClock size={20} className="text-accent-600" />
                                <span>Available for Projects</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}