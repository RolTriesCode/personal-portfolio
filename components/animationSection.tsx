'use client'

import { Asterisk } from 'lucide-react'
import { useRef } from 'react'

import { useSectionReveal } from './ui/use-section-reveal'

const traits = ['Creative', 'Passionate', 'Disciplined']

const AnimationSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  useSectionReveal(sectionRef)

  return (
    <section
      ref={sectionRef}
      aria-label="Creative principles"
      className="px-2 py-8 sm:px-4 lg:px-6"
    >
      <div className="mx-auto max-w-[96rem] overflow-hidden rounded-[2rem] bg-neutral-950 px-5 py-8 text-white sm:px-8 sm:py-10 lg:rounded-[2.5rem] lg:px-12 lg:py-12 dark:bg-white dark:text-black">
        <div
          data-reveal="card"
          className="mb-10 flex items-center justify-between border-b border-white/15 pb-5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/45 dark:border-black/15 dark:text-black/45"
        >
          <span>How I approach the work</span>
          <Asterisk className="size-4 stroke-[1.5]" aria-hidden="true" />
        </div>

        <div data-reveal-group data-reveal-stagger="0.11">
          {traits.map((trait, index) => (
            <div
              key={trait}
              data-reveal-item
              data-motion-hover="5"
              className="group flex items-center justify-between gap-4 border-b border-white/15 py-3 last:border-b-0 dark:border-black/15 sm:py-4"
            >
              <span className="font-mono text-[10px] text-white/35 dark:text-black/35">
                0{index + 1}
              </span>
              <p className="font-bebas text-[clamp(4.5rem,13vw,13rem)] leading-[0.82] tracking-[-0.025em] transition-transform duration-500 ease-out group-hover:-translate-x-3 sm:group-hover:-translate-x-5">
                {trait}
              </p>
            </div>
          ))}
        </div>

        <p
          data-reveal="text"
          className="ml-auto mt-8 max-w-sm text-right text-xs leading-5 text-white/45 dark:text-black/45"
        >
          Different strengths, one standard: thoughtful work executed with
          care.
        </p>
      </div>
    </section>
  )
}

export default AnimationSection
