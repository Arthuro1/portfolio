/**
 * Size-capped, content-type-checked request body reader.
 *
 * Never calls `req.json()` blindly. Instead it:
 *  - Requires `Content-Type: application/json` (415 otherwise).
 *  - Rejects an oversized `Content-Length` up front (413).
 *  - Streams the body and stops the moment it exceeds the byte budget, so a
 *    lying/absent `Content-Length` cannot smuggle a huge payload (413).
 *  - Rejects malformed / empty JSON (400).
 */

export type BodyResult =
  | { ok: true; value: unknown }
  | { ok: false; status: 400 | 413 | 415 };

const JSON_CONTENT_TYPE = /^application\/(?:[\w.+-]+\+)?json\b/i;

export async function readJsonBody(
  req: Request,
  maxBytes: number,
): Promise<BodyResult> {
  const contentType = (req.headers.get("content-type") ?? "").trim();
  if (!JSON_CONTENT_TYPE.test(contentType)) {
    return { ok: false, status: 415 };
  }

  // Fast path: an honest, oversized Content-Length is rejected before reading.
  const declaredLength = req.headers.get("content-length");
  if (declaredLength !== null) {
    const n = Number(declaredLength);
    if (Number.isFinite(n) && n > maxBytes) {
      return { ok: false, status: 413 };
    }
  }

  const body = req.body;
  if (body === null) {
    return { ok: false, status: 400 };
  }

  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      received += value.byteLength;
      if (received > maxBytes) {
        // Stop reading immediately; do not buffer the rest.
        try {
          await reader.cancel();
        } catch {
          /* ignore */
        }
        return { ok: false, status: 413 };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false, status: 400 };
  }

  if (received === 0) {
    return { ok: false, status: 400 };
  }

  const buffer = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.byteLength;
  }

  let text: string;
  try {
    text = new TextDecoder("utf-8", { fatal: false }).decode(buffer);
  } catch {
    return { ok: false, status: 400 };
  }

  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    return { ok: false, status: 400 };
  }

  return { ok: true, value };
}
