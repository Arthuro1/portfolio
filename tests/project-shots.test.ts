import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { translations } from "@/lib/translations";

// components/Projects.tsx (case studies) and components/MoreProjects.tsx (the
// other projects) list screenshot files per project; lib/translations.ts holds
// one caption per file. Both follow the same order of projects.
const root = path.resolve(__dirname, "..");
const source = ["components/Projects.tsx", "components/MoreProjects.tsx"].map((f) => readFileSync(path.join(root, f), "utf8")).join("\n");
const fileLists = [...source.matchAll(/shots: \[([^\]]*)\]/g)].map((m) => [...m[1].matchAll(/"([^"]+)"/g)].map((f) => f[1]));
const { featured, more } = translations.en.projects;
const captionLists = [...featured, ...more].flatMap((item) => ("shots" in item ? [item.shots as readonly string[]] : []));

describe("project screenshots", () => {
  it("has one caption per screenshot, in the same order of projects", () => {
    expect(fileLists.map((l) => l.length)).toEqual(captionLists.map((l) => l.length));
  });

  it("only references files that exist in public/", () => {
    const missing = fileLists.flat().filter((f) => !existsSync(path.join(root, "public", f)));
    expect(missing).toEqual([]);
  });
});

describe("case study anchors", () => {
  // The chat assistant links to these ids; renaming one breaks its links.
  it.each(["project-knowledge-graph-rag", "project-qetoret", "project-coursemapper"])("renders #%s", (id) => {
    expect(source).toContain(`id: "${id}"`);
  });
});
