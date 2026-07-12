'use client'

import { ArrowUp } from 'lucide-react'
import { useRef } from 'react'

import { useSectionReveal } from './ui/use-section-reveal'

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skill' },
  { label: 'Projects', href: '#project' },
  { label: 'Contact', href: '#contact' },
]

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null)

  useSectionReveal(footerRef)

  return (
    <footer ref={footerRef} className="px-2 pb-2 sm:px-4 sm:pb-4 lg:px-6 lg:pb-6">
      <div className="mx-auto max-w-[96rem] overflow-hidden rounded-[2rem] bg-neutral-950 px-5 pb-6 pt-8 text-white sm:px-8 sm:pb-8 lg:rounded-[2.5rem] lg:px-12 lg:pt-10">
        <div
          data-reveal="card"
          className="flex items-center justify-between border-b border-white/15 pb-5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/40"
        >
          <span>End of page</span>
          <span className="font-mono">07 / 07</span>
        </div>

        <div className="grid gap-12 py-16 md:grid-cols-[1.35fr_0.65fr] md:items-end lg:py-24">
          <div data-reveal="heading">
            <div data-parallax="3">
              <p className="text-xs uppercase tracking-[0.16em] text-white/40">
                Let&apos;s make something meaningful
              </p>
              <a
                href="mailto:erroltabangen.dev@gmail.com"
                className="mt-5 block max-w-4xl text-balance text-[clamp(2.6rem,7vw,7rem)] font-medium leading-[0.92] tracking-[-0.065em] transition-opacity hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:cursor-none"
              >
                Start a conversation.
              </a>
            </div>
          </div>

          <div data-reveal="card" className="md:justify-self-end">
            <p className="mb-4 text-[10px] uppercase tracking-[0.16em] text-white/35">
              Navigate
            </p>
            <nav aria-label="Footer navigation">
              <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm text-white/55 md:grid-cols-1">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:cursor-none"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <p
          data-reveal="heading"
          className="font-bebas -mb-[0.08em] whitespace-nowrap text-center text-[clamp(5.2rem,18vw,18rem)] leading-[0.72] tracking-[-0.035em] text-white"
          aria-label="Errol Tabangen"
        >
          <span data-parallax="5" className="block">
            ERROL TABANGEN
          </span>
        </p>

        <div
          data-reveal="card"
          className="mt-7 flex flex-col gap-4 border-t border-white/15 pt-5 text-[10px] uppercase tracking-[0.12em] text-white/35 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>
            © {new Date().getFullYear()} Errol Tabangen. All rights reserved.
          </p>
          <a
            href="#home"
            className="group flex w-fit items-center gap-2 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:cursor-none"
          >
            Back to top
            <ArrowUp
              className="size-3.5 stroke-[1.6] transition-transform group-hover:-translate-y-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
