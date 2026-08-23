export type NodeRole = "root" | "user" | "assistant" | "note";

export type AssetKind = "note" | "markdown" | "html";

export type ExplorerAsset = {
  id: string;
  kind: AssetKind;
  title: string;
  content: string;
  createdAt: number;
};

export type TreeNode = {
  id: string;
  parentId: string | null;
  role: NodeRole;
  content: string;
  createdAt: number;
  decisionMap?: string;
  assets: ExplorerAsset[];
  children: string[];
};

export type Tickler = {
  id: string;
  nodeId: string;
  text: string;
  createdAt: number;
};

export type OpenItem = {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
};

export type SplitPane = {
  id: string;
  focusNodeId: string;
  draft: string;
};

export type ExplorerTree = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  lastOpenedAt: number;
  lastClosedAt: number | null;
  rootId: string;
  activeNodeId: string;
  nodes: Record<string, TreeNode>;
  splits: SplitPane[];
  ticklers: Tickler[];
  openItems: OpenItem[];
};

export type LlmSettings = {
  provider: "xai" | "custom";
  customBaseUrl: string;
  customApiKey: string;
  customModel: string;
};

export type ExplorerMeta = {
  lastTreeId: string | null;
  settings: LlmSettings;
};
