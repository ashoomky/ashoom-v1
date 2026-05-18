const Footer = () => {
    return (
        <footer className="flex flex-col justify-end bg-[#C6A6B8] text-white py-4 mt-8 h-[300px]">
            <div className="container mx-auto flex flex-col items-center space-y-2 text-center md:flex-row md:justify-between md:space-y-0 md:text-left px-4 md:px-6">
                <p>&copy; {new Date().getFullYear()} Ashlee Shum. All rights reserved.</p>
                <p className="hover:text-black transition ease-linear duration-200">
                    <a 
                        href="mailto:ashlee@shum.co.nz" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        ashlee@shum.co.nz
                    </a>
                </p>
            </div>
        </footer>
    );
}
export default Footer;