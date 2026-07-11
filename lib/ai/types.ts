export type AIMessage = {
  role: "user" | "assistant";
  content: string;
};

export type GenerateAIResponseOptions = {
  messages: AIMessage[];
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
};

export type AIProviderName = "groq" | "cerebras" | "openrouter";
