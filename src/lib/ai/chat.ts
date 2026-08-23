import { createServerFn } from "@tanstack/react-start";

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export type ChatResult = { ok: true; text: string } | { ok: false; error: string };

const SYSTEM = `You are a thoughtful exploration partner inside Curiosity Explorer.
Stay with the current branch of thought. Do not recap the whole history unless asked.
Be precise, curious, and useful. When the user is branching, honor the stated reason.
Keep replies focused — typically 2–6 short paragraphs unless they ask for more.
When asked for a re-entry briefing, write as a human collaborator picking up a conversation:
what they were working on, the interpreted direction of thought, last assets/branch, and open items.`;

export const completeExploration = createServerFn({ method: "POST" })
  .validator((input: { messages: ChatMessage[]; maxTokens?: number }) => input)
  .handler(async ({ data }): Promise<ChatResult> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false, error: "Grok is not available in this environment." };
    }

    const messages: ChatMessage[] = [
      { role: "system", content: SYSTEM },
      ...data.messages.slice(-24),
    ];

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        messages,
        max_tokens: data.maxTokens ?? 900,
        temperature: 0.6,
      }),
    });

    if (!res.ok) {
      return { ok: false, error: `xAI API error ${res.status}` };
    }

    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    return { ok: true, text: body.choices?.[0]?.message?.content ?? "" };
  });

export async function completeCustomEndpoint(opts: {
  baseUrl: string;
  apiKey: string;
  model: string;
  messages: ChatMessage[];
  maxTokens?: number;
}): Promise<ChatResult> {
  const url = `${opts.baseUrl.replace(/\/$/, "")}/chat/completions`;
  const messages: ChatMessage[] = [
    { role: "system", content: SYSTEM },
    ...opts.messages.slice(-24),
  ];
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(opts.apiKey ? { Authorization: `Bearer ${opts.apiKey}` } : {}),
      },
      body: JSON.stringify({
        model: opts.model,
        messages,
        max_tokens: opts.maxTokens ?? 900,
        temperature: 0.6,
      }),
    });
    if (!res.ok) return { ok: false, error: `Custom endpoint error ${res.status}` };
    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    return { ok: true, text: body.choices?.[0]?.message?.content ?? "" };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Custom endpoint failed",
    };
  }
}
