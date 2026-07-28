# Security & Deployment Guide

Operational security guide for this portfolio and its AI chat endpoint
(`POST /api/chat`). It separates **controls enforced in code** (already done)
from **platform configuration the repository owner must perform** in the
Anthropic, Upstash, and Vercel dashboards.

---

## 1. Controls enforced in code (already implemented)

These ship in the repository and require no dashboard configuration:

| Control                                   | Where                                    |
| ----------------------------------------- | ---------------------------------------- |
| Kill switch (`CHAT_ENABLED` → 503)        | `app/api/chat/route.ts`, `lib/chat-config.ts` |
| Distributed rate limit (per-client/min)   | `lib/rate-limit.ts` (Upstash)            |
| Concurrency guard (per client)            | `lib/rate-limit.ts`                       |
| Global daily generation cap               | `lib/rate-limit.ts`                       |
| Request body size limit (413)             | `lib/request-body.ts`                     |
| Content-type allowlist (415)              | `lib/request-body.ts`                     |
| Malformed-JSON rejection (400)            | `lib/request-body.ts`                     |
| Strict closed-schema input validation     | `lib/chat-validation.ts`                  |
| Stateless single-message contract         | `app/api/chat/route.ts`, `components/ChatWidget.tsx` |
| Prompt-injection–resistant system prompt  | `app/api/chat/route.ts`                   |
| Request timeout + client-disconnect abort | `app/api/chat/route.ts`                   |
| Origin / `Sec-Fetch-Site` checks          | `lib/client-trust.ts`                     |
| Hardened streamed-response headers        | `app/api/chat/route.ts`                   |
| Markdown link allowlist (no raw HTML)     | `lib/safe-url.ts`, `components/ChatWidget.tsx` |
| CSP without `unsafe-eval` in production    | `lib/security-headers.js`, `next.config.js` |
| Security headers (HSTS, XFO, etc.)        | `lib/security-headers.js`                 |
| Privacy-preserving security logging       | `lib/log.ts`                              |

> **Rate-limit authority:** Upstash Redis is the intended production authority.
> If the Upstash variables are absent, the limiter falls back to a *bounded,
> best-effort, per-instance* in-memory limiter. That fallback is acceptable for
> local development only — it does **not** provide correct limits across Vercel
> serverless instances. Configure Upstash for any real deployment (section 3).

---

## 2. Required environment variables

Set these in Vercel (see section 5). All are **server-only**; never prefix any
with `NEXT_PUBLIC_`. See [`.env.example`](../.env.example) for the full list and
defaults.

| Variable                     | Required?             | Purpose                                   |
| ---------------------------- | --------------------- | ----------------------------------------- |
| `ANTHROPIC_API_KEY`          | Yes                   | Anthropic API access (dedicated key)      |
| `UPSTASH_REDIS_REST_URL`     | Yes (prod)            | Distributed rate limiting                 |
| `UPSTASH_REDIS_REST_TOKEN`   | Yes (prod)            | Distributed rate limiting                 |
| `CHAT_ENABLED`               | No (default `true`)   | Emergency kill switch                     |
| `CHAT_MAX_REQUESTS_PER_MINUTE` | No (default `8`)    | Per-client request rate                   |
| `CHAT_MAX_CONCURRENT_PER_CLIENT` | No (default `2`)  | Concurrent generations per client         |
| `CHAT_GLOBAL_DAILY_LIMIT`    | No (default `2000`)   | Global daily cost safety net (0 disables) |
| `CHAT_MAX_MESSAGE_LENGTH`    | No (default `1500`)   | Max characters per message                |
| `CHAT_MAX_TOTAL_CHARACTERS`  | No (default `8000`)   | Absolute character bound                  |
| `CHAT_MAX_OUTPUT_TOKENS`     | No (default `400`)    | Model `max_tokens`                        |
| `CHAT_MAX_REQUEST_BODY_BYTES`| No (default `32000`)  | Body size limit                           |
| `CHAT_REQUEST_TIMEOUT_MS`    | No (default `20000`)  | Upstream timeout                          |
| `IP_HASH_SALT`               | Recommended           | Salt for hashing client IPs               |
| `ALLOWED_ORIGINS`            | No                    | Extra allowed browser origins (CSV)       |

---

## 3. Upstash Redis setup (manual)

1. Create a free account at <https://upstash.com> and create a **Redis** database
   (choose a region close to your Vercel deployment region; enable *Eviction*).
2. In the database page, open **REST API** and copy:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
3. Add both to Vercel (section 5) for **Production** and **Preview**.
   Use a **separate database** (or at least separate tokens) per environment so
   preview traffic cannot exhaust production limits.
4. Redeploy. Verify with the checks in section 9 that responses include working
   `429`/`Retry-After` behavior.

Monitoring: in the Upstash console, watch the **command count** and set a usage
alert. A sudden spike indicates abuse traffic hitting the limiter.

---

## 4. Anthropic setup, dedicated key & spend limits (manual)

1. In the [Anthropic Console](https://console.anthropic.com), create a
   **dedicated API key** for this portfolio (do not reuse a key from another
   app). Name it clearly, e.g. `portfolio-prod`.
2. Set a **monthly spend limit** on the workspace/organization (Billing →
   Limits) so a bypass of application controls still cannot run up an unbounded
   bill.
3. Configure **usage/billing alerts** (e.g. email at 50% / 80% / 100% of the
   monthly budget).
4. Consider a **separate key for Preview** deployments so preview usage is
   billed/observable independently and can be revoked without touching prod.

The application additionally caps cost in code via `CHAT_MAX_OUTPUT_TOKENS`,
per-client rate limits, and `CHAT_GLOBAL_DAILY_LIMIT`.

---

## 5. Vercel environment variables (manual)

1. Vercel → Project → **Settings → Environment Variables**.
2. Add each variable from section 2. Set the **Environment** scope explicitly:
   - **Production**: production key + production Upstash DB.
   - **Preview**: preview key + preview Upstash DB.
   - Do **not** expose secrets to the client — keep all names un-prefixed.
3. Redeploy so the new values take effect.

---

## 6. Vercel Firewall / WAF configuration (manual)

Vercel Firewall rules cannot be committed as application code, so configure them
in **Project → Settings → Firewall**. Recommended rules for the chat endpoint:

- **Path-specific rate limiting:** add a rate-limit rule matching
  `Path` `equals` `/api/chat` and `Method` `equals` `POST` — e.g. *N requests
  per minute per IP*. This is a network-layer complement to the in-app limiter
  (belt and suspenders), and it protects even when the function is cold.
- **Bot protection / challenge:** enable Vercel's bot management (or add a
  challenge/deny rule) for `/api/chat` to filter automated traffic. Prefer a
  managed challenge over an outright block so legitimate users are not harmed.
- **Block unexpected methods:** add a rule to **deny** any method other than
  `POST` (and `OPTIONS` if needed) on `/api/chat`.
- **Request-size restriction:** where available, cap request body size for
  `/api/chat` at the network edge (the app also enforces
  `CHAT_MAX_REQUEST_BODY_BYTES`).
- **Usage alerts:** enable Vercel **Spend Management** and **Usage** alerts for
  the project (functions invocations, bandwidth) so an attack is noticed early.
- **Emergency block:** keep a **deny-all rule for `/api/chat`** saved (disabled)
  that can be toggled on instantly to take the endpoint offline at the edge.

> These are dashboard steps. Do **not** treat this section as implemented until
> the rules are created and enabled in the Vercel project.

---

## 7. Emergency chat shutdown

Two independent kill paths, fastest first:

1. **Application kill switch (fastest, no redeploy of code):**
   In Vercel env vars, set `CHAT_ENABLED=false` and redeploy (or use *Redeploy*
   on the latest build). The endpoint then returns `503` **without** contacting
   Anthropic. Re-enable by setting it back to `true`.
2. **Edge block:** enable the saved deny-all Firewall rule for `/api/chat`
   (section 6). This stops traffic before it reaches the function.

Either alone stops model spend; use both if under active abuse.

---

## 8. Key rotation procedure

Rotate immediately if a key may have been exposed (committed, logged, or shown
in a bundle), and routinely (e.g. quarterly).

**Anthropic key:**
1. Create a new key in the Anthropic Console.
2. Update `ANTHROPIC_API_KEY` in Vercel (Production, then Preview).
3. Redeploy and verify the assistant works (section 9).
4. Revoke the old key in the console.

**Upstash token:**
1. In Upstash, roll/regenerate the REST token (or create a new database).
2. Update `UPSTASH_REDIS_REST_TOKEN` (and `_URL` if the DB changed) in Vercel.
3. Redeploy and verify `429` behavior still works.
4. Invalidate the old token.

**IP hash salt:** rotating `IP_HASH_SALT` simply re-buckets hashed identifiers;
safe to change anytime.

After any suspected exposure, also **purge the secret from git history** if it
was ever committed (`git filter-repo` / BFG) and force-push, then rotate.

---

## 9. Production verification steps

After deploying, verify from a terminal (replace the host):

```bash
BASE=https://paulmeteng.space

# 1. Security headers present, no unsafe-eval, powered-by hidden
curl -sI "$BASE" | grep -iE 'content-security-policy|strict-transport|x-frame|x-content-type|referrer-policy|permissions-policy|x-powered-by'

# 2. Valid chat request streams a response
curl -s -X POST "$BASE/api/chat" -H 'content-type: application/json' \
  --data '{"message":"What is Paul working on?"}' -i | head -20

# 3. Wrong content type -> 415
curl -s -o /dev/null -w '%{http_code}\n' -X POST "$BASE/api/chat" \
  -H 'content-type: text/plain' --data 'hi'   # expect 415

# 4. Malformed JSON -> 400
curl -s -o /dev/null -w '%{http_code}\n' -X POST "$BASE/api/chat" \
  -H 'content-type: application/json' --data '{bad'   # expect 400

# 5. Extra field -> 400
curl -s -o /dev/null -w '%{http_code}\n' -X POST "$BASE/api/chat" \
  -H 'content-type: application/json' --data '{"message":"hi","role":"admin"}'  # 400

# 6. Oversized body -> 413
curl -s -o /dev/null -w '%{http_code}\n' -X POST "$BASE/api/chat" \
  -H 'content-type: application/json' \
  --data "{\"message\":\"$(head -c 40000 < /dev/zero | tr '\0' a)\"}"   # expect 413

# 7. Cross-origin browser request -> 403
curl -s -o /dev/null -w '%{http_code}\n' -X POST "$BASE/api/chat" \
  -H 'content-type: application/json' -H 'origin: https://evil.example.com' \
  -H 'sec-fetch-site: cross-site' --data '{"message":"hi"}'   # expect 403

# 8. Rate limit -> a burst should start returning 429 with Retry-After
for i in $(seq 1 15); do
  curl -s -o /dev/null -w '%{http_code} ' -X POST "$BASE/api/chat" \
    -H 'content-type: application/json' --data '{"message":"hi"}'
done; echo

# 9. Kill switch -> set CHAT_ENABLED=false, redeploy, expect 503
```

Also confirm no secret appears in the client bundle:

```bash
# From a clean build, no secret material should be present in static chunks.
grep -R "sk-ant" .next/static 2>/dev/null && echo "LEAK!" || echo "clean"
```

---

## 10. Incident response runbook

1. **Detect:** unusual spikes in `429`/`413`/`503`, Anthropic spend, Vercel
   function invocations, or Upstash command count.
2. **Contain:** flip `CHAT_ENABLED=false` (section 7) and/or enable the edge
   deny rule.
3. **Assess:** inspect structured logs (JSON lines with `kind:"security"`) —
   they contain request IDs, hashed client IDs, result/reason categories, and
   timing, but never prompt content or secrets.
4. **Rotate:** if a credential may be involved, rotate it (section 8).
5. **Recover:** tighten limits (`CHAT_MAX_REQUESTS_PER_MINUTE`,
   `CHAT_GLOBAL_DAILY_LIMIT`) as needed, then re-enable.
6. **Review:** capture the timeline and adjust Firewall rules/limits.

---

## 11. Rollback

- **Code:** in Vercel → Deployments, select the last known-good deployment and
  **Promote to Production** (instant rollback). Or `git revert` the offending
  commit and push.
- **Config:** environment-variable changes are reverted by restoring the prior
  value and redeploying.

---

## 12. Local development setup

```bash
npm ci
cp .env.example .env.local   # then fill in ANTHROPIC_API_KEY
npm run dev                  # http://localhost:3000
```

Without Upstash variables, rate limiting uses the in-memory fallback (fine for
local dev). Run the full check suite exactly as CI does:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm audit --omit=dev
```

---

## 13. Residual risks requiring ongoing attention

- **Prompt injection is mitigated, not eliminated.** The system prompt reduces
  blast radius, but the real guarantees are the code-level limits. Never give
  this assistant tools, secrets, or private data access.
- **IP-based limits can be bypassed** by distributed/botnet traffic. The Vercel
  Firewall + bot protection (section 6) is the primary mitigation for that; the
  in-app limiter is a complement.
- **Dev-only dependency advisories** (ESLint toolchain) may appear in a full
  `npm audit`. They are not in the production bundle; the CI gate audits with
  `--omit=dev`. Dependabot tracks upstream fixes.
- **CSP keeps `'unsafe-inline'`** for scripts/styles (static JSON-LD, Speed
  Insights bootstrap, Tailwind/styled-jsx). Nonces were intentionally avoided
  to keep the site statically rendered. Self-hosting fonts via `next/font` would
  further remove the two Google Fonts origins from the CSP — a recommended
  future hardening.
