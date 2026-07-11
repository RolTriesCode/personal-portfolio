'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Braces,
  Code2,
  Database,
  Figma,
  GitBranch,
  Layers2,
  ServerCog,
  Sparkles,
  Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useRef } from 'react'

import { SectionHeading } from './ui/section-heading'
import { useSectionReveal } from './ui/use-section-reveal'

gsap.registerPlugin(ScrollTrigger)

type Skill = {
  name: string
  icon: LucideIcon
  emphasis?: boolean
}

type SkillGroup = {
  number: string
  title: string
  kicker: string
  description: string
  icon: LucideIcon
  metric: string
  skills: Skill[]
}

const skillGroups: SkillGroup[] = [
  {
    number: '01',
    title: 'Frontend systems',
    kicker: 'Interface craft',
    description:
      'Accessible, responsive product interfaces with precise layouts, deliberate motion, and maintainable component systems.',
    icon: Code2,
    metric: 'Design to production',
    skills: [
      { name: 'React', icon: Layers2, emphasis: true },
      { name: 'Next.js', icon: Sparkles, emphasis: true },
      { name: 'TypeScript', icon: Braces, emphasis: true },
      { name: 'Tailwind CSS', icon: Code2 },
      { name: 'JavaScript', icon: Braces },
      { name: 'HTML', icon: Code2 },
      { name: 'CSS', icon: Code2 },
      { name: 'Bootstrap', icon: Layers2 },
    ],
  },
  {
    number: '02',
    title: 'Backend & data',
    kicker: 'Product logic',
    description:
      'Practical server-side foundations for authentication, API workflows, storage, and data models that support real use cases.',
    icon: ServerCog,
    metric: 'APIs, auth, persistence',
    skills: [
      { name: 'Node.js', icon: ServerCog, emphasis: true },
      { name: 'PHP', icon: Code2 },
      { name: 'Elysia', icon: ServerCog },
      { name: 'MySQL', icon: Database, emphasis: true },
      { name: 'MongoDB', icon: Database },
      { name: 'Firebase', icon: Database },
      { name: 'SQLite', icon: Database },
      { name: 'Better Auth', icon: ServerCog },
      { name: 'Redis', icon: Database },
    ],
  },
  {
    number: '03',
    title: 'Tools & motion',
    kicker: 'Workflow polish',
    description:
      'A focused toolchain for prototyping, version control, visual direction, and restrained animation that improves usability.',
    icon: Wrench,
    metric: 'Prototype to refinement',
    skills: [
      { name: 'Git', icon: GitBranch, emphasis: true },
      { name: 'GitHub', icon: GitBranch },
      { name: 'GSAP', icon: Sparkles, emphasis: true },
      { name: 'Figma', icon: Figma, emphasis: true },
      { name: 'Bootstrap', icon: Layers2 },
    ],
  },
]

const SkillSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  useSectionReveal(sectionRef)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (reducedMotion) {
        gsap.set('[data-skill-card], [data-skill-chip], [data-skill-orbit]', {
          clearProps: 'all',
        })
        return
      }

      gsap.from('[data-skill-chip]', {
        autoAlpha: 0,
        y: 10,
        duration: 0.45,
        ease: 'power2.out',
        stagger: 0.018,
        scrollTrigger: {
          trigger: section,
          start: 'top 68%',
          once: true,
        },
      })

      gsap.to('[data-skill-orbit]', {
        yPercent: -18,
        rotate: 2,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      })

      const cards = gsap.utils.toArray<HTMLElement>('[data-skill-card]')
      const cleanups: Array<() => void> = []

      cards.forEach((card) => {
        const icon = card.querySelector<HTMLElement>('[data-skill-card-icon]')
        const rule = card.querySelector<HTMLElement>('[data-skill-rule]')

        const enter = () => {
          gsap.to(icon, {
            y: -3,
            scale: 1.04,
            duration: 0.28,
            ease: 'power2.out',
          })
          gsap.to(rule, {
            scaleX: 1,
            duration: 0.38,
            ease: 'power3.out',
          })
        }

        const leave = () => {
          gsap.to(icon, {
            y: 0,
            scale: 1,
            duration: 0.34,
            ease: 'power2.out',
          })
          gsap.to(rule, {
            scaleX: 0.18,
            duration: 0.42,
            ease: 'power3.out',
          })
        }

        card.addEventListener('pointerenter', enter)
        card.addEventListener('pointerleave', leave)

        cleanups.push(() => {
          card.removeEventListener('pointerenter', enter)
          card.removeEventListener('pointerleave', leave)
        })
      })

      return () => {
        cleanups.forEach((cleanup) => cleanup())
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="skill"
      aria-labelledby="skills-title"
      className="relative isolate overflow-hidden px-4 py-28 sm:px-6 sm:py-36 lg:px-8 lg:py-44"
    >
      <div
        data-skill-orbit
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8rem] top-24 hidden size-[24rem] rounded-full border border-black/[0.045] dark:border-white/[0.06] lg:block"
      />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="skills-title"
          index="03 / 07"
          eyebrow="Capabilities"
          title="A focused stack for complete digital products."
          description="From interface systems to backend logic, I choose tools for clarity, maintainability, and the experience they help create."
        />

        <div className="mt-14 grid gap-3 sm:mt-16 lg:mt-24 lg:grid-cols-3 lg:gap-4">
          {skillGroups.map((group) => {
            const Icon = group.icon
            const titleId = `skill-${group.number}-title`
            const descriptionId = `skill-${group.number}-description`

            return (
              <article
                key={group.title}
                data-reveal
                data-skill-card
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                className="
                  group relative flex min-h-[28rem] flex-col overflow-hidden rounded-[1.75rem]
                  border border-black/[0.08] bg-[#f7f7f5]/80 p-5
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]
                  transition-[transform,border-color,background-color,box-shadow] duration-500
                  ease-[cubic-bezier(0.16,1,0.3,1)]
                  hover:-translate-y-1 hover:border-black/[0.16] hover:bg-white
                  hover:shadow-[0_28px_70px_-52px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.95)]
                  sm:p-6
                  lg:min-h-[31rem]
                  dark:border-white/[0.1] dark:bg-white/[0.025] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
                  dark:hover:border-white/[0.18] dark:hover:bg-white/[0.045]
                  dark:hover:shadow-[0_28px_70px_-52px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.06)]
                "
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-5 top-0 h-px bg-black/[0.08] dark:bg-white/[0.1]"
                />

                <div className="flex items-start justify-between gap-6">
                  <div
                    data-skill-card-icon
                    className="
                      grid size-12 place-items-center rounded-2xl border border-black/[0.1]
                      bg-white text-black shadow-[0_10px_30px_-24px_rgba(0,0,0,0.55)]
                      transition-colors duration-500 group-hover:border-black/[0.16]
                      dark:border-white/[0.12] dark:bg-black dark:text-white
                      dark:group-hover:border-white/[0.2]
                    "
                  >
                    <Icon className="size-5 stroke-[1.45]" aria-hidden="true" />
                  </div>

                  <div className="text-right">
                    <span className="block font-mono text-[10px] leading-none tracking-[0.18em] text-black/35 dark:text-white/35">
                      {group.number}
                    </span>
                    <span className="mt-2 block text-[11px] font-medium tracking-[-0.01em] text-black/45 dark:text-white/45">
                      {group.kicker}
                    </span>
                  </div>
                </div>

                <div className="mt-14 sm:mt-16">
                  <div
                    data-skill-rule
                    aria-hidden="true"
                    className="mb-6 h-px w-24 origin-left scale-x-[0.18] bg-black transition-colors dark:bg-white"
                  />

                  <h3
                    id={titleId}
                    className="max-w-[13rem] text-2xl font-semibold leading-[0.98] tracking-[-0.055em] text-black sm:text-[1.7rem] dark:text-white"
                  >
                    {group.title}
                  </h3>

                  <p
                    id={descriptionId}
                    className="mt-4 max-w-[27rem] text-sm leading-6 text-black/52 dark:text-white/52"
                  >
                    {group.description}
                  </p>
                </div>

                <div className="mt-7 rounded-2xl border border-black/[0.07] bg-white/55 p-4 dark:border-white/[0.08] dark:bg-black/20">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/35 dark:text-white/35">
                    {group.metric}
                  </p>

                  <ul
                    className="mt-4 grid grid-cols-2 gap-2"
                    aria-label={`${group.title} technologies`}
                  >
                    {group.skills.map((skill) => {
                      const SkillIcon = skill.icon

                      return (
                        <li
                          key={skill.name}
                          data-skill-chip
                          className={`
                            flex min-h-10 items-center gap-2 rounded-xl border px-2.5
                            text-[12px] font-medium tracking-[-0.015em]
                            transition-[border-color,background-color,color,transform] duration-300
                            group-hover:translate-y-0
                            ${
                              skill.emphasis
                                ? 'border-black/[0.12] bg-black text-white dark:border-white/[0.16] dark:bg-white dark:text-black'
                                : 'border-black/[0.075] bg-white/70 text-black/58 group-hover:border-black/[0.12] group-hover:text-black dark:border-white/[0.085] dark:bg-white/[0.035] dark:text-white/58 dark:group-hover:border-white/[0.14] dark:group-hover:text-white'
                            }
                          `}
                        >
                          <SkillIcon
                            className="size-3.5 shrink-0 stroke-[1.55]"
                            aria-hidden="true"
                          />
                          <span className="truncate">{skill.name}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-between border-t border-black/[0.07] pt-4 text-[10px] uppercase tracking-[0.16em] text-black/35 dark:border-white/[0.08] dark:text-white/35">
                    <span>Selected stack</span>
                    <span>{group.skills.length.toString().padStart(2, '0')}</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SkillSection
