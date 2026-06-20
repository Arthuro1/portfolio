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

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=flat-square&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-000?style=flat-square&logo=vercel)
![Claude](https://img.shields.io/badge/Claude_Haiku-AI_Assistant-orange?style=flat-square&logo=anthropic)
![i18n](https://img.shields.io/badge/i18n-EN_·_DE_·_FR-4B5563?style=flat-square)
![Dark Mode](https://img.shields.io/badge/Dark_Mode-default-1F2937?style=flat-square&logo=halfmoon)

## Features

- **AI Assistant** — floating chat widget powered by Claude Haiku. Answers recruiter questions about Paul's experience, projects, and skills in real time with streaming responses.
- **Multilingual** — full EN / DE / FR support via a language switcher in the navbar. All sections, descriptions, and chat suggestions switch instantly.
- **Dark / Light Mode** — dark mode by default, toggled via the sun/moon button in the navbar. Preference is persisted in `localStorage`.

## Sections

| Section | Content |
|---|---|
| **Hero** | Intro, CTA, social links |
| **About** | Bio, languages, background |
| **Skills** | AI/LLM, backend, frontend, DevOps |
| **Projects** | RAG system, thesis, conversational AI, web |
| **Experience** | Work history & education timeline |
| **Contact** | Email, LinkedIn, GitHub |

## Run locally

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Add your Anthropic API key to `.env.local`:

```env
ANTHROPIC_API_KEY=sk-ant-...
```

3. Start the dev server:

```bash
npm run dev
# → http://localhost:3000
```

## Build

```bash
npm run build
```

## Deploy

Connected to [Vercel](https://vercel.com/) — auto-deploys on every push to `main`.

Add `ANTHROPIC_API_KEY` in your Vercel project's **Environment Variables** for the AI assistant to work in production.
