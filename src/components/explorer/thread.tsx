import { Bookmark, GitBranch, SplitSquareHorizontal } from "lucide-react";
import type { ExplorerTree, TreeNode } from "@/lib/tree/types";
import { getPath } from "@/lib/tree/ops";
import { Button } from "@/components/ui/button";

function formatText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-medium">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function NodeBlock({
  node,
  ticklers,
}: {
  node: TreeNode;
  ticklers: string[];
}) {
  if (node.role === "root") {
    return (
      <div className="mb-6">
        <p className="font-display text-2xl text-fg">{node.content}</p>
        <p className="mt-1 text-sm text-muted">Root of this path memory</p>
      </div>
    );
  }
  const isUser = node.role === "user";
  return (
    <article className="mb-5">
      <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">
        {isUser ? "You" : "Explorer"}
      </p>
      <div
        className={
          isUser
            ? "rounded-lg rounded-tl-sm border border-border bg-surface-2 px-4 py-3"
            : "rounded-lg rounded-tr-sm border border-border bg-surface px-4 py-3"
        }
      >
        {node.decisionMap ? (
          <p className="mb-2 text-xs text-accent">Why this branch: {node.decisionMap}</p>
        ) : null}
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-fg">
          {formatText(node.content || (node.role === "assistant" ? "Thinking…" : ""))}
        </p>
        {node.assets.map((a) => (
          <div
            key={a.id}
            className="mt-3 rounded-sm border border-border bg-bg/40 px-3 py-2"
          >
            <p className="text-xs font-medium text-muted">{a.title}</p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-fg">{a.content}</p>
          </div>
        ))}
        {ticklers.map((t) => (
          <p key={t} className="mt-2 border-l-2 border-accent pl-3 text-sm text-muted">
            {t}
          </p>
        ))}
      </div>
    </article>
  );
}

export function Thread({
  tree,
  focusId,
  onBranch,
  onSplit,
  onPinAsset,
  canSplit,
}: {
  tree: ExplorerTree;
  focusId: string;
  onBranch: (nodeId: string) => void;
  onSplit: (nodeId: string) => void;
  onPinAsset: (nodeId: string) => void;
  canSplit: boolean;
}) {
  const path = getPath(tree, focusId);
  const current = tree.nodes[focusId];
  const siblings = current?.children ?? [];
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-auto px-4 py-4 sm:px-6">
        {path.map((node) => (
          <NodeBlock
            key={node.id}
            node={node}
            ticklers={tree.ticklers.filter((t) => t.nodeId === node.id).map((t) => t.text)}
          />
        ))}
        {siblings.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {siblings.map((id) => {
              const child = tree.nodes[id];
              if (!child) return null;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onBranch(id)}
                  className="max-w-full truncate rounded-full border border-border px-3 py-1.5 text-xs text-muted hover:border-accent hover:text-fg"
                >
                  {child.content.replace(/\s+/g, " ").slice(0, 48) || "Continue"}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2 border-t border-border px-4 py-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onBranch(focusId)}
        >
          <GitBranch />
          Branch here
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={!canSplit}
          onClick={() => onSplit(focusId)}
        >
          <SplitSquareHorizontal />
          Split
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => onPinAsset(focusId)}>
          <Bookmark />
          Pin asset
        </Button>
      </div>
    </div>
  );
}
