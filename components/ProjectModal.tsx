'use client'

import Image from 'next/image'
import { createPortal } from 'react-dom'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { gsap } from 'gsap'

import type { Project } from '@/lib/data'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export default function ProjectModal({
  project,
  onClose,
}: ProjectModalProps) {
  const [activeImage, setActiveImage] = useState(0)
  const backdropRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const isClosingRef = useRef(false)

  useEffect(() => {
    if (!project) return

    isClosingRef.current = false
    previousFocusRef.current = document.activeElement as HTMLElement | null

    const html = document.documentElement
    const body = document.body
    const scrollBarWidth = window.innerWidth - html.clientWidth
    const previousStyles = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
    }

    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'

    if (scrollBarWidth > 0) {
      body.style.paddingRight = `${scrollBarWidth}px`
    }

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0)

    return () => {
      window.clearTimeout(focusTimer)
      html.style.overflow = previousStyles.htmlOverflow
      body.style.overflow = previousStyles.bodyOverflow
      body.style.paddingRight = previousStyles.bodyPaddingRight
    }
  }, [project])

  useLayoutEffect(() => {
    if (!project || !backdropRef.current || !dialogRef.current) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: reducedMotion ? 0 : 0.35 },
        )
        .fromTo(
          dialogRef.current,
          { opacity: 0, scale: 0.975, y: 14 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: reducedMotion ? 0 : 0.45,
          },
          reducedMotion ? 0 : 0.05,
        )
    }, dialogRef)

    return () => context.revert()
  }, [project])

  const restoreFocus = useCallback(() => {
    window.requestAnimationFrame(() => previousFocusRef.current?.focus())
  }, [])

  const closeModal = useCallback(() => {
    if (isClosingRef.current) return

    isClosingRef.current = true
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    gsap.killTweensOf([backdropRef.current, dialogRef.current])
    gsap
      .timeline({
        defaults: { ease: 'power2.inOut' },
        onComplete: () => {
          onClose()
          restoreFocus()
        },
      })
      .to(dialogRef.current, {
        opacity: 0,
        scale: 0.975,
        y: 10,
        duration: reducedMotion ? 0 : 0.25,
      })
      .to(
        backdropRef.current,
        {
          opacity: 0,
          duration: reducedMotion ? 0 : 0.25,
        },
        reducedMotion ? 0 : 0.05,
      )
  }, [onClose, restoreFocus])

  useEffect(() => {
    if (!project) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeModal()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter(
        (element) =>
          !element.hasAttribute('disabled') && element.getClientRects().length > 0,
      )

      if (focusableElements.length === 0) {
        event.preventDefault()
        dialogRef.current.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (!dialogRef.current.contains(document.activeElement)) {
        event.preventDefault()
        firstElement.focus()
        return
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [closeModal, project])

  if (!project || typeof document === 'undefined') return null

  const gallery = project.gallery.length > 0 ? project.gallery : [project.src]
  const hasMultipleImages = gallery.length > 1
  const hasLiveUrl = Boolean(project.link)

  const showPreviousImage = () => {
    setActiveImage((current) => (current - 1 + gallery.length) % gallery.length)
  }

  const showNextImage = () => {
    setActiveImage((current) => (current + 1) % gallery.length)
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 lg:p-10"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal()
      }}
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/65 backdrop-blur-md dark:bg-black/75"
        aria-hidden="true"
        onMouseDown={closeModal}
      />

      <div
        ref={dialogRef}
        id="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-description"
        tabIndex={-1}
        className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-6xl overflow-y-auto overscroll-contain rounded-[1.75rem] border border-black/[0.1] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.28)] outline-none dark:border-white/[0.12] dark:bg-neutral-950 sm:max-h-[calc(100dvh-3rem)] sm:rounded-[2rem] lg:max-h-[calc(100dvh-5rem)]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-black/[0.08] bg-white/90 px-5 py-4 backdrop-blur-xl dark:border-white/[0.1] dark:bg-neutral-950/90 sm:px-7">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/40 dark:text-white/40">
            Project {project.year}
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeModal}
            aria-label={`Close ${project.title} project details`}
            className="grid size-10 place-items-center rounded-full border border-black/[0.09] text-black/55 transition-colors hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black md:cursor-none dark:border-white/[0.12] dark:text-white/55 dark:hover:bg-white dark:hover:text-black dark:focus-visible:outline-white"
          >
            <X className="size-4 stroke-[1.6]" aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10 lg:p-9">
          <section aria-label={`${project.title} gallery`}>
            <div className="group relative aspect-[16/10] overflow-hidden rounded-[1.35rem] border border-black/[0.08] bg-neutral-100 dark:border-white/[0.1] dark:bg-neutral-900 sm:rounded-[1.6rem]">
              <Image
                key={activeImage}
                src={gallery[activeImage]}
                alt={`${project.title} screenshot ${activeImage + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.04] dark:ring-white/[0.06]"
                aria-hidden="true"
              />

              {hasMultipleImages && (
                <div className="absolute bottom-3 right-3 flex gap-2 sm:bottom-4 sm:right-4">
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    aria-label="Show previous screenshot"
                    className="grid size-10 place-items-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:cursor-none"
                  >
                    <ArrowLeft className="size-4 stroke-[1.6]" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={showNextImage}
                    aria-label="Show next screenshot"
                    className="grid size-10 place-items-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:cursor-none"
                  >
                    <ArrowRight className="size-4 stroke-[1.6]" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>

            <p className="sr-only" aria-live="polite">
              Screenshot {activeImage + 1} of {gallery.length}
            </p>

            {hasMultipleImages && (
              <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-4 sm:gap-3">
                {gallery.map((image, index) => (
                  <button
                    key={`${project.title}-gallery-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`Show screenshot ${index + 1}`}
                    aria-pressed={activeImage === index}
                    className={`relative aspect-[16/10] overflow-hidden rounded-xl border transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black md:cursor-none dark:focus-visible:outline-white ${
                      activeImage === index
                        ? 'border-black opacity-100 dark:border-white'
                        : 'border-black/[0.08] opacity-45 hover:opacity-75 dark:border-white/[0.1]'
                    }`}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 33vw, 20vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </section>

          <div className="flex flex-col lg:py-2">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/35 dark:text-white/35">
                Selected case study
              </p>
              <h2
                id="project-modal-title"
                className="mt-4 text-4xl font-semibold tracking-[-0.055em] sm:text-5xl"
              >
                {project.title}
              </h2>
              <p
                id="project-modal-description"
                className="mt-5 text-sm leading-7 text-black/55 dark:text-white/55 sm:text-[15px]"
              >
                {project.description}
              </p>

              {project.tech.length > 0 && (
                <ul
                  className="mt-7 flex flex-wrap gap-2"
                  aria-label={`${project.title} technologies`}
                >
                  {project.tech.map((technology) => (
                    <li
                      key={technology}
                      className="rounded-full border border-black/[0.09] px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-black/50 dark:border-white/[0.12] dark:text-white/50"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-9 border-t border-black/[0.08] pt-6 dark:border-white/[0.1] lg:mt-auto">
              {hasLiveUrl ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-[3.25rem] w-full items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-medium text-white transition-transform hover:scale-[1.015] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black active:scale-[0.99] md:cursor-none dark:bg-white dark:text-black dark:focus-visible:outline-white"
                >
                  Visit Website
                  <ArrowUpRight className="size-4 stroke-[1.6]" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <>
                  <button
                    type="button"
                    disabled
                    className="flex h-[3.25rem] w-full cursor-not-allowed items-center justify-center rounded-full bg-black/[0.08] px-6 text-sm font-medium text-black/35 dark:bg-white/[0.09] dark:text-white/35"
                  >
                    Visit Website
                  </button>
                  <p className="mt-3 text-center text-xs text-black/40 dark:text-white/40">
                    Live demo coming soon.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
