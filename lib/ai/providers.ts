import "server-only";

import OpenAI from "openai";

import type { AIProviderName } from "./types";

export type AIProvider = {
  name: AIProviderName;
  model: string;
  client: OpenAI;
};

type ProviderDefinition = {
  name: AIProviderName;
  apiKey: string | undefined;
  baseURL: string;
  model: string;
  defaultHeaders?: Record<string, string>;
};

const PROVIDER_TIMEOUT_MS = 15_000;

export function getConfiguredProviders(): AIProvider[] {
  const definitions: ProviderDefinition[] = [
    {
      name: "groq",
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
      model: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
    },
    {
      name: "cerebras",
      apiKey: process.env.CEREBRAS_API_KEY,
      baseURL: "https://api.cerebras.ai/v1",
      model: process.env.CEREBRAS_MODEL ?? "gpt-oss-120b",
    },
    {
      name: "openrouter",
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
      model: process.env.OPENROUTER_MODEL ?? "openrouter/free",
      defaultHeaders: {
        ...(process.env.SITE_URL
          ? { "HTTP-Referer": process.env.SITE_URL }
          : {}),
        "X-Title": "Errol Tabangen Portfolio",
      },
    },
  ];

  return definitions.flatMap((provider) => {
    if (!provider.apiKey) return [];

    return [
      {
        name: provider.name,
        model: provider.model,
        client: new OpenAI({
          apiKey: provider.apiKey,
          baseURL: provider.baseURL,
          defaultHeaders: provider.defaultHeaders,
          maxRetries: 0,
          timeout: PROVIDER_TIMEOUT_MS,
        }),
      },
    ];
  });
}
