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
- **Default model is Grok** (server-side, when the host environment provides it). A **custom OpenAI-compatible endpoint** can be set in Settings (for example a local server). CORS and the local process are your responsibility.
- **Not yet:** MCP servers as inference backends, first-class multi-provider API-key vaults, automatic branch suggestions, real-time collab, or guaranteed fully-offline generation without a configured local endpoint.
- **Coming next:** local *or* cloud providers via **API key** or **MCP server**, so you can keep Grok, point at Ollama / LM Studio / other OpenAI-compatible hosts, or plug an MCP inference server without changing how the tree works.

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

Explorations · New · Map · Export HTML · Ticklers / pause · Settings (Grok vs custom endpoint).

---

## Settings (inference today)

| Mode | Behavior |
| --- | --- |
| **Grok** | Uses the host’s Grok API when available. No key to paste in the browser. |
| **Custom endpoint** | Browser calls `{base URL}/chat/completions` with your model name and optional key stored **locally**. Typical local bases look like an OpenAI-compatible `/v1` URL on your machine. |

The tree, ticklers, and export do not depend on a model. You can still navigate and ship HTML if inference is down.

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

## License intent

This prototype is intended for open source. The repository is public; add a LICENSE (MIT is typical) when you are ready. Application data in IndexedDB is yours; do not commit exploration dumps that contain private thought you do not want in git.
