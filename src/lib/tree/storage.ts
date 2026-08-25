import type { ExplorerMeta, ExplorerTree, LlmSettings } from "./types";

const DB_NAME = "curiosity-explorer";
const DB_VERSION = 1;
const TREE_STORE = "trees";
const META_KEY = "ce-meta";

const defaultSettings: LlmSettings = {
  provider: "xai",
  openaiApiKey: "",
  openaiModel: "gpt-4o",
  anthropicApiKey: "",
  anthropicModel: "claude-sonnet-4-20250514",
  customBaseUrl: "http://localhost:11434/v1",
  customApiKey: "",
  customModel: "llama3.1",
};

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(TREE_STORE)) {
        db.createObjectStore(TREE_STORE, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function listTrees(): Promise<ExplorerTree[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(TREE_STORE, "readonly");
    const req = tx.objectStore(TREE_STORE).getAll();
    req.onsuccess = () => {
      const rows = (req.result as ExplorerTree[]) ?? [];
      rows.sort((a, b) => b.updatedAt - a.updatedAt);
      resolve(rows);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function loadTree(id: string): Promise<ExplorerTree | null> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(TREE_STORE, "readonly");
    const req = tx.objectStore(TREE_STORE).get(id);
    req.onsuccess = () => resolve((req.result as ExplorerTree) ?? null);
    req.onerror = () => reject(req.error);
  });
}

export async function saveTree(tree: ExplorerTree): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(TREE_STORE, "readwrite");
    tx.objectStore(TREE_STORE).put(tree);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export function loadMeta(): ExplorerMeta {
  if (typeof localStorage === "undefined") {
    return { lastTreeId: null, settings: { ...defaultSettings } };
  }
  try {
    const raw = localStorage.getItem(META_KEY);
    if (!raw) return { lastTreeId: null, settings: { ...defaultSettings } };
    const parsed = JSON.parse(raw) as ExplorerMeta;
    return {
      lastTreeId: parsed.lastTreeId ?? null,
      settings: { ...defaultSettings, ...parsed.settings },
    };
  } catch {
    return { lastTreeId: null, settings: { ...defaultSettings } };
  }
}

export function saveMeta(meta: ExplorerMeta) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(META_KEY, JSON.stringify(meta));
}
