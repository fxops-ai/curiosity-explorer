import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay$1, c as Slot, i as DialogDescription$1, n as DialogClose, o as DialogPortal, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as Plus, c as Map, d as Download, f as Bookmark, i as Settings, l as GitBranch, o as Pause, p as ArrowUp, r as SquareSplitHorizontal, s as Menu, t as X, u as FolderOpen } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D_2ggxor.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[opacity,transform,background-color] duration-150 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-fg text-accent-fg hover:opacity-90",
			accent: "bg-accent text-accent-fg hover:opacity-90",
			outline: "border border-border bg-transparent text-fg hover:bg-surface-2",
			ghost: "text-muted hover:bg-surface-2 hover:text-fg",
			subtle: "bg-surface-2 text-fg hover:bg-surface"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 px-3 text-xs",
			lg: "h-11 px-5",
			icon: "size-10",
			"icon-sm": "size-8"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("flex h-10 w-full rounded-sm border border-border bg-surface px-3 text-sm text-fg placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50", className),
		...props
	});
}
var Sheet = Dialog$1;
function SheetContent({ className, children, side = "left", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, { className: "fixed inset-0 z-50 bg-bg/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed z-50 flex h-full w-[min(100%,20rem)] flex-col border-border bg-surface p-4", side === "left" ? "left-0 border-r" : "right-0 border-l", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute right-3 top-3 rounded-sm p-2 text-muted hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function preview(node) {
	const t = node.content.replace(/\s+/g, " ").trim();
	if (node.role === "root") return t || "Root";
	return t.slice(0, 64) || node.role;
}
function OutlineItem({ tree, nodeId, depth, activeId, splitIds, onSelect }) {
	const node = tree.nodes[nodeId];
	if (!node) return null;
	const active = nodeId === activeId;
	const inSplit = splitIds.has(nodeId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onSelect(nodeId),
		className: cn("flex w-full items-start gap-2 rounded-sm px-2 py-1.5 text-left text-sm leading-snug", active ? "bg-accent/15 text-fg" : "text-muted hover:bg-surface-2 hover:text-fg", inSplit && !active && "ring-1 ring-accent/40"),
		style: { paddingLeft: 8 + depth * 12 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("mt-1 size-1.5 shrink-0 rounded-full", node.role === "user" && "bg-fg/70", node.role === "assistant" && "bg-accent", node.role === "root" && "bg-muted") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate",
				children: preview(node)
			}), node.decisionMap ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate text-xs text-subtle",
				children: node.decisionMap
			}) : null]
		})]
	}), node.children.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutlineItem, {
		tree,
		nodeId: id,
		depth: depth + 1,
		activeId,
		splitIds,
		onSelect
	}, id))] });
}
function OutlineTree({ tree, onSelect }) {
	const splitIds = new Set(tree.splits.map((s) => s.focusNodeId));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Path outline",
		className: "py-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutlineItem, {
			tree,
			nodeId: tree.rootId,
			depth: 0,
			activeId: tree.activeNodeId,
			splitIds,
			onSelect
		})
	});
}
function uid(prefix = "n") {
	return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}
function createEmptyTree(name = "Untitled exploration") {
	const now = Date.now();
	const rootId = uid("root");
	const root = {
		id: rootId,
		parentId: null,
		role: "root",
		content: name,
		createdAt: now,
		assets: [],
		children: []
	};
	return {
		id: uid("tree"),
		name,
		createdAt: now,
		updatedAt: now,
		lastOpenedAt: now,
		lastClosedAt: null,
		rootId,
		activeNodeId: rootId,
		nodes: { [rootId]: root },
		splits: [],
		ticklers: [],
		openItems: []
	};
}
function getPath(tree, nodeId) {
	const path = [];
	let current = tree.nodes[nodeId];
	const guard = /* @__PURE__ */ new Set();
	while (current && !guard.has(current.id)) {
		guard.add(current.id);
		path.push(current);
		if (!current.parentId) break;
		current = tree.nodes[current.parentId];
	}
	return path.reverse();
}
function pathAsMessages(tree, nodeId) {
	return getPath(tree, nodeId).filter((n) => n.role === "user" || n.role === "assistant").map((n) => ({
		role: n.role === "user" ? "user" : "assistant",
		content: n.content
	}));
}
function compactTreeToc(tree) {
	const lines = [];
	const walk = (id, depth) => {
		const node = tree.nodes[id];
		if (!node) return;
		const preview = node.content.replace(/\s+/g, " ").slice(0, 80);
		const why = node.decisionMap ? ` [why: ${node.decisionMap}]` : "";
		lines.push(`${"  ".repeat(depth)}- ${node.role}: ${preview}${why}`);
		for (const child of node.children) walk(child, depth + 1);
	};
	walk(tree.rootId, 0);
	return lines.join("\n");
}
function lastUserAssistant(tree, nodeId) {
	const path = getPath(tree, nodeId);
	return {
		lastUser: [...path].reverse().find((n) => n.role === "user"),
		lastAsst: [...path].reverse().find((n) => n.role === "assistant"),
		tip: path[path.length - 1]
	};
}
function formatText(text) {
	return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
		if (part.startsWith("**") && part.endsWith("**") && part.length > 4) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
			className: "font-medium",
			children: part.slice(2, -2)
		}, i);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part }, i);
	});
}
function NodeBlock({ node, ticklers }) {
	if (node.role === "root") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl text-fg",
			children: node.content
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Root of this path memory"
		})]
	});
	const isUser = node.role === "user";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-subtle",
			children: isUser ? "You" : "Explorer"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: isUser ? "rounded-lg rounded-tl-sm border border-border bg-surface-2 px-4 py-3" : "rounded-lg rounded-tr-sm border border-border bg-surface px-4 py-3",
			children: [
				node.decisionMap ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-2 text-xs text-accent",
					children: ["Why this branch: ", node.decisionMap]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "whitespace-pre-wrap text-sm leading-relaxed text-fg",
					children: formatText(node.content || (node.role === "assistant" ? "Thinking…" : ""))
				}),
				node.assets.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 rounded-sm border border-border bg-bg/40 px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted",
						children: a.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 whitespace-pre-wrap text-sm text-fg",
						children: a.content
					})]
				}, a.id)),
				ticklers.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 border-l-2 border-accent pl-3 text-sm text-muted",
					children: t
				}, t))
			]
		})]
	});
}
function Thread({ tree, focusId, onBranch, onSplit, onPinAsset, canSplit }) {
	const path = getPath(tree, focusId);
	const siblings = tree.nodes[focusId]?.children ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-0 flex-1 overflow-auto px-4 py-4 sm:px-6",
			children: [path.map((node) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodeBlock, {
				node,
				ticklers: tree.ticklers.filter((t) => t.nodeId === node.id).map((t) => t.text)
			}, node.id)), siblings.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex flex-wrap gap-2",
				children: siblings.map((id) => {
					const child = tree.nodes[id];
					if (!child) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onBranch(id),
						className: "max-w-full truncate rounded-full border border-border px-3 py-1.5 text-xs text-muted hover:border-accent hover:text-fg",
						children: child.content.replace(/\s+/g, " ").slice(0, 48) || "Continue"
					}, id);
				})
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2 border-t border-border px-4 py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: () => onBranch(focusId),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, {}), "Branch here"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					disabled: !canSplit,
					onClick: () => onSplit(focusId),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareSplitHorizontal, {}), "Split"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: () => onPinAsset(focusId),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, {}), "Pin asset"]
				})
			]
		})]
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-20 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-fg placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50", className),
		...props
	});
}
function Composer({ value, onChange, onSend, disabled, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-t border-border p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value,
				onChange: (e) => onChange(e.target.value),
				placeholder: placeholder ?? "Ask the next question…",
				rows: 3,
				disabled,
				onKeyDown: (e) => {
					if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
						e.preventDefault();
						onSend();
					}
				},
				className: "pr-12"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				size: "icon-sm",
				className: "absolute bottom-2 right-2",
				disabled: disabled || !value.trim(),
				onClick: onSend,
				"aria-label": "Send",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1.5 text-[11px] text-subtle",
			children: "Ctrl or Cmd + Enter to send"
		})]
	});
}
var Dialog = Dialog$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-bg/80 data-[state=open]:animate-in", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed left-1/2 top-1/2 z-50 w-[min(100%-1.5rem,32rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-surface p-5 shadow-lg", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute right-3 top-3 rounded-sm p-2 text-muted hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mb-4 space-y-1 pr-8", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-xl text-fg", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-xs font-medium tracking-wide text-muted", className),
		...props
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
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
var completeExploration = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("38985a903a511b239d9da1bf3ec1a5c7efb4e3554c47f509b957b43aea388318"));
async function completeCustomEndpoint(opts) {
	const url = `${opts.baseUrl.replace(/\/$/, "")}/chat/completions`;
	const messages = [{
		role: "system",
		content: SYSTEM
	}, ...opts.messages.slice(-24)];
	try {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...opts.apiKey ? { Authorization: `Bearer ${opts.apiKey}` } : {}
			},
			body: JSON.stringify({
				model: opts.model,
				messages,
				max_tokens: opts.maxTokens ?? 900,
				temperature: .6
			})
		});
		if (!res.ok) return {
			ok: false,
			error: `Custom endpoint error ${res.status}`
		};
		return {
			ok: true,
			text: (await res.json()).choices?.[0]?.message?.content ?? ""
		};
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Custom endpoint failed"
		};
	}
}
async function runTurn(settings, messages, maxTokens) {
	if (settings.provider === "custom") return completeCustomEndpoint({
		baseUrl: settings.customBaseUrl,
		apiKey: settings.customApiKey,
		model: settings.customModel,
		messages,
		maxTokens
	});
	return completeExploration({ data: {
		messages,
		maxTokens
	} });
}
function TreesDialog({ open, onOpenChange, trees, currentId, onOpen, onNew }) {
	const [name, setName] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Explorations" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Named trees live on this device only." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mb-4 flex gap-2",
				onSubmit: (e) => {
					e.preventDefault();
					onNew(name.trim() || "Untitled exploration");
					setName("");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: name,
					onChange: (e) => setName(e.target.value),
					placeholder: "New exploration name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: "Start"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "max-h-64 space-y-1 overflow-auto",
				children: trees.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm text-muted",
					children: "No trees yet."
				}) : trees.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onOpen(t.id),
					className: "flex w-full items-center justify-between rounded-sm px-3 py-2 text-left hover:bg-surface-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: t.id === currentId ? "text-fg" : "text-muted",
						children: t.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-subtle",
						children: new Date(t.updatedAt).toLocaleDateString()
					})]
				}) }, t.id))
			})
		] })
	});
}
function SettingsDialog({ open, onOpenChange, settings, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Model" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Default uses Grok on the server. A custom OpenAI-compatible URL talks from this browser (local Ollama, LM Studio, etc.)." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: settings.provider === "xai" ? "default" : "outline",
					onClick: () => onChange({ provider: "xai" }),
					children: "Grok"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: settings.provider === "custom" ? "default" : "outline",
					onClick: () => onChange({ provider: "custom" }),
					children: "Custom endpoint"
				})]
			}), settings.provider === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Base URL" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: settings.customBaseUrl,
					onChange: (e) => onChange({ customBaseUrl: e.target.value })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Model" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: settings.customModel,
					onChange: (e) => onChange({ customModel: e.target.value })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "API key (stored locally)" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "password",
					value: settings.customApiKey,
					onChange: (e) => onChange({ customApiKey: e.target.value })
				})
			] }) : null]
		})] })
	});
}
function TicklerDialog({ open, onOpenChange, onAdd, onCloseSession }) {
	const [text, setText] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Leave ticklers" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Notes for future-you. They surface first when you return." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: text,
				onChange: (e) => setText(e.target.value),
				placeholder: "Anything you want to see first next time?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => {
						if (text.trim()) onAdd(text);
						setText("");
						onCloseSession();
						onOpenChange(false);
					},
					children: "Save and mark paused"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: () => {
						if (text.trim()) onAdd(text);
						setText("");
						onOpenChange(false);
					},
					children: "Save tickler"
				})]
			})
		] })
	});
}
function BranchWhyDialog({ open, onOpenChange, onConfirm }) {
	const [why, setWhy] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => {
			if (!v) setWhy("");
			onOpenChange(v);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Why this branch?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Optional decision map — why this question, now." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: why,
				onChange: (e) => setWhy(e.target.value),
				placeholder: "e.g. Test the local-first assumption without cloud"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					onClick: () => onConfirm(""),
					children: "Skip"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: () => onConfirm(why.trim()),
					children: "Continue"
				})]
			})
		] })
	});
}
function AssetDialog({ open, onOpenChange, onSave }) {
	const [title, setTitle] = (0, import_react.useState)("Pinned note");
	const [content, setContent] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Pin a static asset" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Frozen to this node as path memory." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Title" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: title,
				onChange: (e) => setTitle(e.target.value),
				className: "mb-3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Content" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: content,
				onChange: (e) => setContent(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					onClick: () => {
						if (!content.trim()) return;
						onSave(title.trim() || "Pinned note", content.trim());
						setContent("");
						onOpenChange(false);
					},
					children: "Pin"
				})
			})
		] })
	});
}
function BriefingDialog({ open, onOpenChange, tree, settings }) {
	const [text, setText] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const snapshot = lastUserAssistant(tree, tree.activeNodeId);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		let cancelled = false;
		const heuristic = () => {
			return [
				`You were working on “${tree.name}”.`,
				snapshot.lastUser ? `Last question: ${snapshot.lastUser.content.slice(0, 220)}` : "No questions yet on this path.",
				snapshot.lastAsst ? `Last response opened: ${snapshot.lastAsst.content.slice(0, 220)}` : "",
				tree.ticklers.length ? `Ticklers:\n${tree.ticklers.map((t) => `• ${t.text}`).join("\n")}` : "No ticklers left last time.",
				tree.openItems.filter((i) => !i.done).length ? `Open items:\n${tree.openItems.filter((i) => !i.done).map((i) => `• ${i.text}`).join("\n")}` : ""
			].filter(Boolean).join("\n\n");
		};
		setText(heuristic());
		setLoading(true);
		runTurn(settings, [{
			role: "user",
			content: `Write a short re-entry briefing (120–180 words) for this exploration tree.\nName: ${tree.name}\nTicklers: ${JSON.stringify(tree.ticklers.map((t) => t.text))}\nOpen items: ${JSON.stringify(tree.openItems.filter((i) => !i.done).map((i) => i.text))}\nCurrent tip: ${snapshot.tip?.content.slice(0, 400)}\nTOC:\n${compactTreeToc(tree)}`
		}], 400).then((res) => {
			if (cancelled) return;
			setLoading(false);
			if (res.ok && res.text.trim()) setText(res.text.trim());
		});
		return () => {
			cancelled = true;
		};
	}, [open, tree.id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "w-[min(100%-1.5rem,36rem)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Welcome back" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: loading ? "Reading the path…" : "This is where curiosity left off." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-[50vh] overflow-auto whitespace-pre-wrap text-sm leading-relaxed text-fg",
					children: text
				}),
				tree.ticklers.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-1 border-t border-border pt-3",
					children: tree.ticklers.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm text-accent",
						children: t.text
					}, t.id))
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						onClick: () => onOpenChange(false),
						children: "Resume"
					})
				})
			]
		})
	});
}
var DB_NAME = "curiosity-explorer";
var DB_VERSION = 1;
var TREE_STORE = "trees";
var META_KEY = "ce-meta";
var defaultSettings = {
	provider: "xai",
	customBaseUrl: "http://localhost:11434/v1",
	customApiKey: "",
	customModel: "llama3.1"
};
function openDb() {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(DB_NAME, DB_VERSION);
		req.onupgradeneeded = () => {
			const db = req.result;
			if (!db.objectStoreNames.contains(TREE_STORE)) db.createObjectStore(TREE_STORE, { keyPath: "id" });
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}
async function listTrees() {
	const db = await openDb();
	return new Promise((resolve, reject) => {
		const req = db.transaction(TREE_STORE, "readonly").objectStore(TREE_STORE).getAll();
		req.onsuccess = () => {
			const rows = req.result ?? [];
			rows.sort((a, b) => b.updatedAt - a.updatedAt);
			resolve(rows);
		};
		req.onerror = () => reject(req.error);
	});
}
async function loadTree(id) {
	const db = await openDb();
	return new Promise((resolve, reject) => {
		const req = db.transaction(TREE_STORE, "readonly").objectStore(TREE_STORE).get(id);
		req.onsuccess = () => resolve(req.result ?? null);
		req.onerror = () => reject(req.error);
	});
}
async function saveTree(tree) {
	const db = await openDb();
	return new Promise((resolve, reject) => {
		const tx = db.transaction(TREE_STORE, "readwrite");
		tx.objectStore(TREE_STORE).put(tree);
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error);
	});
}
function loadMeta() {
	if (typeof localStorage === "undefined") return {
		lastTreeId: null,
		settings: { ...defaultSettings }
	};
	try {
		const raw = localStorage.getItem(META_KEY);
		if (!raw) return {
			lastTreeId: null,
			settings: { ...defaultSettings }
		};
		const parsed = JSON.parse(raw);
		return {
			lastTreeId: parsed.lastTreeId ?? null,
			settings: {
				...defaultSettings,
				...parsed.settings
			}
		};
	} catch {
		return {
			lastTreeId: null,
			settings: { ...defaultSettings }
		};
	}
}
function saveMeta(meta) {
	if (typeof localStorage === "undefined") return;
	localStorage.setItem(META_KEY, JSON.stringify(meta));
}
function touch(tree) {
	return {
		...tree,
		updatedAt: Date.now()
	};
}
var useExplorer = create((set, get) => ({
	status: "boot",
	trees: [],
	tree: null,
	settings: loadMeta().settings,
	showBriefing: false,
	showTrees: false,
	showSettings: false,
	showTicklers: false,
	showMap: false,
	showOutlineMobile: false,
	pendingBranch: null,
	mainDraft: "",
	hydrate: async () => {
		const meta = loadMeta();
		const trees = await listTrees();
		let tree = null;
		if (meta.lastTreeId) tree = await loadTree(meta.lastTreeId);
		if (!tree && trees[0]) tree = trees[0];
		const now = Date.now();
		let showBriefing = false;
		if (tree) {
			const gap = now - (tree.lastClosedAt ?? tree.lastOpenedAt);
			showBriefing = Boolean(tree.lastClosedAt) && (gap > 12e5 || tree.ticklers.length > 0);
			tree = {
				...tree,
				lastOpenedAt: now
			};
			await saveTree(tree);
		}
		set({
			status: "ready",
			trees,
			tree,
			settings: meta.settings,
			showBriefing
		});
	},
	persist: async () => {
		const { tree } = get();
		if (!tree) return;
		await saveTree(tree);
		saveMeta({
			lastTreeId: tree.id,
			settings: get().settings
		});
		set({ trees: await listTrees() });
	},
	setTree: (t) => set({ tree: touch(t) }),
	newTree: async (name) => {
		const tree = createEmptyTree(name || "Untitled exploration");
		await saveTree(tree);
		saveMeta({
			lastTreeId: tree.id,
			settings: get().settings
		});
		set({
			tree,
			trees: await listTrees(),
			showBriefing: false,
			mainDraft: "",
			showTrees: false
		});
	},
	openTree: async (id) => {
		const loaded = await loadTree(id);
		if (!loaded) return;
		const now = Date.now();
		const gap = now - (loaded.lastClosedAt ?? loaded.lastOpenedAt);
		const showBriefing = Boolean(loaded.lastClosedAt) && (gap > 12e5 || loaded.ticklers.length > 0);
		const tree = {
			...loaded,
			lastOpenedAt: now
		};
		await saveTree(tree);
		saveMeta({
			lastTreeId: tree.id,
			settings: get().settings
		});
		set({
			tree,
			showBriefing,
			showTrees: false,
			mainDraft: ""
		});
	},
	renameTree: (name) => {
		const tree = get().tree;
		if (!tree) return;
		set({ tree: touch({
			...tree,
			name,
			nodes: {
				...tree.nodes,
				[tree.rootId]: {
					...tree.nodes[tree.rootId],
					content: name
				}
			}
		}) });
		get().persist();
	},
	setActive: (nodeId) => {
		const tree = get().tree;
		if (!tree || !tree.nodes[nodeId]) return;
		set({ tree: touch({
			...tree,
			activeNodeId: nodeId
		}) });
		get().persist();
	},
	addUserAndPlaceholder: (paneId, text, why) => {
		const tree = get().tree;
		if (!tree) return null;
		const parentId = paneId === "main" ? tree.activeNodeId : tree.splits.find((s) => s.id === paneId)?.focusNodeId ?? tree.activeNodeId;
		const parent = tree.nodes[parentId];
		if (!parent) return null;
		const now = Date.now();
		const userId = uid("u");
		const assistantId = uid("a");
		const userNode = {
			id: userId,
			parentId,
			role: "user",
			content: text,
			createdAt: now,
			decisionMap: why || void 0,
			assets: [],
			children: [assistantId]
		};
		const assistantNode = {
			id: assistantId,
			parentId: userId,
			role: "assistant",
			content: "",
			createdAt: now,
			assets: [],
			children: []
		};
		const nodes = {
			...tree.nodes,
			[parentId]: {
				...parent,
				children: [...parent.children, userId]
			},
			[userId]: userNode,
			[assistantId]: assistantNode
		};
		let splits = tree.splits;
		let activeNodeId = tree.activeNodeId;
		if (paneId === "main") activeNodeId = assistantId;
		else splits = splits.map((s) => s.id === paneId ? {
			...s,
			focusNodeId: assistantId,
			draft: ""
		} : s);
		set({
			tree: touch({
				...tree,
				nodes,
				splits,
				activeNodeId
			}),
			mainDraft: paneId === "main" ? "" : get().mainDraft
		});
		get().persist();
		return {
			userId,
			assistantId
		};
	},
	fillAssistant: (assistantId, text) => {
		const tree = get().tree;
		if (!tree || !tree.nodes[assistantId]) return;
		set({ tree: touch({
			...tree,
			nodes: {
				...tree.nodes,
				[assistantId]: {
					...tree.nodes[assistantId],
					content: text
				}
			}
		}) });
		get().persist();
	},
	failAssistant: (assistantId, error) => {
		get().fillAssistant(assistantId, `Could not complete this turn.\n\n${error}`);
	},
	addAsset: (nodeId, title, content) => {
		const tree = get().tree;
		const node = tree?.nodes[nodeId];
		if (!tree || !node) return;
		const asset = {
			id: uid("asset"),
			kind: "note",
			title,
			content,
			createdAt: Date.now()
		};
		set({ tree: touch({
			...tree,
			nodes: {
				...tree.nodes,
				[nodeId]: {
					...node,
					assets: [...node.assets, asset]
				}
			}
		}) });
		get().persist();
	},
	addTickler: (text) => {
		const tree = get().tree;
		if (!tree || !text.trim()) return;
		set({ tree: touch({
			...tree,
			ticklers: [...tree.ticklers, {
				id: uid("tick"),
				nodeId: tree.activeNodeId,
				text: text.trim(),
				createdAt: Date.now()
			}]
		}) });
		get().persist();
	},
	addOpenItem: (text) => {
		const tree = get().tree;
		if (!tree || !text.trim()) return;
		set({ tree: touch({
			...tree,
			openItems: [...tree.openItems, {
				id: uid("todo"),
				text: text.trim(),
				done: false,
				createdAt: Date.now()
			}]
		}) });
		get().persist();
	},
	toggleOpenItem: (id) => {
		const tree = get().tree;
		if (!tree) return;
		set({ tree: touch({
			...tree,
			openItems: tree.openItems.map((i) => i.id === id ? {
				...i,
				done: !i.done
			} : i)
		}) });
		get().persist();
	},
	openSplit: (nodeId) => {
		const tree = get().tree;
		if (!tree) return;
		if (tree.splits.length >= 3) return;
		const pane = {
			id: uid("split"),
			focusNodeId: nodeId,
			draft: ""
		};
		set({ tree: touch({
			...tree,
			splits: [...tree.splits, pane]
		}) });
		get().persist();
	},
	closeSplit: (paneId) => {
		const tree = get().tree;
		if (!tree) return;
		set({ tree: touch({
			...tree,
			splits: tree.splits.filter((s) => s.id !== paneId)
		}) });
		get().persist();
	},
	setSplitDraft: (paneId, draft) => {
		const tree = get().tree;
		if (!tree) return;
		set({ tree: {
			...tree,
			splits: tree.splits.map((s) => s.id === paneId ? {
				...s,
				draft
			} : s)
		} });
	},
	setMainDraft: (draft) => set({ mainDraft: draft }),
	setPendingBranch: (v) => set({ pendingBranch: v }),
	setSettings: (s) => {
		const settings = {
			...get().settings,
			...s
		};
		set({ settings });
		saveMeta({
			lastTreeId: get().tree?.id ?? null,
			settings
		});
	},
	dismissBriefing: () => set({ showBriefing: false }),
	closeSession: () => {
		const tree = get().tree;
		if (!tree) return;
		const next = {
			...tree,
			lastClosedAt: Date.now()
		};
		set({
			tree: next,
			showTicklers: false
		});
		saveTree(next);
	},
	setFlag: (k, v) => set({ [k]: v })
}));
function needsDecision(tree, parentId) {
	const parent = tree.nodes[parentId];
	return Boolean(parent && parent.children.length > 0);
}
function esc(s) {
	return s.replace(/[&<>"']/g, (ch) => {
		switch (ch) {
			case "&": return "&amp;";
			case "<": return "&lt;";
			case ">": return "&gt;";
			case "\"": return "&quot;";
			default: return "&#39;";
		}
	});
}
function buildStandaloneHtml(tree) {
	const payload = JSON.stringify(tree);
	const title = esc(tree.name);
	return [
		"<!DOCTYPE html>",
		"<html lang=\"en\"><head><meta charset=\"utf-8\"/>",
		"<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/>",
		"<title>" + title + " — Curiosity Explorer</title>",
		"<style>",
		":root{--bg:#0b0c0b;--surf:#131513;--fg:#eceae4;--muted:#8a8d86;--line:rgba(236,234,228,.12);--accent:#9aada0}",
		"*{box-sizing:border-box}html,body{margin:0;height:100%;background:var(--bg);color:var(--fg);font-family:ui-sans-serif,system-ui,sans-serif}",
		"body{display:grid;grid-template-rows:auto 1fr}",
		"header{display:flex;align-items:baseline;justify-content:space-between;gap:16px;padding:16px 20px;border-bottom:1px solid var(--line)}",
		"header h1{font-weight:500;font-size:1.35rem;margin:0}",
		"header p{margin:0;color:var(--muted);font-size:.8rem}",
		"main{display:grid;grid-template-columns:minmax(200px,280px) 1fr;min-height:0}",
		"@media(max-width:720px){main{grid-template-columns:1fr}#outline{display:none}}",
		"#outline{border-right:1px solid var(--line);overflow:auto;padding:12px 8px 24px}",
		"#thread{overflow:auto;padding:20px 22px 48px;max-width:720px}",
		".item{display:block;width:100%;text-align:left;background:transparent;color:var(--fg);border:0;border-radius:8px;padding:6px 8px;cursor:pointer;font:inherit;font-size:.82rem}",
		".item.active{background:rgba(154,173,160,.16)}",
		".why{color:var(--muted);font-size:.72rem;display:block}",
		".meta{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:6px}",
		".bubble p{white-space:pre-wrap;line-height:1.55;margin:0}",
		".asset,.tick{margin-top:8px;padding:8px 10px;border:1px solid var(--line);border-radius:10px;font-size:.85rem}",
		"</style></head><body>",
		"<header><h1>" + title + "</h1><p>Path memory · read-only transplant</p></header>",
		"<main><nav id='outline'></nav><article id='thread'></article></main>",
		"<script>",
		"const TREE=" + payload + ";",
		"const outline=document.getElementById('outline');",
		"const thread=document.getElementById('thread');",
		"let active=TREE.activeNodeId;",
		"function path(id){const p=[];let n=TREE.nodes[id];const g=new Set();while(n&&!g.has(n.id)){g.add(n.id);p.push(n);if(!n.parentId)break;n=TREE.nodes[n.parentId];}return p.reverse();}",
		"function esc(s){return String(s).replace(/[&<>]/g,function(c){return {'&':'&'+'amp;','<':'&'+'lt;','>':'&'+'gt;'}[c];});}",
		"function preview(n){const t=(n.content||'').replace(/\\s+/g,' ').trim();return t.slice(0,72)||n.role;}",
		"function walk(id,depth){const n=TREE.nodes[id];if(!n)return '';const why=n.decisionMap?'<span class=why>'+esc(n.decisionMap)+'</span>':'';let html='<button class=\"item'+(id===active?' active':'')+'\" data-id=\"'+n.id+'\" style=\"padding-left:'+(8+depth*14)+'px\">'+esc(preview(n))+why+'</button>';for(const c of n.children)html+=walk(c,depth+1);return html;}",
		"function render(){outline.innerHTML=walk(TREE.rootId,0);thread.innerHTML=path(active).map(function(n){const assets=(n.assets||[]).map(function(a){return '<div class=asset><strong>'+esc(a.title)+'</strong><div>'+esc(a.content)+'</div></div>';}).join('');const ticks=(TREE.ticklers||[]).filter(function(t){return t.nodeId===n.id;}).map(function(t){return '<div class=tick>'+esc(t.text)+'</div>';}).join('');const why=n.decisionMap?'<div class=why>Why: '+esc(n.decisionMap)+'</div>':'';return '<section class=bubble><div class=meta>'+n.role+'</div><p>'+esc(n.content)+'</p>'+why+assets+ticks+'</section>';}).join('');}",
		"outline.addEventListener('click',function(e){const btn=e.target.closest('[data-id]');if(!btn)return;active=btn.getAttribute('data-id');render();});",
		"render();",
		"<\/script></body></html>"
	].join("");
}
function downloadStandaloneHtml(tree) {
	const html = buildStandaloneHtml(tree);
	const blob = new Blob([html], { type: "text/html;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	const slug = tree.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40) || "exploration";
	a.href = url;
	a.download = `${slug}.html`;
	a.click();
	URL.revokeObjectURL(url);
}
function ExplorerApp() {
	const store = useExplorer();
	const [busyPane, setBusyPane] = (0, import_react.useState)(null);
	const [assetNode, setAssetNode] = (0, import_react.useState)(null);
	const [pendingSend, setPendingSend] = (0, import_react.useState)(null);
	const [whyOpen, setWhyOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		store.hydrate();
	}, []);
	const tree = store.tree;
	async function send(paneId, text, why) {
		if (!tree || !text.trim() || busyPane) return;
		const created = store.addUserAndPlaceholder(paneId, text.trim(), why);
		if (!created) return;
		setBusyPane(paneId);
		const latest = useExplorer.getState().tree;
		if (!latest) return;
		const messages = [...pathAsMessages(latest, created.userId), ...why ? [{
			role: "user",
			content: `(Decision map for this branch: ${why})`
		}] : []];
		const result = await runTurn(store.settings, messages);
		if (result.ok) store.fillAssistant(created.assistantId, result.text);
		else store.failAssistant(created.assistantId, result.error);
		setBusyPane(null);
	}
	function requestSend(paneId, text) {
		if (!tree) return;
		const parentId = paneId === "main" ? tree.activeNodeId : tree.splits.find((s) => s.id === paneId)?.focusNodeId ?? tree.activeNodeId;
		if (needsDecision(tree, parentId)) {
			setPendingSend({
				paneId,
				text
			});
			setWhyOpen(true);
			return;
		}
		send(paneId, text);
	}
	const outline = tree ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-3 pb-1 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle",
		children: "Path"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutlineTree, {
		tree,
		onSelect: (id) => store.setActive(id)
	})] }) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-2 border-b border-border px-3 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon-sm",
						className: "md:hidden",
						onClick: () => store.setFlag("showOutlineMobile", true),
						"aria-label": "Open outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg leading-none",
							children: "Curiosity Explorer"
						}), tree ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: tree.name,
							onChange: (e) => store.renameTree(e.target.value),
							className: "mt-1 h-8 border-0 bg-transparent px-0 text-sm text-muted",
							"aria-label": "Exploration name"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Path memory for thought"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon-sm",
								"aria-label": "Explorations",
								onClick: () => store.setFlag("showTrees", true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon-sm",
								"aria-label": "New exploration",
								onClick: () => void store.newTree(),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: store.showMap ? "subtle" : "ghost",
								size: "icon-sm",
								"aria-label": "Toggle map",
								onClick: () => store.setFlag("showMap", !store.showMap),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon-sm",
								"aria-label": "Export HTML",
								disabled: !tree,
								onClick: () => tree && downloadStandaloneHtml(tree),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon-sm",
								"aria-label": "Ticklers",
								onClick: () => store.setFlag("showTicklers", true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon-sm",
								"aria-label": "Settings",
								onClick: () => store.setFlag("showSettings", true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, {})
							})
						]
					})
				]
			}),
			!tree ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { onStart: () => void store.newTree("First exploration") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "hidden w-64 shrink-0 overflow-auto border-r border-border md:block",
					children: outline
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "flex min-w-0 flex-1 flex-col border-r border-border last:border-r-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thread, {
								tree,
								focusId: tree.activeNodeId,
								onBranch: (id) => store.setActive(id),
								onSplit: (id) => store.openSplit(id),
								onPinAsset: (id) => setAssetNode(id),
								canSplit: tree.splits.length < 3
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Composer, {
								value: store.mainDraft,
								onChange: store.setMainDraft,
								disabled: busyPane === "main",
								onSend: () => requestSend("main", store.mainDraft)
							})]
						}),
						tree.splits.map((pane) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "flex min-w-0 flex-1 flex-col border-r border-border last:border-r-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-border px-3 py-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted",
										children: "Split"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "ghost",
										size: "sm",
										onClick: () => store.closeSplit(pane.id),
										children: "Close"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thread, {
									tree,
									focusId: pane.focusNodeId,
									onBranch: (id) => store.setActive(id),
									onSplit: (id) => store.openSplit(id),
									onPinAsset: (id) => setAssetNode(id),
									canSplit: tree.splits.length < 3
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Composer, {
									value: pane.draft,
									onChange: (v) => store.setSplitDraft(pane.id, v),
									disabled: busyPane === pane.id,
									placeholder: "Sidebar exploration…",
									onSend: () => requestSend(pane.id, pane.draft)
								})
							]
						}, pane.id)),
						store.showMap ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
							className: "hidden w-52 shrink-0 overflow-auto border-l border-border lg:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-3 pt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle",
								children: "Map"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutlineTree, {
								tree,
								onSelect: (id) => store.setActive(id)
							})]
						}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: store.showOutlineMobile,
				onOpenChange: (v) => store.setFlag("showOutlineMobile", v),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
					side: "left",
					children: outline
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TreesDialog, {
				open: store.showTrees,
				onOpenChange: (v) => store.setFlag("showTrees", v),
				trees: store.trees,
				currentId: tree?.id,
				onOpen: (id) => void store.openTree(id),
				onNew: (name) => void store.newTree(name)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsDialog, {
				open: store.showSettings,
				onOpenChange: (v) => store.setFlag("showSettings", v),
				settings: store.settings,
				onChange: store.setSettings
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicklerDialog, {
				open: store.showTicklers,
				onOpenChange: (v) => store.setFlag("showTicklers", v),
				onAdd: store.addTickler,
				onCloseSession: store.closeSession
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BranchWhyDialog, {
				open: whyOpen,
				onOpenChange: setWhyOpen,
				onConfirm: (why) => {
					setWhyOpen(false);
					if (pendingSend) send(pendingSend.paneId, pendingSend.text, why);
					setPendingSend(null);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetDialog, {
				open: Boolean(assetNode),
				onOpenChange: (v) => {
					if (!v) setAssetNode(null);
				},
				onSave: (title, content) => {
					if (assetNode) store.addAsset(assetNode, title, content);
				}
			}),
			tree ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefingDialog, {
				open: store.showBriefing,
				onOpenChange: (v) => store.setFlag("showBriefing", v),
				tree,
				settings: store.settings
			}) : null
		]
	});
}
function EmptyState({ onStart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex flex-1 flex-col items-center justify-center px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-4xl text-fg",
				children: "Stay in the question."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-md text-sm leading-relaxed text-muted",
				children: "Branch freely, pin what you found, leave ticklers for future-you. Interruptions no longer erase the pull of the last thought."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				className: "mt-8",
				onClick: onStart,
				children: "Begin an exploration"
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExplorerApp, {});
}
//#endregion
export { Home as component };
