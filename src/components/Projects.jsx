import ProjectCard from "./ProjectCard"
import FindrScreenshot from "../assets/FindrScreenshot.png"
import PersonalWebsiteScreenshot from "../assets/personal-website-screenshot.jpg"
import AusaPhoto from "../assets/ausa-project-photo.png"
import RobinPhoto from "../assets/Robin.png"
import UoavcPhoto from "../assets/uoavc-project.png"
import AirNzPhoto from "../assets/airnz-case-comp.png"
import PortOfAucklandPhoto from "../assets/sdg8-case-comp.png"
import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
const Projects = () => {
    const [expandedCardIndex, setExpandedCardIndex] = useState(null);
    const [tilt, setTilt] = useState(0);
    const scrollRef = useRef(null);
    const lastScrollLeft = useRef(0);
    const tiltResetTimeout = useRef(null);
    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        const delta = el.scrollLeft - lastScrollLeft.current;
        lastScrollLeft.current = el.scrollLeft;
        setTilt(Math.max(-1.5, Math.min(1.5, delta * 0.15)));
        clearTimeout(tiltResetTimeout.current);
        tiltResetTimeout.current = setTimeout(() => setTilt(0), 150);
    };
    const scroll = (direction) => {
        const el = scrollRef.current;
        if (el) {
            el.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
        }
    };
    const projects = [
        {
            title: "Personal Website",
            description: "My personal portfolio site built from scratch to showcase my projects, experience, and skills. Designed and developed end-to-end with a focus on clean UI and smooth user experience, with structured version control maintained throughout.",
            GitHubLink: "https://github.com/ashoomky/personal-website",
            TechStack: "React, TailwindCSS, JavaScript",
            photo: PersonalWebsiteScreenshot
        },
        {
            title: "UOAVC Club Website",
            description: "Production web platform for the UoA Volleyball Club serving 200+ members, handling event sign-ups, member accounts, waitlists, and an admin dashboard for club executives. Leading product delivery as PM, owning requirements and sprint planning, and contributing to design and development where needed.",
            GitHubLink: "https://github.com/UoaWDCC/uoavc",
            TechStack: "Next.js, Payload CMS, MongoDB, TypeScript, TailwindCSS",
            photo: UoavcPhoto
        },
        {
            title: "Case Comp – Air New Zealand Strategic Review",
            description: "Diagnosed the airline's highest-impact, most urgent competitive gap using an impact/urgency prioritisation framework, pinpointing youth pricing as the key driver of lost bookings to competitors. Designed three differentiated strategies to close the gap, benchmarked against real airline precedents including Qatar Airways' Student Club and Icelandair's experiential campaigns. Placed 4th of 24 teams and advanced to finals, researching, designing, and building the full presentation deck in under 4 hours as a team of 4.",
            GitHubLink: null,
            TechStack: "4th of 24 teams, Finalist",
            photo: AirNzPhoto
        },
        {
            title: "Community Case Challenge – Port of Auckland (SDG 8)",
            description: "Designed a worker participation platform for a $393M port operator, deliberately built on an existing daily-use system to lower adoption friction rather than launch standalone. Benchmarked the solution against Balfour Beatty, PSA Singapore, and Kaiser Permanente, and designed a staggered rollout that doubles as a quasi-experimental evaluation. Conducted a site visit and stakeholder Q&A, delivering full research, strategy, and presentation in under 29 hours as a team of 4.",
            GitHubLink: null,
            TechStack: "Recognised by judges for strongest research",
            photo: PortOfAucklandPhoto
        },
        {
            title: "Findr",
            description: "Built at the WDCC x SESA hackathon in a team of 5, Findr is a Tinder-style planet discovery app where you swipe right to save planets and learn facts about the cosmos. I owned the UI/UX direction including layout, visual theme, and interaction design, and led the pitch presentation to a judging panel. Findr won the Most Entertaining Solution prize out of 18 competing teams.",
            GitHubLink: "https://github.com/evanautianle/HACKATHON2024-print-Hello-World-",
            TechStack: "HTML, CSS, JavaScript",
            photo: FindrScreenshot
        },
        {
            title: "AUSA Mental Wellbeing Web App",
            description: "A university-wide wellbeing platform built for the Auckland University Students' Association, designed to make student support services more accessible and easier to navigate. As part of a 10-person team, I contributed to front-end and back-end development across features including the FAQs page, login pages, and external links directory.",
            GitHubLink: "https://github.com/UoaWDCC/ausa",
            TechStack: "Next.js, TypeScript, TailwindCSS, TSOA, Firebase",
            photo: AusaPhoto
        },
        {
            title: "Robin - AI Smart Bin",
            description: "Built at a sustainability hackathon in a team of 5, Robin is an AI-powered waste classification web app that tells users which bin to put their rubbish in, reducing contamination and keeping waste out of landfill. I contributed to UI/UX design, front-end development, and led the pitch presentation to a panel of judges. Robin won the Exec Choice Award out of 11 competing teams.",
            GitHubLink: "https://github.com/andrecamerino/Robin",
            TechStack: "HTML, CSS, JavaScript",
            photo: RobinPhoto
        }
    ]
    return (
        <div id="projects" className="w-full justify-center p-4 pt-24 md:p-30 lg:px-4">
            {/* title */}
            <div className="text-4xl mb-8">
                projects
            </div>
            {/* project cards */}
            {expandedCardIndex === null ? (
                <>
                    {/* desktop: manual scroll carousel, cards tilt subtly on trackpad/wheel scroll */}
                    <div className="hidden md:flex items-center gap-3 w-full">
                        <button
                            onClick={() => scroll("left")}
                            aria-label="Scroll projects left"
                            className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer"
                        >
                            <ChevronLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        <div
                            ref={scrollRef}
                            onScroll={handleScroll}
                            className="flex flex-row items-stretch gap-4 flex-1 min-w-0 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-4 px-1"
                        >
                            {projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 snap-start"
                                    style={{ transform: `rotate(${tilt}deg)`, transition: "transform 300ms ease-out" }}
                                >
                                    <ProjectCard
                                        title={project.title}
                                        description={project.description}
                                        GitHubLink={project.GitHubLink}
                                        TechStack={project.TechStack}
                                        photo={project.photo}
                                        isExpanded={false}
                                        onToggle={() => setExpandedCardIndex(index)}
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => scroll("right")}
                            aria-label="Scroll projects right"
                            className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer"
                        >
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>

                    {/* mobile: manual vertical scroll, no autoscroll */}
                    <div className="flex md:hidden flex-col items-center gap-4">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                title={project.title}
                                description={project.description}
                                GitHubLink={project.GitHubLink}
                                TechStack={project.TechStack}
                                photo={project.photo}
                                isExpanded={false}
                                onToggle={() => setExpandedCardIndex(index)}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <ProjectCard
                        title={projects[expandedCardIndex].title}
                        description={projects[expandedCardIndex].description}
                        GitHubLink={projects[expandedCardIndex].GitHubLink}
                        TechStack={projects[expandedCardIndex].TechStack}
                        photo={projects[expandedCardIndex].photo}
                        isExpanded={true}
                        onToggle={() => setExpandedCardIndex(null)}
                    />
                </div>
            )}
        </div>
    )
}
export default Projects