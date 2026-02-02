import React, { useState, useEffect } from 'react'
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
    return (
        

        <div id="about" className=" w-full max-w-5xl mx-auto justify-center items-center p-20 ">
            <div className="text-4xl">
                about me
            </div>
            {/* pictures and description section */}
            <div className="flex flex-col h-[950px] md:h-[500px] md:flex-row pt-8 justify-center items-center text-center">
                {/* swiping photo cards */}
                <div className="flex flex-1 h-[300px] justify-center items-center m-10 cursor-grab active:cursor-grabbing"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}>
                    
                    {photos.map((photo, index) => {
                        const rotation = (index - currentIndex) * 5 - 1 + Math.random() * 3;
                        const zIndex = photos.length - Math.abs(index - currentIndex); // setting visibility priority for each photo
                        const opacity = index === currentIndex ? 1 : 0.5; // current photo fully visible
                        const scale = index === currentIndex ? 1 : 0.8; // current photo full size
                        const photoAnimation = {
                                    transform: `rotate(${rotation}deg) scale(${scale})`,
                                    zIndex: zIndex,
                                    opacity: opacity,
                                }
                        // only render current, previous, and next photo
                        if (Math.abs(index - currentIndex) > 1 &&
                                // checking edge cases: last photo can appear when current is first photo
                                // and first photo appears when current is last photo
                            !(currentIndex === 0 && index === photos.length - 1) &&
                            !(currentIndex === photos.length - 1 && index === 0)) {
                            return null;
                        }
                        return (
                            <img
                                key={index}
                                src={photo}
                                alt={`Photo ${index + 1}`}
                                className="absolute w-[300px] h-[300px] object-cover rounded-lg shadow-lg transition-all duration-300 hover:scale-103"
                                style={photoAnimation}
                                draggable={false}
                            />   
                        )})
                    }
                </div>
    
                {/* description */}
                <div className="flex-1 md:w-1/2 m-10 text-left">
                    <p className="pb-4">
                        Hi! I am currently in my final year studying a Bachelor of Science majoring in Computer Science at the University of Auckland. I have a passion for creating aesthetic and functional web applications that solve real world problems, while also making a positive impact on people. 
                    </p>
                    <p className="pb-4">
                        In my free time I enjoy travelling, editing, gymming, listening to music and spending time with loved ones. I'm always eager to learn and take on new challenges, and make genuine connections with people.
                    </p>
                    <p className="italic text-gray-600 text-sm">
                        [swipe photos left and right]
                    </p>
                </div>
            </div>
        </div>
    )
}
export default AboutMe