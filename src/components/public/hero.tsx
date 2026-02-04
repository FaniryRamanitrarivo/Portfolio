
import { FaArrowDown, FaArrowRight } from "react-icons/fa6";
import { PiBriefcaseBold } from "react-icons/pi";
import { CustomLink } from "../ui/link";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { scrollToSection } from "../../lib/front/animation/scroll";
import { SECTIONS } from "../../lib/front/constant";
import Link from "next/link";

export default function Hero() {

  const { id } = SECTIONS[1];
  const contact = SECTIONS.find(({ id }) => id.includes("contact"))?.id || '';
  const project = SECTIONS.find(({ id }) => id.includes("project"))?.id || '';

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden
      bg-gradient-to-br from-neutral-50 via-white to-accent-50/30 py-40 sm:pt-40 lg:pt-50"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-200/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent-300/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />

        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div className="space-y-8 text-center lg:text-start">

            <h3 className="text-3xl 3xl:text-base font-medium text-accent-600 tracking-wide" >Hi, I'm Faniry Ramanitrarivo</h3>
            <h1 className="font-display font-bold leading-tight tracking-wide">
              <span className="block text-4xl lg:text-7xl
                bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-600
                bg-clip-text text-transparent">
                Web Data Scraping & <br />
                Full-Stack Developer
              </span>
            </h1>

            <p className="text-lg text-neutral-600 mx-auto max-w-xl lg:text-justify font-display">
              I help companies collect reliable web data and build scalable web applications. With 5+ years delivering production-grade solutions, I bring technical expertise and business impact to every project.
            </p>

            <div className="flex gap-4 flex-wrap justify-center lg:justify-start">

              <CustomLink
                href={`#${contact}`}
                label="Start a project"
                icon={<FaArrowRight className="inline-block sm:ml-2" />}
                className="px-8 py-4 text-white rounded-lg bg-accent-600 hover:bg-accent-700"
                onClick={scrollToSection}
              />

              <CustomLink
                href={`#${project}`}
                label="View my work"
                icon={<PiBriefcaseBold className="inline-block ml-2" />}
                className="px-8 py-4 rounded-lg border-neutral-300 border-2"
                onClick={scrollToSection}
              />

            </div>
            {/*  */}
            <div className="lg:flex gap-5">
              <div className="flex justify-center items-center space-x-2">
                <RiCheckboxCircleFill className="text-accent-600" />
                <span>Available for Freelance Projects</span>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <RiCheckboxCircleFill className="text-accent-600" />
                <span>Open to Full-Time Opportunities</span>
              </div>
            </div>
            {/* Social */}
            {/* <div className="flex gap-6 pt-4 text-2xl text-neutral-600">
              <Link href="#" target="_blank" className="hover:text-accent-600">
                <FaGithub />
              </Link>
              <Link href="#" target="_blank" className="hover:text-accent-600">
                <FaLinkedin />
              </Link>
              <Link href="mailto:faniryram0@gmail.com" target="_blank" className="hover:text-accent-600">
                <IoIosMail />
              </Link> 
              <a href="https://github.com" target="_blank" className="hover:text-accent-600">
                <i className="ri-github-fill" />
              </a>
              <a href="https://linkedin.com" target="_blank" className="hover:text-accent-600">
                <i className="ri-linkedin-fill" />
              </a>
              <a href="mailto:contact@example.com" className="hover:text-accent-600">
                <i className="ri-mail-fill" />
              </a>
            </div> */}
          </div>

          {/* Right (code card) */}
          <div className="relative hidden lg:block" style={{ opacity: 1, transform: 'none' }}>
            <div className="relative w-full h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-accent-600/10 rounded-3xl transform rotate-6"></div>

              <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-neutral-200/50">
                <div className="space-y-4">

                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>

                  <div className="space-y-3 font-mono text-sm">
                    <div className="text-neutral-600">
                      <span className="text-accent-600">const</span> developer = {'{'}
                    </div>

                    <div className="pl-4 text-neutral-600">
                      name: <span className="text-green-600">'Faniry'</span>,
                    </div>

                    <div className="pl-4 text-neutral-600">skills: [</div>
                    <div className="pl-8 text-green-600">'Web Data Scraping',</div>
                    <div className="pl-8 text-green-600">'Data Collection',</div>
                    <div className="pl-8 text-green-600">'Full-Stack Dev',</div>
                    <div className="pl-8 text-green-600">'React &amp; Laravel / Symfony'</div>
                    <div className="pl-4 text-neutral-600">],</div>

                    <div className="pl-4 text-neutral-600">
                      available: <span className="text-accent-600">true</span>
                    </div>

                    <div className="text-neutral-600">{'}'}</div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Link
          href={`#${id}`}
          onClick={scrollToSection}
          className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-accent-600 transition-colors cursor-pointer"
        >
          <i className="ri-arrow-down-line text-2xl"></i>
          <FaArrowDown size={25} />
        </Link>
      </div>
    </section>
  );
}
