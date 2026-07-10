"use client"

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

const themeEvent = "portfolio-theme-change"

const subscribeToTheme = (onStoreChange: () => void) => {
  const colorScheme = window.matchMedia("(prefers-color-scheme: dark)")
  const handleChange = () => onStoreChange()

  window.addEventListener(themeEvent, handleChange)
  window.addEventListener("storage", handleChange)
  colorScheme.addEventListener("change", handleChange)

  return () => {
    window.removeEventListener(themeEvent, handleChange)
    window.removeEventListener("storage", handleChange)
    colorScheme.removeEventListener("change", handleChange)
  }
}

const getThemeSnapshot = () => {
  const storedTheme = localStorage.getItem("theme")
  return (
    storedTheme === "dark" ||
    (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  )
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const isDark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return

    const newTheme = !isDark
    const updateTheme = () => {
      localStorage.setItem("theme", newTheme ? "dark" : "light")
      window.dispatchEvent(new Event(themeEvent))
    }

    if (
      !("startViewTransition" in document) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      updateTheme()
      return
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        updateTheme()
      })
    }).ready

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }, [isDark, duration])

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      aria-label={isDark ? "Use light theme" : "Use dark theme"}
      className={cn(className)}
      {...props}
    >
      {isDark ? <Sun /> : <Moon />}
      <span className="sr-only">{isDark ? "Use light theme" : "Use dark theme"}</span>
    </button>
  )
}
