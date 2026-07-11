'use client'

import profile from '@/public/errolpic.png'
import { Send, Sparkles, X } from 'lucide-react'
import Image from 'next/image'
import { FormEvent, useEffect, useRef, useState } from 'react'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

const MAX_MESSAGE_LENGTH = 2_000

const initialMessage: ChatMessage = {
  role: 'assistant',
  content: "Hi! I'm Errol's AI assistant. How can I help you today?",
}

function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    if (!isOpen) return

    inputRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleSend = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    const content = input.trim()
    if (!content || isLoading) return

    const userMessage: ChatMessage = { role: 'user', content }
    const nextMessages = [...messages, userMessage]

    setMessages(nextMessages)
    setInput('')
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })

      const data = (await response.json().catch(() => null)) as {
        message?: string
        error?: string
      } | null

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to connect to the assistant.')
      }

      if (!data?.message?.trim()) {
        throw new Error('The assistant returned an empty response.')
      }

      setMessages((current) => [
        ...current,
        { role: 'assistant', content: data.message!.trim() },
      ])
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Unable to connect to the assistant.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          id="portfolio-chat"
          role="dialog"
          aria-label="Chat with Errol's AI assistant"
          className="absolute bottom-[4.25rem] right-0 flex h-[min(36rem,calc(100svh-7rem))] w-[calc(100vw-2rem)] max-w-[24rem] origin-bottom-right flex-col overflow-hidden rounded-[1.5rem] border border-black/[0.1] bg-white/95 shadow-[0_24px_80px_-30px_rgba(0,0,0,0.4)] backdrop-blur-xl dark:border-white/[0.12] dark:bg-neutral-950/95 dark:shadow-[0_24px_80px_-30px_rgba(0,0,0,0.9)]"
        >
          <header className="flex items-center justify-between border-b border-black/[0.08] p-4 dark:border-white/[0.1]">
            <div className="flex items-center gap-3">
              <div className="relative size-9 overflow-hidden rounded-full border border-black/[0.1] dark:border-white/[0.12]">
                <Image src={profile} alt="Errol Tabangen" fill className="object-cover" />
              </div>
              <div>
                <h2 className="text-sm font-semibold tracking-[-0.02em]">
                  Errol&apos;s assistant
                </h2>
                <p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-black/40 dark:text-white/40">
                  <span className="size-1.5 rounded-full bg-black dark:bg-white" aria-hidden="true" />
                  AI-powered portfolio guide
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="grid size-9 place-items-center rounded-full text-black/50 transition-colors hover:bg-black/[0.05] hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black md:cursor-none dark:text-white/50 dark:hover:bg-white/[0.08] dark:hover:text-white dark:focus-visible:outline-white"
            >
              <X className="size-4 stroke-[1.7]" aria-hidden="true" />
            </button>
          </header>

          <div
            className="flex-1 space-y-3 overflow-y-auto bg-black/[0.015] p-4 dark:bg-white/[0.015]"
            aria-live="polite"
            aria-busy={isLoading}
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <p
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-5 ${
                    message.role === 'user'
                      ? 'rounded-br-md bg-black text-white dark:bg-white dark:text-black'
                      : 'rounded-bl-md border border-black/[0.08] bg-white text-black/65 dark:border-white/[0.1] dark:bg-white/[0.055] dark:text-white/65'
                  }`}
                >
                  {message.content}
                </p>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start" role="status">
                <div className="flex gap-1 rounded-2xl rounded-bl-md border border-black/[0.08] bg-white px-4 py-3 dark:border-white/[0.1] dark:bg-white/[0.055]">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="size-1 animate-bounce rounded-full bg-black/35 motion-reduce:animate-none dark:bg-white/35"
                      style={{ animationDelay: `${dot * 140}ms` }}
                    />
                  ))}
                  <span className="sr-only">Assistant is responding</span>
                </div>
              </div>
            )}
            {error && !isLoading && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/[0.06] px-3 py-2.5 text-xs text-red-700 dark:text-red-300" role="alert">
                <p>{error}</p>
                <button
                  type="button"
                  onClick={() => {
                    const lastUserMessage = [...messages].reverse().find((message) => message.role === 'user')
                    if (!lastUserMessage) return
                    setMessages((current) => current.slice(0, -1))
                    setInput(lastUserMessage.content)
                    setError(null)
                    inputRef.current?.focus()
                  }}
                  className="mt-1.5 font-semibold underline underline-offset-2"
                >
                  Edit and retry
                </button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSend}
            className="border-t border-black/[0.08] bg-white p-3 dark:border-white/[0.1] dark:bg-neutral-950"
          >
            <label htmlFor="chat-message" className="sr-only">
              Message
            </label>
            <div className="flex items-center gap-2 rounded-full border border-black/[0.1] bg-black/[0.02] p-1.5 pl-4 focus-within:border-black/25 dark:border-white/[0.12] dark:bg-white/[0.035] dark:focus-within:border-white/25">
              <input
                ref={inputRef}
                id="chat-message"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about Errol’s work…"
                autoComplete="off"
                maxLength={MAX_MESSAGE_LENGTH}
                disabled={isLoading}
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-black/30 md:cursor-none dark:placeholder:text-white/30"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="grid size-9 shrink-0 place-items-center rounded-full bg-black text-white transition-transform hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-35 md:cursor-none dark:bg-white dark:text-black dark:focus-visible:outline-white"
              >
                <Send className="size-3.5 stroke-[1.8]" aria-hidden="true" />
              </button>
            </div>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="portfolio-chat"
        aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
        className="group ml-auto flex h-12 items-center gap-2.5 rounded-full border border-white/10 bg-neutral-950 px-4 text-sm font-medium text-white shadow-[0_12px_35px_-16px_rgba(0,0,0,0.55)] transition-transform hover:scale-[1.025] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black active:scale-[0.98] md:cursor-none dark:border-black/10 dark:bg-white dark:text-black dark:focus-visible:outline-white"
      >
        {isOpen ? (
          <X className="size-4 stroke-[1.7]" aria-hidden="true" />
        ) : (
          <Sparkles className="size-4 stroke-[1.6]" aria-hidden="true" />
        )}
        <span className={isOpen ? 'sr-only' : 'hidden sm:inline'}>
          Ask my AI
        </span>
      </button>
    </div>
  )
}

export default ChatButton
