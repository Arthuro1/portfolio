# Security Policy

## Supported versions

This is a single-deployment personal portfolio. Only the latest `main` branch
(the code currently deployed to production) is supported and receives security
fixes.

| Version            | Supported |
| ------------------ | --------- |
| `main` (deployed)  | ✅        |
| any older revision | ❌        |

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security problems.

- Email: **arthur.meteng@yahoo.com** with the subject `SECURITY: portfolio`.
- Include steps to reproduce, affected URL/endpoint, and impact.
- You will get an acknowledgement within a few days. Please allow reasonable
  time for a fix before any public disclosure.

## Scope

The main sensitive surface is the AI chat endpoint (`POST /api/chat`), which
proxies requests to the Anthropic API. Relevant hardening (rate limiting,
request-size limits, strict input validation, prompt-injection resistance,
kill switch, CSP, and security headers) is documented in
[`docs/SECURITY_DEPLOYMENT.md`](docs/SECURITY_DEPLOYMENT.md).

## Handling secrets

- No secrets are committed to this repository. `.env`, `.env.local`,
  `.env.*.local`, `*.pem`, and `*.key` are git-ignored.
- All credentials are configured as **server-only** environment variables in
  Vercel. None are prefixed with `NEXT_PUBLIC_`, so none reach the browser.
- If a credential is ever exposed (in git history, logs, or a bundle), rotate
  it immediately following the key-rotation steps in
  [`docs/SECURITY_DEPLOYMENT.md`](docs/SECURITY_DEPLOYMENT.md).

## Automated checks

Every pull request and push to `main` runs typecheck, lint, tests, a production
build, and `npm audit --omit=dev` via GitHub Actions. Dependabot proposes
weekly dependency and GitHub Actions updates.
