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


    gsap.fromTo('button', {
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

                    <div>
                    <button className='button bg-black cursor-pointer dark:bg-white text-white dark:text-black px-5 py-2 rounded-[5px] hover:bg-black/80 hover:scale-[0.96] duration-300 ease-in-out'>
                        <a href="#contact">Hire Me</a>
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
