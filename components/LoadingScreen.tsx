'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const greetings = [
  'Hello',
  'bonjour',
  'Ciao',
  'Olà',
  'やあ',
  'Hallå',
  'Guten tag',
  'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ',
]

type Viewport = {
  width: number
  height: number
}

// Adapted from Skiper UI's Words preloader:
// https://skiper-ui.com/v1/skiper8
export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [hasExited, setHasExited] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const [viewport, setViewport] = useState<Viewport>({ width: 0, height: 0 })
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight })
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)

    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  useEffect(() => {
    if (hasExited) return

    const root = document.documentElement
    const body = document.body
    const previousRootOverflow = root.style.overflow
    const previousBodyOverflow = body.style.overflow
    const previousBodyPaddingRight = body.style.paddingRight
    const previousBodyTouchAction = body.style.touchAction
    const scrollbarGap = window.innerWidth - root.clientWidth

    root.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    body.style.touchAction = 'none'

    if (scrollbarGap > 0) {
      body.style.paddingRight = `${scrollbarGap}px`
    }

    return () => {
      root.style.overflow = previousRootOverflow
      body.style.overflow = previousBodyOverflow
      body.style.paddingRight = previousBodyPaddingRight
      body.style.touchAction = previousBodyTouchAction
    }
  }, [hasExited])

  useEffect(() => {
    if (!isVisible || shouldReduceMotion || wordIndex === greetings.length - 1) {
      return
    }

    const delay = wordIndex === 0 ? 1000 : 150
    const wordTimer = window.setTimeout(() => {
      setWordIndex((current) => current + 1)
    }, delay)

    return () => window.clearTimeout(wordTimer)
  }, [isVisible, shouldReduceMotion, wordIndex])

  useEffect(() => {
    const exitTimer = window.setTimeout(
      () => setIsVisible(false),
      shouldReduceMotion ? 350 : 2000,
    )

    return () => window.clearTimeout(exitTimer)
  }, [shouldReduceMotion])

  const initialCurve = `M0 0 L${viewport.width} 0 L${viewport.width} ${viewport.height} Q${viewport.width / 2} ${viewport.height + 300} 0 ${viewport.height} L0 0`
  const flatCurve = `M0 0 L${viewport.width} 0 L${viewport.width} ${viewport.height} Q${viewport.width / 2} ${viewport.height} 0 ${viewport.height} L0 0`

  return (
    <AnimatePresence mode="wait" onExitComplete={() => setHasExited(true)}>
      {isVisible && (
        <motion.div
          key="words-preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading Errol Tabangen portfolio"
          initial={{ top: 0 }}
          exit={{
            top: shouldReduceMotion ? 0 : '-100svh',
            opacity: shouldReduceMotion ? 0 : 1,
            transition: {
              duration: shouldReduceMotion ? 0.15 : 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: shouldReduceMotion ? 0 : 0.2,
            },
          }}
          className="fixed inset-0 z-[120] flex h-svh w-full items-center justify-center bg-white text-black"
        >
          {viewport.width > 0 && (
            <>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                transition={{ duration: shouldReduceMotion ? 0.1 : 1, delay: 0.2 }}
                className="absolute z-10 max-w-[90vw] text-center text-5xl font-semibold tracking-tighter md:text-6xl"
              >
                <span>{shouldReduceMotion ? greetings.at(-1) : greetings[wordIndex]}</span>
              </motion.p>

              <svg
                aria-hidden="true"
                className="absolute top-0 h-[calc(100%+300px)] w-full"
              >
                <motion.path
                  initial={{ d: initialCurve }}
                  exit={{
                    d: flatCurve,
                    transition: {
                      duration: shouldReduceMotion ? 0.1 : 0.7,
                      ease: [0.76, 0, 0.24, 1],
                      delay: shouldReduceMotion ? 0 : 0.3,
                    },
                  }}
                  className="fill-white shadow-[0_0_10px_#fff]"
                />
              </svg>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
