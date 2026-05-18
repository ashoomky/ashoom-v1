import { X, ArrowLeft, File } from 'lucide-react';
import GitHubIcon from '@mui/icons-material/GitHub';
import Folder from '../assets/folder-icon-2.png'
const ProjectCard = ({title, description, GitHubLink, TechStack, photo, isExpanded, isHidden, onToggle}) => {
    if (isHidden) return null;

    return (
        
        <div className={` transition-all duration-500 ease-out ${isExpanded ? 'lg:w-[800px] lg:h-full' : 'w-full h-[400px]'} bg-white p-4 m-6`}>
            {!isExpanded ? (
                <div className="items-center justify-center flex flex-col h-full space-y-3">
                <img 
                    src={Folder} 
                    alt="Folder Icon" 
                    className="w-[200px] h-[200px] min-w-[250px] min-h-[250px] flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200"
                    onClick={onToggle}
                />
                <div className="h-1 w-10 bg-gray-300 opacity-50"></div>
                <span className="text-xl font-bold"> {title}</span>
                 <p className="italic text-gray-800"> {TechStack} </p>
                 </div> 
                
            ) : (
                
                // file paper (expanded state)
                <div className="w-full h-full bg-white  rounded-lg shadow-2xl relative transition-all duration-500 ease-out">
                    {/* file header with yellow border */}
                    <div className="bg-amber-100  p-7 rounded-t-lg relative">
                        {/* folder tab that stays visible - click to close as well */}
                        <div 
                            className="absolute -top-6 left-4 w-30 h-6 bg-amber-100 rounded-t-lg cursor-pointer hover:bg-amber-200 transition-colors duration-200 flex items-center justify-center"
                            onClick={onToggle}
                        >
                            {/* close button */}
                            <button 
                                className="absolute text-amber-600 hover:text-amber-800 transition-colors duration-200 cursor-pointer" 
                                onClick={onToggle}
                            >
                                <ArrowLeft className="w-4 h-4 cursor-pointer" />
                            </button>
                        </div>
                        
                        
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-bold text-gray-800 ">{title}</h2>
                            {GitHubLink && (
                                <div className="mt-auto">
                                    <a 
                                        href={GitHubLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 hover:text-gray-600 text-black px-4 py-2 rounded-lg transition-colors duration-200"
                                    >
                                        <GitHubIcon className="w-10 h-10" />

                                    </a>
                                </div>
                            )}
                        </div>
                        <p className="text-lg font-semibold text-gray-600 italic text-left opacity-60">{TechStack}</p>
                    </div>

                    {/* file content area */}
                    <div className="p-6 h-full flex flex-col">
                        {/* project image */}
                        {photo && (
                            <div className="mb-6 flex justify-center">
                                <img 
                                    src={photo} 
                                    alt={title} 
                                    className="max-w-full max-h-64 object-contain rounded-lg shadow-md"
                                />
                            </div>
                        )}
                        
                        {/* description */}
                        <div className="m-4">
                            <p className="text-gray-700 leading-relaxed text-base">{description}</p>
                        </div>
                        
                    </div>
                </div>
            )}
        </div>
    );
}
 export default ProjectCard
