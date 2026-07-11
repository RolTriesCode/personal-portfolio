import { NextResponse } from "next/server";

import {
  AIConfigurationError,
  generateAIResponse,
  type AIMessage,
} from "@/lib/ai/router";

export const runtime = "nodejs";

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2_000;

const systemPrompt = `You are Errol Tabangen's AI portfolio assistant. Errol is a full-stack web developer based in Vigan City, Philippines and a student at the University of Northern Philippines.

He works with Next.js, React, TypeScript, Tailwind CSS, Node.js, Prisma, PostgreSQL, MongoDB, Sanity, Clerk, Stripe, and GSAP. His work includes AI-powered platforms, enterprise tools, e-commerce experiences, and developer portfolios.

Communicate clearly, professionally, and concisely. Be friendly and solution-oriented. For hiring, availability, or freelance questions, say that Errol is open to opportunities. Contact: erroltabangen.dev@gmail.com and linkedin.com/in/erroltabangen. Give practical, beginner-friendly technical advice and gently redirect unrelated topics toward Errol's work or professional topics. Do not claim to be Errol; clearly identify yourself as his AI assistant when relevant.`;

function parseMessages(value: unknown): AIMessage[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_MESSAGES) {
    return null;
  }

  const messages: AIMessage[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") return null;

    const { role, content } = item as Record<string, unknown>;
    if (
      (role !== "user" && role !== "assistant") ||
      typeof content !== "string" ||
      content.trim().length === 0 ||
      content.length > MAX_MESSAGE_LENGTH
    ) {
      return null;
    }

    messages.push({ role, content: content.trim() });
  }

  return messages;
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const messages = parseMessages(
      body && typeof body === "object"
        ? (body as Record<string, unknown>).messages
        : undefined,
    );

    if (!messages) {
      return NextResponse.json(
        { error: "Please send a valid message." },
        { status: 400 },
      );
    }

    const message = await generateAIResponse({ messages, systemPrompt });
    return NextResponse.json({ message });
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 },
      );
    }

    if (error instanceof AIConfigurationError) {
      console.error("Chat API has no configured AI providers");
      return NextResponse.json(
        { error: "Chat service is not configured." },
        { status: 503 },
      );
    }

    console.error("All AI providers failed", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json(
      { error: "The assistant could not respond. Please try again." },
      { status: 502 },
    );
  }
}
