import { useState } from 'react'
import NatsPhoto from '../assets/nats-vlog-photo.JPG'
import HackathonHeadshot from '../assets/25-wdccxsesa-hackathon-headshot.JPEG'
import CasualPhoto from '../assets/casual-food-photo.jpg'
import NewYorkSkyline from '../assets/newyork-skyline.jpg'
const AboutMe = () => {
    const photos = [NatsPhoto, HackathonHeadshot, CasualPhoto, NewYorkSkyline];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(0);

    const handleMouseDown = (event) => {
        setIsDragging(true);
        setDragStart(event.clientX);
    }

    const handleMouseMove = (event) => {
        // if user not dragging, do nothing
        if (!isDragging) return;
        // calculate distance dragged
        const dragDistance = event.clientX - dragStart;
        if (dragDistance > 50) {
            //  if on last photo, loop back to first
            setCurrentIndex(prevIndex => prevIndex == 0 ? photos.length - 1 : prevIndex - 1);
            setIsDragging(false);
        } else if (dragDistance < -50) {
            // else loop to next photo when dragging right
            setCurrentIndex(prevIndex => (prevIndex + 1) % photos.length);
            setIsDragging(false);
        }
    };
    const handleMouseUp = () => {
        setIsDragging(false);
    };
    const handleMouseLeave = () => {
        setIsDragging(false);
    }

    const handleTouchStart = (event) => {
        setIsDragging(true);
        setDragStart(event.touches[0].clientX);
    }

    const handleTouchMove = (event) => {
        if (!isDragging) return;
        const dragDistance = event.touches[0].clientX - dragStart;
        if (dragDistance > 50) {
            setCurrentIndex(prevIndex => prevIndex === 0 ? photos.length - 1 : prevIndex - 1);
            setIsDragging(false);
        } else if (dragDistance < -50) {
            setCurrentIndex(prevIndex => (prevIndex + 1) % photos.length);
            setIsDragging(false);
        }
    }

    const handleTouchEnd = () => {
        setIsDragging(false);
    }

    return (


        <div id="about" className="w-full max-w-5xl mx-auto justify-center items-center p-4 pt-24 md:p-20">
            <div className="text-4xl">
                about me
            </div>
            {/* pictures and description section */}
            <div className="flex flex-col h-auto md:h-[500px] md:flex-row pt-8 justify-center items-center text-center">
                {/* swiping photo cards */}
                <div className="relative flex w-full md:flex-1 h-[240px] md:h-[320px] justify-center items-center m-4 md:m-10 cursor-grab active:cursor-grabbing"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}>

                    {photos.map((photo, index) => {
                        const rotation = (index - currentIndex) * 5 - 1 + Math.random() * 3;
                        const zIndex = photos.length - Math.abs(index - currentIndex);
                        const opacity = index === currentIndex ? 1 : 0.5;
                        const scale = index === currentIndex ? 1 : 0.8;
                        const photoAnimation = {
                            transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
                            zIndex: zIndex,
                            opacity: opacity,
                        }
                        if (Math.abs(index - currentIndex) > 1 &&
                            !(currentIndex === 0 && index === photos.length - 1) &&
                            !(currentIndex === photos.length - 1 && index === 0)) {
                            return null;
                        }
                        return (
                            <img
                                key={index}
                                src={photo}
                                alt={`Photo ${index + 1}`}
                                className="absolute top-1/2 left-1/2 w-[200px] h-[200px] md:w-[280px] md:h-[280px] object-cover rounded-lg shadow-lg transition-all duration-300"
                                style={photoAnimation}
                                draggable={false}
                            />
                        )
                    })
                    }
                </div>

                {/* description */}
                <div className="flex-1 md:w-1/2 m-4 md:m-10 text-left">
                    <p className="pb-4">
                        Hi! I'm a final year Computer Science student at the University of Auckland who loves building things that are both functional and meaningful. Right now I'm Project Manager at WDCC and Marketing Director at UOACS, and actively looking for graduate roles in product management, software engineering, analysis, and product delivery across New Zealand and Australia.
                    </p>
                    <p className="pb-4">
                        Outside of university I enjoy travelling, creating and editing content, playing the piano, and spending time with the people I care about.
                    </p>
                    <p className="italic text-gray-600 text-sm">
                        [swipe or drag photos left and right]
                    </p>
                </div>
            </div>
        </div>
    )
}
export default AboutMe