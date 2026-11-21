import {
  siAndroid,
  siAngular,
  siApache,
  siApachemaven,
  siClaude,
  siCloudflareworkers,
  siCss,
  siDeepseek,
  siDocker,
  siElasticsearch,
  siExpress,
  siFastapi,
  siFlask,
  siFlyway,
  siGit,
  siGithubactions,
  siGitlab,
  siGooglegemini,
  siGradle,
  siHibernate,
  siHtml5,
  siJasmine,
  siJavascript,
  siJenkins,
  siJira,
  siJunit5,
  siKubernetes,
  siLangchain,
  siLiquibase,
  siModelcontextprotocol,
  siMongodb,
  siMysql,
  siNeo4j,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siOpenrouter,
  siPostgresql,
  siPostman,
  siPwa,
  siPython,
  siReact,
  siRedhat,
  siRedux,
  siSpacy,
  siSpring,
  siSpringboot,
  siStreamlit,
  siSupabase,
  siSwagger,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
  siVitest,
} from "simple-icons";

// A brand icon from simple-icons, or a coloured monogram when the brand has
// no icon there (for example Azure, Playwright, OpenAI, Oracle).
export type Logo = { kind: "icon"; path: string; hex: string } | { kind: "mono"; text: string; hex: string };

const icon = (s: { path: string; hex: string }): Logo => ({ kind: "icon", path: s.path, hex: s.hex });
const mono = (text: string, hex: string): Logo => ({ kind: "mono", text, hex });

const mcp = icon(siModelcontextprotocol);
const openai = mono("AI", "10A37F");
const cognigy = mono("Cg", "0B3694");

// Keys are lower-case labels as they appear in translations and tag lists.
const LOGOS: Record<string, Logo> = {
  python: icon(siPython),
  langchain: icon(siLangchain),
  "langchain / langgraph": icon(siLangchain),
  "claude api": icon(siClaude),
  "claude code": icon(siClaude),
  neo4j: icon(siNeo4j),
  chromadb: mono("C", "FF6446"),
  fastapi: icon(siFastapi),
  java: icon(siOpenjdk),
  "java / spring boot": icon(siSpringboot),
  "spring boot": icon(siSpringboot),
  spring: icon(siSpring),
  "node.js": icon(siNodedotjs),
  express: icon(siExpress),
  flask: icon(siFlask),
  react: icon(siReact),
  "react 19": icon(siReact),
  typescript: icon(siTypescript),
  angular: icon(siAngular),
  tailwindcss: icon(siTailwindcss),
  "tailwind css": icon(siTailwindcss),
  redux: icon(siRedux),
  javascript: icon(siJavascript),
  html: icon(siHtml5),
  css: icon(siCss),
  docker: icon(siDocker),
  vercel: icon(siVercel),
  supabase: icon(siSupabase),
  "github actions": icon(siGithubactions),
  kubernetes: icon(siKubernetes),
  jenkins: icon(siJenkins),
  gitlab: icon(siGitlab),
  git: icon(siGit),
  postgresql: icon(siPostgresql),
  pgtap: icon(siPostgresql),
  mongodb: icon(siMongodb),
  mysql: icon(siMysql),
  oracle: mono("O", "F80000"),
  azure: mono("Az", "0078D4"),
  playwright: mono("Pw", "2EAD33"),
  vitest: icon(siVitest),
  junit: icon(siJunit5),
  jasmine: icon(siJasmine),
  mockito: mono("M", "78A641"),
  elasticsearch: icon(siElasticsearch),
  "openai api": openai,
  "openai codex": openai,
  codex: openai,
  "google gemini": icon(siGooglegemini),
  deepseek: icon(siDeepseek),
  openrouter: icon(siOpenrouter),
  streamlit: icon(siStreamlit),
  spacy: icon(siSpacy),
  mcp,
  "ai agents & mcp": mcp,
  "ki-agenten & mcp": mcp,
  "agents ia & mcp": mcp,
  "cognigy ai": cognigy,
  cognigy,
  botpress: mono("Bp", "3276EA"),
  hibernate: icon(siHibernate),
  liquibase: icon(siLiquibase),
  flyway: icon(siFlyway),
  maven: icon(siApachemaven),
  gradle: icon(siGradle),
  swagger: icon(siSwagger),
  postman: icon(siPostman),
  jira: icon(siJira),
  jboss: icon(siRedhat),
  "apache cxf": icon(siApache),
  vite: icon(siVite),
  pwa: icon(siPwa),
  "next.js": icon(siNextdotjs),
  "cloudflare workers": icon(siCloudflareworkers),
  android: icon(siAndroid),
  zustand: mono("Z", "8D6E63"),
  indexeddb: mono("DB", "F59E0B"),
  soapui: mono("S", "6BB345"),
  javafx: mono("Fx", "5382A1"),
  wicket: mono("W", "E8590A"),
};

/** Finds the logo for a label such as "Neo4J / Knowledge Graphs" or "React 19". */
export function logoFor(label: string): Logo | null {
  const key = label.trim().toLowerCase();
  return LOGOS[key] ?? LOGOS[key.split(" / ")[0]] ?? null;
}

function channels(hex: string): [number, number, number] {
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number];
}

function luminance([r, g, b]: [number, number, number]): number {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function mix(a: [number, number, number], b: [number, number, number], t: number): string {
  const [r, g, bl] = a.map((c, i) => Math.round(c + (b[i] - c) * t));
  return `rgb(${r} ${g} ${bl})`;
}

const INK_LIGHT: [number, number, number] = [17, 22, 52];
const INK_DARK: [number, number, number] = [233, 236, 247];

/**
 * Brand colour adjusted per theme: very pale colours are darkened on the
 * light background and very dark ones lightened on the dark background.
 */
export function themedColors(hex: string) {
  const rgb = channels(hex);
  const l = luminance(rgb);
  return {
    light: l > 0.5 ? mix(rgb, INK_LIGHT, 0.35) : `rgb(${rgb.join(" ")})`,
    dark: l < 0.06 ? mix(rgb, INK_DARK, 0.8) : `rgb(${rgb.join(" ")})`,
    /** Readable text on each theme's colour, for monograms. */
    onLight: l > 0.3 && l <= 0.5 ? "rgb(17 22 52)" : "rgb(255 255 255)",
    onDark: l > 0.3 || l < 0.06 ? "rgb(9 13 31)" : "rgb(255 255 255)",
  };
}
