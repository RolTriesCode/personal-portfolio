'use client'
import logo from '@/public/logo-portfolio.png'
import { useGSAP } from '@gsap/react'
import gsap from "gsap"
import Image from "next/image"
import { useRef, useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"

const NavBar = () => {
  const headerRef = useRef<HTMLDivElement | null>(null)
  const isMobile = useMediaQuery({ maxWidth: 767 })

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 }, 
        { opacity: 1, y: 0, delay: 1, duration: 0.8, ease: "power2.out" } 
      )
    }
  }, [])

  useGSAP(() => {
    const handleScroll = () => {
      if (!headerRef.current) return

      const width = window.scrollY > 50 ? (isMobile ? '90%' : '60%') : '100%'

      gsap.to(headerRef.current, {
        backgroundColor: window.scrollY > 50 ? '#DDE1E6' : 'transparent',
        width: width,
        duration: 0.8,
        ease: 'sine.out',
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  return (
    <header 
      className="fixed top-0 left-0 right-0 flex items-center justify-evenly z-50 w-full py-3"
    >
      <div ref={headerRef} className="header w-[100%] flex items-center justify-between py-2 px-5 rounded-[99px] flex-wrap opacity-[1%]">
        <div>
          <a href="#home" className='cursor-none'>
            <Image src={logo} alt="Logo" className="w-8 md:w-9 dark:invert-100"/>
          </a>
        </div>

        <nav className="flex items-center gap-4">
          <ul className="flex items-center gap-4 ">
            <li className="text-[14px] md:text-[15px] font-semibold "><a href="#home" className='cursor-none'>Home</a></li>
            <li className="text-[14px] md:text-[15px] font-semibold "><a href="#about" className=' cursor-none'>About</a></li>
            <li className="text-[14px] md:text-[15px] font-semibold "><a href="#skill" className=' cursor-none'>Skills</a></li>
            <li className="text-[14px] md:text-[15px] font-semibold "><a href="#project" className=' cursor-none'>Projects</a></li>
            <li className="hidden md:block bg-black/90 dark:bg-white  text-white dark:text-black px-3.5 py-1.5 rounded-[99px] text-[14px] md:text-[15px] font-semibold"><a href="#contact" className='cursor-none'>Contact Me</a></li>
          </ul>
          <div className="relative top-0.5">
            <AnimatedThemeToggler className='cursor-none active:cursor-none'/>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
