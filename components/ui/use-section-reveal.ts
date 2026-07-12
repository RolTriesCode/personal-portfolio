'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import type { RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

export function useSectionReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current

      if (!section) return

      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      const revealElements = gsap.utils.toArray<HTMLElement>(
        '[data-reveal]',
        section,
      )
      const revealGroups = gsap.utils.toArray<HTMLElement>(
        '[data-reveal-group]',
        section,
      )
      const parallaxElements = gsap.utils.toArray<HTMLElement>(
        '[data-parallax]',
        section,
      )
      const hoverElements = gsap.utils.toArray<HTMLElement>(
        '[data-motion-hover]',
        section,
      )

      if (reducedMotion) {
        gsap.set(
          [
            ...revealElements,
            ...revealGroups.flatMap((group) =>
              gsap.utils.toArray<HTMLElement>('[data-reveal-item]', group),
            ),
          ],
          {
            autoAlpha: 1,
            clearProps: 'transform,opacity,visibility,willChange',
          },
        )
        return
      }

      revealElements.forEach((element) => {
        const variant = element.dataset.reveal
        const delay = Number(element.dataset.revealDelay ?? 0)
        const isImage = variant === 'image'
        const isCard = variant === 'card'
        const isButton = variant === 'button'
        const isHeading = variant === 'heading'

        gsap.from(element, {
          autoAlpha: 0,
          y: isHeading ? 34 : isButton ? 14 : isImage ? 36 : 28,
          scale: isCard || isImage ? 0.985 : 1,
          duration: isHeading ? 1 : isButton ? 0.62 : 0.82,
          delay,
          ease: 'power3.out',
          force3D: true,
          clearProps: 'transform,opacity,visibility,willChange',
          scrollTrigger: {
            trigger: element,
            start: 'top 84%',
            once: true,
          },
          onStart: () => {
            gsap.set(element, { willChange: 'transform, opacity' })
          },
        })
      })

      revealGroups.forEach((group) => {
        const items = gsap.utils.toArray<HTMLElement>(
          '[data-reveal-item]',
          group,
        )

        if (!items.length) return

        gsap.from(items, {
          autoAlpha: 0,
          y: 18,
          duration: 0.68,
          ease: 'power3.out',
          force3D: true,
          stagger: Number(group.dataset.revealStagger ?? 0.07),
          clearProps: 'transform,opacity,visibility,willChange',
          scrollTrigger: {
            trigger: group,
            start: 'top 86%',
            once: true,
          },
          onStart: () => {
            gsap.set(items, { willChange: 'transform, opacity' })
          },
        })
      })

      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        parallaxElements.forEach((element) => {
          const distance = Number(element.dataset.parallax ?? 6)

          gsap.to(element, {
            yPercent: -distance,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.9,
            },
          })
        })
      })

      media.add(
        '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          const cleanups = hoverElements.map((element) => {
            const lift = Number(element.dataset.motionHover ?? 4)
            const moveY = gsap.quickTo(element, 'y', {
              duration: 0.38,
              ease: 'power3.out',
            })
            const scale = gsap.quickTo(element, 'scale', {
              duration: 0.38,
              ease: 'power3.out',
            })

            const enter = () => {
              moveY(-lift)
              scale(1.008)
            }
            const leave = () => {
              moveY(0)
              scale(1)
            }

            element.addEventListener('pointerenter', enter)
            element.addEventListener('pointerleave', leave)

            return () => {
              element.removeEventListener('pointerenter', enter)
              element.removeEventListener('pointerleave', leave)
            }
          })

          return () => {
            cleanups.forEach((cleanup) => cleanup())
          }
        },
      )

      return () => {
        media.revert()
      }
    },
    { scope },
  )
}
