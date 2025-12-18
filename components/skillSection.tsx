'use client'

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollTrigger)

const SkillSection = () => {

useGSAP(() => {
  gsap.from('.skilltext', {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#skill',  
      start: 'top 80%',
    }
  });

  gsap.from('.whatiuse', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#skill', 
      start: 'top 80%',
    }
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#skill',
      start: 'top 20%',
      end: 'bottom bottom',
      scrub: true,
    }
  });

  tl.fromTo(
    ['.cards1', '.cards2', '.cards3', '.cards4'],
    { y: 200, opacity: 0, scale: 0.90},
    {
      y: 0,
      scale: 1,
      opacity: 1,
      ease: 'sine.inOut',
      stagger: 1,
    }
  );
});


  return (
    <section id="skill" className="w-full h-screen flex flex-wrap mt-10 ">
      <div className="w-[90%] mx-auto lg:w-[35%] lg:pl-20 h-full">
        <div className="sticky top-20 ">  
          <p className='skilltext text-[12px] md:text-[14px] bg-[#DDE1E6] px-5 py-1 w-fit rounded-[3px] dark:text-black'>
            Tech Stack
          </p>
          <h3 className='whatiuse font-noto text-[56px] md:text-[66px] font-normal mt-4'>
            What I Use
          </h3>
        </div>
      </div>

      <div id="cards-div" className='w-[90%] lg:w-[65%] h-full mx-auto flex flex-col items-center gap-6'>
        <div className="cards1 h-[300px] w-[85%] bg-black dark:bg-white flex items-center justify-center rounded-[8px]">
          <h1 className="text-white dark:text-black">Frontend</h1>
          
        </div>
        <div className="cards2 h-[300px] w-[85%] bg-black dark:bg-white flex items-center justify-center rounded-[8px]">
          <h1 className="text-white dark:text-black">Backend</h1>
        </div>
        <div className="cards3 h-[300px] w-[85%] bg-black dark:bg-white flex items-center justify-center rounded-[8px]">
          <h1 className="text-white dark:text-black">Design</h1> 
        </div>
        <div className="cards4 h-[300px] w-[85%] bg-black dark:bg-white flex items-center justify-center rounded-[8px]">
          <h1 className="text-white dark:text-black">Design</h1> 
        </div>
      </div>
    </section>
  )
}

export default SkillSection
