import type { Translations } from "@/lib/translations";

type Labels = Translations["projects"]["diagram"];
type NodeKey = keyof Labels["nodes"];
type Box = { x: number; y: number; w: number; h: number };
type Point = [number, number];
type Edge = { points: Point[]; dashed?: boolean };
// `text`: font sizes of a node's title and detail lines, in viewBox units.
type Layout = { width: number; height: number; text: [number, number]; nodes: Record<NodeKey, Box>; edges: Edge[] };

// What each step is, drawn by fill. The labels say it too ("LLM …", "vector
// store"), so the colour is never the only cue.
const STYLE: Record<NodeKey, string> = {
  docs: "fill-surface stroke-muted/50",
  chunk: "fill-surface stroke-muted/50",
  extract: "fill-brand/[0.08] stroke-brand/50",
  embed: "fill-surface stroke-muted/50",
  graph: "fill-hue-teal/10 stroke-hue-teal/60",
  vectors: "fill-hue-teal/10 stroke-hue-teal/60",
  question: "fill-raised stroke-muted/50",
  retriever: "fill-surface stroke-muted/50",
  answer: "fill-brand/[0.08] stroke-brand/50",
  evaluation: "fill-accent-bright/10 stroke-accent-bright/70",
};

// The pipeline of github.com/Arthuro1/knowledge-graph-rag: ingest (left or
// top) fills both stores, the hybrid retriever reads both, and the offline
// evaluation scores retrieval and answers (dashed). Coordinates are in
// viewBox units; edges are orthogonal polylines ending at a box edge.
const WIDE: Layout = {
  width: 948,
  height: 244,
  text: [14, 12],
  nodes: {
    docs: { x: 0, y: 96, w: 100, h: 52 },
    chunk: { x: 128, y: 96, w: 112, h: 52 },
    extract: { x: 272, y: 40, w: 156, h: 56 },
    embed: { x: 272, y: 148, w: 156, h: 56 },
    graph: { x: 456, y: 40, w: 120, h: 56 },
    vectors: { x: 456, y: 148, w: 120, h: 56 },
    question: { x: 630, y: 0, w: 120, h: 32 },
    retriever: { x: 610, y: 80, w: 160, h: 84 },
    answer: { x: 798, y: 88, w: 150, h: 68 },
    evaluation: { x: 610, y: 188, w: 338, h: 56 },
  },
  edges: [
    { points: [[100, 122], [128, 122]] },
    { points: [[240, 122], [256, 122], [256, 68], [272, 68]] },
    { points: [[240, 122], [256, 122], [256, 176], [272, 176]] },
    { points: [[428, 68], [456, 68]] },
    { points: [[428, 176], [456, 176]] },
    { points: [[576, 68], [593, 68], [593, 104], [610, 104]] },
    { points: [[576, 176], [593, 176], [593, 140], [610, 140]] },
    { points: [[690, 32], [690, 80]] },
    { points: [[770, 122], [798, 122]] },
    { points: [[690, 164], [690, 188]], dashed: true },
    { points: [[873, 156], [873, 188]], dashed: true },
  ],
};

const TALL: Layout = {
  width: 320,
  height: 636,
  text: [14, 12],
  nodes: {
    docs: { x: 85, y: 22, w: 150, h: 48 },
    chunk: { x: 85, y: 98, w: 150, h: 48 },
    extract: { x: 0, y: 176, w: 150, h: 56 },
    embed: { x: 170, y: 176, w: 150, h: 56 },
    graph: { x: 5, y: 262, w: 140, h: 56 },
    vectors: { x: 175, y: 262, w: 140, h: 56 },
    question: { x: 110, y: 334, w: 100, h: 30 },
    retriever: { x: 20, y: 382, w: 280, h: 70 },
    answer: { x: 20, y: 480, w: 280, h: 66 },
    evaluation: { x: 20, y: 574, w: 280, h: 62 },
  },
  edges: [
    { points: [[160, 70], [160, 98]] },
    { points: [[160, 146], [160, 161], [75, 161], [75, 176]] },
    { points: [[160, 146], [160, 161], [245, 161], [245, 176]] },
    { points: [[75, 232], [75, 262]] },
    { points: [[245, 232], [245, 262]] },
    { points: [[75, 318], [75, 382]] },
    { points: [[245, 318], [245, 382]] },
    { points: [[160, 364], [160, 382]] },
    { points: [[160, 452], [160, 480]] },
    { points: [[160, 546], [160, 574]], dashed: true },
    { points: [[300, 417], [312, 417], [312, 605], [300, 605]], dashed: true },
  ],
};

const HEAD = 7;

/**
 * Architecture of the Knowledge Graph RAG system as an inline SVG in the
 * theme's colours. Wide screens get one left-to-right flow; below lg the same
 * graph is drawn top to bottom so its text stays readable on a phone.
 */
export default function RagDiagram({ labels }: { labels: Labels }) {
  return (
    <>
      <Diagram layout={WIDE} labels={labels} className="hidden lg:block" />
      <Diagram layout={TALL} labels={labels} className="mx-auto max-w-sm lg:hidden" />
    </>
  );
}

function Diagram({ layout, labels, className }: { layout: Layout; labels: Labels; className: string }) {
  const { width, height, text, nodes, edges } = layout;
  return (
    <svg viewBox={`-2 -2 ${width + 4} ${height + 4}`} role="img" aria-label={labels.label} className={`h-auto w-full font-sans ${className}`}>
      <text x={0} y={10} fontSize={11} letterSpacing="0.16em" className="fill-hue-teal font-mono uppercase">
        {labels.ingest}
      </text>
      {(Object.keys(nodes) as NodeKey[]).map((key) => (
        <Node key={key} box={nodes[key]} sizes={text} className={STYLE[key]} pill={key === "question"} {...labels.nodes[key]} />
      ))}
      {edges.map((edge, i) => (
        <Arrow key={i} {...edge} />
      ))}
    </svg>
  );
}

type NodeProps = { box: Box; sizes: [number, number]; className: string; pill: boolean; title: string; detail?: string };

function Node({ box, sizes: [titleSize, detailSize], className, pill, title, detail }: NodeProps) {
  const lines = detail ? detail.split("\n") : [];
  const titleLine = titleSize + 3;
  const detailLine = detailSize + 3;
  // Centre the block of lines vertically; y is each line's baseline.
  const top = box.y + (box.h - titleLine - lines.length * detailLine) / 2;
  const cx = box.x + box.w / 2;
  return (
    <g>
      <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={pill ? box.h / 2 : 10} strokeWidth={1.25} className={className} />
      <text textAnchor="middle">
        <tspan x={cx} y={top + titleSize - 1} fontSize={titleSize} fontWeight={700} className="fill-ink">
          {title}
        </tspan>
        {lines.map((line, i) => (
          <tspan key={i} x={cx} y={top + titleLine + i * detailLine + detailSize} fontSize={detailSize} className="fill-muted">
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function Arrow({ points, dashed = false }: Edge) {
  const [tx, ty] = points[points.length - 1];
  const [px, py] = points[points.length - 2];
  const dx = Math.sign(tx - px);
  const dy = Math.sign(ty - py);
  // Stop the line under the arrowhead so its end doesn't poke through the tip.
  const line = [...points.slice(0, -1), [tx - dx * (HEAD - 1), ty - dy * (HEAD - 1)]];
  const head = [
    [tx, ty],
    [tx - dx * HEAD - dy * 4, ty - dy * HEAD - dx * 4],
    [tx - dx * HEAD + dy * 4, ty - dy * HEAD + dx * 4],
  ];
  return (
    <g>
      <polyline
        points={line.map((p) => p.join(",")).join(" ")}
        fill="none"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeDasharray={dashed ? "4 4" : undefined}
        className="stroke-muted/70"
      />
      <polygon points={head.map((p) => p.join(",")).join(" ")} className="fill-muted/70" />
    </g>
  );
}
