import {
  completeCustomEndpoint,
  completeExploration,
  type ChatMessage,
  type ChatResult,
} from "./chat";
import type { LlmSettings } from "@/lib/tree/types";

const OPENAI_BASE = "https://api.openai.com/v1";
/** Anthropic native Messages API is deferred to v2. For v1 we still route through the
 *  OpenAI-compatible helper so the UI + settings surface is ready; pure Anthropic
 *  requests will need the native path later. */
const ANTHROPIC_BASE = "https://api.anthropic.com/v1";

export async function runTurn(
  settings: LlmSettings,
  messages: ChatMessage[],
  maxTokens?: number,
): Promise<ChatResult> {
  if (settings.provider === "openai") {
    return completeCustomEndpoint({
      baseUrl: OPENAI_BASE,
      apiKey: settings.openaiApiKey,
      model: settings.openaiModel,
      messages,
      maxTokens,
    });
  }
  if (settings.provider === "anthropic") {
    return completeCustomEndpoint({
      baseUrl: ANTHROPIC_BASE,
      apiKey: settings.anthropicApiKey,
      model: settings.anthropicModel,
      messages,
      maxTokens,
    });
  }
  if (settings.provider === "custom") {
    return completeCustomEndpoint({
      baseUrl: settings.customBaseUrl,
      apiKey: settings.customApiKey,
      model: settings.customModel,
      messages,
      maxTokens,
    });
  }
  // xai (default)
  return completeExploration({ data: { messages, maxTokens } });
}
