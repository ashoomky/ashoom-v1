import { GitHub } from "@mui/icons-material"
import ProjectCard from "./ProjectCard"
import FindrScreenshot from "../assets/FindrScreenshot.png"
import PersonalWebsiteScreenshot from "../assets/personal-website-screenshot.jpg"
import AusaPhoto from "../assets/ausa-project-photo.png"
import {useState} from "react"
const Projects = () => {
    const [expandedCardIndex, setExpandedCardIndex] = useState(null);
    const projects = [
        {
            title: "Findr",
            description: "Finder is a unique web application inspired by Tinder, where you can save planets by swiping right. You can access your saved planets and learn more about the cosmos while contributing to the ultimate theme of escaping Earth.",
            GitHubLink: "https://github.com/evanautianle/HACKATHON2024-print-Hello-World-",
            TechStack: "HTML, CSS, JavaScript, GitHub",
            photo: FindrScreenshot
        },
        {
            title: "Personal Website",
            description: "This is my personal website, built to display my projects and skills and help me learn modern web development technologies.",
            GitHubLink: "https://github.com/ashoomky/personal-website",
            TechStack: "React, TailwindCSS, JavaScript",
            photo: PersonalWebsiteScreenshot
        },
        {
            title: "Mental Wellbeing Web App",
            description: "This project is a group effort by a 10-person development team for the Auckland University Students’ Association (AUSA). We are building a mental wellbeing resource hub to make support services more accessible for students. As a developer working across both front-end and back-end, I contribute to creating a clean, user-friendly interface with Next.js and TailwindCSS, while also helping implement backend functionality with TSOA and Firebase.",
            GitHubLink: "https://github.com/UoaWDCC/ausa",
            TechStack: "React, Node.js, Express",
            photo: AusaPhoto
        },
    ]
    return (
        <div id="projects" className="w-full justify-center p-4 md:p-30">
            {/* title */}
            <div className="text-4xl">
                projects
            </div>
            {/* project cards */}
            <div className="flex md:flex-row flex-col justify-center items-center mt-8 md:mt-20">
                {projects.map((project, index) => (
                    <ProjectCard 
                    key={index} 
                    title={project.title} 
                    description={project.description} 
                    GitHubLink={project.GitHubLink}
                    TechStack={project.TechStack}
                    photo={project.photo}
                    isExpanded={expandedCardIndex === index}
                    isHidden={expandedCardIndex !== null && expandedCardIndex !== index}
                    onToggle={() => {
                        setExpandedCardIndex(expandedCardIndex === index ? null : index);
                }}
                    />
                ))}
            </div>
        </div>
    )
}
export default Projects