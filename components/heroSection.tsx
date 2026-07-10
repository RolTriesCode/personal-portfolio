'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import { ArrowDown, ArrowUpRight, FileText } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'

import robot from '@/public/robot.png'
import ResumeModal from './ResumeModal'
import LogoLoop from './ui/LogoLoop'

gsap.registerPlugin(ScrollTrigger, SplitText)

const techLogos = [
  { node: <SiReact />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
  {
    node: <SiTypescript />,
    title: 'TypeScript',
    href: 'https://www.typescriptlang.org',
  },
  {
    node: <SiTailwindcss />,
    title: 'Tailwind CSS',
    href: 'https://tailwindcss.com',
  },
]

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null)
  const robotRef = useRef<HTMLDivElement>(null)
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (reducedMotion) {
        gsap.set('[data-hero-reveal]', { autoAlpha: 1 })
        return
      }

      const nameSplit = new SplitText('[data-hero-title]', {
        type: 'chars',
        charsClass: 'hero-char',
      })

      const intro = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.12,
      })

      intro
        .fromTo(
          '[data-hero-meta]',
          { autoAlpha: 0, y: -10 },
          { autoAlpha: 1, y: 0, duration: 0.55 },
        )
        .fromTo(
          nameSplit.chars,
          { autoAlpha: 0, yPercent: 108, rotate: 2 },
          {
            autoAlpha: 1,
            yPercent: 0,
            rotate: 0,
            duration: 0.95,
            stagger: 0.025,
            ease: 'expo.out',
          },
          '-=0.28',
        )
        .fromTo(
          robotRef.current,
          { autoAlpha: 0, y: -70, rotate: -5, scale: 0.92 },
          {
            autoAlpha: 1,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 1.05,
            ease: 'back.out(1.25)',
          },
          '-=0.72',
        )
        .fromTo(
          '[data-hero-support]',
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.62,
            stagger: 0.08,
          },
          '-=0.55',
        )

      const media = gsap.matchMedia()

      media.add(
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {
          gsap.to(robotRef.current, {
            yPercent: 78,
            xPercent: -42,
            rotate: 12,
            scale: 0.92,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: '65% center',
              end: 'bottom top',
              scrub: 0.7,
            },
          })
        },
      )

      return () => {
        nameSplit.revert()
        media.revert()
      }
    },
    { scope: heroRef },
  )

  return (
    <>
      <section
        ref={heroRef}
        id="home"
        aria-labelledby="hero-title"
        className="relative isolate min-h-[100svh] overflow-hidden px-4 pb-8 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-10 lg:pt-36"
      >
        <div
          className="pointer-events-none absolute inset-x-4 top-24 border-t border-black/[0.08] sm:inset-x-6 sm:top-28 lg:inset-x-8 lg:top-32 dark:border-white/[0.1]"
          aria-hidden="true"
        />

        <div className="mx-auto flex min-h-[calc(100svh-9rem)] w-full max-w-7xl flex-col">
          <div
            data-hero-meta
            data-hero-reveal
            className="flex items-center justify-between gap-4 text-[11px] font-medium uppercase tracking-[0.16em] text-black/50 dark:text-white/50"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="relative flex size-2"
                aria-hidden="true"
              >
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-black opacity-20 motion-reduce:animate-none dark:bg-white" />
                <span className="relative inline-flex size-2 rounded-full bg-black dark:bg-white" />
              </span>
              Full Stack Developer
            </div>
            <span className="hidden sm:block">UI/UX Designer</span>
            <span className="font-mono text-[10px] tabular-nums">01 / Hero</span>
          </div>

          <div className="relative flex min-h-[24rem] flex-1 items-center py-10 sm:min-h-[30rem] lg:min-h-[32rem] lg:py-8">
            <h1
              id="hero-title"
              data-hero-title
              aria-label="Errol Tabangen"
              className="font-bebas relative z-10 w-full text-[clamp(6.75rem,19vw,17rem)] leading-[0.73] tracking-[-0.035em] text-black dark:text-white"
            >
              <span className="block overflow-hidden">ERROL</span>
              <span className="block overflow-hidden text-right">TABANGEN</span>
            </h1>

            <div
              ref={robotRef}
              className="pointer-events-none absolute right-[1%] top-[23%] z-20 w-[min(55vw,17rem)] will-change-transform sm:right-[7%] sm:top-[16%] sm:w-[min(42vw,22rem)] lg:right-[8%] lg:top-[6%] lg:w-[clamp(19rem,28vw,28rem)]"
              aria-hidden="true"
            >
              <div className="absolute inset-[18%] -z-10 rounded-full bg-black/[0.055] blur-3xl dark:bg-white/[0.055]" />
              <Image
                src={robot}
                alt=""
                priority
                sizes="(max-width: 640px) 55vw, (max-width: 1024px) 42vw, 28vw"
                className="h-auto w-full select-none object-contain drop-shadow-[0_24px_24px_rgba(0,0,0,0.16)] dark:drop-shadow-[0_24px_28px_rgba(0,0,0,0.55)]"
              />
            </div>
          </div>

          <div className="relative z-30 grid gap-8 border-t border-black/[0.1] pt-6 dark:border-white/[0.12] md:grid-cols-[1fr_0.85fr] md:items-end lg:grid-cols-[1fr_0.72fr]">
            <div data-hero-support data-hero-reveal>
              <p className="max-w-md text-balance text-[15px] leading-7 tracking-[-0.015em] text-black/55 dark:text-white/55 sm:text-base">
                Crafting beautiful, functional, and user-centered digital
                experiences that solve real problems and delight users.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="group inline-flex h-12 min-w-36 items-center justify-center gap-3 rounded-full bg-black px-5 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.025] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black active:scale-[0.98] md:cursor-none dark:bg-white dark:text-black dark:focus-visible:outline-white"
                >
                  Hire me
                  <ArrowUpRight
                    className="size-4 stroke-[1.8] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>

                <button
                  type="button"
                  onClick={() => setIsResumeOpen(true)}
                  className="group inline-flex h-12 min-w-36 items-center justify-center gap-3 rounded-full border border-black/[0.14] bg-white/50 px-5 text-sm font-medium text-black transition-[transform,background-color,border-color] duration-200 hover:scale-[1.025] hover:border-black/25 hover:bg-black/[0.035] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black active:scale-[0.98] md:cursor-none dark:border-white/[0.16] dark:bg-black/20 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/[0.06] dark:focus-visible:outline-white"
                >
                  <FileText
                    className="size-4 stroke-[1.7]"
                    aria-hidden="true"
                  />
                  Resume
                </button>
              </div>
            </div>

            <div
              data-hero-support
              data-hero-reveal
              className="flex items-end justify-between gap-6 md:flex-col md:items-stretch"
            >
              <div>
                <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-black/40 dark:text-white/40">
                  Core technologies
                </p>
                <div className="w-[min(100%,20rem)] overflow-hidden rounded-full border border-black/[0.1] bg-black/[0.025] px-4 py-2 text-black/65 dark:border-white/[0.12] dark:bg-white/[0.04] dark:text-white/65">
                  <LogoLoop
                    logos={techLogos}
                    speed={22}
                    direction="right"
                    logoHeight={20}
                    gap={24}
                    hoverSpeed={0}
                    scaleOnHover
                    ariaLabel="Core technologies"
                  />
                </div>
              </div>

              <a
                href="#about"
                aria-label="Scroll to the about section"
                className="group hidden w-fit items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-black/40 transition-colors hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:flex md:cursor-none dark:text-white/40 dark:hover:text-white dark:focus-visible:outline-white"
              >
                Explore
                <ArrowDown
                  className="size-3.5 stroke-[1.7] transition-transform duration-200 group-hover:translate-y-1"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </>
  )
}

export default HeroSection
