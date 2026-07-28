import { describe, it, expect } from "vitest";
import { readJsonBody } from "@/lib/request-body";

function jsonRequest(body: string, contentType = "application/json"): Request {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "content-type": contentType },
    body,
  });
}

describe("readJsonBody", () => {
  it("parses a valid JSON body", async () => {
    const result = await readJsonBody(
      jsonRequest(JSON.stringify({ message: "hi" })),
      10_000,
    );
    expect(result).toEqual({ ok: true, value: { message: "hi" } });
  });

  it("rejects a non-JSON content type with 415", async () => {
    const result = await readJsonBody(jsonRequest("hi", "text/plain"), 10_000);
    expect(result).toEqual({ ok: false, status: 415 });
  });

  it("rejects a request with no content type with 415", async () => {
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      body: "{}",
    });
    const result = await readJsonBody(req, 10_000);
    expect(result).toEqual({ ok: false, status: 415 });
  });

  it("rejects an oversized declared Content-Length with 413", async () => {
    const body = JSON.stringify({ message: "a".repeat(500) });
    const result = await readJsonBody(jsonRequest(body), 100);
    expect(result).toEqual({ ok: false, status: 413 });
  });

  it("rejects a body that exceeds the cap even without Content-Length", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        for (let i = 0; i < 10; i++) {
          controller.enqueue(encoder.encode("a".repeat(50)));
        }
        controller.close();
      },
    });
    // A streamed body has no Content-Length, so the byte cap must catch it.
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: stream,
      duplex: "half",
    } as RequestInit & { duplex: "half" });
    const result = await readJsonBody(req, 100);
    expect(result).toEqual({ ok: false, status: 413 });
  });

  it("rejects malformed JSON with 400", async () => {
    const result = await readJsonBody(jsonRequest("{ not json"), 10_000);
    expect(result).toEqual({ ok: false, status: 400 });
  });

  it("rejects an empty body with 400", async () => {
    const req = new Request("http://localhost/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
    });
    const result = await readJsonBody(req, 10_000);
    expect(result).toEqual({ ok: false, status: 400 });
  });
});
