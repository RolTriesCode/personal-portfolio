'use client'; 


import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { certificates } from "@/lib/certificates";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
const CertiSection = () => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        if (!triggerRef.current || !containerRef.current || !trackRef.current) return;
        // Calculate horizontal scrollable distance (total track width minus visible container width)
        const getScrollAmount = () => {
            if (!trackRef.current || !containerRef.current) return 0;
            return trackRef.current.scrollWidth - containerRef.current.offsetWidth;
        };
        // Create the scroll timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerRef.current,
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => `+=${getScrollAmount()}`,
                invalidateOnRefresh: true,
            }
        });
        // Translate the track horizontally
        tl.to(trackRef.current, {
            x: () => -getScrollAmount(),
            ease: "none",
        }, 0);
        // Animate the progress bar fill from 0 to 1 scale
        if (progressRef.current) {
            tl.to(progressRef.current, {
                scaleX: 1,
                ease: "none",
            }, 0);
        }
    }, { scope: triggerRef });
    return (
               <section 
            ref={triggerRef} 
            id='certifications' 
            className="relative h-screen w-full flex flex-col justify-center bg-white dark:bg-black text-black dark:text-white overflow-hidden transition-colors duration-500"
        >
            <div className="w-[90%] mx-auto flex flex-col lg:flex-row items-stretch justify-between h-[85vh] gap-6 lg:gap-12">
                
                {/* Left Column: Title, description, and dynamic progress bar */}
                <div className="w-full lg:w-[30%] flex flex-col justify-between flex-shrink-0 py-2 lg:py-10 z-10">
                    <div className="space-y-3 lg:space-y-4">
                        <span className="text-[11px] md:text-[13px] bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-4 py-1 w-fit rounded-[3px] font-medium tracking-wide">
                            Credentials
                        </span>
                        <h2 className="text-[40px] md:text-[52px] lg:text-[60px] font-normal font-noto leading-tight mt-1">
                            Certifications
                        </h2>
                        <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
                            A curated gallery of my academic achievements, specialized certifications, and professional training in software development and UI/UX design.
                        </p>
                    </div>
                                        {/* Progress Bar Indicators */}
                    <div className="mt-6 lg:mt-0 space-y-2">
                        <div className="flex justify-between text-[10px] md:text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                            <span>01 / START</span>
                            <span>{certificates.length.toString().padStart(2, '0')} / END</span>
                        </div>
                        <div className="w-full h-[2px] bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div 
                                ref={progressRef} 
                                className="h-full bg-black dark:bg-white scale-x-0 origin-left"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Viewport containing the horizontal scroll track */}
                <div 
                    ref={containerRef} 
                    className="w-full lg:w-[70%] flex items-center overflow-hidden h-full py-2 lg:py-6 z-10"
                >
                    <div 
                        ref={trackRef} 
                        className="flex gap-5 md:gap-8 flex-nowrap pr-12 lg:pr-24"
                    >
                        {certificates.map((cert) => (
                            <div 
                                key={cert.id} 
                                className="group relative w-[260px] sm:w-[300px] md:w-[350px] lg:w-[380px] flex-shrink-0 bg-zinc-50/50 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200 dark:border-zinc-800/80 rounded-2xl overflow-hidden p-4 md:p-5 flex flex-col justify-between gap-4 transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 hover:shadow-xl dark:hover:shadow-2xl"
                            >
                                {/* Certificate Image Container */}
                                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800/50 bg-zinc-100 dark:bg-zinc-950">
                                    <Image 
                                        src={cert.image}
                                        alt={cert.title}
                                        fill
                                        sizes="(max-w-768px) 260px, (max-w-1024px) 300px, 380px"
                                        className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                                    />
                                    {/* Date Stamp overlay */}
                                    <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-mono text-zinc-800 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-800">
                                        {cert.date}
                                    </div>
                                </div>
                                {/* Content Details */}
                                <div className="space-y-2 flex-grow flex flex-col justify-between">
                                    <div className="space-y-1.5">
                                        <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                            {cert.issuer}
                                        </span>
                                        <h3 className="text-sm sm:text-base md:text-lg font-semibold tracking-wide text-zinc-900 dark:text-white group-hover:text-black dark:group-hover:text-zinc-200 transition-colors">
                                            {cert.title}
                                        </h3>
                                        <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                                            {cert.description}
                                        </p>
                                    </div>
                                    {/* Tech skills verified */}
                                    <div className="flex flex-wrap gap-1.5 pt-2">
                                        {cert.skills.map((skill) => (
                                            <span 
                                                key={skill} 
                                                className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800/30"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                            </div>
        </section>

                    );
};
export default CertiSection;


