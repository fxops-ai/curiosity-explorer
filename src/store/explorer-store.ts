import { create } from "zustand";
import type { ExplorerTree, LlmSettings, SplitPane } from "@/lib/tree/types";
import { createEmptyTree, REENTRY_GAP_MS } from "@/lib/tree/ops";
import { uid } from "@/lib/tree/ids";
import { listTrees, loadMeta, loadTree, saveMeta, saveTree } from "@/lib/tree/storage";

type Status = "boot" | "ready" | "error";

type ExplorerState = {
  status: Status;
  trees: ExplorerTree[];
  tree: ExplorerTree | null;
  settings: LlmSettings;
  showBriefing: boolean;
  showTrees: boolean;
  showSettings: boolean;
  showTicklers: boolean;
  showMap: boolean;
  showOutlineMobile: boolean;
  pendingBranch: { parentId: string; why: string } | null;
  hydrate: () => Promise<void>;
  persist: () => Promise<void>;
  setTree: (t: ExplorerTree) => void;
  newTree: (name?: string) => Promise<void>;
  openTree: (id: string) => Promise<void>;
  renameTree: (name: string) => void;
  setActive: (nodeId: string) => void;
  addUserAndPlaceholder: (paneId: "main" | string, text: string, why?: string) => {
    userId: string;
    assistantId: string;
  } | null;
  fillAssistant: (assistantId: string, text: string) => void;
  failAssistant: (assistantId: string, error: string) => void;
  addAsset: (nodeId: string, title: string, content: string) => void;
  addTickler: (text: string) => void;
  addOpenItem: (text: string) => void;
  toggleOpenItem: (id: string) => void;
  openSplit: (nodeId: string) => void;
  closeSplit: (paneId: string) => void;
  setSplitDraft: (paneId: string, draft: string) => void;
  setMainDraft: (draft: string) => void;
  mainDraft: string;
  setPendingBranch: (v: { parentId: string; why: string } | null) => void;
  setSettings: (s: Partial<LlmSettings>) => void;
  dismissBriefing: () => void;
  closeSession: () => void;
  setFlag: (k: keyof Pick<
    ExplorerState,
    "showTrees" | "showSettings" | "showTicklers" | "showMap" | "showOutlineMobile" | "showBriefing"
  >, v: boolean) => void;
};

function touch(tree: ExplorerTree): ExplorerTree {
  return { ...tree, updatedAt: Date.now() };
}

export const useExplorer = create<ExplorerState>((set, get) => ({
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
    let tree: ExplorerTree | null = null;
    if (meta.lastTreeId) tree = await loadTree(meta.lastTreeId);
    if (!tree && trees[0]) tree = trees[0];
    const now = Date.now();
    let showBriefing = false;
    if (tree) {
      const gap = now - (tree.lastClosedAt ?? tree.lastOpenedAt);
      showBriefing =
        Boolean(tree.lastClosedAt) &&
        (gap > REENTRY_GAP_MS || tree.ticklers.length > 0);
      tree = { ...tree, lastOpenedAt: now };
      await saveTree(tree);
    }
    set({
      status: "ready",
      trees,
      tree,
      settings: meta.settings,
      showBriefing,
    });
  },

  persist: async () => {
    const { tree } = get();
    if (!tree) return;
    await saveTree(tree);
    saveMeta({ lastTreeId: tree.id, settings: get().settings });
    const trees = await listTrees();
    set({ trees });
  },

  setTree: (t) => set({ tree: touch(t) }),

  newTree: async (name) => {
    const tree = createEmptyTree(name || "Untitled exploration");
    await saveTree(tree);
    saveMeta({ lastTreeId: tree.id, settings: get().settings });
    const trees = await listTrees();
    set({ tree, trees, showBriefing: false, mainDraft: "", showTrees: false });
  },

  openTree: async (id) => {
    const loaded = await loadTree(id);
    if (!loaded) return;
    const now = Date.now();
    const gap = now - (loaded.lastClosedAt ?? loaded.lastOpenedAt);
    const showBriefing =
      Boolean(loaded.lastClosedAt) &&
      (gap > REENTRY_GAP_MS || loaded.ticklers.length > 0);
    const tree = { ...loaded, lastOpenedAt: now };
    await saveTree(tree);
    saveMeta({ lastTreeId: tree.id, settings: get().settings });
    set({ tree, showBriefing, showTrees: false, mainDraft: "" });
  },

  renameTree: (name) => {
    const tree = get().tree;
    if (!tree) return;
    const next = touch({
      ...tree,
      name,
      nodes: {
        ...tree.nodes,
        [tree.rootId]: { ...tree.nodes[tree.rootId], content: name },
      },
    });
    set({ tree: next });
    void get().persist();
  },

  setActive: (nodeId) => {
    const tree = get().tree;
    if (!tree || !tree.nodes[nodeId]) return;
    set({ tree: touch({ ...tree, activeNodeId: nodeId }) });
    void get().persist();
  },

  addUserAndPlaceholder: (paneId, text, why) => {
    const tree = get().tree;
    if (!tree) return null;
    const parentId =
      paneId === "main"
        ? tree.activeNodeId
        : (tree.splits.find((s) => s.id === paneId)?.focusNodeId ?? tree.activeNodeId);
    const parent = tree.nodes[parentId];
    if (!parent) return null;
    const now = Date.now();
    const userId = uid("u");
    const assistantId = uid("a");
    const userNode = {
      id: userId,
      parentId,
      role: "user" as const,
      content: text,
      createdAt: now,
      decisionMap: why || undefined,
      assets: [],
      children: [assistantId],
    };
    const assistantNode = {
      id: assistantId,
      parentId: userId,
      role: "assistant" as const,
      content: "",
      createdAt: now,
      assets: [],
      children: [],
    };
    const nodes = {
      ...tree.nodes,
      [parentId]: { ...parent, children: [...parent.children, userId] },
      [userId]: userNode,
      [assistantId]: assistantNode,
    };
    let splits = tree.splits;
    let activeNodeId = tree.activeNodeId;
    if (paneId === "main") {
      activeNodeId = assistantId;
    } else {
      splits = splits.map((s) =>
        s.id === paneId ? { ...s, focusNodeId: assistantId, draft: "" } : s,
      );
    }
    set({
      tree: touch({ ...tree, nodes, splits, activeNodeId }),
      mainDraft: paneId === "main" ? "" : get().mainDraft,
    });
    void get().persist();
    return { userId, assistantId };
  },

  fillAssistant: (assistantId, text) => {
    const tree = get().tree;
    if (!tree || !tree.nodes[assistantId]) return;
    set({
      tree: touch({
        ...tree,
        nodes: {
          ...tree.nodes,
          [assistantId]: { ...tree.nodes[assistantId], content: text },
        },
      }),
    });
    void get().persist();
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
      kind: "note" as const,
      title,
      content,
      createdAt: Date.now(),
    };
    set({
      tree: touch({
        ...tree,
        nodes: {
          ...tree.nodes,
          [nodeId]: { ...node, assets: [...node.assets, asset] },
        },
      }),
    });
    void get().persist();
  },

  addTickler: (text) => {
    const tree = get().tree;
    if (!tree || !text.trim()) return;
    set({
      tree: touch({
        ...tree,
        ticklers: [
          ...tree.ticklers,
          {
            id: uid("tick"),
            nodeId: tree.activeNodeId,
            text: text.trim(),
            createdAt: Date.now(),
          },
        ],
      }),
    });
    void get().persist();
  },

  addOpenItem: (text) => {
    const tree = get().tree;
    if (!tree || !text.trim()) return;
    set({
      tree: touch({
        ...tree,
        openItems: [
          ...tree.openItems,
          { id: uid("todo"), text: text.trim(), done: false, createdAt: Date.now() },
        ],
      }),
    });
    void get().persist();
  },

  toggleOpenItem: (id) => {
    const tree = get().tree;
    if (!tree) return;
    set({
      tree: touch({
        ...tree,
        openItems: tree.openItems.map((i) =>
          i.id === id ? { ...i, done: !i.done } : i,
        ),
      }),
    });
    void get().persist();
  },

  openSplit: (nodeId) => {
    const tree = get().tree;
    if (!tree) return;
    if (tree.splits.length >= 3) return;
    const pane: SplitPane = { id: uid("split"), focusNodeId: nodeId, draft: "" };
    set({ tree: touch({ ...tree, splits: [...tree.splits, pane] }) });
    void get().persist();
  },

  closeSplit: (paneId) => {
    const tree = get().tree;
    if (!tree) return;
    set({ tree: touch({ ...tree, splits: tree.splits.filter((s) => s.id !== paneId) }) });
    void get().persist();
  },

  setSplitDraft: (paneId, draft) => {
    const tree = get().tree;
    if (!tree) return;
    set({
      tree: {
        ...tree,
        splits: tree.splits.map((s) => (s.id === paneId ? { ...s, draft } : s)),
      },
    });
  },

  setMainDraft: (draft) => set({ mainDraft: draft }),
  setPendingBranch: (v) => set({ pendingBranch: v }),
  setSettings: (s) => {
    const settings = { ...get().settings, ...s };
    set({ settings });
    saveMeta({ lastTreeId: get().tree?.id ?? null, settings });
  },
  dismissBriefing: () => set({ showBriefing: false }),
  closeSession: () => {
    const tree = get().tree;
    if (!tree) return;
    const next = { ...tree, lastClosedAt: Date.now() };
    set({ tree: next, showTicklers: false });
    void saveTree(next);
  },
  setFlag: (k, v) => set({ [k]: v } as Partial<ExplorerState>),
}));

export function needsDecision(tree: ExplorerTree, parentId: string) {
  const parent = tree.nodes[parentId];
  return Boolean(parent && parent.children.length > 0);
}
