'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'

const name = 'Errol'

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const finishedRef = useRef(false)

  useGSAP(
    () => {
      const overlay = overlayRef.current
      const content = contentRef.current
      const line = lineRef.current
      const counter = counterRef.current

      if (!isVisible || !overlay || !content || !line || !counter) return

      const root = document.documentElement
      const body = document.body
      const previousOverflow = root.style.overflow
      const previousBodyOverflow = body.style.overflow
      const previousBodyPaddingRight = body.style.paddingRight
      const previousBodyTouchAction = body.style.touchAction
      const scrollbarGap = window.innerWidth - root.clientWidth
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      const timers: number[] = []
      const progressState = { value: 0 }

      root.style.overflow = 'hidden'
      body.style.overflow = 'hidden'
      body.style.touchAction = 'none'

      if (scrollbarGap > 0) {
        body.style.paddingRight = `${scrollbarGap}px`
      }

      const chars = gsap.utils.toArray<HTMLElement>(
        '[data-loader-char]',
        overlay,
      )
      const details = gsap.utils.toArray<HTMLElement>(
        '[data-loader-detail]',
        overlay,
      )

      const exitLoader = () => {
        if (finishedRef.current) return
        finishedRef.current = true

        gsap.to(progressState, {
          value: 100,
          duration: reducedMotion ? 0.08 : 0.22,
          ease: 'power2.out',
          onUpdate: () => {
            const value = Math.round(progressState.value)
            counter.textContent = `${value}%`
            counter.setAttribute('aria-valuenow', value.toString())
            gsap.set(line, { scaleX: value / 100 })
          },
        })

        gsap
          .timeline({
            defaults: { ease: 'power3.inOut' },
            onComplete: () => setIsVisible(false),
          })
          .to(content, {
            autoAlpha: 0,
            y: reducedMotion ? 0 : -10,
            duration: reducedMotion ? 0.12 : 0.32,
          })
          .to(
            overlay,
            {
              autoAlpha: 0,
              duration: reducedMotion ? 0.18 : 0.58,
            },
            reducedMotion ? 0 : 0.08,
          )
      }

      if (reducedMotion) {
        gsap.set([content, line, chars, details], { autoAlpha: 1 })
        gsap.set(line, {
          scaleX: 1,
          transformOrigin: 'left center',
        })
        progressState.value = 100
        counter.textContent = '100%'
        counter.setAttribute('aria-valuenow', '100')
      } else {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .set(overlay, { autoAlpha: 1 })
          .set(line, { scaleX: 0, transformOrigin: 'left center' })
          .fromTo(
            counter,
            { autoAlpha: 0, y: 8 },
            { autoAlpha: 1, y: 0, duration: 0.42 },
            0,
          )
          .to(
            progressState,
            {
              value: 100,
              duration: 1.12,
              ease: 'power2.inOut',
              onUpdate: () => {
                const value = Math.round(progressState.value)
                counter.textContent = `${value}%`
                counter.setAttribute('aria-valuenow', value.toString())
                gsap.set(line, { scaleX: value / 100 })
              },
            },
            0,
          )
          .fromTo(
            line,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.28 },
            0,
          )
          .fromTo(
            chars,
            { autoAlpha: 0, yPercent: 105 },
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: 0.72,
              stagger: 0.025,
              ease: 'expo.out',
            },
            '-=0.44',
          )
          .fromTo(
            details,
            { autoAlpha: 0, y: 10 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.52,
              stagger: 0.06,
            },
            '-=0.32',
          )
      }

      const startedAt = performance.now()
      const minDuration = reducedMotion ? 240 : 980
      const maxDuration = reducedMotion ? 520 : 1650

      const completeAfterMinimum = () => {
        const elapsed = performance.now() - startedAt
        timers.push(window.setTimeout(exitLoader, Math.max(0, minDuration - elapsed)))
      }

      if (document.readyState === 'complete') {
        completeAfterMinimum()
      } else {
        window.addEventListener('load', completeAfterMinimum, { once: true })
      }

      timers.push(window.setTimeout(exitLoader, maxDuration))

      return () => {
        window.removeEventListener('load', completeAfterMinimum)
        timers.forEach((timer) => window.clearTimeout(timer))
        root.style.overflow = previousOverflow
        body.style.overflow = previousBodyOverflow
        body.style.paddingRight = previousBodyPaddingRight
        body.style.touchAction = previousBodyTouchAction
        gsap.killTweensOf([overlay, content, line, counter, chars, details, progressState])
      }
    },
    { dependencies: [isVisible] },
  )

  if (!isVisible) return null

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-live="polite"
      aria-label="Loading Errol Tabangen portfolio"
      className="fixed inset-0 z-[120] grid min-h-svh place-items-center bg-background text-foreground"
    >
      <div
        ref={contentRef}
        className="flex w-[min(84vw,34rem)] flex-col items-center text-center"
      >
        <div className="mb-6 h-px w-full overflow-hidden bg-black/10 dark:bg-white/10">
          <div ref={lineRef} className="h-full w-full bg-black dark:bg-white" />
        </div>

        <p className="sr-only">Loading portfolio</p>

        <div
          className="font-bebas overflow-hidden text-[clamp(4rem,14vw,8.5rem)] leading-[0.78] tracking-[-0.03em]"
          aria-hidden="true"
        >
          {name.split('').map((char, index) => (
            <span
              key={`${char}-${index}`}
              data-loader-char
              className="inline-block"
            >
              {char === ' ' ? '\u00a0' : char}
            </span>
          ))}
        </div>

        <div className="mt-6 flex w-full items-center justify-between gap-6 text-[10px] font-medium uppercase tracking-[0.18em] text-black/45 dark:text-white/45">
          <span data-loader-detail>Portfolio</span>
          <span
            ref={counterRef}
            role="progressbar"
            aria-label="Loading progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
            className="min-w-10 text-right font-mono tabular-nums"
          >
            0%
          </span>
        </div>
      </div>
    </div>
  )
}
