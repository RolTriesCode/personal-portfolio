'use client'

import { projects } from '@/lib/data'
import Image from 'next/image'
import { useRef } from 'react'

import { SectionHeading } from './ui/section-heading'
import { useSectionReveal } from './ui/use-section-reveal'

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
      data-reveal
      className="group border-t border-black/[0.1] pt-4 dark:border-white/[0.12]"
    >
      <div className="mb-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-black/35 dark:text-white/35">
        <span>Project {(index + 1).toString().padStart(2, '0')}</span>
        <time>{project.year}</time>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-black/[0.08] bg-neutral-100 dark:border-white/[0.1] dark:bg-neutral-900 sm:rounded-[1.75rem]">
        <Image
          src={project.src}
          alt={`${project.title} project preview`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/[0.04] dark:ring-white/[0.06]"
          aria-hidden="true"
        />
      </div>

      <div className="grid gap-4 py-5 sm:grid-cols-[0.72fr_1.28fr] sm:gap-8 sm:py-6">
        <h3 className="text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">
          {project.title}
        </h3>
        <div>
          <p className="text-sm leading-6 text-black/50 dark:text-white/50">
            {project.description}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2" aria-label={`${project.title} technologies`}>
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

  return (
    <section
      ref={sectionRef}
      id="project"
      aria-labelledby="projects-title"
      className="px-4 py-28 sm:px-6 sm:py-36 lg:px-8 lg:py-44"
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
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectSection
