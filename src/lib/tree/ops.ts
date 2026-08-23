import type { ExplorerTree, TreeNode } from "./types";
import { uid } from "./ids";

export function createEmptyTree(name = "Untitled exploration"): ExplorerTree {
  const now = Date.now();
  const rootId = uid("root");
  const root: TreeNode = {
    id: rootId,
    parentId: null,
    role: "root",
    content: name,
    createdAt: now,
    assets: [],
    children: [],
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
    openItems: [],
  };
}

export function getPath(tree: ExplorerTree, nodeId: string): TreeNode[] {
  const path: TreeNode[] = [];
  let current = tree.nodes[nodeId];
  const guard = new Set<string>();
  while (current && !guard.has(current.id)) {
    guard.add(current.id);
    path.push(current);
    if (!current.parentId) break;
    current = tree.nodes[current.parentId];
  }
  return path.reverse();
}

export function pathAsMessages(tree: ExplorerTree, nodeId: string) {
  return getPath(tree, nodeId)
    .filter((n) => n.role === "user" || n.role === "assistant")
    .map((n) => ({
      role: n.role === "user" ? ("user" as const) : ("assistant" as const),
      content: n.content,
    }));
}

export function compactTreeToc(tree: ExplorerTree): string {
  const lines: string[] = [];
  const walk = (id: string, depth: number) => {
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

export function lastUserAssistant(tree: ExplorerTree, nodeId: string) {
  const path = getPath(tree, nodeId);
  const lastUser = [...path].reverse().find((n) => n.role === "user");
  const lastAsst = [...path].reverse().find((n) => n.role === "assistant");
  return { lastUser, lastAsst, tip: path[path.length - 1] };
}

export const REENTRY_GAP_MS = 20 * 60 * 1000;
