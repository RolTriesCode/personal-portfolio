'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import type { RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

export function useSectionReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (!scope.current) return

      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (reducedMotion) {
        gsap.set('[data-reveal]', { autoAlpha: 1 })
        return
      }

      gsap.from('[data-reveal]', {
        autoAlpha: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: scope.current,
          start: 'top 78%',
          once: true,
        },
      })
    },
    { scope },
  )
}
