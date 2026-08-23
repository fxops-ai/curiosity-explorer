import {
  completeCustomEndpoint,
  completeExploration,
  type ChatMessage,
  type ChatResult,
} from "./chat";
import type { LlmSettings } from "@/lib/tree/types";

export async function runTurn(
  settings: LlmSettings,
  messages: ChatMessage[],
  maxTokens?: number,
): Promise<ChatResult> {
  if (settings.provider === "custom") {
    return completeCustomEndpoint({
      baseUrl: settings.customBaseUrl,
      apiKey: settings.customApiKey,
      model: settings.customModel,
      messages,
      maxTokens,
    });
  }
  return completeExploration({ data: { messages, maxTokens } });
}
