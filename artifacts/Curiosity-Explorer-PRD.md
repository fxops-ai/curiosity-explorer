# PRD: Curiosity Explorer
**Version:** 0.1  
**Status:** Ready for agent execution  
**Owner:** Personal open-source tool (John / Growth CRO)  
**Primary Goal:** Preserve curiosity momentum across interruptions so a deep exploration can be resumed with near-original intellectual and emotional state.

---

## 1. Problem Statement

When engaged in curiosity-driven exploration, answers spawn new questions. Interruptions (time, context switches) cause loss of active curiosity state. Static notes or chat logs can be recovered, but re-reading them does not restore the original momentum or direction of thought. Parallel threads of inquiry are difficult to maintain without losing the main thread.

Existing linear chat, knowledge graphs, and branching tools preserve content but not the *live curiosity context* required for high-fidelity resumption.

## 2. Solution Summary

A local-first, open-source system that records exploration as a navigable tree of conversation paths + static assets (path memory).  

Key capabilities:
- Every branch is durable path memory with an explicit decision map (“why this direction”).
- On return after interruption, a human-style re-entry briefing restores context and momentum.
- Up to 4 concurrent split-window parallel explorations.
- Export to a minimal, self-contained HTML artifact (+ optional sidecar) that runs in any modern browser with no extensions.
- Local-first LLM support (OpenAI-compatible endpoints).

## 3. Goals & Non-Goals

### Goals (v1)
- Enable high-fidelity resumption of interrupted curiosity-driven work.
- Support parallel branches of thought without losing the main thread.
- Produce a portable, shareable artifact with zero external dependencies for core navigation.
- Remain fully usable offline after initial load when a local LLM endpoint is configured.
- Keep the interface fast and low-overhead.

### Non-Goals (v1)
- Real-time multiplayer / collaborative editing.
- Automatic suggestion of new branches by the model.
- Mobile-native or heavily optimized mobile UI.
- Advanced cross-tree search or global knowledge graph features.
- Heavy spatial canvas as the primary interaction model.
- Mandatory cloud LLM dependency.

## 4. Personas

**Primary:** Individual knowledge worker / explorer (the author) who frequently dives deep into ideas, gets interrupted, and needs to re-enter with momentum intact. Values privacy, local control, and open-source tools. Runs local LLMs on Apple Silicon.

**Secondary:** Other independent researchers, GTM operators, and builders who share the same interruption + curiosity pattern and prefer portable HTML artifacts.

## 5. Core User Stories

1. As an explorer, I can start from a simple interface and grow a conversation tree where each branch records both content and the reason it was taken.
2. As an explorer, I can open up to 4 split windows, each with its own instructions/context, pursue parallel lines of thought, and close them when finished while retaining the branches in the tree.
3. As an explorer, when I return after an interruption, I receive a concise re-entry briefing that restores what I was doing, the direction of thought, recent assets, open items, and any ticklers I left.
4. As an explorer, I can leave lightweight ticklers at the end of a session specifically to help future-me re-ignite curiosity.
5. As an explorer, I can export the current tree as a single self-contained HTML file (plus optional sidecar for large assets) that opens and functions in any modern browser with no extensions.
6. As an explorer, I can navigate primarily via a fast indented outline of the active path while optionally opening a lightweight tree mini-map for orientation.

## 6. Functional Requirements

### 6.1 Tree & Path Memory
- FR-1: The system maintains a tree (not DAG in v1) of nodes. Each node contains: role, content, timestamp, parent reference, optional decision-map entry (“why this branch/question”), and references to attached assets.
- FR-2: Every branch is permanent path memory (memorialization of thought). Nodes are not deleted in normal use; pruning is out of scope for v1.
- FR-3: User can explicitly record or the system can lightly assist in capturing a decision-map entry at branch creation time.
- FR-4: Assets generated or attached during exploration are frozen as static artifacts linked to the relevant node(s).

### 6.2 Parallel Exploration (Split Windows)
- FR-5: User can open up to 4 concurrent split windows.
- FR-6: Each split window maintains its own local conversation context and can receive independent instructions.
- FR-7: Closing a split window retains the branch in the main tree; it does not destroy the path memory.
- FR-8: Active splits are visually distinct and can be focused independently.

### 6.3 Re-entry & Ticklers
- FR-9: On opening a previously saved tree after a time gap, the system presents a re-entry briefing containing:
  - Summary of what was being worked on + interpreted direction of thought
  - Last relevant assets / current branch tip
  - Stated open items / to-dos
  - Any ticklers left by the user
- FR-10: User can optionally end a session by leaving one or more ticklers (free-form notes + optional system-suggested items). Ticklers are stored as first-class lightweight annotations attached to the current branch tip.
- FR-11: Tickler content and exact briefing format are intentionally flexible in v1; the mechanism must exist and be prominent.

### 6.4 Navigation & Visualization
- FR-12: Default interaction view is a fast, classic indented outline (or nested list) focused on the active path + open splits.
- FR-13: Optional lightweight side mini-map / tree overview that can be toggled; it is not required to be constantly rendered.
- FR-14: Performance and low cognitive load take absolute priority over visual sophistication.
- FR-15: User can jump to any ancestor or previously visited node and continue from there.

### 6.5 LLM Integration
- FR-16: Support any OpenAI-compatible endpoint (local or remote). Default configuration should favor a local endpoint.
- FR-17: Core operations (re-entry briefing generation, decision-map assistance, tickler suggestions, normal conversation) must function with a local model.
- FR-18: Context passed to the LLM for any node is limited to the path from root to that node plus relevant assets (context isolation).
- FR-19: The system itself can read a compact representation of the tree to assist with briefings and navigation (LLM-as-TOC capability).

### 6.6 Export & Portability
- FR-20: Primary export format is a single self-contained HTML file that embeds necessary CSS, JS, and small assets. It must open and allow full navigation of the existing tree in any modern browser with no extensions or network required for core functionality.
- FR-21: Large binary assets that would bloat the HTML may be placed in an optional sidecar folder/file referenced relatively.
- FR-22: The exported artifact preserves all path memory, decision maps, assets, and ticklers without loss of navigational value.
- FR-23: Export is a one-click (or simple menu) action.

### 6.7 Persistence
- FR-24: During a working session, state is persisted locally (IndexedDB and/or File System Access API).
- FR-25: User can save / load named trees.

## 7. Non-Functional Requirements

- NFR-1: Local-first. Core experience must remain usable offline when a local LLM endpoint is configured.
- NFR-2: Performance. Outline view and basic navigation must feel instantaneous on typical modern hardware. Mini-map is secondary and may be deferred or simplified if it impacts speed.
- NFR-3: Portability. Exported HTML must function without build tools, extensions, or external CDNs for core features.
- NFR-4: Privacy. No data leaves the user’s machine unless the user explicitly configures a remote LLM endpoint.
- NFR-5: Codebase should be approachable for open-source contributors. Prefer lean, modern tooling that still produces a clean static export.

## 8. Technical Constraints & Recommendations

- Development stack: Prefer Svelte, Lit, or equivalent lightweight component approach that compiles to minimal vanilla JS. Pure vanilla is acceptable if structure remains maintainable.
- Storage: IndexedDB for session state; export produces static files.
- LLM: OpenAI-compatible API surface only in v1.
- Browser support: Modern evergreen browsers (Chrome, Firefox, Safari, Edge). No IE.
- No mandatory backend server for v1. Pure client-side + optional local LLM.

## 9. Success Criteria (v1)

Personal / experiential (primary):
- Author can leave a deep exploration, return days later, and within ~60–90 seconds feel sufficient restored context and pull to continue.
- Parallel ideation (up to 4 splits) feels natural and does not destroy main-thread momentum.
- Exported HTML opens cleanly offline and allows full review of the exploration path.

Secondary:
- Repository is public, documented, and runnable by others with only a local LLM endpoint (or none for pure review mode).
- No critical path requires a cloud service.

## 10. Open Items / Deferred Decisions

- Exact content taxonomy of a high-value tickler (to be refined through use).
- Precise visual design of the mini-map (keep minimal).
- Whether decision-map entries are mandatory or optional at every branch.
- Long-term storage format beyond HTML export (future).

## 11. Implementation Guidance for Agents

Priority order for construction:
1. Core tree data model + indented outline navigation + basic branching.
2. Split-window support (up to 4).
3. Local LLM conversation against path-isolated context.
4. Decision-map capture.
5. Re-entry briefing + tickler mechanism.
6. Single-HTML (+ sidecar) export.
7. Lightweight optional mini-map.
8. Polish, documentation, and open-source readiness.

All features above are in scope for v1 unless explicitly marked non-goal.  
Agents should favor working, testable increments over speculative architecture.

---

**End of PRD v0.1 — Curiosity Explorer**
