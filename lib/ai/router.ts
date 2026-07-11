import "server-only";

import { getConfiguredProviders } from "./providers";
import type { GenerateAIResponseOptions } from "./types";

export class AIConfigurationError extends Error {
  constructor() {
    super("No AI provider is configured");
    this.name = "AIConfigurationError";
  }
}

export class AIProvidersExhaustedError extends Error {
  constructor() {
    super("All configured AI providers failed");
    this.name = "AIProvidersExhaustedError";
  }
}

export async function generateAIResponse({
  messages,
  systemPrompt,
  maxTokens = 500,
  temperature = 0.7,
}: GenerateAIResponseOptions): Promise<string> {
  const providers = getConfiguredProviders();
  if (providers.length === 0) throw new AIConfigurationError();

  const requestMessages = [
    ...(systemPrompt
      ? [{ role: "system" as const, content: systemPrompt }]
      : []),
    ...messages,
  ];

  for (const provider of providers) {
    try {
      const completion = await provider.client.chat.completions.create({
        model: provider.model,
        messages: requestMessages,
        max_tokens: maxTokens,
        temperature,
      });
      const content = completion.choices[0]?.message?.content?.trim();

      if (!content) throw new Error("Provider returned an empty response");

      return content;
    } catch (error: unknown) {
      console.warn("AI provider failed; trying fallback", {
        provider: provider.name,
        status:
          error && typeof error === "object" && "status" in error
            ? error.status
            : undefined,
        name: error instanceof Error ? error.name : "UnknownError",
      });
    }
  }

  throw new AIProvidersExhaustedError();
}

export type { AIMessage, GenerateAIResponseOptions } from "./types";
