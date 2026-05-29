import ExperienceCard from "./ExperienceCard"
import { useRef, useState, useEffect } from "react"

const Experience = () => {
    const experiences = [
        {
            title: "Project Manager at WDCC",
            start: "February 2026",
            end: "Current",
            description: (
                <>
                    Leading end-to-end product delivery of a client-facing web platform for the UoA Volleyball Club,
                    built on Next.js, Payload CMS, and MongoDB.
                    <br />
                    <br />
                    <ul className="list-disc list-inside space-y-1">
                        <li>Ran stakeholder discovery sessions using <strong>Jobs-to-be-Done</strong> framing to surface user problems around sign-up friction, event visibility, and member engagement</li>
                        <li>Authored a <strong>Product Requirements Document</strong> covering <strong>10+ functional requirements</strong>, applying <strong>MoSCoW prioritisation</strong> and <strong>RICE scoring</strong> to define a phased MVP scope</li>
                        <li>Managed a cross-functional team of <strong>6 developers</strong>, <strong>1 designer</strong>, and <strong>1 technical lead</strong> in an agile environment</li>
                        <li>Owned sprint planning, backlog management, and served as the primary point of contact between the client and development team</li>
                    </ul>
                </>
            )
        },
        {
            title: "Marketing Director at UOACS",
            start: "July 2025",
            end: "Current",
            description: (
                <>
                    Leading a 4-person marketing team at the University of Auckland Computer Science Society,
                    owning strategy, content direction, and campaign execution across platforms.
                    <br />
                    <br />
                    <ul className="list-disc list-inside space-y-1">
                        <li>Produced content that reached <strong>1,568,894 views</strong> across platforms within <strong>90 days</strong></li>
                        <li>Increased account engagement by <strong>278%</strong> in one month</li>
                        <li>Grew follower count by <strong>150%</strong> and boosted post reach by <strong>200%</strong></li>
                        <li>Led weekly strategy meetings, delegating tasks and guiding content creation aligned with club objectives</li>
                    </ul>
                </>
            )
        },
        {
            title: "Founder & Content Creator",
            start: "November 2022",
            end: "Current",
            description: (
                <>
                    Built and grew a multi-platform content brand from scratch across YouTube, Instagram, and TikTok,
                    managing the full production lifecycle from ideation to publish.
                    <br />
                    <br />
                    <ul className="list-disc list-inside space-y-1">
                        <li>Grew to <strong>3,000 YouTube subscribers</strong> and <strong>6,800+ combined followers</strong> across platforms</li>
                        <li>Reached <strong>207,000+ Instagram views</strong> in 90 days, a <strong>407.8% increase</strong> vs. prior period</li>
                        <li>Drove <strong>785,000+ impressions</strong> over 12 months with a <strong>4.7% click-through rate</strong></li>
                        <li>Applied thumbnail <strong>A/B testing</strong> and SEO-led title optimisation to improve algorithmic reach</li>
                        <li>Used per-video analytics to iterate on content strategy and improve average view duration to <strong>4:32</strong></li>
                    </ul>
                </>
            )
        },
        {
            title: "Front of House at Little Penang",
            start: "February 2023",
            end: "June 2023",
            description: (
                <>
                    Worked front of house at a busy Malaysian restaurant, managing the full customer experience
                    in a fast-paced, high-volume environment.
                    <br />
                    <br />
                    <ul className="list-disc list-inside space-y-1">
                        <li>Handled <strong>50+ orders per shift</strong> across taking orders, making drinks, and delivering food simultaneously</li>
                        <li>Coordinated closely with kitchen staff during peak hours to keep service running smoothly</li>
                        <li>Maintained high customer satisfaction through attentive, friendly service under pressure</li>
                    </ul>
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
                {/* experience cards with circles */}
                <div className="flex md:flex-1 flex-col space-y-16">
                    {experiences.map((exp, i) => (
                        <div key={i} ref={cardRef[i]} className="relative flex">
                            {/* circle beside timeline */}
                            <button
                                onClick={() => scrollToCard(i)}
                                className={`absolute top-10 left-25 transform -translate-x-1/2 w-5 h-5 border-[3px] border-[#C6A6B8] rounded-full hover:bg-[#C6A6B8] transition cursor-pointer hidden md:block z-10 ${i === activeIndex ? "bg-[#C6A6B8]" : "bg-white"}`}
                            />
                            {/* connecting line to next circle — omitted on last card */}
                            {i < experiences.length - 1 && (
                                <div
                                    className="absolute left-25 -translate-x-1/2 w-1 bg-[#C6A6B8] hidden md:block"
                                    style={{ top: '60px', bottom: '-105px' }}
                                />
                            )}
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