'use client'

import { Code2, ServerCog, Wrench } from 'lucide-react'
import { useRef } from 'react'

import { SectionHeading } from './ui/section-heading'
import { useSectionReveal } from './ui/use-section-reveal'

const skillGroups = [
  {
    number: '01',
    title: 'Frontend development',
    description:
      'Responsive, accessible interfaces with strong visual systems and thoughtful interaction design.',
    icon: Code2,
    skills: [
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Tailwind CSS',
      'Bootstrap',
      'HTML',
      'CSS',
    ],
  },
  {
    number: '02',
    title: 'Backend & data',
    description:
      'Practical server-side systems, integrations, authentication, and data layers built to support real products.',
    icon: ServerCog,
    skills: [
      'Node.js',
      'PHP',
      'Elysia',
      'MySQL',
      'MongoDB',
      'Firebase',
      'SQLite',
      'Better Auth',
      'Redis',
    ],
  },
  {
    number: '03',
    title: 'Tools & workflow',
    description:
      'A focused toolkit for prototyping, collaboration, version control, and polished web animation.',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'GSAP', 'Figma', 'Bootstrap'],
  },
]

const SkillSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  useSectionReveal(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="skill"
      aria-labelledby="skills-title"
      className="px-4 py-28 sm:px-6 sm:py-36 lg:px-8 lg:py-44"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="skills-title"
          index="03 / 07"
          eyebrow="Capabilities"
          title="A focused stack for complete digital products."
          description="From interface systems to backend logic, I choose tools for clarity, maintainability, and the experience they help create."
        />

        <div className="mt-16 grid gap-4 lg:mt-24 lg:grid-cols-3">
          {skillGroups.map((group) => {
            const Icon = group.icon

            return (
              <article
                key={group.title}
                data-reveal
                className="group flex min-h-[26rem] flex-col rounded-[1.75rem] border border-black/[0.1] bg-black/[0.015] p-6 transition-[transform,background-color,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-black/[0.18] hover:bg-white hover:shadow-[0_24px_60px_-40px_rgba(0,0,0,0.35)] dark:border-white/[0.12] dark:bg-white/[0.025] dark:hover:border-white/[0.2] dark:hover:bg-white/[0.04] dark:hover:shadow-[0_24px_60px_-40px_rgba(0,0,0,0.8)] sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <div className="grid size-11 place-items-center rounded-full border border-black/[0.12] dark:border-white/[0.14]">
                    <Icon className="size-4.5 stroke-[1.5]" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[10px] text-black/35 dark:text-white/35">
                    {group.number}
                  </span>
                </div>

                <h3 className="mt-12 text-xl font-semibold tracking-[-0.035em] sm:text-2xl">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-black/45 dark:text-white/45">
                  {group.description}
                </p>

                <ul className="mt-auto flex flex-wrap gap-2 pt-10" aria-label={`${group.title} technologies`}>
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-black/[0.1] px-3 py-1.5 text-[11px] font-medium text-black/55 transition-colors group-hover:border-black/[0.14] group-hover:text-black/70 dark:border-white/[0.12] dark:text-white/55 dark:group-hover:border-white/[0.17] dark:group-hover:text-white/75"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SkillSection
