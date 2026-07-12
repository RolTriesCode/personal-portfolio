'use client'

import {
  ArrowUpRight,
  Facebook,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
} from 'lucide-react'
import { useRef, useState } from 'react'

import SuccessModal from './SuccessModal'
import { SectionHeading } from './ui/section-heading'
import { useSectionReveal } from './ui/use-section-reveal'

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/RolTriesCode',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/erroltabangen/',
    icon: Linkedin,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/errol.tabangen/',
    icon: Facebook,
  },
]

const inputClassName =
  'mt-2 w-full rounded-2xl border border-black/[0.12] bg-black/[0.015] px-4 py-3.5 text-sm transition-[border-color,background-color,box-shadow] placeholder:text-black/30 hover:border-black/20 focus:border-black/35 focus:bg-white focus:outline-none focus:ring-4 focus:ring-black/[0.04] md:cursor-none dark:border-white/[0.14] dark:bg-white/[0.025] dark:placeholder:text-white/30 dark:hover:border-white/25 dark:focus:border-white/35 dark:focus:bg-white/[0.04] dark:focus:ring-white/[0.05]'

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useSectionReveal(sectionRef)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    if (error) setError(null)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formData.username || !formData.email || !formData.message) {
      setError('Please complete all fields before sending your message.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.username,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        const data = (await response.json()) as { error?: string }
        throw new Error(data.error || 'Your message could not be sent.')
      }

      setIsSuccessOpen(true)
    } catch (caughtError: unknown) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-title"
      className="px-4 py-28 sm:px-6 sm:py-36 lg:px-8 lg:py-44"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="contact-title"
          index="06 / 07"
          eyebrow="Contact"
          title="Have an idea? Let’s make it real."
          description="I’m open to thoughtful collaborations, freelance work, and opportunities to build products that are useful, clear, and memorable."
        />

        <div className="mt-16 grid overflow-hidden rounded-[2rem] border border-black/[0.1] dark:border-white/[0.12] lg:mt-24 lg:grid-cols-[0.8fr_1.2fr]">
          <div
            data-reveal="card"
            data-motion-hover="3"
            className="flex flex-col bg-neutral-950 p-6 text-white sm:p-9 lg:min-h-[40rem] lg:p-10 dark:bg-white dark:text-black"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40 dark:text-black/40">
              Start a conversation
            </p>
            <a
              href="mailto:erroltabangen.dev@gmail.com"
              className="group mt-6 inline-flex w-fit items-center gap-2 text-balance text-[clamp(1.55rem,3.2vw,2.75rem)] font-medium leading-tight tracking-[-0.045em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:cursor-none dark:focus-visible:outline-black"
            >
              erroltabangen.dev@gmail.com
              <ArrowUpRight
                className="size-5 shrink-0 stroke-[1.5] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:size-6"
                aria-hidden="true"
              />
            </a>

            <div className="mt-12 space-y-5 text-sm text-white/55 dark:text-black/55 lg:mt-auto">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 stroke-[1.5]" aria-hidden="true" />
                <span>Vigan City, Ilocos Sur, Philippines</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 stroke-[1.5]" aria-hidden="true" />
                <span>Usually responds within 1–2 days</span>
              </div>
            </div>

            <ul
              data-reveal-group
              data-reveal-stagger="0.045"
              className="mt-10 flex flex-wrap gap-2"
              aria-label="Social profiles"
            >
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={label} data-reveal-item>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${label} — opens in a new tab`}
                    className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-[color,border-color,transform] hover:-translate-y-0.5 hover:border-white/30 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:cursor-none dark:border-black/15 dark:text-black/60 dark:hover:border-black/30 dark:hover:text-black dark:focus-visible:outline-black"
                  >
                    <Icon className="size-4 stroke-[1.6]" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div
            data-reveal="card"
            data-motion-hover="3"
            className="bg-white p-6 dark:bg-neutral-950 sm:p-9 lg:p-10"
          >
            <div className="flex items-center justify-between border-b border-black/[0.1] pb-5 dark:border-white/[0.12]">
              <h3 className="text-lg font-semibold tracking-[-0.03em]">
                Tell me about your project
              </h3>
              <span className="font-mono text-[10px] text-black/35 dark:text-white/35">
                All fields required
              </span>
            </div>

            <form
              data-reveal-group
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
              noValidate
            >
              <div data-reveal-item>
                <label htmlFor="username" className="text-xs font-medium">
                  Name
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={inputClassName}
                />
              </div>

              <div data-reveal-item>
                <label htmlFor="email" className="text-xs font-medium">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClassName}
                />
              </div>

              <div data-reveal-item>
                <label htmlFor="message" className="text-xs font-medium">
                  Project details
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="A short description of your project, goals, and timeline."
                  className={`${inputClassName} resize-y`}
                />
              </div>

              <div
                data-reveal-item
                className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between"
              >
                <p
                  role={error ? 'alert' : 'status'}
                  aria-live="polite"
                  className="max-w-sm text-xs leading-5 text-black/50 dark:text-white/50"
                >
                  {error || 'Your details are only used to respond to this inquiry.'}
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-black px-5 text-sm font-medium text-white transition-transform hover:scale-[1.025] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 md:cursor-none dark:bg-white dark:text-black dark:focus-visible:outline-white"
                >
                  {isSubmitting ? 'Sending…' : 'Send inquiry'}
                  <Send
                    className="size-4 stroke-[1.7] transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => {
          setIsSuccessOpen(false)
          setFormData({ username: '', email: '', message: '' })
        }}
        userName={formData.username || 'Friend'}
      />
    </section>
  )
}

export default ContactSection
