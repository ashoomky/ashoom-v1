import { useRef, useState, useEffect } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YoutubeIcon from '@mui/icons-material/YouTube';
import { Menu, X } from 'lucide-react';

const LandingPage = () => {
    const svgRef = useRef(null);
    const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });
    const [onScroll, setOnScroll] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setOnScroll(true);
        } else {
            setOnScroll(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        let animationFrameId;

        const animateGradient = () => {
            const svg = svgRef.current;
            const gradient = svg.querySelector('#dynamic-gradient');
            if (gradient) {
                gradient.setAttribute('cx', `${gradientPosition.x}%`);
                gradient.setAttribute('cy', `${gradientPosition.y}%`);
            }
            animationFrameId = requestAnimationFrame(animateGradient);
        };

        animateGradient();

        return () => cancelAnimationFrame(animationFrameId);
    }, [gradientPosition]);

    // lock body scroll while menu is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    const handleMouseMove = (e) => {
        const svg = svgRef.current;
        const rect = svg.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setGradientPosition({ x, y });
    };

    const scrollTo = (id) => {
        setIsMenuOpen(false);
        setTimeout(() => {
            const section = document.getElementById(id);
            if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    };

    const navLinks = [
        { label: 'home', id: 'home' },
        { label: 'about', id: 'about' },
        { label: 'experience', id: 'experience' },
        { label: 'projects', id: 'projects' },
    ];

    return (
        <div>
            {/* navbar */}
            <div className={`w-full h-18 flex items-center justify-between top-0 px-6 z-50 fixed transition-all duration-300 ${onScroll ? "bg-white/70 backdrop-blur-md border-gray-200" : "bg-transparent"}`}>
                {/* logo */}
                <div className="left-6">
                    <a href="#" className="text-2xl font-bold">ashleeshum</a>
                </div>

                {/* desktop nav links */}
                <div className="hidden md:flex flex-row space-x-4 text-base">
                    {navLinks.map(({ label, id }) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className="relative group"
                            onClick={(e) => {
                                const section = document.getElementById(id);
                                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                        >
                            {label}
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </div>

                {/* hamburger button (mobile only) */}
                <button
                    className="md:hidden z-50 p-1 cursor-pointer"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen
                        ? <X size={24} />
                        : <Menu size={24} />
                    }
                </button>
            </div>

            {/* mobile menu overlay */}
            <div
                className={`fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                style={{ background: "linear-gradient(to bottom right, #C6A6B8, #E8D0D7, #FFECEC, #E8D0D7, #C6A6B8)" }}
            >
                {/* nav links */}
                <nav className="flex flex-col items-center space-y-10">
                    {navLinks.map(({ label, id }) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className="relative group text-3xl"
                            onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                        >
                            {label}
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </nav>

                {/* social icons at bottom */}
                <div className="absolute bottom-12 flex flex-row">
                    <a href="mailto:ashlee@shum.co.nz" target="_blank" rel="noopener noreferrer">
                        <MailIcon className="m-4 ml-0 hover:text-black transition-transform duration-300" />
                    </a>
                    <a href="https://github.com/ashoomky" target="_blank" rel="noopener noreferrer">
                        <GitHubIcon className="m-4" />
                    </a>
                    <a href="https://www.linkedin.com/in/ashleeshum" target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon className="m-4" />
                    </a>
                    <a href="https://www.youtube.com/@ashoomky" target="_blank" rel="noopener noreferrer">
                        <YoutubeIcon className="m-4" />
                    </a>
                </div>
            </div>

            {/* hero section */}
            <div id="home"
                className="w-full h-screen flex items-center justify-center md:justify-start relative bg-gradient-to-b from-pink-300 via-pink-200 to-pink-100 overflow-hidden"
                onMouseMove={handleMouseMove}
                style={{ background: "linear-gradient(to bottom right, #C6A6B8, #E8D0D7, #FFECEC, #E8D0D7, #C6A6B8)" }}>

                {/* background grain */}
                <svg
                    ref={svgRef}
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 w-full h-full"
                >
                    <defs>
                        <filter id="noise" x="0%" y="0%" width="100%" height="100%">
                            <feTurbulence
                                type="turbulence"
                                baseFrequency="0.6"
                                numOctaves="5"
                                stitchTiles="stitch"
                                result="noise"
                            />
                            <feColorMatrix
                                type="saturate"
                                values="0"
                                in="noise"
                                result="monoNoise"
                            />
                            <feComponentTransfer in="monoNoise" result="opacityNoise">
                                <feFuncA type="discrete" tableValues="0.05 0.1 0.15 0.2" />
                            </feComponentTransfer>
                            <feBlend mode="multiply" in="opacityNoise" in2="SourceGraphic" />
                        </filter>

                        <radialGradient id="dynamic-gradient" cx="50%" cy="50%" r="25%">
                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
                            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.4" />
                            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.01" />
                        </radialGradient>
                    </defs>

                    <rect width="100%" height="100%" fill="url(#dynamic-gradient)" filter="url(#noise)" />
                </svg>

                {/* intro text */}
                <div className="text-3xl md:text-6xl md:pl-30 z-10 text-center md:text-left px-6 md:px-0">
                    Hi! My name is <br />
                    <span className="font-bold text-4xl md:text-8xl">Ashlee Shum.</span>
                </div>

                {/* social icon links */}
                <div className="flex flex-row absolute bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:bottom-auto md:pt-60 md:pl-30">
                    <a href="mailto:ashlee@shum.co.nz" target="_blank" rel="noopener noreferrer">
                        <MailIcon className="m-4 ml-0 hover:text-black transition-transform duration-300" />
                    </a>
                    <a href="https://github.com/ashoomky" target="_blank" rel="noopener noreferrer">
                        <GitHubIcon className="m-4" />
                    </a>
                    <a href="https://www.linkedin.com/in/ashleeshum" target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon className="m-4" />
                    </a>
                    <a href="https://www.youtube.com/@ashoomky" target="_blank" rel="noopener noreferrer">
                        <YoutubeIcon className="m-4" />
                    </a>
                </div>
            </div>
        </div>
    )
}
export default LandingPage
