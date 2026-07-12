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
    ],
  },
]

const SkillSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useSectionReveal(sectionRef)

  useGSAP(
    () => {
      const section = sectionRef.current
      const experience = experienceRef.current

      if (!section || !experience) return

      const chapters = gsap.utils.toArray<HTMLElement>(
        '[data-skill-chapter]',
        experience,
      )

      const navItems = gsap.utils.toArray<HTMLElement>(
        '[data-skill-nav]',
        experience,
      )

      const counters = gsap.utils.toArray<HTMLElement>(
        '[data-skill-counter]',
        experience,
      )

      const interactiveWords = gsap.utils.toArray<HTMLElement>(
        '[data-skill-word]',
        experience,
      )

      const mm = gsap.matchMedia()

      mm.add(
        {
          desktop: '(min-width: 1024px)',
          mobile: '(max-width: 1023px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const conditions = context.conditions as {
            desktop: boolean
            mobile: boolean
            reduceMotion: boolean
          }

          if (conditions.reduceMotion) {
            gsap.set(
              [
                chapters,
                navItems,
                counters,
                interactiveWords,
                '[data-skill-meta]',
              ],
              {
                clearProps: 'all',
              },
            )

            return
          }

          if (conditions.desktop) {
            chapters.forEach((chapter, index) => {
              gsap.set(chapter, {
                autoAlpha: index === 0 ? 1 : 0,
                yPercent: index === 0 ? 0 : 8,
                pointerEvents: index === 0 ? 'auto' : 'none',
              })
            })

            navItems.forEach((item, index) => {
              gsap.set(item, {
                opacity: index === 0 ? 1 : 0.28,
              })
            })

            counters.forEach((counter, index) => {
              gsap.set(counter, {
                autoAlpha: index === 0 ? 1 : 0,
                yPercent: index === 0 ? 0 : 70,
              })
            })

            const timeline = gsap.timeline({
              defaults: {
                ease: 'none',
              },
              scrollTrigger: {
                trigger: experience,
                start: 'top top',
                end: () =>
                  `+=${window.innerHeight * (skillGroups.length + 0.4)}`,
                pin: true,
                scrub: 0.8,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  if (!progressRef.current) return

                  gsap.set(progressRef.current, {
                    scaleX: self.progress,
                  })
                },
              },
            })

            chapters.forEach((chapter, index) => {
              if (index === 0) return

              const previousChapter = chapters[index - 1]
              const previousNav = navItems[index - 1]
              const currentNav = navItems[index]
              const previousCounter = counters[index - 1]
              const currentCounter = counters[index]

              const position = index

              timeline
                .to(
                  previousChapter,
                  {
                    autoAlpha: 0,
                    yPercent: -8,
                    pointerEvents: 'none',
                    duration: 0.3,
                  },
                  position,
                )
                .to(
                  previousNav,
                  {
                    opacity: 0.28,
                    duration: 0.2,
                  },
                  position,
                )
                .to(
                  previousCounter,
                  {
                    autoAlpha: 0,
                    yPercent: -70,
                    duration: 0.2,
                  },
                  position,
                )
                .fromTo(
                  chapter,
                  {
                    autoAlpha: 0,
                    yPercent: 8,
                    pointerEvents: 'none',
                  },
                  {
                    autoAlpha: 1,
                    yPercent: 0,
                    pointerEvents: 'auto',
                    duration: 0.4,
                  },
                  position + 0.08,
                )
                .to(
                  currentNav,
                  {
                    opacity: 1,
                    duration: 0.25,
                  },
                  position + 0.08,
                )
                .fromTo(
                  currentCounter,
                  {
                    autoAlpha: 0,
                    yPercent: 70,
                  },
                  {
                    autoAlpha: 1,
                    yPercent: 0,
                    duration: 0.3,
                  },
                  position + 0.08,
                )
            })
          }

          if (conditions.mobile) {
            gsap.from(chapters, {
              y: 60,
              autoAlpha: 0,
              duration: 0.85,
              stagger: 0.16,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: experience,
                start: 'top 80%',
                once: true,
              },
            })

            chapters.forEach((chapter) => {
              const words =
                chapter.querySelectorAll<HTMLElement>('[data-skill-word]')

              gsap.from(words, {
                y: 14,
                autoAlpha: 0,
                duration: 0.45,
                stagger: 0.035,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: chapter,
                  start: 'top 72%',
                  once: true,
                },
              })
            })
          }
        },
      )

      const cleanups = interactiveWords.map((word) => {
        const icon = word.querySelector<HTMLElement>('[data-skill-icon]')
        const line = word.querySelector<HTMLElement>('[data-skill-line]')

        const handleEnter = () => {
          gsap.to(word, {
            x: 8,
            duration: 0.35,
            ease: 'power3.out',
          })

          if (icon) {
            gsap.to(icon, {
              rotate: 8,
              scale: 1.08,
              duration: 0.35,
              ease: 'back.out(1.8)',
            })
          }

          if (line) {
            gsap.to(line, {
              scaleX: 1,
              duration: 0.45,
              ease: 'power3.out',
            })
          }
        }

        const handleLeave = () => {
          gsap.to(word, {
            x: 0,
            duration: 0.45,
            ease: 'power3.out',
          })

          if (icon) {
            gsap.to(icon, {
              rotate: 0,
              scale: 1,
              duration: 0.4,
              ease: 'power3.out',
            })
          }

          if (line) {
            gsap.to(line, {
              scaleX: 0,
              duration: 0.4,
              ease: 'power3.out',
            })
          }
        }

        word.addEventListener('pointerenter', handleEnter)
        word.addEventListener('pointerleave', handleLeave)

        return () => {
          word.removeEventListener('pointerenter', handleEnter)
          word.removeEventListener('pointerleave', handleLeave)
        }
      })

      return () => {
        cleanups.forEach((cleanup) => cleanup())
        mm.revert()
      }
    },
    {
      scope: sectionRef,
    },
  )

  return (
    <section
      ref={sectionRef}
      id="skill"
      aria-labelledby="skills-title"
      className="relative isolate overflow-hidden border-y border-black/[0.08] text-black dark:border-white/[0.09] dark:text-white"
    >
      <div className="px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-36 lg:px-8 lg:pb-32 lg:pt-44">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            id="skills-title"
            index="03 / 07"
            eyebrow="Capabilities"
            title="Tools are temporary. Craft is the constant."
            description="A focused collection of technologies for turning visual direction, product logic, and thoughtful motion into complete digital experiences."
          />
        </div>
      </div>

      <div
        ref={experienceRef}
        className="relative mx-auto min-h-screen max-w-[1600px] px-4 sm:px-6 lg:px-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-4 top-0 h-px bg-black/10 sm:inset-x-6 lg:inset-x-8 dark:bg-white/10"
        />

        <div className="hidden min-h-screen grid-cols-[minmax(14rem,0.72fr)_minmax(0,1.8fr)] lg:grid">
          <aside className="relative flex flex-col justify-between border-r border-black/10 py-16 pr-12 dark:border-white/10 xl:py-20 xl:pr-16">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
                Technical index
              </p>

              <nav
                className="mt-14 space-y-5"
                aria-label="Technology disciplines"
              >
                {skillGroups.map((group) => (
                  <div
                    key={group.number}
                    data-skill-nav
                    className="flex items-center gap-4"
                  >
                    <span className="font-mono text-[10px] tracking-[0.16em] text-black/45 dark:text-white/45">
                      {group.number}
                    </span>

                    <span className="text-sm font-medium tracking-[-0.025em]">
                      {group.title}
                    </span>
                  </div>
                ))}
              </nav>
            </div>

            <div data-skill-meta>
              <p className="max-w-[13rem] text-xs leading-5 text-black/45 dark:text-white/45">
                Selected technologies used across design, development, and
                production.
              </p>

              <div className="mt-7 flex items-end justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/35 dark:text-white/35">
                  Scroll to explore
                </span>

                <div className="relative h-12 w-14 overflow-hidden">
                  {skillGroups.map((group) => (
                    <span
                      key={group.number}
                      data-skill-counter
                      className="absolute inset-0 flex items-center justify-end text-4xl font-medium tracking-[-0.08em]"
                    >
                      {group.number}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="relative min-h-screen">
            {skillGroups.map((group) => {
              const GroupIcon = group.icon
              const titleId = `skill-${group.number}-title`

              return (
                <article
                  key={group.number}
                  data-skill-chapter
                  aria-labelledby={titleId}
                  className="absolute inset-0 flex min-h-screen flex-col overflow-y-auto py-14 pl-12 pr-2 xl:py-16 xl:pl-20"
                >
                  <header
                    data-skill-meta
                    className="flex shrink-0 items-start justify-between gap-12"
                  >
                    <div className="flex items-center gap-4">
                      <div className="grid size-11 place-items-center rounded-full border border-black/15 dark:border-white/15">
                        <GroupIcon
                          className="size-[1.1rem] stroke-[1.4]"
                          aria-hidden="true"
                        />
                      </div>

                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
                          {group.kicker}
                        </p>

                        <p className="mt-1 text-xs text-black/55 dark:text-white/55">
                          {group.metric}
                        </p>
                      </div>
                    </div>

                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/35 dark:text-white/35">
                      {group.skills.length.toString().padStart(2, '0')} tools
                    </span>
                  </header>

                  <div className="flex flex-1 items-center py-10 xl:py-12">
                    <div className="w-full">
                      <h3
                        id={titleId}
                        className="max-w-4xl text-[clamp(3.5rem,6.4vw,7.8rem)] font-medium leading-[0.82] tracking-[-0.085em]"
                      >
                        {group.title}
                      </h3>

                      <p className="mt-7 max-w-xl text-sm leading-6 text-black/52 dark:text-white/52 xl:text-base xl:leading-7">
                        {group.description}
                      </p>

                      <ul
                        className="mt-10 grid max-w-5xl grid-cols-2 border-t border-black/10 xl:mt-12 xl:grid-cols-3 dark:border-white/10"
                        aria-label={`${group.title} technologies`}
                      >
                        {group.skills.map((skill, index) => {
                          const SkillIcon = skill.icon

                          return (
                            <li
                              key={skill.name}
                              data-skill-word
                              className={`
                                group relative flex min-h-20 cursor-default items-center gap-4
                                overflow-hidden border-b border-black/10 py-3 pr-5
                                transition-colors duration-500 dark:border-white/10
                                ${index % 2 === 0 ? 'border-r' : ''}
                                ${
                                  index % 3 !== 2
                                    ? 'xl:border-r'
                                    : 'xl:border-r-0'
                                }
                              `}
                            >
                              <div
                                data-skill-line
                                aria-hidden="true"
                                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-black dark:bg-white"
                              />

                              <div
                                data-skill-icon
                                className={`
                                  grid size-9 shrink-0 place-items-center rounded-full border
                                  transition-colors duration-500
                                  ${
                                    skill.emphasis
                                      ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                                      : 'border-black/15 text-black/55 group-hover:border-black/30 group-hover:text-black dark:border-white/15 dark:text-white/55 dark:group-hover:border-white/30 dark:group-hover:text-white'
                                  }
                                `}
                              >
                                <SkillIcon
                                  className="size-3.5 stroke-[1.5]"
                                  aria-hidden="true"
                                />
                              </div>

                              <span
                                className={`
                                  text-[clamp(1rem,1.35vw,1.25rem)] tracking-[-0.045em]
                                  ${
                                    skill.emphasis
                                      ? 'font-semibold'
                                      : 'font-medium text-black/65 dark:text-white/65'
                                  }
                                `}
                              >
                                {skill.name}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <div className="space-y-28 pb-28 pt-10 sm:space-y-36 sm:pb-36 lg:hidden">
          {skillGroups.map((group) => {
            const GroupIcon = group.icon
            const titleId = `mobile-skill-${group.number}-title`

            return (
              <article
                key={group.number}
                data-skill-chapter
                aria-labelledby={titleId}
              >
                <header className="flex items-start justify-between border-t border-black/10 pt-5 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <GroupIcon
                      className="size-4 stroke-[1.45]"
                      aria-hidden="true"
                    />

                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/45 dark:text-white/45">
                      {group.kicker}
                    </span>
                  </div>

                  <span className="font-mono text-[10px] tracking-[0.16em] text-black/40 dark:text-white/40">
                    {group.number}
                  </span>
                </header>

                <div className="py-12 sm:py-16">
                  <h3
                    id={titleId}
                    className="max-w-[11ch] text-[clamp(3.3rem,13vw,6.5rem)] font-medium leading-[0.84] tracking-[-0.08em]"
                  >
                    {group.title}
                  </h3>

                  <p className="mt-7 max-w-xl text-sm leading-6 text-black/52 dark:text-white/52 sm:text-base sm:leading-7">
                    {group.description}
                  </p>

                  <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-black/35 dark:text-white/35">
                    {group.metric}
                  </p>

                  <ul
                    className="mt-10 border-t border-black/10 dark:border-white/10"
                    aria-label={`${group.title} technologies`}
                  >
                    {group.skills.map((skill, index) => {
                      const SkillIcon = skill.icon

                      return (
                        <li
                          key={skill.name}
                          data-skill-word
                          className="group relative flex min-h-[4.75rem] items-center justify-between overflow-hidden border-b border-black/10 dark:border-white/10"
                        >
                          <div
                            data-skill-line
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-black dark:bg-white"
                          />

                          <div className="flex items-center gap-4">
                            <span className="w-5 font-mono text-[9px] text-black/30 dark:text-white/30">
                              {(index + 1).toString().padStart(2, '0')}
                            </span>

                            <span
                              className={`
                                text-lg tracking-[-0.045em] sm:text-xl
                                ${
                                  skill.emphasis
                                    ? 'font-semibold'
                                    : 'font-medium text-black/65 dark:text-white/65'
                                }
                              `}
                            >
                              {skill.name}
                            </span>
                          </div>

                          <div
                            data-skill-icon
                            className={`
                              grid size-9 place-items-center rounded-full border
                              ${
                                skill.emphasis
                                  ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                                  : 'border-black/15 text-black/50 dark:border-white/15 dark:text-white/50'
                              }
                            `}
                          >
                            <SkillIcon
                              className="size-3.5 stroke-[1.5]"
                              aria-hidden="true"
                            />
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-4 bottom-0 hidden h-px overflow-hidden bg-black/10 sm:inset-x-6 lg:inset-x-8 lg:block dark:bg-white/10"
        >
          <div
            ref={progressRef}
            className="h-full origin-left scale-x-0 bg-black dark:bg-white"
          />
        </div>
      </div>
    </section>
  )
}

export default SkillSection