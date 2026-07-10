'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  userName: string
}

const SuccessModal = ({ isOpen, onClose, userName }: SuccessModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    closeButtonRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.button
            type="button"
            aria-label="Close message confirmation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
            aria-describedby="success-description"
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative w-full max-w-md rounded-[1.75rem] border border-black/[0.1] bg-white p-7 text-center shadow-2xl dark:border-white/[0.12] dark:bg-neutral-950 sm:p-9"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-black/45 transition-colors hover:bg-black/[0.05] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black md:cursor-none dark:text-white/45 dark:hover:bg-white/[0.08] dark:hover:text-white dark:focus-visible:outline-white"
            >
              <X className="size-4 stroke-[1.7]" aria-hidden="true" />
            </button>

            <div className="mx-auto grid size-14 place-items-center rounded-full border border-black/[0.12] dark:border-white/[0.14]">
              <Check className="size-5 stroke-[1.7]" aria-hidden="true" />
            </div>
            <h2
              id="success-title"
              className="mt-6 text-2xl font-semibold tracking-[-0.045em]"
            >
              Thanks, {userName}.
            </h2>
            <p
              id="success-description"
              className="mt-3 text-sm leading-6 text-black/50 dark:text-white/50"
            >
              Your message has been sent successfully. I&apos;ll review the
              details and get back to you as soon as possible.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-7 h-12 w-full rounded-full bg-black text-sm font-medium text-white transition-transform hover:scale-[1.015] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black active:scale-[0.99] md:cursor-none dark:bg-white dark:text-black dark:focus-visible:outline-white"
            >
              Done
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default SuccessModal
