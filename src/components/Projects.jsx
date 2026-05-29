import { GitHub } from "@mui/icons-material"
import ProjectCard from "./ProjectCard"
import FindrScreenshot from "../assets/FindrScreenshot.png"
import PersonalWebsiteScreenshot from "../assets/personal-website-screenshot.jpg"
import AusaPhoto from "../assets/ausa-project-photo.png"
import RobinPhoto from "../assets/Robin.png"
import { useState } from "react"
const Projects = () => {
    const [expandedCardIndex, setExpandedCardIndex] = useState(null);
    const projects = [
        {
            title: "Findr",
            description: "Built at the WDCC x SESA hackathon in a team of 5, Findr is a Tinder-style planet discovery app where you swipe right to save planets and learn facts about the cosmos. I owned the UI/UX direction including layout, visual theme, and interaction design, and led the pitch presentation to a judging panel. Findr won the Most Entertaining Solution prize out of 18 competing teams.",
            GitHubLink: "https://github.com/evanautianle/HACKATHON2024-print-Hello-World-",
            TechStack: "HTML, CSS, JavaScript",
            photo: FindrScreenshot
        },
        {
            title: "Personal Website",
            description: "My personal portfolio site built from scratch to showcase my projects, experience, and skills. Designed and developed end-to-end with a focus on clean UI and smooth user experience, with structured version control maintained throughout.",
            GitHubLink: "https://github.com/ashoomky/personal-website",
            TechStack: "React, TailwindCSS, JavaScript",
            photo: PersonalWebsiteScreenshot
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
            <div className="text-4xl">
                projects
            </div>
            {/* project cards */}
            <div className={`flex flex-col items-center justify-center ${expandedCardIndex === null ? 'lg:flex-row lg:items-start lg:gap-2' : ''}`}>
                {projects.map((project, index) => {
                    const isExpanded = expandedCardIndex === index;
                    const isHidden = expandedCardIndex !== null && !isExpanded;
                    return (
                        <div
                            key={index}
                            className={`overflow-hidden ${isHidden
                                    ? 'max-h-0 opacity-0'
                                    : isExpanded
                                        ? 'max-h-[1200px] opacity-100 w-full'
                                        : 'max-h-[500px] opacity-100 lg:flex-1 lg:min-w-0'
                                }`}
                        >
                            <ProjectCard
                                title={project.title}
                                description={project.description}
                                GitHubLink={project.GitHubLink}
                                TechStack={project.TechStack}
                                photo={project.photo}
                                isExpanded={isExpanded}
                                onToggle={() => setExpandedCardIndex(isExpanded ? null : index)}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
export default Projects