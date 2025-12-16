
'use client'
import { useRef, useEffect, useState } from 'react';
import LogoLoop from '@/components/ui/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import Image from 'next/image';
import gsap from 'gsap';
import robot from '@/public/robot.png';
import { useGSAP } from '@gsap/react';

import {SplitText, ScrollTrigger} from 'gsap/all';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

const HeroSection = () => {
    const robotRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
    if (!robotRef.current) return;


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
        delay: 3,   
    });


    gsap.fromTo('button', {
        opacity:0,
    }, {
        opacity:1,
        duration:0.8, 
        delay:4,
        ease:'power1.out'
    })

    gsap.fromTo('.logosdiv', {
    opacity: 0,
    xPercent: -50,
    }, {
    opacity: 1,
    xPercent: 0,
    duration: 1,
    delay: 4,
    ease: 'power1.out'
    });


    gsap.from(paragraphSplit.lines, {
        opacity: 0,
        yPercent: 100,
        duration: 1.8,
        ease: 'expo.out',
        delay: 4,
        stagger: 0.05,
    });





    const element = robotRef.current;
    const tl = gsap.timeline({
        defaults: { duration: 1.2, ease: 'power2.out' },
    });

    const rect = element.getBoundingClientRect();
    const originalX = rect.left;
    const originalY = rect.top;

    const centerX = window.innerWidth / 2 - rect.width / 2;
    const centerY = window.innerHeight / 2 - rect.height / 2;

    tl.to(element, {
        x: centerX - originalX,
        y: centerY - originalY,
        scale: 1.5,
    }).to(element, {
        x: 0,
        y: -100,
        delay: 0.1,
        ease: 'sine.inOut',
        scale: 1,

    });




    return () => tl.kill();
    }, []);


  return (
    <section id="home" className="hd h-screen flex flex-wrap">
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
          <p className='subtitle text-[14px] md:text-[15px] text-[#676474] mt-2'>
            Crafting beautiful, functional, and <br />user-centered digital experiences <br />that solve real problems and delight users.
          </p>
        </div>
        <div ref={robotRef}>
          <Image src={robot} alt='Robot' className='robo relative 2xl:-top-20'/>
        </div>
      </div>
    </section>
  )
}

export default HeroSection;
