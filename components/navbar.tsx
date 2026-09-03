'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import logo from '@/public/logo-portfolio.png'
import { AnimatedThemeToggler } from './ui/animated-theme-toggler'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skill' },
  { label: 'Credentials', href: '#certificationsa' },
  { label: 'Projects', href: '#project' },
] as const

type SectionId = (typeof navItems)[number]['href'] | '#contact'

interface NavLinkProps {
  href: SectionId
  label: string
  activeSection: SectionId
  onClick?: () => void
  mobile?: boolean
}

function NavLink({
  href,
  label,
  activeSection,
  onClick,
  mobile = false,
}: NavLinkProps) {
  const isActive = activeSection === href

  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={
        mobile
          ? 'group flex min-h-12 items-center justify-between rounded-2xl px-4 text-[15px] font-medium tracking-[-0.01em] text-black/60 transition-colors duration-200 hover:bg-black/[0.045] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:text-white/60 dark:hover:bg-white/[0.07] dark:hover:text-white dark:focus-visible:outline-white'
          : 'group relative flex h-9 items-center px-1 text-[13px] font-medium tracking-[-0.01em] text-black/50 transition-colors duration-200 hover:text-black focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black dark:text-white/50 dark:hover:text-white dark:focus-visible:outline-white'
      }
    >
      <span className={isActive ? 'text-black dark:text-white' : undefined}>
        {label}
      </span>

      {mobile ? (
        <span
          className={`size-1.5 rounded-full bg-current transition-opacity ${
            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
          }`}
          aria-hidden="true"
        />
      ) : (
        <span
          className={`absolute inset-x-1 bottom-0 h-px origin-left bg-black transition-transform duration-300 ease-out dark:bg-white ${
            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
          aria-hidden="true"
        />
      )}
    </a>
  )
}

const NavBar = () => {
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId>('#home')

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (reducedMotion) {
        gsap.set('[data-nav-shell]', { autoAlpha: 1 })
        return
      }

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(
          '[data-nav-shell]',
          { autoAlpha: 0, y: -14, scale: 0.985 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, clearProps: 'transform' },
        )
        .fromTo(
          '[data-nav-item]',
          { autoAlpha: 0, y: -5 },
          { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.035 },
          '-=0.35',
        )
    },
    { scope: headerRef },
  )

  useGSAP(
    () => {
      if (!menuRef.current) return

      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (reducedMotion) {
        gsap.set(menuRef.current, { autoAlpha: isMenuOpen ? 1 : 0 })
        return
      }

      if (isMenuOpen) {
        gsap.fromTo(
          menuRef.current,
          { autoAlpha: 0, y: -8, scale: 0.985 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.28,
            ease: 'power2.out',
          },
        )
      }
    },
    { scope: headerRef, dependencies: [isMenuOpen] },
  )

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = [...navItems, { label: 'Contact', href: '#contact' }]
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleSection) {
          setActiveSection(`#${visibleSection.target.id}` as SectionId)
        }
      },
      { rootMargin: '-22% 0px -62% 0px', threshold: [0, 0.1, 0.3] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isMenuOpen])

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)')
    const closeMenuOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false)
    }

    desktopQuery.addEventListener('change', closeMenuOnDesktop)
    return () => desktopQuery.removeEventListener('change', closeMenuOnDesktop)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header
      ref={headerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <div
        data-nav-shell
        className={`pointer-events-auto mx-auto w-full rounded-[1.35rem] border transition-[max-width,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:rounded-full ${
          isScrolled || isMenuOpen
            ? 'max-w-5xl border-black/[0.08] bg-white/85 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.28)] backdrop-blur-xl dark:border-white/[0.1] dark:bg-neutral-950/85 dark:shadow-[0_12px_40px_-18px_rgba(0,0,0,0.75)]'
            : 'max-w-7xl border-transparent bg-transparent shadow-none'
        }`}
      >
        <div className="flex h-14 items-center justify-between px-3 sm:px-4 md:grid md:grid-cols-[1fr_auto_1fr] md:px-5">
          <a
            href="#home"
            data-nav-item
            onClick={closeMenu}
            aria-label="Errol Tabangen — home"
            className="group flex w-fit items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:cursor-none dark:focus-visible:outline-white"
          >
            <span className="grid size-9 place-items-center rounded-xl border border-black/[0.08] bg-black/[0.025] transition-transform duration-300 group-hover:scale-[1.04] dark:border-white/[0.1] dark:bg-white/[0.06]">
              <Image
                src={logo}
                alt=""
                priority
                className="size-6 object-contain dark:invert"
              />
            </span>
            <span className="hidden text-[13px] font-semibold tracking-[-0.025em] sm:block">
              Errol Tabangen
            </span>
          </a>

          <nav aria-label="Primary navigation" className="hidden md:block">
            <ul className="flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <li key={item.href} data-nav-item>
                  <NavLink {...item} activeSection={activeSection} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-1.5 sm:gap-2">
            <AnimatedThemeToggler
              data-nav-item
              className="grid size-10 place-items-center rounded-full text-black/60 transition-colors duration-200 hover:bg-black/[0.055] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black md:cursor-none dark:text-white/60 dark:hover:bg-white/[0.08] dark:hover:text-white dark:focus-visible:outline-white [&_svg]:size-[17px] [&_svg]:stroke-[1.7]"
            />

            <a
              href="#contact"
              data-nav-item
              aria-current={activeSection === '#contact' ? 'page' : undefined}
              className="group hidden h-10 items-center gap-1.5 rounded-full bg-black px-4 text-[13px] font-medium tracking-[-0.01em] text-white transition-transform duration-200 hover:scale-[1.025] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:scale-[0.98] md:flex md:cursor-none dark:bg-white dark:text-black dark:focus-visible:outline-white"
            >
              Let&apos;s talk
              <ArrowUpRight
                className="size-3.5 stroke-[1.8] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            <button
              type="button"
              data-nav-item
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="grid size-10 place-items-center rounded-full text-black/70 transition-colors hover:bg-black/[0.055] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black md:hidden dark:text-white/70 dark:hover:bg-white/[0.08] dark:focus-visible:outline-white"
            >
              {isMenuOpen ? (
                <X className="size-[18px] stroke-[1.7]" aria-hidden="true" />
              ) : (
                <Menu className="size-[18px] stroke-[1.7]" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div
            ref={menuRef}
            id="mobile-navigation"
            className="border-t border-black/[0.07] px-2 pb-2 pt-2 md:hidden dark:border-white/[0.09]"
          >
            <nav aria-label="Mobile navigation">
              <ul className="space-y-0.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      {...item}
                      activeSection={activeSection}
                      onClick={closeMenu}
                      mobile
                    />
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={closeMenu}
                className="group mt-2 flex min-h-12 items-center justify-between rounded-2xl bg-black px-4 text-[14px] font-medium text-white transition-transform active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:bg-white dark:text-black dark:focus-visible:outline-white"
              >
                Let&apos;s work together
                <ArrowUpRight
                  className="size-4 stroke-[1.8] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default NavBar
