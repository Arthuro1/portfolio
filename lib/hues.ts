// Journey palette: indigo (brand), ochre (accent) and three earthy hues that
// mark each stop. Used for small touches only. Class strings are spelled out
// in full so Tailwind can find them.
export type Hue = "rose" | "plum" | "teal" | "brand" | "accent";

type HueClasses = {
  text: string;
  bg: string;
  soft: string;
  border: string;
  borderSoft: string;
  fill: string;
  stroke: string;
  ring: string;
};

export const HUE: Record<Hue, HueClasses> = {
  rose: {
    text: "text-hue-rose",
    bg: "bg-hue-rose",
    soft: "bg-hue-rose/10",
    border: "border-hue-rose",
    borderSoft: "border-hue-rose/40",
    fill: "fill-hue-rose",
    stroke: "stroke-hue-rose",
    ring: "ring-hue-rose/30",
  },
  plum: {
    text: "text-hue-plum",
    bg: "bg-hue-plum",
    soft: "bg-hue-plum/10",
    border: "border-hue-plum",
    borderSoft: "border-hue-plum/40",
    fill: "fill-hue-plum",
    stroke: "stroke-hue-plum",
    ring: "ring-hue-plum/30",
  },
  teal: {
    text: "text-hue-teal",
    bg: "bg-hue-teal",
    soft: "bg-hue-teal/10",
    border: "border-hue-teal",
    borderSoft: "border-hue-teal/40",
    fill: "fill-hue-teal",
    stroke: "stroke-hue-teal",
    ring: "ring-hue-teal/30",
  },
  brand: {
    text: "text-brand",
    bg: "bg-brand",
    soft: "bg-brand/10",
    border: "border-brand",
    borderSoft: "border-brand/40",
    fill: "fill-brand",
    stroke: "stroke-brand",
    ring: "ring-brand/30",
  },
  accent: {
    text: "text-accent",
    bg: "bg-accent-bright",
    soft: "bg-accent-bright/15",
    border: "border-accent-bright",
    borderSoft: "border-accent-bright/50",
    fill: "fill-accent-bright",
    stroke: "stroke-accent-bright",
    ring: "ring-accent-bright/30",
  },
};

// One hue per journey stop, in the order of STOPS (about … contact).
export const STOP_HUES: Hue[] = ["rose", "plum", "teal", "brand", "accent"];
