'use client'
import robot from '@/public/robot.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Image from 'next/image'
import { useRef } from 'react'
import { SiNextdotjs, SiReact, SiTailwindcss, SiTypescript } from 'react-icons/si'
import LogoLoop from './ui/LogoLoop'

gsap.registerPlugin(ScrollTrigger)

const Scroll = () => {
    const techLogos = [
      { node: <SiReact />, title: "React", href: "https://react.dev" },
      { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
      { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
      { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    ];
  const robotRef = useRef(null)

  useGSAP(() => {


    const heroSplit = new SplitText('.title', { type: 'chars' });
    const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

    heroSplit.chars.forEach(char => char.classList.add('text-gradient'));

    gsap.fromTo(heroSplit.chars, {
        opacity: 0,
        yPercent: 50,
    }, {
        opacity: 1,
        yPercent: 0,
        duration: 1.8,
        ease: 'expo.out',
        stagger: 0.05,
        delay: 1,   
    });


    gsap.fromTo('.button', {
        opacity:0,
    }, {
        opacity:1,
        duration:1, 
        delay:2.5,
        ease:'sine.in'
    })

    gsap.fromTo('.logosdiv', {
    opacity: 0,
    xPercent: -50,
    }, {
    opacity: 1,
    xPercent: 0,
    duration: 1,
    delay: 2,
    ease: 'power1.out'
    });


    gsap.from(paragraphSplit.lines, {
        opacity: 0,
        yPercent: 100,
        duration: 1.8,
        ease: 'expo.out',
        delay: 2,
        stagger: 0.05,
    });
    

  const element = robotRef.current;
    const tl = gsap.timeline({
      defaults: { duration: 1, ease: 'bounce.out' },
    });

    tl.from(element, {
        opacity:1,
        y: -1000, 
        duration: 1.2,
        delay:0.1,
        ease: 'bounce.out', 
  });

    gsap.timeline({
      scrollTrigger: {
        trigger: "#home",
        start: 'bottom bottom',
        end: 'bottom top',
        scrub: 0.5,
      }
    })
    .fromTo(robotRef.current, 
      { y: 0, x: 0, rotateY: 0 }, 
      { y: 820, x: -650, rotateY: 180, ease: "none", scale: 0.90 }
    );
  })

  return (
    <>
    <section id='home' className="hd h-screen flex flex-wrap">
        <div id='home1' className="h-screen w-screen flex justify-center items-center perspective-[1000px]">
            <div className='w-screen lg:w-[50%] h-full flex justify-center items-center flex-col text-start'>
                <div className='w-[90%] md:w-[70%] m-auto'>
                    <div className='logosdiv overflow-x-hidden w-[280px] bg-[#DDE1E6] pt-1 dark:text-black'>
                    <LogoLoop 
                        logos={techLogos}
                        speed={30}
                        direction="right"
                        logoHeight={28}
                        gap={20}
                        hoverSpeed={0}
                        scaleOnHover
                        fadeOut
                        fadeOutColor="#ffffff"
                        ariaLabel="Technology partners"
                    />
                    </div>
                    <p className='subtitle text-[14px] md:text-[15px] text-[#676474] mt-2'>Full Stack Developer & UI/UX Designer</p>

                    <div className='leading-none mt-10 mb-4'>
                    <p className='title font-bebas text-[96px] md:text-[128px] tracking-wide whitespace-nowrap'>ERROL <br />TABANGEN</p>
                    </div>

                    <div className='flex items-center flex-row gap-6'>
                      <button
                      className="button cursor-none group relative bg-black text-white dark:bg-white active:scale-85 dark:text-black font-semibold text-sm px-2 py-3 rounded-[5px] transition-all duration-200 ease-in-out shadow hover:shadow-lg w-40 h-12"
                      >
                        <a href="#contact" className='cursor-none'>
                        <div className="relative flex items-center justify-center gap-5 ">
                            <span className="relative inline-block overflow-hidden">
                            <span
                                className="block transition-transform duration-300 group-hover:-translate-y-full"
                            >
                              Hire Me
                                
                            </span>
                            <span
                                className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0"
                            >
                                Contact
                            </span>
                            </span>

                            <svg
                            className="w-4 h-4 transition-transform duration-200 group-hover:rotate-45 text-black "
                            viewBox="0 0 24 24"
                            >
                            <circle fill="currentColor" r="11" cy="12" cx="12"></circle>
                            <path
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2"
                                stroke="white"
                                d="M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5"
                            ></path>
                            </svg>
                        </div>
                        </a>

                      </button>
                      <button className='button cursor-none'>
                          <a href="" className='cursor-none'>Resume</a>
                      </button>
                    </div>
                </div>
                
            </div>

            <div className='w-screen lg:w-[50%] h-full flex justify-center items-center flex-col text-start'>
                <div className='w-[90%] m-auto'>
                <p className='subtitle text-[14px] md:text-[15px] text-[#676474] mt-2 hidden md:flex w-[300px]'>
                    Crafting beautiful, functional, and user-centered digital experiences that solve real problems and delight users.
                </p>
                </div>
                <div ref={robotRef} className='z-10 '>
                <Image src={robot} alt='Robot' className='robo relative xl:-top-20'/>
                </div>
            </div>
        </div>
    </section>




    </>
  )
}

export default Scroll
