'use client'

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/all"

const AboutSection = () => {

    useGSAP(() => {

        // Animate the small "About" badge
        gsap.from('.about', {
            opacity: 0,
            y: 40,
            duration: 0.2,
            scrub: true,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.about',  
                start: 'top 99%',
                toggleActions: 'play none none none',
            }
        });

        // Animate the "Who I Am" heading
        gsap.from('.whoiam', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.whoiam',
                start: 'top 80%',
                toggleActions: 'play none none none',
            }
        });

        const paragraphSplit = new SplitText('.aboutme', { type: 'lines' });
        gsap.set(paragraphSplit.lines, { opacity: 0, y: 60 }); // start hidden and below

        paragraphSplit.lines.forEach(line => {
            gsap.to(line, {
                opacity: 1,
                y: 0,
                duration: 1,
                scrub: true,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: line,     
                    start: 'top 80%',   
                    toggleActions: 'play none none none',
                }
            });
        });
    });

    return (
        <section id='about' className="hd h-screen flex flex-wrap">
            <div className="h-screen w-screen flex flex-wrap-reverse">

                <div className='lg:w-[40%] h-screen hidden lg:flex'></div>

                <div className='w-[95%] mx-auto lg:w-[60%] z-0 text-center flex items-center justify-center flex-col mt-0'>
                    <div className='mb-6'>
                        <p className='about text-[12px] md:text-[14px] bg-[#DDE1E6] px-5 py-1 w-fit rounded-[3px] m-auto dark:text-black'>About</p>
                        <h3 className='whoiam font-noto text-[66px] font-normal'>Who I Am</h3>
                    </div>

                    <div>
                    <p className='aboutme text-justify px-2 w-[100%] lg:w-[95%] 2xl:w-[100%]  m-auto text-[14px] md:text-[15px] text-[#676474]'>
                    I’m Errol — a full-stack developer and builder of interfaces with a passion for crafting intuitive, user-friendly digital experiences. I bridge the gap between design and development, turning ideas into functional, engaging interfaces.

                    <br /><br />

                    With experience in both frontend and backend technologies, I focus on creating projects that are efficient, scalable, and enjoyable to use. I’m committed to continuous growth, tackling challenging problems, and building digital experiences that are seamless, accessible, and meaningful.
                    </p>

                    </div>
                </div>

            </div>  
        </section>
    )
}

export default AboutSection
