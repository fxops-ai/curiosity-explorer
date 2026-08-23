import type { ExplorerTree, TreeNode } from "@/lib/tree/types";
import { cn } from "@/lib/utils";

function preview(node: TreeNode) {
  const t = node.content.replace(/\s+/g, " ").trim();
  if (node.role === "root") return t || "Root";
  return t.slice(0, 64) || node.role;
}

function OutlineItem({
  tree,
  nodeId,
  depth,
  activeId,
  splitIds,
  onSelect,
}: {
  tree: ExplorerTree;
  nodeId: string;
  depth: number;
  activeId: string;
  splitIds: Set<string>;
  onSelect: (id: string) => void;
}) {
  const node = tree.nodes[nodeId];
  if (!node) return null;
  const active = nodeId === activeId;
  const inSplit = splitIds.has(nodeId);
  return (
    <div>
      <button
        type="button"
        onClick={() => onSelect(nodeId)}
        className={cn(
          "flex w-full items-start gap-2 rounded-sm px-2 py-1.5 text-left text-sm leading-snug",
          active ? "bg-accent/15 text-fg" : "text-muted hover:bg-surface-2 hover:text-fg",
          inSplit && !active && "ring-1 ring-accent/40",
        )}
        style={{ paddingLeft: 8 + depth * 12 }}
      >
        <span
          className={cn(
            "mt-1 size-1.5 shrink-0 rounded-full",
            node.role === "user" && "bg-fg/70",
            node.role === "assistant" && "bg-accent",
            node.role === "root" && "bg-muted",
          )}
        />
        <span className="min-w-0">
          <span className="block truncate">{preview(node)}</span>
          {node.decisionMap ? (
            <span className="block truncate text-xs text-subtle">{node.decisionMap}</span>
          ) : null}
        </span>
      </button>
      {node.children.map((id) => (
        <OutlineItem
          key={id}
          tree={tree}
          nodeId={id}
          depth={depth + 1}
          activeId={activeId}
          splitIds={splitIds}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export function OutlineTree({
  tree,
  onSelect,
}: {
  tree: ExplorerTree;
  onSelect: (id: string) => void;
}) {
  const splitIds = new Set(tree.splits.map((s) => s.focusNodeId));
  return (
    <nav aria-label="Path outline" className="py-2">
      <OutlineItem
        tree={tree}
        nodeId={tree.rootId}
        depth={0}
        activeId={tree.activeNodeId}
        splitIds={splitIds}
        onSelect={onSelect}
      />
    </nav>
  );
}
