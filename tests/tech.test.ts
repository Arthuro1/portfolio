import { describe, expect, it } from "vitest";
import { siNeo4j } from "simple-icons";
import { logoFor, themedColors } from "@/lib/tech";

describe("logoFor", () => {
  it("matches labels case-insensitively", () => {
    expect(logoFor("NEO4J")).toMatchObject({ kind: "icon", path: siNeo4j.path });
  });

  it("falls back to the part before ' / ' for translated skill labels", () => {
    expect(logoFor("Neo4J / Wissensgraphen")).toMatchObject({ kind: "icon", path: siNeo4j.path });
  });

  it("returns a monogram for brands without an icon", () => {
    expect(logoFor("Azure")).toEqual({ kind: "mono", text: "Az", hex: "0078D4" });
  });

  it("returns null for concepts", () => {
    expect(logoFor("RAG Systems")).toBeNull();
  });
});

describe("themedColors", () => {
  it("lightens black logos for the dark theme only", () => {
    const c = themedColors("000000");
    expect(c.light).toBe("rgb(0 0 0)");
    expect(c.dark).not.toBe("rgb(0 0 0)");
  });

  it("darkens pale logos for the light theme only", () => {
    const c = themedColors("F7DF1E");
    expect(c.light).not.toBe("rgb(247 223 30)");
    expect(c.dark).toBe("rgb(247 223 30)");
  });
});
