'use client'

import { ArrowDownRight } from 'lucide-react'
import { useRef } from 'react'

import { SectionHeading } from './ui/section-heading'
import { useSectionReveal } from './ui/use-section-reveal'

const principles = [
  {
    number: '01',
    title: 'Design with purpose',
    text: 'Every interface decision should make the experience clearer, easier, or more meaningful.',
  },
  {
    number: '02',
    title: 'Build for real use',
    text: 'I turn ideas into responsive, accessible products that remain practical beyond the first impression.',
  },
  {
    number: '03',
    title: 'Keep improving',
    text: 'Curiosity, iteration, and disciplined problem-solving shape both my process and the work I ship.',
  },
]

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  useSectionReveal(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-title"
      className="px-4 py-28 sm:px-6 sm:py-36 lg:px-8 lg:py-44"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="about-title"
          index="02 / 07"
          eyebrow="About"
          title="Design-minded development, built around people."
          description="I work where thoughtful visual design meets dependable engineering—shaping digital products that feel intuitive from the first interaction."
        />

        <div className="mt-20 grid gap-14 md:grid-cols-[0.7fr_1.3fr] md:gap-10 lg:mt-28">
          <div data-reveal className="md:sticky md:top-32 md:self-start">
            <div className="flex size-12 items-center justify-center rounded-full border border-black/[0.12] dark:border-white/[0.14]">
              <ArrowDownRight
                className="size-5 stroke-[1.5]"
                aria-hidden="true"
              />
            </div>
            <p className="mt-5 max-w-xs text-xs leading-5 text-black/40 dark:text-white/40">
              Full-stack developer and UI/UX designer based in Vigan City,
              Philippines.
            </p>
          </div>

          <div>
            <p
              data-reveal
              className="max-w-3xl text-pretty text-[clamp(1.7rem,3.4vw,3.35rem)] leading-[1.12] tracking-[-0.045em]"
            >
              I&apos;m Errol—a builder of interfaces who bridges the gap between
              design and development, turning ideas into functional and
              engaging digital experiences.
            </p>

            <p
              data-reveal
              className="mt-8 max-w-2xl text-[15px] leading-7 text-black/50 dark:text-white/50"
            >
              With experience across frontend and backend technologies, I
              focus on creating work that is efficient, scalable, accessible,
              and genuinely enjoyable to use. I care about the details, but
              always in service of the larger experience.
            </p>

            <div className="mt-16 border-t border-black/[0.1] dark:border-white/[0.12]">
              {principles.map((principle) => (
                <article
                  key={principle.number}
                  data-reveal
                  className="group grid gap-3 border-b border-black/[0.1] py-6 transition-colors hover:bg-black/[0.02] dark:border-white/[0.12] dark:hover:bg-white/[0.025] sm:grid-cols-[4rem_0.75fr_1.25fr] sm:items-start sm:gap-6"
                >
                  <span className="font-mono text-[10px] text-black/35 dark:text-white/35">
                    {principle.number}
                  </span>
                  <h3 className="text-sm font-semibold tracking-[-0.02em]">
                    {principle.title}
                  </h3>
                  <p className="max-w-md text-sm leading-6 text-black/45 dark:text-white/45">
                    {principle.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
