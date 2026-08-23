import { useEffect, useState } from "react";
import {
  Download,
  FolderOpen,
  Map as MapIcon,
  Menu,
  Pause,
  Plus,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { OutlineTree } from "./outline-tree";
import { Thread } from "./thread";
import { Composer } from "./composer";
import {
  AssetDialog,
  BranchWhyDialog,
  BriefingDialog,
  SettingsDialog,
  TicklerDialog,
  TreesDialog,
} from "./dialogs";
import { useExplorer, needsDecision } from "@/store/explorer-store";
import { pathAsMessages } from "@/lib/tree/ops";
import { runTurn } from "@/lib/ai/run-turn";
import { downloadStandaloneHtml } from "@/lib/tree/export-html";

export function ExplorerApp() {
  const store = useExplorer();
  const [busyPane, setBusyPane] = useState<string | null>(null);
  const [assetNode, setAssetNode] = useState<string | null>(null);
  const [pendingSend, setPendingSend] = useState<{
    paneId: "main" | string;
    text: string;
  } | null>(null);
  const [whyOpen, setWhyOpen] = useState(false);

  useEffect(() => {
    void store.hydrate();
  }, []);

  const tree = store.tree;

  async function send(paneId: "main" | string, text: string, why?: string) {
    if (!tree || !text.trim() || busyPane) return;
    const created = store.addUserAndPlaceholder(paneId, text.trim(), why);
    if (!created) return;
    setBusyPane(paneId);
    const latest = useExplorer.getState().tree;
    if (!latest) return;
    const messages = [
      ...pathAsMessages(latest, created.userId),
      ...(why
        ? [
            {
              role: "user" as const,
              content: `(Decision map for this branch: ${why})`,
            },
          ]
        : []),
    ];
    const result = await runTurn(store.settings, messages);
    if (result.ok) store.fillAssistant(created.assistantId, result.text);
    else store.failAssistant(created.assistantId, result.error);
    setBusyPane(null);
  }

  function requestSend(paneId: "main" | string, text: string) {
    if (!tree) return;
    const parentId =
      paneId === "main"
        ? tree.activeNodeId
        : (tree.splits.find((s) => s.id === paneId)?.focusNodeId ?? tree.activeNodeId);
    if (needsDecision(tree, parentId)) {
      setPendingSend({ paneId, text });
      setWhyOpen(true);
      return;
    }
    void send(paneId, text);
  }

  const outline = tree ? (
    <>
      <p className="px-3 pb-1 text-[11px] font-medium uppercase tracking-[0.16em] text-subtle">
        Path
      </p>
      <OutlineTree tree={tree} onSelect={(id) => store.setActive(id)} />
    </>
  ) : null;

  return (
    <div className="flex h-dvh flex-col bg-bg text-fg">
      <header className="flex items-center gap-2 border-b border-border px-3 py-2">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          onClick={() => store.setFlag("showOutlineMobile", true)}
          aria-label="Open outline"
        >
          <Menu />
        </Button>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg leading-none">Curiosity Explorer</p>
          {tree ? (
            <Input
              value={tree.name}
              onChange={(e) => store.renameTree(e.target.value)}
              className="mt-1 h-8 border-0 bg-transparent px-0 text-sm text-muted"
              aria-label="Exploration name"
            />
          ) : (
            <p className="text-xs text-muted">Path memory for thought</p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Explorations"
            onClick={() => store.setFlag("showTrees", true)}
          >
            <FolderOpen />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="New exploration"
            onClick={() => void store.newTree()}
          >
            <Plus />
          </Button>
          <Button
            type="button"
            variant={store.showMap ? "subtle" : "ghost"}
            size="icon-sm"
            aria-label="Toggle map"
            aria-pressed={store.showMap}
            onClick={() => store.setFlag("showMap", !store.showMap)}
          >
            <MapIcon />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Export HTML"
            disabled={!tree}
            onClick={() => tree && downloadStandaloneHtml(tree)}
          >
            <Download />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Ticklers"
            onClick={() => store.setFlag("showTicklers", true)}
          >
            <Pause />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Settings"
            onClick={() => store.setFlag("showSettings", true)}
          >
            <Settings />
          </Button>
        </div>
      </header>

      {!tree ? (
        <EmptyState onStart={() => void store.newTree("First exploration")} />
      ) : (
        <div className="flex min-h-0 flex-1">
          <aside className="hidden w-64 shrink-0 overflow-auto border-r border-border md:block">
            {outline}
          </aside>
          <div className="flex min-w-0 flex-1">
            <section className="flex min-w-0 flex-1 flex-col border-r border-border last:border-r-0">
              <Thread
                tree={tree}
                focusId={tree.activeNodeId}
                onBranch={(id) => store.setActive(id)}
                onSplit={(id) => store.openSplit(id)}
                onPinAsset={(id) => setAssetNode(id)}
                canSplit={tree.splits.length < 3}
              />
              <Composer
                value={store.mainDraft}
                onChange={store.setMainDraft}
                disabled={busyPane === "main"}
                onSend={() => requestSend("main", store.mainDraft)}
              />
            </section>
            {tree.splits.map((pane) => (
              <section
                key={pane.id}
                className="flex min-w-0 flex-1 flex-col border-r border-border last:border-r-0"
              >
                <div className="flex items-center justify-between border-b border-border px-3 py-1">
                  <span className="text-xs text-muted">Split</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => store.closeSplit(pane.id)}
                  >
                    Close
                  </Button>
                </div>
                <Thread
                  tree={tree}
                  focusId={pane.focusNodeId}
                  onBranch={(id) => store.setActive(id)}
                  onSplit={(id) => store.openSplit(id)}
                  onPinAsset={(id) => setAssetNode(id)}
                  canSplit={tree.splits.length < 3}
                />
                <Composer
                  value={pane.draft}
                  onChange={(v) => store.setSplitDraft(pane.id, v)}
                  disabled={busyPane === pane.id}
                  placeholder="Sidebar exploration…"
                  onSend={() => requestSend(pane.id, pane.draft)}
                />
              </section>
            ))}
          </div>
        </div>
      )}

      <Sheet
        open={store.showOutlineMobile}
        onOpenChange={(v) => store.setFlag("showOutlineMobile", v)}
      >
        <SheetContent side="left">{outline}</SheetContent>
      </Sheet>

      <Sheet
        open={store.showMap}
        onOpenChange={(v) => store.setFlag("showMap", v)}
      >
        <SheetContent side="right">
          <p className="mb-3 pr-8 font-display text-xl text-fg">Map</p>
          <p className="mb-3 text-sm text-muted">
            Full tree. Click any node to jump there.
          </p>
          <div className="min-h-0 flex-1 overflow-auto">
            {tree ? (
              <OutlineTree tree={tree} onSelect={(id) => store.setActive(id)} />
            ) : (
              <p className="text-sm text-muted">
                Begin an exploration to grow a map of the path.
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <TreesDialog
        open={store.showTrees}
        onOpenChange={(v) => store.setFlag("showTrees", v)}
        trees={store.trees}
        currentId={tree?.id}
        onOpen={(id) => void store.openTree(id)}
        onNew={(name) => void store.newTree(name)}
      />
      <SettingsDialog
        open={store.showSettings}
        onOpenChange={(v) => store.setFlag("showSettings", v)}
        settings={store.settings}
        onChange={store.setSettings}
      />
      <TicklerDialog
        open={store.showTicklers}
        onOpenChange={(v) => store.setFlag("showTicklers", v)}
        onAdd={store.addTickler}
        onCloseSession={store.closeSession}
      />
      <BranchWhyDialog
        open={whyOpen}
        onOpenChange={setWhyOpen}
        onConfirm={(why) => {
          setWhyOpen(false);
          if (pendingSend) void send(pendingSend.paneId, pendingSend.text, why);
          setPendingSend(null);
        }}
      />
      <AssetDialog
        open={Boolean(assetNode)}
        onOpenChange={(v) => {
          if (!v) setAssetNode(null);
        }}
        onSave={(title, content) => {
          if (assetNode) store.addAsset(assetNode, title, content);
        }}
      />
      {tree ? (
        <BriefingDialog
          open={store.showBriefing}
          onOpenChange={(v) => store.setFlag("showBriefing", v)}
          tree={tree}
          settings={store.settings}
        />
      ) : null}
    </div>
  );
}

function EmptyState({ onStart }: { onStart: () => void }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-4xl text-fg">Stay in the question.</p>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        Branch freely, pin what you found, leave ticklers for future-you. Interruptions
        no longer erase the pull of the last thought.
      </p>
      <Button type="button" className="mt-8" onClick={onStart}>
        Begin an exploration
      </Button>
    </main>
  );
}

