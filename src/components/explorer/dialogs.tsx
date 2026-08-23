import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ExplorerTree, LlmSettings } from "@/lib/tree/types";
import { compactTreeToc, lastUserAssistant } from "@/lib/tree/ops";
import { runTurn } from "@/lib/ai/run-turn";

export function TreesDialog({
  open,
  onOpenChange,
  trees,
  currentId,
  onOpen,
  onNew,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  trees: ExplorerTree[];
  currentId?: string;
  onOpen: (id: string) => void;
  onNew: (name: string) => void;
}) {
  const [name, setName] = useState("");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Explorations</DialogTitle>
          <DialogDescription>Named trees live on this device only.</DialogDescription>
        </DialogHeader>
        <form
          className="mb-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            onNew(name.trim() || "Untitled exploration");
            setName("");
          }}
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New exploration name"
          />
          <Button type="submit">Start</Button>
        </form>
        <ul className="max-h-64 space-y-1 overflow-auto">
          {trees.length === 0 ? (
            <li className="text-sm text-muted">No trees yet.</li>
          ) : (
            trees.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => onOpen(t.id)}
                  className="flex w-full items-center justify-between rounded-sm px-3 py-2 text-left hover:bg-surface-2"
                >
                  <span className={t.id === currentId ? "text-fg" : "text-muted"}>
                    {t.name}
                  </span>
                  <span className="text-xs text-subtle">
                    {new Date(t.updatedAt).toLocaleDateString()}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

export function SettingsDialog({
  open,
  onOpenChange,
  settings,
  onChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  settings: LlmSettings;
  onChange: (s: Partial<LlmSettings>) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Model</DialogTitle>
          <DialogDescription>
            Default uses Grok on the server. A custom OpenAI-compatible URL talks
            from this browser (local Ollama, LM Studio, etc.).
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={settings.provider === "xai" ? "default" : "outline"}
              onClick={() => onChange({ provider: "xai" })}
            >
              Grok
            </Button>
            <Button
              type="button"
              variant={settings.provider === "custom" ? "default" : "outline"}
              onClick={() => onChange({ provider: "custom" })}
            >
              Custom endpoint
            </Button>
          </div>
          {settings.provider === "custom" ? (
            <>
              <Label>Base URL</Label>
              <Input
                value={settings.customBaseUrl}
                onChange={(e) => onChange({ customBaseUrl: e.target.value })}
              />
              <Label>Model</Label>
              <Input
                value={settings.customModel}
                onChange={(e) => onChange({ customModel: e.target.value })}
              />
              <Label>API key (stored locally)</Label>
              <Input
                type="password"
                value={settings.customApiKey}
                onChange={(e) => onChange({ customApiKey: e.target.value })}
              />
            </>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function TicklerDialog({
  open,
  onOpenChange,
  onAdd,
  onCloseSession,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAdd: (text: string) => void;
  onCloseSession: () => void;
}) {
  const [text, setText] = useState("");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave ticklers</DialogTitle>
          <DialogDescription>
            Notes for future-you. They surface first when you return.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Anything you want to see first next time?"
        />
        <div className="mt-4 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (text.trim()) onAdd(text);
              setText("");
              onCloseSession();
              onOpenChange(false);
            }}
          >
            Save and mark paused
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (text.trim()) onAdd(text);
              setText("");
              onOpenChange(false);
            }}
          >
            Save tickler
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function BranchWhyDialog({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onConfirm: (why: string) => void;
}) {
  const [why, setWhy] = useState("");
  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) setWhy("");
        onOpenChange(v);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Why this branch?</DialogTitle>
          <DialogDescription>
            Optional decision map — why this question, now.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={why}
          onChange={(e) => setWhy(e.target.value)}
          placeholder="e.g. Test the local-first assumption without cloud"
        />
        <div className="mt-4 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={() => onConfirm("")}>
            Skip
          </Button>
          <Button type="button" onClick={() => onConfirm(why.trim())}>
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function AssetDialog({
  open,
  onOpenChange,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSave: (title: string, content: string) => void;
}) {
  const [title, setTitle] = useState("Pinned note");
  const [content, setContent] = useState("");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pin a static asset</DialogTitle>
          <DialogDescription>Frozen to this node as path memory.</DialogDescription>
        </DialogHeader>
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} className="mb-3" />
        <Label>Content</Label>
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
        <div className="mt-4 flex justify-end">
          <Button
            type="button"
            onClick={() => {
              if (!content.trim()) return;
              onSave(title.trim() || "Pinned note", content.trim());
              setContent("");
              onOpenChange(false);
            }}
          >
            Pin
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function BriefingDialog({
  open,
  onOpenChange,
  tree,
  settings,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  tree: ExplorerTree;
  settings: LlmSettings;
}) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const snapshot = lastUserAssistant(tree, tree.activeNodeId);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const heuristic = () => {
      const parts = [
        `You were working on “${tree.name}”.`,
        snapshot.lastUser
          ? `Last question: ${snapshot.lastUser.content.slice(0, 220)}`
          : "No questions yet on this path.",
        snapshot.lastAsst
          ? `Last response opened: ${snapshot.lastAsst.content.slice(0, 220)}`
          : "",
        tree.ticklers.length
          ? `Ticklers:\n${tree.ticklers.map((t) => `• ${t.text}`).join("\n")}`
          : "No ticklers left last time.",
        tree.openItems.filter((i) => !i.done).length
          ? `Open items:\n${tree.openItems
              .filter((i) => !i.done)
              .map((i) => `• ${i.text}`)
              .join("\n")}`
          : "",
      ];
      return parts.filter(Boolean).join("\n\n");
    };
    setText(heuristic());
    setLoading(true);
    void runTurn(
      settings,
      [
        {
          role: "user",
          content: `Write a short re-entry briefing (120–180 words) for this exploration tree.\nName: ${tree.name}\nTicklers: ${JSON.stringify(tree.ticklers.map((t) => t.text))}\nOpen items: ${JSON.stringify(tree.openItems.filter((i) => !i.done).map((i) => i.text))}\nCurrent tip: ${snapshot.tip?.content.slice(0, 400)}\nTOC:\n${compactTreeToc(tree)}`,
        },
      ],
      400,
    ).then((res) => {
      if (cancelled) return;
      setLoading(false);
      if (res.ok && res.text.trim()) setText(res.text.trim());
    });
    return () => {
      cancelled = true;
    };
  }, [open, tree.id]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(100%-1.5rem,36rem)]">
        <DialogHeader>
          <DialogTitle>Welcome back</DialogTitle>
          <DialogDescription>
            {loading ? "Reading the path…" : "This is where curiosity left off."}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[50vh] overflow-auto whitespace-pre-wrap text-sm leading-relaxed text-fg">
          {text}
        </div>
        {tree.ticklers.length > 0 ? (
          <ul className="mt-3 space-y-1 border-t border-border pt-3">
            {tree.ticklers.map((t) => (
              <li key={t.id} className="text-sm text-accent">
                {t.text}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-4 flex justify-end">
          <Button type="button" onClick={() => onOpenChange(false)}>
            Resume
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
