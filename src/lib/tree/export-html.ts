import type { ExplorerTree } from "./types";

function esc(s: string) {
  return s.replace(/[&<>"']/g, (ch) => {
    switch (ch) {
      case "&":
        return "&" + "amp;";
      case "<":
        return "&" + "lt;";
      case ">":
        return "&" + "gt;";
      case '"':
        return "&" + "quot;";
      default:
        return "&#39;";
    }
  });
}

export function buildStandaloneHtml(tree: ExplorerTree): string {
  const payload = JSON.stringify(tree);
  const title = esc(tree.name);
  const parts: string[] = [
    "<!DOCTYPE html>",
    '<html lang="en"><head><meta charset="utf-8"/>',
    '<meta name="viewport" content="width=device-width, initial-scale=1"/>',
    "<title>" + title + " — Curiosity Explorer</title>",
    "<style>",
    ":root{--bg:#0b0c0b;--surf:#131513;--fg:#eceae4;--muted:#8a8d86;--line:rgba(236,234,228,.12);--accent:#9aada0}",
    "*{box-sizing:border-box}html,body{margin:0;height:100%;background:var(--bg);color:var(--fg);font-family:ui-sans-serif,system-ui,sans-serif}",
    "body{display:grid;grid-template-rows:auto 1fr}",
    "header{display:flex;align-items:baseline;justify-content:space-between;gap:16px;padding:16px 20px;border-bottom:1px solid var(--line)}",
    "header h1{font-weight:500;font-size:1.35rem;margin:0}",
    "header p{margin:0;color:var(--muted);font-size:.8rem}",
    "main{display:grid;grid-template-columns:minmax(200px,280px) 1fr;min-height:0}",
    "@media(max-width:720px){main{grid-template-columns:1fr}#outline{display:none}}",
    "#outline{border-right:1px solid var(--line);overflow:auto;padding:12px 8px 24px}",
    "#thread{overflow:auto;padding:20px 22px 48px;max-width:720px}",
    ".item{display:block;width:100%;text-align:left;background:transparent;color:var(--fg);border:0;border-radius:8px;padding:6px 8px;cursor:pointer;font:inherit;font-size:.82rem}",
    ".item.active{background:rgba(154,173,160,.16)}",
    ".why{color:var(--muted);font-size:.72rem;display:block}",
    ".meta{font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:6px}",
    ".bubble p{white-space:pre-wrap;line-height:1.55;margin:0}",
    ".asset,.tick{margin-top:8px;padding:8px 10px;border:1px solid var(--line);border-radius:10px;font-size:.85rem}",
    "</style></head><body>",
    "<header><h1>" + title + "</h1><p>Path memory · read-only transplant</p></header>",
    "<main><nav id='outline'></nav><article id='thread'></article></main>",
    "<script>",
    "const TREE=" + payload + ";",
    "const outline=document.getElementById('outline');",
    "const thread=document.getElementById('thread');",
    "let active=TREE.activeNodeId;",
    "function path(id){const p=[];let n=TREE.nodes[id];const g=new Set();while(n&&!g.has(n.id)){g.add(n.id);p.push(n);if(!n.parentId)break;n=TREE.nodes[n.parentId];}return p.reverse();}",
    "function esc(s){return String(s).replace(/[&<>]/g,function(c){return {'&':'&'+'amp;','<':'&'+'lt;','>':'&'+'gt;'}[c];});}",
    "function preview(n){const t=(n.content||'').replace(/\\s+/g,' ').trim();return t.slice(0,72)||n.role;}",
    "function walk(id,depth){const n=TREE.nodes[id];if(!n)return '';const why=n.decisionMap?'<span class=why>'+esc(n.decisionMap)+'</span>':'';let html='<button class=\"item'+(id===active?' active':'')+'\" data-id=\"'+n.id+'\" style=\"padding-left:'+(8+depth*14)+'px\">'+esc(preview(n))+why+'</button>';for(const c of n.children)html+=walk(c,depth+1);return html;}",
    "function render(){outline.innerHTML=walk(TREE.rootId,0);thread.innerHTML=path(active).map(function(n){const assets=(n.assets||[]).map(function(a){return '<div class=asset><strong>'+esc(a.title)+'</strong><div>'+esc(a.content)+'</div></div>';}).join('');const ticks=(TREE.ticklers||[]).filter(function(t){return t.nodeId===n.id;}).map(function(t){return '<div class=tick>'+esc(t.text)+'</div>';}).join('');const why=n.decisionMap?'<div class=why>Why: '+esc(n.decisionMap)+'</div>':'';return '<section class=bubble><div class=meta>'+n.role+'</div><p>'+esc(n.content)+'</p>'+why+assets+ticks+'</section>';}).join('');}",
    "outline.addEventListener('click',function(e){const btn=e.target.closest('[data-id]');if(!btn)return;active=btn.getAttribute('data-id');render();});",
    "render();",
    "</scr" + "ipt></body></html>",
  ];
  return parts.join("");
}

export function downloadStandaloneHtml(tree: ExplorerTree) {
  const html = buildStandaloneHtml(tree);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const slug =
    tree.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40) || "exploration";
  a.href = url;
  a.download = `${slug}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
