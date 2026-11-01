"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D, { type NodeObject, type ForceGraphMethods } from "react-force-graph-2d";
import { buildGraphData, categoryColor, type GraphNode } from "./graphData";

export function BrainGraph() {
  const [dims, setDims] = useState({ width: 800, height: 520 });
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<ForceGraphMethods<NodeObject, object> | undefined>(undefined);
  const data = useMemo(() => buildGraphData(), []);

  useEffect(() => {
    function resize() {
      if (containerRef.current) {
        setDims({ width: containerRef.current.clientWidth, height: containerRef.current.clientHeight });
      }
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    fgRef.current?.d3Force("charge")?.strength(-24);
    fgRef.current?.d3Force("link")?.distance((l: { source: unknown; target: unknown }) => {
      const s = l.source as GraphNode;
      const t = l.target as GraphNode;
      if (s?.group === "tag" || t?.group === "tag") return 14;
      return 32;
    });
  }, []);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
      <div ref={containerRef} className="bg-cascade-stage h-[520px] overflow-hidden rounded-2xl border border-brand-border">
        <ForceGraph2D
          ref={fgRef}
          graphData={data as never}
          width={dims.width}
          height={dims.height}
          backgroundColor="rgba(0,0,0,0)"
          nodeVal={(n) => (n as GraphNode).val}
          nodeLabel={(n) => (n as GraphNode).label}
          nodeColor={(n) => {
            const node = n as GraphNode;
            if (node.group === "root") return "#f1c40f";
            if (node.group === "category") return categoryColor(node.category);
            if (node.group === "tag") return "#d9c27a";
            return categoryColor(node.category) + "cc";
          }}
          linkColor={(l) => {
            const link = l as unknown as { source: GraphNode; target: GraphNode };
            const involvesTag = link.source?.group === "tag" || link.target?.group === "tag";
            return involvesTag ? "rgba(217, 194, 122, 0.18)" : "rgba(241, 196, 15, 0.3)";
          }}
          linkWidth={0.5}
          linkCurvature={0.22}
          cooldownTime={4000}
          onEngineStop={() => fgRef.current?.zoomToFit(400, 24)}
          onNodeClick={(n) => setSelected(n as GraphNode)}
          onNodeHover={(n) => {
            if (containerRef.current) containerRef.current.style.cursor = n ? "pointer" : "default";
          }}
          nodeCanvasObject={(n, ctx, globalScale) => {
            const node = n as GraphNode & { x?: number; y?: number };
            const x = node.x ?? 0;
            const y = node.y ?? 0;
            const r =
              node.group === "root" ? 10 : node.group === "category" ? 6 : node.group === "tag" ? Math.max(1.6, node.val * 0.55) : 3.2;
            const color =
              node.group === "root"
                ? "#f1c40f"
                : node.group === "category"
                ? categoryColor(node.category)
                : node.group === "tag"
                ? "#d9c27a"
                : categoryColor(node.category);

            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.shadowColor = color;
            ctx.shadowBlur = node.group === "root" ? 14 : node.group === "category" ? 8 : node.group === "tag" ? 2 : 3;
            ctx.fill();
            ctx.shadowBlur = 0;

            if (node.group === "root" || node.group === "category" || globalScale > 2.6) {
              ctx.font = `${node.group === "root" ? "bold " : ""}${Math.max(9, 11 / globalScale)}px Inter, sans-serif`;
              ctx.textAlign = "center";
              ctx.textBaseline = "top";
              ctx.fillStyle = node.group === "root" ? "#f7faf8" : "#a3c1ad";
              ctx.fillText(node.label, x, y + r + 2);
            }
          }}
        />
      </div>

      <div className="rounded-2xl border border-brand-border bg-brand-surface/20 p-5">
        {selected ? (
          <>
            <p className="text-[11px] uppercase tracking-wider" style={{ color: categoryColor(selected.category) }}>
              {selected.category}
            </p>
            <h4 className="mt-1 font-heading text-sm font-bold text-brand-text">{selected.label}</h4>
            {selected.detail && <p className="mt-2 text-xs leading-relaxed text-brand-muted">{selected.detail}</p>}
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-brand-text">Click around.</p>
            <p className="mt-2 text-xs leading-relaxed text-brand-muted">
              Every node here is real — pulled straight from this site&apos;s own data. Drag, zoom, and click a node
              to see what it connects to.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
