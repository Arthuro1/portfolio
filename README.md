<div align="center">

# Paul Arthur Meteng

### AI Engineer · Software Engineer

[![Live](https://img.shields.io/badge/Live-portfolio-blue?style=for-the-badge&logo=vercel)](https://portfolio-blush-rho-65.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-connect-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/paul-arthur-meteng-kamdem-06b922125)
[![GitHub](https://img.shields.io/badge/GitHub-Arthuro1-181717?style=for-the-badge&logo=github)](https://github.com/Arthuro1)

</div>

---

Personal portfolio built to showcase my journey from Software Engineer to **AI Engineer** — featuring RAG systems, knowledge graphs, conversational AI, and full-stack projects.

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-000?style=flat-square&logo=vercel)
![OpenRouter](https://img.shields.io/badge/DeepSeek_via_OpenRouter-AI_Assistant-6566F1?style=flat-square&logo=openrouter&logoColor=white)
![i18n](https://img.shields.io/badge/i18n-EN_·_DE_·_FR-4B5563?style=flat-square)
![Dark Mode](https://img.shields.io/badge/Dark_Mode-default-1F2937?style=flat-square&logo=halfmoon)

## Features

- **AI Assistant** — floating chat widget powered by an open-weight model (DeepSeek V4.1 Flash) through OpenRouter. Answers recruiter questions about Paul's experience, projects, and skills in real time with streaming responses.
- **Multilingual** — full EN / DE / FR support, each with its own server-rendered URL (`/`, `/de`, `/fr`) and hreflang links. The navbar switcher changes language instantly and remembers the choice in a `lang` cookie; on a first visit to `/`, German and French browsers are redirected to their language.
- **Dark / Light Mode** — dark mode by default, toggled via the sun/moon button in the navbar. Preference is persisted in `localStorage`.
- **Hardened chat endpoint** — distributed rate limiting (Upstash), request-size limits, strict input validation, prompt-injection–resistant system prompt, per-client concurrency guard, request timeouts, a kill switch, a strict Content-Security-Policy, and safe Markdown rendering. See [SECURITY.md](SECURITY.md) and [docs/SECURITY_DEPLOYMENT.md](docs/SECURITY_DEPLOYMENT.md).

## Sections

| Section | Content |
|---|---|
| **Hero** | Headline, focus areas, availability and key facts at a glance, CTAs, social links |
| **01 Projects** | Case studies (Knowledge Graph RAG, Qetoret, CourseMapper) |
| **02 Experience** | AI Engineering focus, work history, further education, certificates |
| **03 Skills** | How I work; core tools per area, the rest collapsed but searchable |
| **More projects** | Eight more projects (four shown, two on phones; the rest behind a toggle), education |
| **04 Contact** | Email, LinkedIn, GitHub, outside work |

## Run locally

1. Clone the repo and install dependencies from a clean state:

```bash
npm ci
```

2. Create your local env file and add your OpenRouter API key:

```bash
cp .env.example .env.local
# then set OPENROUTER_API_KEY=sk-or-... in .env.local
```

`.env.example` documents every supported variable. Upstash Redis is optional
locally (rate limiting falls back to a best-effort in-memory limiter), but is
required in production — see [docs/SECURITY_DEPLOYMENT.md](docs/SECURITY_DEPLOYMENT.md).

3. Start the dev server:

```bash
npm run dev
# → http://localhost:3000
```

## Scripts

```bash
npm run dev         # start the dev server
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm test            # vitest (unit + API route tests)
npm run build       # production build
npm audit --omit=dev
```

## Deploy

Connected to [Vercel](https://vercel.com/) — auto-deploys on every push to `main`.
CI (GitHub Actions) runs typecheck, lint, tests, build, and a production
dependency audit on every PR and push to `main`.

Configure the required environment variables in your Vercel project's
**Settings → Environment Variables** (Production and Preview scopes). The full
list, plus Upstash, OpenRouter, and Vercel Firewall setup, is in
[docs/SECURITY_DEPLOYMENT.md](docs/SECURITY_DEPLOYMENT.md).
