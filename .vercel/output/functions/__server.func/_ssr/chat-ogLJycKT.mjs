import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-ogLJycKT.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var SYSTEM = `You are a thoughtful exploration partner inside Curiosity Explorer.
Stay with the current branch of thought. Do not recap the whole history unless asked.
Be precise, curious, and useful. When the user is branching, honor the stated reason.
Keep replies focused — typically 2–6 short paragraphs unless they ask for more.
When asked for a re-entry briefing, write as a human collaborator picking up a conversation:
what they were working on, the interpreted direction of thought, last assets/branch, and open items.`;
var completeExploration_createServerFn_handler = createServerRpc({
	id: "38985a903a511b239d9da1bf3ec1a5c7efb4e3554c47f509b957b43aea388318",
	name: "completeExploration",
	filename: "src/lib/ai/chat.ts"
}, (opts) => completeExploration.__executeServer(opts));
var completeExploration = createServerFn({ method: "POST" }).validator((input) => input).handler(completeExploration_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Grok is not available in this environment."
	};
	const messages = [{
		role: "system",
		content: SYSTEM
	}, ...data.messages.slice(-24)];
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			messages,
			max_tokens: data.maxTokens ?? 900,
			temperature: .6
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `xAI API error ${res.status}`
	};
	return {
		ok: true,
		text: (await res.json()).choices?.[0]?.message?.content ?? ""
	};
});
//#endregion
export { completeExploration_createServerFn_handler };
