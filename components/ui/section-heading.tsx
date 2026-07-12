interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: string
  description?: string
  id?: string
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  id,
}: SectionHeadingProps) {
  return (
    <header
      data-reveal="heading"
      className="grid gap-5 border-t border-black/[0.1] pt-5 dark:border-white/[0.12] md:grid-cols-[0.7fr_1.3fr] md:gap-10"
    >
      <div className="flex items-start justify-between gap-5 md:block">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/45 dark:text-white/45">
          {eyebrow}
        </p>
        <span className="font-mono text-[10px] text-black/35 dark:text-white/35 md:mt-2 md:block">
          {index}
        </span>
      </div>

      <div>
        <h2
          id={id}
          className="font-noto text-pretty text-[clamp(2.65rem,6vw,5.75rem)] font-normal leading-[0.98] tracking-[-0.055em]"
        >
          {title}
        </h2>
        {description && (
          <p className="mt-5 max-w-xl text-pretty text-sm leading-6 text-black/50 dark:text-white/50 sm:text-[15px] sm:leading-7">
            {description}
          </p>
        )}
      </div>
    </header>
  )
}
