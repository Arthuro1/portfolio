import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { translations } from "@/lib/translations";

// components/Projects.tsx lists screenshot files per project; lib/translations.ts
// holds one caption per file. Both follow the order of the project items.
const root = path.resolve(__dirname, "..");
const source = readFileSync(path.join(root, "components/Projects.tsx"), "utf8");
const fileLists = [...source.matchAll(/shots: \[([^\]]*)\]/g)].map((m) => [...m[1].matchAll(/"([^"]+)"/g)].map((f) => f[1]));
const captionLists = translations.en.projects.items.flatMap((item) => ("shots" in item ? [item.shots as readonly string[]] : []));

describe("project screenshots", () => {
  it("has one caption per screenshot, in the same order of projects", () => {
    expect(fileLists.map((l) => l.length)).toEqual(captionLists.map((l) => l.length));
  });

  it("only references files that exist in public/", () => {
    const missing = fileLists.flat().filter((f) => !existsSync(path.join(root, "public", f)));
    expect(missing).toEqual([]);
  });
});
