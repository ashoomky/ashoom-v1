import MailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YoutubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
    const navLinks = [
        { label: 'home', id: 'home' },
        { label: 'about', id: 'about' },
        { label: 'experience', id: 'experience' },
        { label: 'projects', id: 'projects' },
    ];

    const scrollTo = (id) => {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <footer className="bg-[#C6A6B8] text-white mt-16 py-16 px-6">
            <div className="max-w-5xl mx-auto flex flex-col items-center space-y-8">

                {/* branding */}
                <a href="#" className="text-3xl font-bold tracking-wide hover:text-black transition-colors duration-200">
                    ashleeshum
                </a>

                {/* social icons */}
                <div className="flex flex-row space-x-4">
                    <a href="mailto:ashlee@shum.co.nz" target="_blank" rel="noopener noreferrer" aria-label="Email">
                        <MailIcon className="hover:text-black transition-colors duration-200" />
                    </a>
                    <a href="https://github.com/ashoomky" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <GitHubIcon className="hover:text-black transition-colors duration-200" />
                    </a>
                    <a href="https://www.linkedin.com/in/ashleeshum" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <LinkedInIcon className="hover:text-black transition-colors duration-200" />
                    </a>
                    <a href="https://www.youtube.com/@ashoomky" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                        <YoutubeIcon className="hover:text-black transition-colors duration-200" />
                    </a>
                </div>

                {/* nav links */}
                <nav className="flex flex-row flex-wrap justify-center gap-6">
                    {navLinks.map(({ label, id }) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className="relative group hover:text-black transition-colors duration-200"
                            onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                        >
                            {label}
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </nav>

                {/* divider */}
                <div className="w-full h-px bg-white/40" />

                {/* copyright + email */}
                <div className="w-full flex flex-col items-center space-y-1 text-sm text-white/80 md:flex-row md:justify-between md:space-y-0">
                    <p>&copy; {new Date().getFullYear()} Ashlee Shum. All rights reserved.</p>
                    <a
                        href="mailto:ashlee@shum.co.nz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-black transition-colors duration-200"
                    >
                        ashlee@shum.co.nz
                    </a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
