# Curiosity Explorer

**Path memory for thought.** A prototype for people who explore ideas until they get interrupted — and then cannot get the *same* curiosity back by re-reading a linear chat.

Built with [Grok Build](https://x.ai/build).

---

## Why this exists

Answers spawn the next question. That is the useful part of thinking.

What usually fails is **continuity**:

- Time runs out mid-thread.
- You have notes, files, or a transcript, but not the *charge* of the last thought.
- Re-warming by rereading is lossy. The original momentum does not come back.
- A parallel idea wants a sidebar, and linear chat makes you abandon the main path to chase it.

Curiosity Explorer records exploration as a **tree of paths**, not a single scroll. Each branch is durable *path memory*: what was said, why the fork happened, and any assets you pinned. When you return, the app tries to hand you the conversation like a collaborator who was in the room — not a cold log.

This v1 is a working prototype. It is meant to feel usable today and to make the next iterations obvious.

---

## What it produces

| Artifact | What you should expect |
| --- | --- |
| **Exploration tree** | A named tree of nodes (you / explorer / root). Nothing is pruned in normal use. |
| **Decision map** | Optional “why this branch” captured when you fork from a node that already has children. |
| **Pinned assets** | Static notes frozen on a node — memorialization, not a live wiki. |
| **Ticklers** | Short notes for future-you. They surface first on re-entry. |
| **Re-entry briefing** | After a pause, a short human-style recap: what you were doing, direction of thought, last branch, open items, ticklers. |
| **Split panes** | Up to four concurrent views (main + three splits) so a sidebar thought can run without killing the main thread. Closing a split **keeps** the branch. |
| **Standalone HTML** | One-click export: a self-contained page that opens in any modern browser, no extensions. Outline + thread of the existing tree (read/navigate). Large binaries can later use a sidecar; this prototype embeds the tree itself. |

Trees live **on this device** (IndexedDB). They are not a multi-user cloud brain.

---

## What to expect (prototype honesty)

- **Fast outline first.** The default view is an indented path, not a heavy canvas. The **Map** control opens a drawer of the full tree; click a node to jump.
- **Inference is user-initiated.** Sends, briefings, and similar calls happen when you act — not on every keystroke.
- **Local-first data.** Trees stay in the browser. Export is the portable unit.
- **Providers today:** Grok (server), OpenAI, Anthropic (settings ready; native API in v2), and any OpenAI-compatible **Custom** endpoint (Ollama, LM Studio, proxies). MCP inference servers remain a future option.

If a turn fails, the assistant node stores the error in place. The path is still there; try again or switch provider in Settings.

---

## How to use it

### 1. Begin

Open the app → **Begin an exploration** (or the **+** control). Name the tree in the header. That name is the root of the path.

### 2. Ask along one path

Type in the composer. **Ctrl/Cmd + Enter** or the send control.

The left **Path** outline (menu on small screens) is the table of contents. Click any ancestor or leaf to stand there and continue.

Context sent to the model is **this path only** (root → current node), not every sibling branch.

### 3. Branch instead of overwriting

If the node you are on already has children, the next send asks **Why this branch?** That is the decision map. Skip if you do not care; fill it when you want future-you to remember the *reason*.

**Branch here** focuses the current node so you can fork deliberately. Child chips under the thread jump into an existing fork.

### 4. Parallel thought (splits)

**Split** opens another pane on the same or another node (up to three extras). Each pane has its own composer and context. **Close** hides the pane; the nodes stay in the tree.

### 5. Pin and tickle

- **Pin asset** — freeze a note on the current node.
- **Pause** (ticklers) — leave a note for re-entry; **Save and mark paused** stamps the session so the next open can show a briefing.

After a gap (or if ticklers exist), a **Welcome back** briefing appears. Resume when oriented.

### 6. Map and export

- **Map** — full tree in a right-hand drawer.
- **Folder** — switch or start named explorations on this device.
- **Download** — transplant the current tree as HTML. Recipients can navigate the recorded path without the live app.

### Header controls (left to right, typical)

Explorations · New · Map · Export HTML · Ticklers / pause · Settings (Grok / OpenAI / Anthropic / Custom).

---

## Settings (inference)

| Provider | Where it runs | Notes |
| --- | --- | --- |
| **Grok** | Server | Uses the host’s xAI / Grok API when available. No key to paste in the browser. |
| **OpenAI** | Browser | Calls `https://api.openai.com/v1`. Paste your API key (stored **locally** only). Default model `gpt-4o`. |
| **Anthropic** | Browser | Settings UI is ready. Native Messages API is deferred to v2; for now it uses the OpenAI-compatible path. Use **Custom** + a proxy if you need full Anthropic compatibility today. Default model `claude-sonnet-4-20250514`. |
| **Custom** | Browser | Any OpenAI-compatible base URL (Ollama, LM Studio, OpenRouter, local proxies, etc.). Base URL + model + optional key stored **locally**. |

Keys never leave this device and are **not** included in HTML exports. The tree, ticklers, and export do not depend on a model — you can still navigate and ship HTML if inference is down.

---

## Run the source (optional)

For a Git checkout, not required to use a published preview:

```bash
npm install
npm run dev
```

```bash
npm run build
npm run typecheck
```

Product code lives under `src/components/explorer`, `src/lib/tree`, `src/lib/ai`, and `src/store`. The PRD is in `artifacts/Curiosity-Explorer-PRD.md`.

---

## Credit

Curiosity Explorer was designed and prototyped with **Grok Build**. The hosted app retains the platform’s Created with Grok attribution.

---

## License

MIT — see [LICENSE](./LICENSE).

Application data in IndexedDB is yours. Do not commit exploration dumps that contain private thought you do not want in git.
