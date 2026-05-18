import ExperienceCard from "./ExperienceCard"
import { useRef, useState, useEffect } from "react"

const Experience = () => {
    const experiences = [
        {
            title: "Marketing Director at UOACS (University of Auckland Compsci Society)",
            start: "July 2025",
            end: "Current",
            description: (
                <>
                    As Marketing Director, I <strong>lead weekly meetings</strong>, delegate tasks, and facilitate brainstorming to drive creativity. 
                    <br/>
                    <br/>
                    I manage a team of <strong>5</strong>, coordinate campaigns across platforms, and increased account engagement by 
                    <strong> 278%</strong> in one month. I also oversaw content strategy that boosted follower growth by <strong>150% </strong> 
                    and post reach by <strong>200%</strong>, strengthening my skills in <em>leadership, communication, problem-solving, 
                    and adaptability</em>.
                </>

            )
        },
        {
            title: "YouTube Editor / Vlogger",
            start: "September 2022",
            end: "Current",
            description: (
                <>
                    I created and manage my own <strong>YouTube channel</strong> as a
                    <em> vlogger and video editor</em>, producing lifestyle and travel content.
                    I handle all aspects of production, including filming, editing, and audience engagement.
                    <br />
                    <br />
                    My most viewed video reached <strong>40,000+ views</strong>, and several others gained consistent traction,
                    demonstrating my ability to create engaging, shareable content.
                    This experience strengthened my skills in <strong>video editing</strong>,
                    <strong> storytelling</strong>, and <strong>digital media</strong>,
                    while also teaching me how to analyse audience metrics to grow viewership.
                </>
            )
        },
        {
            title: "FOH at Little Penang",
            start: "Feb 2023",
            end: "June 2023",
            description: (
                <>
                    Waitressed at Little Penang, multitasked between <strong>taking 50+ orders per shift</strong>,
                    making drinks, delivering food, and attending to customers in a fast-paced environment. <br />
                    <br />
                    Learned to manage <strong>high-volume orders efficiently</strong> while maintaining
                    <strong> customer satisfaction</strong> through friendly and attentive service. <br />
                    <br />
                    Strengthened skills in <em>teamwork, communication, adaptability, and time management </em>
                    by coordinating with kitchen staff and handling peak rush hours smoothly.
                </>

            )
        }
    ];

    const cardRef = experiences.map(() => useRef(null));
    const [activeIndex, setActiveIndex] = useState(0);

    // intersection observer to track which card is in view and fill dot
    useEffect(() => {
        // create new intersection observer
        const observer = new IntersectionObserver(
            // entries - the list of cards being observed
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = cardRef.findIndex(ref => ref.current === entry.target);
                        if (index !== -1) { // matches, returns index of card in view
                            setActiveIndex(index);
                        }
                    }
                });
            },
            {
                root: null,  // viewport - entire screen
                rootMargin: "-40% 0px -50% 0px", // top, right, bottom, left - trigger when middle of card is in middle of screen
                threshold: 0
            }
        );

        // for each card, attach an intersection observer to it
        cardRef.forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });

        // clean up - when component unmounts (not on page anymore), stop observing
        return () => {
            cardRef.forEach(ref => {
                if (ref.current) observer.unobserve(ref.current);
            });
        };
    }, [cardRef]);
    // runs everytime cardRef changes


    const scrollToCard = (index) => {
        if (cardRef[index].current) {
            cardRef[index].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setActiveIndex(index); // updates active index when clicking on a dot
        }
    };
    return (
        <div id="experience" className="w-full text-center pt-24 md:pt-32">
            {/* title */}
            <span className="text-4xl">
                experience
            </span>
            {/* experience contents */}
            <div className="flex flex-col relative mt-10 mx-auto max-w-5xl">
                {/* vertical timeline indicator (only on desktop) */}
                <div className="absolute top-10 left-25 transform -translate-x-1/2 w-1 bg-[#C6A6B8] hidden md:block h-full"></div>
                {/* horizontal divider line */}
                <div className="absolute -bottom-10 left-25 w-full h-[3px] bg-[#C6A6B8] hidden md:block"></div>
                {/* experience cards with circles */}
                <div className="flex md:flex-1 flex-col space-y-16">
                    {experiences.map((exp, i) => (
                        <div key={i} ref={cardRef[i]} className="relative flex">
                            {/* circle beside timeline */}
                            <button
                                onClick={() => scrollToCard(i)}
                                className={`absolute top-10 left-25 transform -translate-x-1/2 w-5 h-5 border-[3px] border-[#C6A6B8] rounded-full hover:bg-[#C6A6B8] transition cursor-pointer hidden md:block ${i === activeIndex ? "bg-[#C6A6B8]" : "bg-white"}`}
                            />
                            {/* card itself */}
                            <div className="md:ml-50">
                                <ExperienceCard
                                    title={exp.title}
                                    start={exp.start}
                                    end={exp.end}
                                    description={exp.description}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Experience;