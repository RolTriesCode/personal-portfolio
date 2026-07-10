'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { Award, ArrowDownRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { certificates } from '@/lib/certificates'
import { SectionHeading } from './ui/section-heading'
import { useSectionReveal } from './ui/use-section-reveal'

gsap.registerPlugin(ScrollTrigger)

const CertiSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useSectionReveal(sectionRef)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const track = trackRef.current
    const progress = progressRef.current

    if (!section || !pin || !track || !progress) return

    const context = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add('(min-width: 1024px)', () => {
        const getScrollDistance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth)

        gsap.set(track, {
          x: 0,
          willChange: 'transform',
        })

        gsap.set(progress, {
          scaleX: 0,
          transformOrigin: 'left center',
        })

        const horizontalTween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(progress, {
                scaleX: self.progress,
              })
            },
          },
        })

        return () => {
          horizontalTween.kill()
          gsap.set(track, {
            clearProps: 'transform,willChange',
          })
          gsap.set(progress, {
            clearProps: 'transform',
          })
        }
      })

      media.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(track, {
          clearProps: 'transform,willChange',
        })

        gsap.set(progress, {
          scaleX: 1,
        })
      })

      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })

      return () => {
        media.revert()
      }
    }, section)

    const handleLoad = () => ScrollTrigger.refresh()

    window.addEventListener('load', handleLoad)

    return () => {
      window.removeEventListener('load', handleLoad)
      context.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="certifications"
      aria-labelledby="certifications-title"
      className="relative overflow-hidden"
    >
      <div ref={pinRef} className="relative lg:h-screen lg:min-h-[46rem]">
        <div className="mx-auto flex h-full max-w-[100rem] flex-col px-4 py-28 sm:px-6 sm:py-36 lg:px-8 lg:py-12">
          <div className="mx-auto w-full max-w-7xl">
            <SectionHeading
              id="certifications-title"
              index="04 / 07"
              eyebrow="Credentials"
              title="Learning, applied and verified."
              description="A curated selection of completed training across modern web development, programming fundamentals, databases, and professional communication."
            />

            <div
              data-reveal
              className="mt-10 flex items-end justify-between gap-8 border-b border-black/10 pb-5 dark:border-white/10 lg:mt-12"
            >
              <div className="flex items-center gap-2 text-xs text-black/45 dark:text-white/45">
                <Award
                  className="size-4 stroke-[1.5]"
                  aria-hidden="true"
                />

                <span>
                  {certificates.length.toString().padStart(2, '0')}{' '}
                  certificates
                </span>
              </div>

              <div className="hidden items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-black/40 dark:text-white/40 sm:flex">
                <span className="lg:hidden">Swipe to explore</span>
                <span className="hidden lg:inline">Scroll to explore</span>

                <ArrowDownRight
                  className="size-3.5 stroke-[1.5]"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <div
            data-reveal
            tabIndex={0}
            aria-label="Certificate gallery. Swipe horizontally on smaller screens or scroll vertically on desktop to browse."
            className="
              -mx-4 mt-7 overflow-x-auto px-4 pb-6
              [scrollbar-width:none]
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-black
              sm:-mx-6 sm:px-6
              lg:-mx-8 lg:flex-1 lg:overflow-visible lg:px-0 lg:pb-0
              dark:focus-visible:outline-white
              [&::-webkit-scrollbar]:hidden
            "
          >
            <div
              ref={trackRef}
              className="
                flex w-max snap-x snap-mandatory gap-4
                sm:gap-5
                lg:h-full lg:items-center lg:gap-6 lg:snap-none lg:px-[max(2rem,calc((100vw-80rem)/2))]
              "
            >
              {certificates.map((certificate, index) => (
                <article
                  key={certificate.id}
                  className="
                    group relative flex w-[84vw] max-w-[25rem] shrink-0
                    snap-start flex-col overflow-hidden rounded-[1.5rem]
                    border border-black/10 bg-[#f7f7f5]
                    transition-[transform,border-color,box-shadow]
                    duration-500 ease-out
                    hover:-translate-y-1 hover:border-black/20
                    hover:shadow-[0_28px_70px_-46px_rgba(0,0,0,0.45)]
                    sm:w-[24rem]
                    lg:h-[30rem] lg:w-[24rem]
                    dark:border-white/10 dark:bg-[#111111]
                    dark:hover:border-white/20
                  "
                >
                  <div className="relative aspect-[4/3] shrink-0 overflow-hidden border-b border-black/10 bg-neutral-200 dark:border-white/10 dark:bg-neutral-900">
                    <Image
                      src={certificate.image}
                      alt={`${certificate.title} certificate issued by ${certificate.issuer}`}
                      fill
                      sizes="(max-width: 640px) 84vw, 384px"
                      className="
                        object-cover
                        transition-transform duration-700
                        ease-[cubic-bezier(0.16,1,0.3,1)]
                        group-hover:scale-[1.035]
                      "
                    />

                    <div className="pointer-events-none absolute inset-0 bg-black/[0.02] transition-colors duration-500 group-hover:bg-transparent dark:bg-white/[0.01]" />

                    <span className="absolute left-4 top-4 rounded-full border border-black/10 bg-white/90 px-2.5 py-1 font-mono text-[9px] text-black/65 backdrop-blur-md dark:border-white/10 dark:bg-black/80 dark:text-white/65">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-5 font-mono text-[9px] uppercase tracking-[0.14em] text-black/40 dark:text-white/40">
                      <span className="max-w-[70%] truncate">
                        {certificate.issuer}
                      </span>

                      <time className="shrink-0">{certificate.date}</time>
                    </div>

                    <h3 className="mt-5 text-xl font-semibold leading-[1.15] tracking-[-0.035em] text-black dark:text-white">
                      {certificate.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-xs leading-5 text-black/50 dark:text-white/50">
                      {certificate.description}
                    </p>

                    <ul
                      className="mt-auto flex flex-wrap gap-1.5 pt-6"
                      aria-label={`Skills verified by ${certificate.title}`}
                    >
                      {certificate.skills.map((skill) => (
                        <li
                          key={skill}
                          className="
                            rounded-full border border-black/10
                            px-2.5 py-1 text-[9px] text-black/50
                            transition-colors duration-300
                            group-hover:border-black/15
                            dark:border-white/10 dark:text-white/50
                            dark:group-hover:border-white/20
                          "
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}

              <div
                aria-hidden="true"
                className="hidden h-[30rem] w-[8vw] shrink-0 lg:block"
              />
            </div>
          </div>

          <div className="mx-auto hidden w-full max-w-7xl lg:block">
            <div className="h-px overflow-hidden bg-black/10 dark:bg-white/10">
              <div
                ref={progressRef}
                className="h-full w-full bg-black dark:bg-white"
              />
            </div>

            <div className="mt-3 flex justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-black/35 dark:text-white/35">
              <span>01</span>
              <span>{certificates.length.toString().padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CertiSection