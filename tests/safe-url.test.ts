import { describe, it, expect } from "vitest";
import { PAGE_ANCHORS, resolveSafeHref } from "@/lib/safe-url";

describe("resolveSafeHref (Markdown link allowlist)", () => {
  it("allows allowlisted https hosts as external links", () => {
    expect(resolveSafeHref("https://github.com/Arthuro1")).toEqual({
      safe: true,
      href: "https://github.com/Arthuro1",
      external: true,
    });
  });

  it("allows the CourseMapper project page but no other uni-due.de host", () => {
    expect(resolveSafeHref("https://www.uni-due.de/soco/research/projects/coursemapper.php").safe).toBe(true);
    expect(resolveSafeHref("https://evil.uni-due.de/x").safe).toBe(false);
  });

  it("allows Qetoret, My Goals and the paper DOI", () => {
    expect(resolveSafeHref("https://qetoret.com")).toEqual({ safe: true, href: "https://qetoret.com/", external: true });
    expect(resolveSafeHref("https://my-goals-pwa.vercel.app").safe).toBe(true);
    expect(resolveSafeHref("https://doi.org/10.1145/3636555.3636881")).toEqual({
      safe: true,
      href: "https://doi.org/10.1145/3636555.3636881",
      external: true,
    });
  });

  it("does not extend those hosts to look-alikes or other Vercel apps", () => {
    expect(resolveSafeHref("https://evil.qetoret.com").safe).toBe(false);
    expect(resolveSafeHref("https://qetoret.com.evil.example").safe).toBe(false);
    expect(resolveSafeHref("https://doi.org.evil.example/x").safe).toBe(false);
    expect(resolveSafeHref("https://evil.vercel.app").safe).toBe(false);
    expect(resolveSafeHref("http://qetoret.com").safe).toBe(false);
  });

  it("allows the known page anchors as same-page links", () => {
    for (const id of PAGE_ANCHORS) {
      expect(resolveSafeHref(`#${id}`)).toEqual({ safe: true, href: `#${id}`, external: false });
    }
    expect(resolveSafeHref(" #project-qetoret ")).toEqual({ safe: true, href: "#project-qetoret", external: false });
  });

  it("covers every anchor the assistant is told to use", () => {
    expect([...PAGE_ANCHORS].sort()).toEqual(
      ["contact", "experience", "more-projects", "project-coursemapper", "project-knowledge-graph-rag", "project-qetoret", "projects", "skills"],
    );
  });

  it("rejects unknown, empty or altered anchors and relative paths", () => {
    for (const href of ["#", "#about", "#top", "#Projects", "#projects?x=1", "#projects/../x", "#project-qetoret#x", "/de#projects", "./#projects", "projects"]) {
      expect(resolveSafeHref(href)).toEqual({ safe: false });
    }
  });

  it("rejects non-allowlisted https hosts", () => {
    expect(resolveSafeHref("https://evil.example.com")).toEqual({ safe: false });
  });

  it("rejects dangerous and non-https schemes", () => {
    expect(resolveSafeHref("javascript:alert(1)").safe).toBe(false);
    expect(resolveSafeHref("data:text/html,<script>alert(1)</script>").safe).toBe(false);
    expect(resolveSafeHref("http://github.com").safe).toBe(false);
    expect(resolveSafeHref("vbscript:msgbox(1)").safe).toBe(false);
  });

  it("allows Paul's mailto addresses only", () => {
    expect(resolveSafeHref("mailto:arthur.meteng@gmail.com")).toEqual({
      safe: true,
      href: "mailto:arthur.meteng@gmail.com",
      external: false,
    });
    expect(resolveSafeHref("mailto:attacker@evil.com").safe).toBe(false);
  });

  it("rejects empty and non-string input", () => {
    expect(resolveSafeHref("").safe).toBe(false);
    expect(resolveSafeHref("   ").safe).toBe(false);
    expect(resolveSafeHref(undefined).safe).toBe(false);
    expect(resolveSafeHref(null).safe).toBe(false);
    expect(resolveSafeHref(42).safe).toBe(false);
  });
});
