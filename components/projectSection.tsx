'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { projects } from '@/lib/data'
import { SectionHeading } from './ui/section-heading'
import { useSectionReveal } from './ui/use-section-reveal'

gsap.registerPlugin(ScrollTrigger)

type Project = (typeof projects)[number]

function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  return (
    <article
      data-project-card
      className="group border-t border-black/[0.1] pt-4 dark:border-white/[0.12]"
    >
      <div
        data-project-meta
        className="mb-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-black/35 dark:text-white/35"
      >
        <span>Project {(index + 1).toString().padStart(2, '0')}</span>
        <time>{project.year}</time>
      </div>

      <div
        data-project-media
        className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-black/[0.08] bg-neutral-100 dark:border-white/[0.1] dark:bg-neutral-900 sm:rounded-[1.75rem]"
      >
        <div data-project-image className="absolute inset-0 scale-[1.08]">
          <Image
            src={project.src}
            alt={`${project.title} project preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/[0.04] dark:ring-white/[0.06]"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/[0.025] dark:group-hover:bg-white/[0.015]"
          aria-hidden="true"
        />
      </div>

      <div
        data-project-content
        className="grid gap-4 py-5 sm:grid-cols-[0.72fr_1.28fr] sm:gap-8 sm:py-6"
      >
        <h3 className="text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">
          {project.title}
        </h3>

        <div>
          <p className="text-sm leading-6 text-black/50 dark:text-white/50">
            {project.description}
          </p>

          <ul
            className="mt-4 flex flex-wrap gap-x-4 gap-y-2"
            aria-label={`${project.title} technologies`}
          >
            {project.tech.map((technology) => (
              <li
                key={technology}
                className="text-[10px] font-medium uppercase tracking-[0.12em] text-black/35 dark:text-white/35"
              >
                {technology}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

const ProjectSection = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useSectionReveal(sectionRef)

  const visibleProjects = projects.slice(0, 4)

  useLayoutEffect(() => {
    const section = sectionRef.current

    if (!section) return

    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add(
        {
          animate: '(prefers-reduced-motion: no-preference)',
          desktop:
            '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
          reducedMotion: '(prefers-reduced-motion: reduce)',
        },
        (mediaContext) => {
          const { animate, desktop, reducedMotion } =
            mediaContext.conditions as {
              animate: boolean
              desktop: boolean
              reducedMotion: boolean
            }

          const cards = gsap.utils.toArray<HTMLElement>(
            '[data-project-card]',
            section,
          )

          if (reducedMotion) {
            gsap.set(cards, {
              clearProps: 'all',
            })

            gsap.set(
              '[data-project-meta], [data-project-media], [data-project-content], [data-project-image]',
              {
                clearProps: 'all',
              },
            )

            return
          }

          if (!animate) return

          cards.forEach((card, index) => {
            const metadata = card.querySelector('[data-project-meta]')
            const mediaElement = card.querySelector('[data-project-media]')
            const image = card.querySelector('[data-project-image]')
            const content = card.querySelector('[data-project-content]')

            const direction = index % 2 === 0 ? -1 : 1

            const revealTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: 'top 82%',
                end: 'top 52%',
                toggleActions: 'play none none reverse',
              },
            })

            revealTimeline
              .from(card, {
                opacity: 0,
                y: 56,
                duration: 0.9,
                ease: 'power3.out',
              })
              .from(
                metadata,
                {
                  opacity: 0,
                  y: 12,
                  duration: 0.5,
                  ease: 'power2.out',
                },
                0.1,
              )
              .from(
                mediaElement,
                {
                  opacity: 0,
                  y: 30,
                  rotate: direction * 0.6,
                  scale: 0.97,
                  duration: 1,
                  ease: 'power3.out',
                },
                0.15,
              )
              .from(
                content,
                {
                  opacity: 0,
                  y: 24,
                  duration: 0.75,
                  ease: 'power3.out',
                },
                0.3,
              )

            if (desktop && image) {
              gsap.fromTo(
                image,
                {
                  yPercent: -6,
                },
                {
                  yPercent: 6,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: mediaElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                  },
                },
              )
            }
          })

          return () => {
            gsap.set(cards, {
              clearProps: 'transform,opacity',
            })
          }
        },
      )

      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })

      return () => {
        media.revert()
      }
    }, section)

    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('load', refreshScrollTrigger)

    return () => {
      window.removeEventListener('load', refreshScrollTrigger)
      context.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="project"
      aria-labelledby="projects-title"
      className="overflow-hidden px-4 py-28 sm:px-6 sm:py-36 lg:px-8 lg:py-44"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="projects-title"
          index="05 / 07"
          eyebrow="Selected work"
          title="Products shaped from idea to interface."
          description="A selection of recent projects spanning product design, full-stack development, data-rich tools, and interaction-led experiences."
        />

        <div className="mt-16 grid gap-x-5 gap-y-14 md:grid-cols-2 lg:mt-24 lg:gap-x-7 lg:gap-y-20">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectSection