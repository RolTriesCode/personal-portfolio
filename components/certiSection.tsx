'use client'

import { certificates } from '@/lib/certificates'
import { Award } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

import { SectionHeading } from './ui/section-heading'
import { useSectionReveal } from './ui/use-section-reveal'

const CertiSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  useSectionReveal(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="certifications"
      aria-labelledby="certifications-title"
      className="overflow-hidden px-4 py-28 sm:px-6 sm:py-36 lg:px-8 lg:py-44"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="certifications-title"
          index="04 / 07"
          eyebrow="Credentials"
          title="Learning, applied and verified."
          description="A selection of completed training across modern web development, programming fundamentals, databases, and professional communication."
        />

        <div data-reveal className="mt-14 flex items-center justify-between lg:mt-20">
          <div className="flex items-center gap-2 text-xs text-black/40 dark:text-white/40">
            <Award className="size-4 stroke-[1.5]" aria-hidden="true" />
            <span>{certificates.length} certificates</span>
          </div>
          <p className="hidden text-[10px] uppercase tracking-[0.16em] text-black/35 dark:text-white/35 sm:block">
            Scroll to explore
          </p>
        </div>

        <div
          data-reveal
          tabIndex={0}
          aria-label="Certificates. Scroll horizontally to browse."
          className="-mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:-mx-8 lg:gap-5 lg:px-8 dark:focus-visible:outline-white [&::-webkit-scrollbar]:hidden"
        >
          {certificates.map((certificate, index) => (
            <article
              key={certificate.id}
              className="group flex w-[82vw] max-w-[26rem] shrink-0 snap-start flex-col overflow-hidden rounded-[1.5rem] border border-black/[0.1] bg-black/[0.015] transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-black/[0.18] hover:bg-white hover:shadow-[0_24px_60px_-42px_rgba(0,0,0,0.4)] dark:border-white/[0.12] dark:bg-white/[0.025] dark:hover:border-white/[0.2] dark:hover:bg-white/[0.045]"
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b border-black/[0.08] bg-neutral-100 dark:border-white/[0.1] dark:bg-neutral-900">
                <Image
                  src={certificate.image}
                  alt={`${certificate.title} certificate issued by ${certificate.issuer}`}
                  fill
                  sizes="(max-width: 640px) 82vw, 416px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
                <span className="absolute left-4 top-4 rounded-full border border-black/[0.1] bg-white/90 px-2.5 py-1 font-mono text-[9px] text-black/60 backdrop-blur-md">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.12em] text-black/35 dark:text-white/35">
                  <span>{certificate.issuer}</span>
                  <time>{certificate.date}</time>
                </div>
                <h3 className="mt-5 text-lg font-semibold leading-snug tracking-[-0.03em] sm:text-xl">
                  {certificate.title}
                </h3>
                <p className="mt-3 text-xs leading-5 text-black/45 dark:text-white/45">
                  {certificate.description}
                </p>

                <ul className="mt-auto flex flex-wrap gap-1.5 pt-7" aria-label="Verified skills">
                  {certificate.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-black/[0.1] px-2.5 py-1 text-[9px] text-black/45 dark:border-white/[0.12] dark:text-white/45"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CertiSection
