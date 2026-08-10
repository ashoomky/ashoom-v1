import { useEffect, useState } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import GitHubIcon from '@mui/icons-material/GitHub';
import { getAverageColor } from '../utils/averageColor';

const TechPills = ({ stack }) => {
    if (!stack) return null;
    const items = stack.split(',').map((item) => item.trim()).filter(Boolean);
    return (
        <div className="flex flex-wrap gap-1.5">
            {items.map((item, index) => (
                <span
                    key={index}
                    className="text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-2.5 py-1"
                >
                    {item}
                </span>
            ))}
        </div>
    );
};

const ProjectCard = ({ title, description, GitHubLink, TechStack, photo, isExpanded, onToggle }) => {
    const [overlayColor, setOverlayColor] = useState('rgb(229, 231, 235)');

    useEffect(() => {
        if (!photo) return;
        let cancelled = false;
        getAverageColor(photo).then((color) => {
            if (!cancelled) setOverlayColor(color);
        });
        return () => { cancelled = true; };
    }, [photo]);

    if (isExpanded) {
        return (
            <div className="w-full md:w-[820px] mx-auto bg-white border border-gray-200 rounded-2xl text-left">
                <div className="p-6 md:p-10">
                    <button
                        onClick={onToggle}
                        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 cursor-pointer mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        back
                    </button>

                    <div className="flex items-start justify-between gap-4 mb-3">
                        <h2 className="text-2xl md:text-4xl font-semibold text-gray-900">{title}</h2>
                        {GitHubLink && (
                            <a
                                href={GitHubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="View on GitHub"
                                className="flex-shrink-0 text-gray-400 hover:text-gray-900 transition-colors duration-200"
                            >
                                <GitHubIcon className="w-7 h-7" />
                            </a>
                        )}
                    </div>

                    <div className="mb-6">
                        <TechPills stack={TechStack} />
                    </div>

                    {photo && (
                        <div className="mb-6 rounded-xl overflow-hidden bg-gray-50">
                            <img src={photo} alt={title} className="w-full max-h-80 md:max-h-[28rem] object-contain" />
                        </div>
                    )}

                    <p className="text-gray-600 leading-relaxed text-base md:text-lg">{description}</p>
                </div>
            </div>
        );
    }

    return (
        <div
            onClick={onToggle}
            className="group/card w-[260px] md:w-[280px] h-full bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200 flex flex-col text-left"
        >
            <div className="h-36 md:h-40 flex-shrink-0 bg-gray-50 relative flex items-center justify-center">
                {photo ? (
                    <>
                        <img src={photo} alt={title} className="w-full h-full object-cover" />
                        <div
                            className="absolute inset-0 group-hover/card:opacity-0 transition-opacity duration-500 ease-out"
                            style={{ backgroundColor: overlayColor }}
                        />
                    </>
                ) : (
                    <FileText className="w-8 h-8 text-gray-300" />
                )}
            </div>
            <div className="p-4 flex flex-col gap-2 flex-1">
                <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                <TechPills stack={TechStack} />
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{description}</p>
            </div>
        </div>
    );
}
export default ProjectCard
