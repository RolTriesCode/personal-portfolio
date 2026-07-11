This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## AI Chat Setup

The server attempts providers in this order: Groq, Cerebras, then OpenRouter. A
missing key skips that provider; request failures, timeouts, and rate limits move
to the next configured provider automatically.

1. Create API keys in the [Groq Console](https://console.groq.com/keys),
   [Cerebras Cloud](https://cloud.cerebras.ai/), and
   [OpenRouter](https://openrouter.ai/settings/keys).
2. Copy `.env.example` to `.env.local`.
3. Add at least one provider key. Configure all three for full fallback coverage.
4. Restart the Next.js server after changing environment variables.

The default models can be overridden with `GROQ_MODEL`, `CEREBRAS_MODEL`, and
`OPENROUTER_MODEL`. `openrouter/free` uses OpenRouter's available free-model
router. Keep all secret variables server-side and never prefix API keys with
`NEXT_PUBLIC_`.

The router can be reused from server-only code:

```ts
import { generateAIResponse } from "@/lib/ai/router";

const response = await generateAIResponse({
  messages: [{ role: "user", content: "Hello" }],
  systemPrompt: "Answer concisely.",
});
```

The existing chatbot posts to `POST /api/chat` with a `messages` array and
receives `{ "message": "..." }`.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
