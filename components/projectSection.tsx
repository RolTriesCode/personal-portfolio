

'use client'
import Image from "next/image"
import vigEnture from '@/public/vigEnture.jpg'
import ignis from '@/public/ignis.jpg'
import mojita from '@/public/mojita.jpg'
import flameAble from '@/public/flameAble.png'
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import Link from "next/link"




const projects = [
  {
    src: vigEnture,
    title: "VigEnture",
    description: "A project about venture tracking."
  },
  {
    src: ignis,
    title: "Ignis",
    description: "An innovative web application."
  },
  {
    src: mojita,
    title: "Mojita",
    description: "A refreshing cocktail app."
  },
  {
    src: flameAble,
    title: "FlameAble",
    description: "A creative flame-themed app."
  }
];


const ProjectCard = ({ src, title, description }: any) => (
  <div className="relative group">
    <div className="overflow-hidden rounded-[8px] border border-white/50">
      <Image
        src={src}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-200 ease-linear rounded-[8px] group-hover:scale-105"
      />
    </div>


    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all duration-300 text-justify ">

      <div className="relative z-10 text-white">
        <h4 className="font-semibold text-[18px] md:text-[20px] font-inter tracking-wider font-medium">{title}</h4>
        <button className="mt-2 flex items-center justify-center text-[14px] md:text-[15px] group">
          Learn more
          <svg className="group-hover:translate-x-2 transition-all duration-300 ease-linear" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.5 12h15m0 0l-5.625-6m5.625 6l-5.625 6" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);


const ProjectSection = () => {

  useGSAP(() => {
    gsap.fromTo('.proj1',
      { x: -200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.6,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: '.proj1',
          start: 'top 50%',
        },
      }
    );

    gsap.fromTo('.proj2',
      { x: 200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.8,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: '.proj2',
          start: 'top 30%',
        },
      }
    );

    gsap.fromTo('.proj3',
      { x: -200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: '.proj3',
          start: 'top 70%',
        },
      }
    );

    gsap.fromTo('.proj4',
      { x: 200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 1.2,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: '.proj4',
          start: 'top 40%',
        },
      }
    );


    gsap.from('.skilltext1', {
      opacity: 0,
      y: 40,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.skilltext1',
        start: 'top 50%',
      }
    });

    gsap.from('.whatiuse1', {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.whatiuse1',
        start: 'top 40%',
      }
    });

  });








  return (
    <section id="project" className="mt-300 md:mt-300 lg:mt-50 mb-30 py-40 overflow-x-hidden">
      <div className="flex items-center justify-center flex-col">
        <p className='skilltext1 text-[12px] md:text-[14px] bg-[#DDE1E6] px-5 py-1 w-fit rounded-[3px] dark:text-black'>
          Latest Projects
        </p>
        <h3 className='whatiuse1 font-noto text-[56px] md:text-[66px] font-normal mt-4 text-black dark:text-white'>
          What I Develop
        </h3>
      </div>
      <div className="mt-12">
        <div className="flex flex-wrap md:flex-nowrap gap-4 lg:gap-15 w-[90%] mx-auto">

          <div className="proj1">
            <ProjectCard {...projects[0]} />
          </div>
          <div className="proj2">
            <ProjectCard {...projects[1]} />
          </div>

        </div>
        <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-10 w-[90%] mx-auto">

          <div className="proj3 mt-4 md:mt-14 lg:mt-20 md:w-[63.5%] lg:w-[64%]">
            <ProjectCard {...projects[2]} />
          </div>
          <div className="proj4 w-[100%] md:w-[36.5%] lg:w-[36%] lg:mt-0">
            <ProjectCard {...projects[3]} />
          </div>

        </div>


      </div>


      <div>
        <Link href="/projects" className="flex items-center justify-center mt-10 group border-b border-transparent hover:border-[#676474] transition-all duration-200 ease-linear w-fit mx-auto cursor-none">
          <p className="text-[#676474] text-[12px] md:text-[14px]">View All Projects</p>
          <svg className="group-hover:translate-x-1 transition-all duration-200 ease-linear" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24"><path fill="none" stroke="#676474" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} d="m10 17l5-5l-5-5"></path></svg>
        </Link>
      </div>

    </section>
  )
}

export default ProjectSection