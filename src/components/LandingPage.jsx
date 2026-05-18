import { useRef, useState, useEffect } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YoutubeIcon from '@mui/icons-material/YouTube';

const LandingPage = () => {
    const svgRef = useRef(null); // reference to the SVG element
    const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 }); // initial position of gradient at center
    const [onScroll, setOnScroll] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setOnScroll(true);
        } else {
            setOnScroll(false);
        }
    }

        // add listener to track scroll position
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        let animationFrameId;
        
        
        const animateGradient = () => {
            const svg = svgRef.current; // gets the <svg> element from svgRef.current
            const gradient = svg.querySelector('#dynamic-gradient'); // gets the radial gradient element by its id
            // updates the gradient's center position based on mouse movement
            if (gradient) {
                gradient.setAttribute('cx', `${gradientPosition.x}%`);
                gradient.setAttribute('cy', `${gradientPosition.y}%`);
            }
            animationFrameId = requestAnimationFrame(animateGradient); // keeps it from running in the background when not needed
        };

        animateGradient();

        return () => cancelAnimationFrame(animationFrameId);
    }, [gradientPosition]);

    const handleMouseMove = (e) => {
        const svg = svgRef.current;
        const rect = svg.getBoundingClientRect(); // get SVG position and size
        // convert mouse coordinates to percentages relative to SVG
        const x = ((e.clientX - rect.left) / rect.width) * 100; // mouse X relative to the SVG
        const y = ((e.clientY - rect.top) / rect.height) * 100;  // mouse Y relative to the SVG

        setGradientPosition({ x, y }); // update state with new position
    };
    return (
        <div className = "">
            {/* nav bar */}
            <div className ={`w-full h-18 flex items-center justify-between top-0 px-6 z-50 fixed transition-all duration-300 ${onScroll ? "bg-white/70 backdrop-blur-md border-gray-200" : "bg-transparent"}`}>
            {/* logo lhs */}
                <div className="left-6">
                    <a href="#" className="text-2xl font-bold">ashleeshum</a>
                </div>
                {/* nav links rhs */}
                <div className="flex flex-row space-x-2 md:space-x-4 text-sm md:text-base">
                    <a href="#home" className="relative group">
                        home
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a href="#about" className="relative group" onClick={(e) => {
                        const section = document.getElementById('about');
                        section.scrollIntoView({behavior: 'smooth', block: 'start' }); 
                    }}>
                        about
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a href="#experience" className="relative group" onClick={(e) => {
                        const section = document.getElementById('experience');
                        section.scrollIntoView({behavior: 'smooth', block: 'start' }); 
                    }}>
                        experience
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a href="#projects" className="relative group" onClick={(e) => {
                        const section = document.getElementById('projects');
                        section.scrollIntoView({behavior: 'smooth', block: 'start' }); 
                    }}>
                        projects
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </a>
                </div>
            
        
            </div>
            <div id = "home" 
                className = "w-full h-screen flex items-center justify-center md:justify-start relative bg-gradient-to-b from-pink-300 via-pink-200 to-pink-100 overflow-hidden" 
                onMouseMove = {handleMouseMove}
                style={{ background: "linear-gradient(to bottom right,  #C6A6B8, #E8D0D7, #FFECEC, #E8D0D7, #C6A6B8)", // custom gradient colors
                }}>
            
            {/* background grain */}
            <svg
                    ref={svgRef}
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 w-full h-full"
                >
                    {/*  svg pipeline - each step alters the svg file */}
                    <defs>
                        {/* noise filter for grain effect */}
                        <filter id="noise" x="0%" y="0%" width="100%" height="100%">
                            <feTurbulence 
                                type="turbulence" /// type of noise
                                baseFrequency="0.6" // how intense
                                numOctaves="5" // adds layers for complexity 
                                stitchTiles="stitch"
                                result="noise" // saves result for next step
                            />
                            <feColorMatrix 
                                type="saturate" 
                                values="0" // removes all colour
                                in="noise" // applies the previous step (feTurbulence)
                                result="monoNoise" // saves for next step
                            />
                            {/* affecting the alpha channel (feFuncA) transparency */}
                            <feComponentTransfer in="monoNoise" result="opacityNoise"> 
                                <feFuncA type="discrete" tableValues="0.05 0.1 0.15 0.2" /> {/* adjust values for more/less grain */}
                            </feComponentTransfer>
                            {/* blends the grainy texture with the background fill colour, changing the grain to by lighter when bg is lighter, etc. */}
                            <feBlend mode="multiply" in="opacityNoise" in2="SourceGraphic" />
                        </filter>

                        {/* dynamic radial/circle gradient that lightens on mouse hover */}
                        <radialGradient id="dynamic-gradient" cx="50%" cy="50%" r="25%">
                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
                            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.4" />
                            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.01" />
                        </radialGradient>
                    </defs>
                    
                    {/* background rectangle with gradient and grain */}
                    <rect width="100%" height="100%" fill="url(#dynamic-gradient)" filter="url(#noise)" />
                </svg>
            {/* intro */}
            <div className="text-3xl md:text-6xl md:pl-30 z-10 text-center md:text-left px-6 md:px-0">
                Hi! My name is <br />
                <span className="font-bold text-4xl md:text-8xl">Ashlee Shum.</span>
            </div>
            {/* social icon links */}
            <div className="flex flex-row absolute bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:bottom-auto md:pt-60 md:pl-30">
                <a href="mailto:ashlee@shum.co.nz" target="_blank" rel="noopener noreferrer">
                    <MailIcon className="m-4 ml-0 hover:text-black transition-transform duration-300"/>
                </a>
                <a href="https://github.com/ashoomky" target="_blank" rel="noopener noreferrer">
                    <GitHubIcon className="m-4"/>
                </a>
                <a href="https://www.linkedin.com/in/ashleeshum" target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon className="m-4"/>
                </a>
                <a href="https://www.youtube.com/@ashoomky" target="_blank" rel="noopener noreferrer">
                    <YoutubeIcon className="m-4"/>
                </a>
            </div>
        </div>
        </div>
    )
}
export default LandingPage