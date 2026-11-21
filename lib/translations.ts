export type Lang = "en" | "de" | "fr";

// Text wrapped in **double asterisks** is rendered bold by components/Rich.tsx.
// All three languages must keep the same shape: components index the arrays
// in parallel with their own data (tags, links), and tests/translations.test.ts
// checks the parity.
export const translations = {
  en: {
    nav: {
      projects: "Projects",
      experience: "Experience",
      skills: "Skills",
      contact: "Contact",
      theme: "Dark mode",
      language: "Language",
      menu: "Menu",
    },
    hero: {
      badge: "AI Engineer · Software Engineer",
      headline: "I build reliable AI applications — from prototype to production.",
      description:
        "Software engineer since 2018 — part-time during my studies, full-time on Java enterprise systems from 2023 to 2026 — now focused on **LLM applications, RAG and AI agents**. I ship AI features in a live app, measure retrieval quality, and use automated tests to make AI-powered software dependable.",
      focusLabel: "Focus",
      focus: ["AI Engineering", "RAG & LLMs", "Production software"],
      availabilityLine: "Available full-time from March 2027 · Ruhr area · remote or hybrid",
      cta1: "See my projects",
      cta2: "Ask my AI assistant",
      cv: "Download CV (PDF)",
      cvFile: "/cv/Paul-Arthur-Meteng-CV-EN.pdf",
      glance: {
        title: "At a glance",
        availability: "Available",
        availabilityValue: "From March 2027, full-time",
        location: "Based in",
        locationValue: "Ruhr area, NRW, Germany",
        workMode: "Work mode",
        workModeValue: "Remote or hybrid",
        languages: "Languages",
        languagesValue: "German C2 · English C2 · French (native)",
        education: "Education",
        educationValue: "M.Sc. Applied Computer Science, Uni Duisburg-Essen",
        proof: [
          { value: "3", label: "Claude features in production in Qetoret, my app for web and Android" },
          { value: "2018", label: "first software job — chatbots for municipalities at Publicplan (part-time)" },
          { value: "ACM", label: "co-authored research paper (LAK '24)" },
        ],
      },
    },
    skills: {
      title: "Skills",
      kicker: "What I work with",
      intro: "I work spec-driven with Claude Code and Codex — tests, type checks and reviews check what the AI writes before it ships. Core tools first; the rest one click away.",
      coreLabel: "Core",
      moreLabel: "Also used",
      showMore: "+{n} more",
      showLess: "Show less",
      categories: [
        {
          category: "AI & LLM",
          blurb: "LLM apps that retrieve, reason — and get measured.",
          core: ["RAG Systems", "LangChain / LangGraph", "Claude API", "AI Agents & MCP", "Neo4J / Knowledge Graphs", "LLM Evaluation"],
          more: ["ChromaDB", "Agent Memory", "Prompt Engineering", "Claude Code", "OpenAI Codex", "OpenAI API", "Google Gemini", "DeepSeek", "OpenRouter", "Streamlit", "spaCy", "NLP / NLU"],
        },
        {
          category: "Conversational AI",
          blurb: "Chatbots that real citizens talked to, in production.",
          core: ["Cognigy AI", "Botpress", "NLU Models", "Conversation Design"],
          more: ["Chatbot Lifecycle", "Elasticsearch"],
        },
        {
          category: "Backend",
          blurb: "Solid APIs and data, in Java and Python.",
          core: ["Java / Spring Boot", "Python", "FastAPI", "REST APIs"],
          more: ["Node.js / Express", "Flask", "PostgreSQL", "MongoDB", "MySQL", "Oracle"],
        },
        {
          category: "Frontend",
          blurb: "Interfaces people enjoy using.",
          core: ["React", "TypeScript", "Angular", "TailwindCSS"],
          more: ["Redux", "JavaScript", "HTML / CSS"],
        },
        {
          category: "Cloud & DevOps",
          blurb: "From commit to production.",
          core: ["Docker", "Azure", "Vercel", "Supabase", "GitHub Actions"],
          more: ["Kubernetes", "Jenkins", "GitLab", "Git"],
        },
        {
          category: "Testing & Quality",
          blurb: "AI writes code fast. Tests keep it honest.",
          core: ["Automated Quality Gates", "Playwright", "Vitest", "JUnit"],
          more: ["Mockito", "pgTAP", "Jasmine"],
        },
      ],
    },
    projects: {
      title: "Projects",
      kicker: "What I've built",
      subtitle: "Three case studies, with the numbers and where to check them.",
      links: { live: "Live", code: "Code", paper: "Paper", page: "Project page", report: "Lighthouse report" },
      techLabel: "Technologies",
      tagsMore: "more technologies",
      tagsLess: "Show less",
      metricsLabel: "Key figures",
      caseStudy: { open: "Read the case study", close: "Hide the case study" },
      shotViewer: { open: "Enlarge screenshot", close: "Close", prev: "Previous screenshot", next: "Next screenshot" },
      featured: [
        {
          title: "Knowledge Graph RAG System",
          date: "2026 – present",
          type: "Personal project",
          summary: "Answers questions from a knowledge graph plus vector search — and measures how good the answers are.",
          shots: ["Knowledge graph in Neo4J", "Chat with graph stats", "REST API (FastAPI)"],
          metrics: [
            { value: "1.00", label: "recall@5", note: "right passage in the top 5" },
            { value: "0.96", label: "MRR", note: "ranked first in all but one" },
            { value: "3/3", label: "unanswerable questions refused" },
          ],
          metricsNote: "Small 20-question test set: a regression guard, not proof of quality. Measuring caught two retrieval bugs.",
          sections: [
            {
              heading: "Problem",
              body: "Answer questions about a document collection — and know, with numbers, whether the answers are any good.",
            },
            {
              heading: "Architecture",
              body: "Ingest splits the documents into 120-word chunks. An LLM extracts entities and relations into a Neo4J graph, and the same chunks are embedded into ChromaDB. For each question, a hybrid retriever combines a Cypher lookup in the graph with vector search; the LLM (Claude or OpenAI) answers from both and streams the answer through FastAPI.",
            },
            {
              heading: "How it's measured",
              points: [
                "Hand-built metrics: exact match, token F1, semantic similarity, recall@k, MRR, refusal rate",
                "An LLM-as-judge for correctness, groundedness and refusals — built and tested, but not calibrated yet, so no judge scores are reported",
                "A baseline runner that logs every run: one row per change in RESULTS.md, raw data kept per question",
                "Test set: 17 answerable and 3 unanswerable questions",
              ],
            },
            {
              heading: "What measuring caught",
              points: [
                "**The vector store was never written to during ingest**, so the “hybrid” retriever was graph-only. Fixed: every chunk is indexed now.",
                "**500-word chunks on a 269-word corpus** put everything into one chunk, so recall@5 = 1.0 was true by construction. Fixed: 120-word chunks and a corpus extended to 1,497 words → 16 chunks, 115 graph nodes, 118 relations.",
                "**Token F1 of 0.14 measured verbosity, not correctness**: the three “worst” answers were right. That is why the LLM judge exists.",
              ],
            },
            {
              heading: "Limits & next",
              points: [
                "The corpus is small and its topics barely overlap, so recall sits at the ceiling: a regression guard, not proof of quality.",
                "Next: a harder corpus with overlapping topics and a larger test set, a vector-only vs. hybrid baseline, and calibrating the judge with human labels (pipeline built, labels not collected yet).",
                "311 automated tests (pytest).",
              ],
            },
          ],
        },
        {
          title: "Qetoret — Prayer Companion",
          date: "2024 – present",
          type: "Personal project",
          summary: "A prayer app for web and Android in **16 languages**, with three AI features.",
          shots: ["Landing page", "Prayer circles", "Prayer plan and rhythm", "Answered prayer testimony", "Check before sending"],
          metrics: [
            { value: "3", label: "Claude features in production" },
            { value: "34", label: "avg. monthly active users", note: "Google Play, Nov 2026" },
            { value: "95", label: "mobile Lighthouse performance", note: "Accessibility 100" },
          ],
          sections: [
            {
              heading: "Problem",
              body: "AI help with Bible references, prayer suggestions and translation that has to stay cheap, safe and private for real users.",
            },
            {
              heading: "How people use it",
              points: [
                "Set up a prayer plan and a rhythm to pray by",
                "Ask the AI for Bible references, a prayer suggestion or a translation",
                "See what will leave the device before anything is sent (the “Check before sending” step)",
                "Join groups with a QR invite code, and share a testimony when a prayer is answered",
              ],
            },
            {
              heading: "AI in production",
              points: [
                "Claude Haiku, called only from Qetoret's own server",
                "A token budget per task, plus prompt caching",
                "Per-minute and daily limits for each user",
                "Token usage reported with every answer",
              ],
            },
            {
              heading: "Security & privacy decisions",
              points: [
                "User text is treated as data, never as instructions",
                "Consent first, and a check before sending that warns the text leaves the device unencrypted and asks to hide anything that could identify someone",
                "Names are redacted on the device before anything is sent",
                "End-to-end encryption",
              ],
            },
            {
              heading: "Error handling",
              points: [
                "50-second timeout",
                "Retry-After when the provider is overloaded",
                "Truncated answers are discarded",
                "Every output is checked against the expected format",
              ],
            },
            {
              heading: "Early adoption (Nov 2026)",
              body: "Early numbers, each from its own source.",
              points: [
                "**42** accounts — app database",
                "**35** installs — Google Play",
                "**34** average monthly and **3.14** average daily active users — Play Console, 28 days to 20 Nov 2026",
                "**+74%** average monthly active users vs. the previous 28 days — Play Console",
              ],
            },
            {
              heading: "Quality",
              points: [
                "PageSpeed Insights, mobile (Lighthouse 13.6, 21 Nov 2026): Performance 95, Accessibility 100, Best Practices 100, SEO 100",
                "First Contentful Paint 0.9 s, Largest Contentful Paint 3.0 s",
                "Next: LCP under 2.5 s, and measuring AI latency (p50/p95), cost per successful AI answer and cache hit rate. There are no numbers for these yet.",
              ],
            },
            {
              heading: "Also built",
              body: "Scripture search, daily verses via Supabase Edge Functions, web push, offline mode, Google sign-in, data export.",
            },
          ],
        },
        {
          title: "CourseMapper — Learning Resource Recommendation",
          date: "2022 – 2023",
          type: "Master's thesis · Duisburg-Essen",
          summary: "Recommends YouTube videos and Wikipedia articles for the concepts a learner hasn't understood — in CourseMapper, the university's MOOC platform.",
          shots: ["Recommended YouTube videos", "Recommended Wikipedia articles", "Helpfulness feedback"],
          metrics: [
            { value: "ACM", label: "LAK '24 paper, co-author" },
            { value: "2", label: "resource types recommended", note: "Wikipedia, YouTube" },
          ],
          sections: [
            {
              heading: "Problem",
              body: "Learners on the university's MOOC platform mark the concepts they didn't understand. Which outside resources help with exactly those gaps?",
            },
            {
              heading: "My contribution",
              points: [
                "My Master's thesis: recommending Wikipedia articles and YouTube videos for the concepts a learner hasn't understood, inside CourseMapper",
                "A knowledge graph and graph neural networks model each learner's knowledge state to pick the resources",
                "Learners rate each recommendation as helpful or not",
              ],
            },
            {
              heading: "Research",
              body: "The work fed into the co-authored paper “Learner Modeling and Recommendation of Learning Resources using Personal Knowledge Graphs” (LAK '24, ACM).",
            },
          ],
        },
      ],
      diagram: {
        label: "Architecture of the Knowledge Graph RAG system. Ingest: documents are split into chunks; an LLM extracts entities and relations into a Neo4J graph, and the chunks are embedded into ChromaDB. For each question, a hybrid retriever combines a graph lookup with vector search, and an LLM (Claude or OpenAI) answers, streamed through FastAPI. An evaluation layer scores retrieval and answers with metrics and logs every run; an LLM judge is built but not calibrated yet.",
        ingest: "Ingest",
        nodes: {
          docs: { title: "Documents", detail: "text corpus" },
          chunk: { title: "Chunking", detail: "120 words each" },
          extract: { title: "LLM extraction", detail: "entities & relations" },
          embed: { title: "Embeddings", detail: "sentence-transformer" },
          graph: { title: "Neo4J", detail: "knowledge graph" },
          vectors: { title: "ChromaDB", detail: "vector store" },
          question: { title: "Question" },
          retriever: { title: "Hybrid retriever", detail: "graph lookup (Cypher)\n+ vector search" },
          answer: { title: "LLM answer", detail: "Claude or OpenAI\nFastAPI, streaming" },
          evaluation: { title: "Evaluation", detail: "metrics · every run logged\nLLM judge: not calibrated yet" },
        },
      },
      moreKicker: "Also built",
      moreTitle: "More projects",
      showAll: "Show all {n} projects",
      showFewer: "Show fewer",
      more: [
        {
          title: "My Goals — Offline-First Goal Tracker",
          date: "2026 – present",
          type: "Personal project",
          summary: "A goal and habit tracker that works offline and syncs across devices.",
          shots: ["Today's goals", "Weekly progress", "Goal setup and tracking", "Rewards and highlights", "Purpose and Sabbath review"],
          highlights: [
            "Installs on phone and desktop, with web push and Google Calendar",
            "**624 tests** and size budgets in CI",
            "Domain logic testable without mocks",
          ],
        },
        {
          title: "Parlons Ghomálá — Language Learning PWA",
          date: "2026",
          type: "Personal project · prototype",
          summary: "Learn spoken Ghomálá', a Cameroonian language, by ear — built by AI agents from a spec. A local prototype, not deployed yet.",
          shots: ["Landing page", "Listening step with video", "Picture vocabulary", "Tone grid", "Dialect map"],
          highlights: [
            "19 lessons, tone drills, listening games, an on-device recorder",
            "Review agents score every milestone (pass mark 85/100)",
            "**19 milestones in 6 days** · 518 unit and 173 database tests",
          ],
        },
        {
          title: "GovBot — Conversational AI for Public Sector",
          date: "2018 – 2021",
          type: "Publicplan GmbH",
          summary: "Chatbots for municipalities across Germany.",
          highlights: ["Conversation design and NLU models", "Tuned continuously while they ran in production"],
        },
        {
          title: "Wach Auf e.V. — Website Redesign",
          date: "2026",
          type: "Volunteer project",
          summary: "Redesign of wach-auf.com in German, French and English — a draft awaiting the board's approval.",
          highlights: ["Pages generated by Python build scripts", "Password-protected copy for the board to review"],
        },
        {
          title: "AI-Powered Portfolio",
          date: "2026 – present",
          type: "Personal project",
          summary: "This site — in three languages, with an AI assistant in the corner.",
          highlights: ["Streaming answers from open-weight DeepSeek via OpenRouter", "Remembers the last few messages and links its answers to the matching section of this page", "Rate limiting and input validation on the server"],
        },
        {
          title: "VACOS — Dialog-based Object Search",
          date: "2021",
          type: "University · Duisburg-Essen",
          summary: "Extends a text search engine with natural-language dialog.",
          highlights: ["Understands negations and modifiers in natural language"],
        },
        {
          title: "Course Recommendation System",
          date: "2020 – 2021",
          type: "University · Duisburg-Essen",
          summary: "Recommends lectures to students from their interests and study programme.",
          highlights: [],
        },
        {
          title: "Bookiz — Book Search App",
          date: "2019",
          type: "University project",
          summary: "Finds the recommended books for a student's courses.",
          highlights: ["Ratings and comments from fellow students"],
        },
      ],
    },
    experience: {
      title: "Experience",
      kicker: "Where I've worked",
      intro: "Four companies and a full-time move into AI Engineering — from public-sector chatbots to Java enterprise systems to LLM applications.",
      educationTitle: "Education",
      trainingTitle: "Further education",
      paperLabel: "Paper · LAK '24 (ACM)",
      stackLabel: "Stack",
      stackMore: "more technologies",
      stackLess: "Show less",
      items: [
        {
          role: "AI Engineering focus",
          company: "Independent projects · Turing College",
          period: "Jul 2026 – present",
          kind: "Independent",
          summary: "Since July 2026 I've focused on AI Engineering: building and measuring LLM systems, earning certificates, and since November the full-time Turing College programme.",
          highlights: [
            "Built a hybrid graph + vector RAG system with an evaluation layer",
            "Ran Qetoret's three Claude features in production for real users",
          ],
        },
        {
          role: "IT Consultant",
          company: "Vision Consulting GmbH",
          period: "Jan 2024 – Jun 2026",
          kind: "Full-time",
          summary: "Migrated a business application from ISA-Dialog to Java (KDialog) in an agile team.",
          highlights: [
            "Delivered the new Java user interface and rebuilt the frontend logic of the migrated application",
            "Secured the migration with automated JUnit and UIBot tests",
          ],
        },
        {
          role: "Java Developer",
          company: "Cosinex GmbH",
          period: "May 2023 – Nov 2023",
          kind: "Full-time",
          summary: "Kept a public procurement marketplace (VMP) in step with the latest EU reforms.",
          highlights: ["Full-stack work in an agile team: backend, frontend, database migrations and deployment"],
        },
        {
          role: "Web Developer",
          company: "Adesso SE",
          period: "Apr 2021 – Mar 2023",
          kind: "Part-time",
          summary: "Built Fedorov, a healthcare platform for self-diagnosing eye diseases and training eyesight.",
          highlights: ["Worked on the REST backend and the Angular frontend, with automated tests on both sides; deployed on Azure"],
        },
        {
          role: "Web Developer — Conversational AI",
          company: "Publicplan GmbH",
          period: "Dec 2018 – Feb 2021",
          kind: "Part-time",
          summary: "Three projects for the public sector.",
          highlights: [
            "GovBot: chatbots for municipalities across Germany, tuned continuously in production (Cognigy, later Botpress)",
            "VSM: designed, modelled and built the new API of the administration search engine",
            "RDFa validator: a Java desktop app with JavaFX and Swing",
          ],
        },
      ],
      training: [
        {
          program: "AI Engineering (full time)",
          institution: "Turing College — live classes, online",
          period: "Nov 2026 – Feb 2027",
          status: "In progress",
          description: "13 weeks, 30 hours a week:",
          steps: ["LLM foundations & prompting", "LangChain & RAG", "Agents, memory & MCP", "Capstone: an AI test agent"],
        },
      ],
      certificatesTitle: "Certificates",
      certificateLink: "View certificate",
      certificates: [
        { name: "Retrieval Augmented Generation (RAG)", issuer: "DeepLearning.AI", date: "Sep 2026" },
        { name: "Knowledge Graphs for RAG", issuer: "DeepLearning.AI · Neo4j", date: "Sep 2026" },
      ],
      education: [
        { degree: "M.Sc. Applied Computer Science", institution: "University of Duisburg-Essen", period: "2019 – 2023", thesis: "Master's thesis: recommending learning resources with knowledge graphs and NLP" },
        { degree: "B.Sc. Computer Science", institution: "University of Duisburg-Essen", period: "2014 – 2018", thesis: "Bachelor's thesis: a didactic game for the Chinese postman problem" },
      ],
    },
    contact: {
      title: "Let's talk",
      kicker: "Get in touch",
      subtitle: "Open to **AI Engineer** roles from **March 2027** — remote or hybrid, based in the Ruhr area. I work in German or English.",
      email: "Email me",
      emailLabel: "Email",
      copied: "Address copied",
      ask: "Ask my AI assistant",
      outside: "Outside work",
      interests: "Guitar & worship music · Coding apps · Sport · Reading",
      volunteering: "**Volunteering:** Wach Auf e.V. mission movement · Worship team at my church",
    },
    footer: {
      built: "Built with Next.js, Tailwind CSS & Claude Code · Assistant: DeepSeek via OpenRouter",
      top: "Back to top",
    },
    chat: {
      title: "Ask about my experience",
      subtitle: "AI assistant · Answers from my portfolio",
      greeting: "Not sure where to start? Try a question:",
      placeholder: "Ask about Paul...",
      suggestions: [
        "Which AI applications has Paul deployed?",
        "How does his RAG system evaluate answers?",
        "What experience does he have with production software?",
        "What roles is Paul looking for?",
      ],
      followUpsLabel: "Follow-up questions",
      followUps: [
        "What did measuring catch in his RAG system?",
        "How does Qetoret keep its AI features cheap and safe?",
        "What early usage numbers does Qetoret have?",
        "What has he built with Java?",
        "What was his Master's thesis about?",
        "When and where can Paul start?",
      ],
      emailPaul: "Email Paul",
      emailCopied: "Address copied",
      retry: "Try again",
      answering: "Answering…",
      open: "Open assistant",
      close: "Close assistant",
      send: "Send",
      errors: {
        generic: "Something went wrong.",
        rateLimited: "Too many messages. Wait a moment.",
        tooLong: "That message is too long.",
        unavailable: "The assistant is offline right now. Try again later.",
      },
    },
  },

  de: {
    nav: {
      projects: "Projekte",
      experience: "Erfahrung",
      skills: "Skills",
      contact: "Kontakt",
      theme: "Dunkler Modus",
      language: "Sprache",
      menu: "Menü",
    },
    hero: {
      badge: "AI Engineer · Software Engineer",
      headline: "Ich baue zuverlässige KI-Anwendungen — vom Prototyp bis in den Produktivbetrieb.",
      description:
        "Softwareentwickler seit 2018 — neben dem Studium in Teilzeit, von 2023 bis 2026 in Vollzeit an Java-Unternehmenssystemen — heute mit Fokus auf **LLM-Anwendungen, RAG und KI-Agenten**. Ich liefere KI-Funktionen in einer Live-App aus, messe die Retrieval-Qualität und mache KI-gestützte Software mit automatisierten Tests verlässlich.",
      focusLabel: "Schwerpunkte",
      focus: ["AI Engineering", "RAG & LLMs", "Produktionsreife Software"],
      availabilityLine: "Ab März 2027 in Vollzeit verfügbar · Ruhrgebiet · remote oder hybrid",
      cta1: "Projekte ansehen",
      cta2: "Meinen KI-Assistenten fragen",
      cv: "Lebenslauf (PDF)",
      cvFile: "/cv/Paul-Arthur-Meteng-Lebenslauf-DE.pdf",
      glance: {
        title: "Auf einen Blick",
        availability: "Verfügbar",
        availabilityValue: "Ab März 2027, Vollzeit",
        location: "Standort",
        locationValue: "Ruhrgebiet, NRW",
        workMode: "Arbeitsmodell",
        workModeValue: "Remote oder hybrid",
        languages: "Sprachen",
        languagesValue: "Deutsch C2 · Englisch C2 · Französisch (Muttersprache)",
        education: "Studium",
        educationValue: "M.Sc. Angewandte Informatik, Uni Duisburg-Essen",
        proof: [
          { value: "3", label: "Claude-Funktionen im Produktivbetrieb in Qetoret, meiner App für Web und Android" },
          { value: "2018", label: "erster Job in der Softwareentwicklung — Chatbots für Kommunen bei Publicplan (Teilzeit)" },
          { value: "ACM", label: "mitverfasstes Forschungspaper (LAK '24)" },
        ],
      },
    },
    skills: {
      title: "Skills",
      kicker: "Womit ich arbeite",
      intro: "Ich arbeite spec-getrieben mit Claude Code und Codex — Tests, Typprüfungen und Reviews kontrollieren, was die KI schreibt, bevor es live geht. Zuerst die wichtigsten Werkzeuge, weitere mit einem Klick.",
      coreLabel: "Kern",
      moreLabel: "Außerdem",
      showMore: "+{n} weitere",
      showLess: "Weniger anzeigen",
      categories: [
        {
          category: "KI & LLM",
          blurb: "LLM-Anwendungen, die suchen, schlussfolgern — und gemessen werden.",
          core: ["RAG-Systeme", "LangChain / LangGraph", "Claude API", "KI-Agenten & MCP", "Neo4J / Wissensgraphen", "LLM-Evaluation"],
          more: ["ChromaDB", "Agenten-Memory", "Prompt Engineering", "Claude Code", "OpenAI Codex", "OpenAI API", "Google Gemini", "DeepSeek", "OpenRouter", "Streamlit", "spaCy", "NLP / NLU"],
        },
        {
          category: "Conversational AI",
          blurb: "Chatbots im Produktivbetrieb, mit denen echte Bürgerinnen und Bürger gesprochen haben.",
          core: ["Cognigy AI", "Botpress", "NLU-Modelle", "Dialogdesign"],
          more: ["Chatbot-Lifecycle", "Elasticsearch"],
        },
        {
          category: "Backend",
          blurb: "Solide APIs und Daten, in Java und Python.",
          core: ["Java / Spring Boot", "Python", "FastAPI", "REST APIs"],
          more: ["Node.js / Express", "Flask", "PostgreSQL", "MongoDB", "MySQL", "Oracle"],
        },
        {
          category: "Frontend",
          blurb: "Oberflächen, die Menschen gern benutzen.",
          core: ["React", "TypeScript", "Angular", "TailwindCSS"],
          more: ["Redux", "JavaScript", "HTML / CSS"],
        },
        {
          category: "Cloud & DevOps",
          blurb: "Vom Commit bis in die Produktion.",
          core: ["Docker", "Azure", "Vercel", "Supabase", "GitHub Actions"],
          more: ["Kubernetes", "Jenkins", "GitLab", "Git"],
        },
        {
          category: "Testing & Qualität",
          blurb: "KI schreibt Code schnell. Tests prüfen, ob er stimmt.",
          core: ["Automatisierte Qualitäts-Gates", "Playwright", "Vitest", "JUnit"],
          more: ["Mockito", "pgTAP", "Jasmine"],
        },
      ],
    },
    projects: {
      title: "Projekte",
      kicker: "Was ich gebaut habe",
      subtitle: "Drei Fallstudien mit Zahlen und Quellen zum Nachprüfen.",
      links: { live: "Live", code: "Code", paper: "Paper", page: "Projektseite", report: "Lighthouse-Bericht" },
      techLabel: "Technologien",
      tagsMore: "weitere Technologien",
      tagsLess: "Weniger anzeigen",
      metricsLabel: "Kennzahlen",
      caseStudy: { open: "Fallstudie lesen", close: "Fallstudie schließen" },
      shotViewer: { open: "Screenshot vergrößern", close: "Schließen", prev: "Vorheriger Screenshot", next: "Nächster Screenshot" },
      featured: [
        {
          title: "Knowledge Graph RAG System",
          date: "2026 – heute",
          type: "Persönliches Projekt",
          summary: "Beantwortet Fragen aus einem Wissensgraphen und per Vektorsuche — und misst, wie gut die Antworten sind.",
          shots: ["Wissensgraph in Neo4J", "Chat mit Graph-Statistik", "REST-API (FastAPI)"],
          metrics: [
            { value: "1,00", label: "recall@5", note: "richtige Passage in den Top 5" },
            { value: "0,96", label: "MRR", note: "bis auf einmal Platz 1" },
            { value: "3/3", label: "unbeantwortbare Fragen abgelehnt" },
          ],
          metricsNote: "Kleines Testset mit 20 Fragen: taugt als Regressionstest, nicht als Qualitätsnachweis. Die Messung hat zwei Retrieval-Fehler aufgedeckt.",
          sections: [
            {
              heading: "Problem",
              body: "Fragen zu einer Dokumentensammlung beantworten — und mit Zahlen wissen, ob die Antworten etwas taugen.",
            },
            {
              heading: "Architektur",
              body: "Beim Ingest werden die Dokumente in Chunks à 120 Wörter zerlegt. Ein LLM extrahiert daraus Entitäten und Relationen in einen Neo4J-Graphen; dieselben Chunks landen als Embeddings in ChromaDB. Zu jeder Frage kombiniert ein hybrider Retriever eine Cypher-Abfrage im Graphen mit der Vektorsuche. Das LLM (Claude oder OpenAI) antwortet aus beidem und streamt die Antwort über FastAPI.",
            },
            {
              heading: "So wird gemessen",
              points: [
                "Selbst implementierte Metriken: Exact Match, Token-F1, semantische Ähnlichkeit, recall@k, MRR, Ablehnungsquote",
                "Ein LLM als Judge für Korrektheit, Kontexttreue und Ablehnungen — gebaut und getestet, aber noch nicht kalibriert; Judge-Werte werden deshalb noch nicht ausgewiesen",
                "Ein Baseline-Runner protokolliert jeden Lauf: eine Zeile pro Änderung in RESULTS.md, Rohdaten pro Frage",
                "Testset: 17 beantwortbare und 3 unbeantwortbare Fragen",
              ],
            },
            {
              heading: "Was die Messung aufgedeckt hat",
              points: [
                "**Der Vektorspeicher wurde beim Ingest nie befüllt** — der „hybride“ Retriever lief also nur über den Graphen. Behoben: Jeder Chunk wird jetzt indexiert.",
                "**500-Wörter-Chunks bei einem Korpus von 269 Wörtern** ergaben einen einzigen Chunk, recall@5 = 1,0 war damit konstruktionsbedingt wahr. Behoben: Chunks à 120 Wörter, Korpus auf 1.497 Wörter erweitert → 16 Chunks, 115 Graphknoten, 118 Relationen.",
                "**Token-F1 von 0,14 maß die Ausführlichkeit, nicht die Richtigkeit**: Die drei „schlechtesten“ Antworten waren sachlich richtig. Genau dafür gibt es den LLM-Judge.",
              ],
            },
            {
              heading: "Grenzen & nächste Schritte",
              points: [
                "Das Korpus ist klein, seine Themen überschneiden sich kaum. Deshalb ist recall schon am Maximum: Das taugt als Regressionstest, nicht als Qualitätsnachweis.",
                "Als Nächstes: ein schwierigeres Korpus mit überlappenden Themen und einem größeren Testset, eine Baseline nur mit Vektorsuche im Vergleich zum hybriden Retrieval und die Kalibrierung des Judges an menschlichen Labels (Pipeline steht, Labels fehlen noch).",
                "311 automatisierte Tests (pytest).",
              ],
            },
          ],
        },
        {
          title: "Qetoret — Gebetsbegleiter",
          date: "2024 – heute",
          type: "Persönliches Projekt",
          summary: "Eine Gebets-App für Web und Android in **16 Sprachen**, mit drei KI-Funktionen.",
          shots: ["Startseite", "Gebetskreise", "Gebetsplan und Rhythmus", "Zeugnis einer Gebetserhörung", "Vor dem Senden prüfen"],
          metrics: [
            { value: "3", label: "Claude-Funktionen in Produktion" },
            { value: "34", label: "Ø monatlich aktive Nutzer", note: "Google Play, Nov 2026" },
            { value: "95", label: "Lighthouse-Performance mobil", note: "Barrierefreiheit 100" },
          ],
          sections: [
            {
              heading: "Problem",
              body: "KI-Hilfe für Bibelstellen, Gebetsvorschläge und Übersetzungen, die für echte Nutzer günstig, sicher und privat bleiben muss.",
            },
            {
              heading: "So wird sie genutzt",
              points: [
                "Einen Gebetsplan und einen Rhythmus festlegen",
                "Die KI nach Bibelstellen, einem Gebetsvorschlag oder einer Übersetzung fragen",
                "Vor dem Senden sehen, was das Gerät verlässt (Schritt „Vor dem Senden prüfen“)",
                "Gruppen per QR-Einladung beitreten und ein Zeugnis teilen, wenn ein Gebet erhört wurde",
              ],
            },
            {
              heading: "KI im Produktivbetrieb",
              points: [
                "Claude Haiku, aufgerufen ausschließlich über den eigenen Server von Qetoret",
                "Token-Budget pro Aufgabe, dazu Prompt-Caching",
                "Limits pro Nutzer: pro Minute und pro Tag",
                "Token-Verbrauch wird bei jeder Antwort ausgewiesen",
              ],
            },
            {
              heading: "Entscheidungen zu Sicherheit & Datenschutz",
              points: [
                "Nutzertext gilt als Daten, nie als Anweisung",
                "Einwilligung vorab, und vor dem Senden ein Hinweis, dass der Text das Gerät unverschlüsselt verlässt, mit der Bitte, alles auszublenden, was jemanden erkennbar machen könnte",
                "Namen werden auf dem Gerät geschwärzt, bevor etwas gesendet wird",
                "Ende-zu-Ende-Verschlüsselung",
              ],
            },
            {
              heading: "Fehlerbehandlung",
              points: [
                "Timeout nach 50 Sekunden",
                "Retry-After, wenn der Anbieter überlastet ist",
                "Abgeschnittene Antworten werden verworfen",
                "Jede Ausgabe wird gegen das erwartete Format geprüft",
              ],
            },
            {
              heading: "Erste Nutzerzahlen (Nov 2026)",
              body: "Frühe Zahlen, jede aus ihrer eigenen Quelle.",
              points: [
                "**42** Konten — App-Datenbank",
                "**35** Installationen — Google Play",
                "**34** monatlich und **3,14** täglich aktive Nutzer im Schnitt — Play Console, 28 Tage bis zum 20. November 2026",
                "**+74 %** monatlich aktive Nutzer im Schnitt gegenüber den 28 Tagen davor — Play Console",
              ],
            },
            {
              heading: "Qualität",
              points: [
                "PageSpeed Insights, mobil (Lighthouse 13.6, 21. November 2026): Performance 95, Barrierefreiheit 100, Best Practices 100, SEO 100",
                "First Contentful Paint 0,9 s, Largest Contentful Paint 3,0 s",
                "Als Nächstes: LCP unter 2,5 s sowie KI-Latenz (p50/p95), Kosten pro erfolgreicher KI-Antwort und Cache-Trefferquote messen. Dafür gibt es noch keine Zahlen.",
              ],
            },
            {
              heading: "Weitere Funktionen",
              body: "Bibelsuche, tägliche Verse über Supabase Edge Functions, Web-Push, Offline-Modus, Google-Anmeldung, Datenexport.",
            },
          ],
        },
        {
          title: "CourseMapper — Lernressourcen-Empfehlung",
          date: "2022 – 2023",
          type: "Masterarbeit · Duisburg-Essen",
          summary: "Empfiehlt YouTube-Videos und Wikipedia-Artikel zu Konzepten, die Lernende nicht verstanden haben — in CourseMapper, der MOOC-Plattform der Universität.",
          shots: ["Empfohlene YouTube-Videos", "Empfohlene Wikipedia-Artikel", "Feedback zur Nützlichkeit"],
          metrics: [
            { value: "ACM", label: "LAK '24-Paper, Mitautor" },
            { value: "2", label: "empfohlene Ressourcentypen", note: "Wikipedia, YouTube" },
          ],
          sections: [
            {
              heading: "Problem",
              body: "Lernende auf der MOOC-Plattform der Universität markieren Konzepte, die sie nicht verstanden haben. Welche externen Ressourcen helfen genau bei diesen Lücken?",
            },
            {
              heading: "Mein Beitrag",
              points: [
                "Meine Masterarbeit: Wikipedia-Artikel und YouTube-Videos zu genau den Konzepten empfehlen, die Lernende nicht verstanden haben — direkt in CourseMapper",
                "Ein Wissensgraph und Graph Neural Networks modellieren den Wissensstand jedes Lernenden, um passende Ressourcen auszuwählen",
                "Lernende bewerten jede Empfehlung als hilfreich oder nicht",
              ],
            },
            {
              heading: "Forschung",
              body: "Die Arbeit floss in das mitverfasste Paper „Learner Modeling and Recommendation of Learning Resources using Personal Knowledge Graphs“ ein (LAK '24, ACM).",
            },
          ],
        },
      ],
      diagram: {
        label: "Architektur des Knowledge-Graph-RAG-Systems. Ingest: Dokumente werden in Chunks zerlegt; ein LLM extrahiert Entitäten und Relationen in einen Neo4J-Graphen, die Chunks werden als Embeddings in ChromaDB gespeichert. Zu jeder Frage kombiniert ein hybrider Retriever eine Graphabfrage mit der Vektorsuche, ein LLM (Claude oder OpenAI) antwortet, gestreamt über FastAPI. Eine Evaluationsschicht bewertet Retrieval und Antworten mit Metriken und protokolliert jeden Lauf; ein LLM-Judge ist gebaut, aber noch nicht kalibriert.",
        ingest: "Ingest",
        nodes: {
          docs: { title: "Dokumente", detail: "Textkorpus" },
          chunk: { title: "Chunking", detail: "je 120 Wörter" },
          extract: { title: "LLM-Extraktion", detail: "Entitäten & Relationen" },
          embed: { title: "Embeddings", detail: "Sentence-Transformer" },
          graph: { title: "Neo4J", detail: "Wissensgraph" },
          vectors: { title: "ChromaDB", detail: "Vektorspeicher" },
          question: { title: "Frage" },
          retriever: { title: "Hybrider Retriever", detail: "Graphabfrage (Cypher)\n+ Vektorsuche" },
          answer: { title: "LLM-Antwort", detail: "Claude oder OpenAI\nFastAPI, Streaming" },
          evaluation: { title: "Evaluation", detail: "Metriken · jeder Lauf protokolliert\nLLM-Judge: noch nicht kalibriert" },
        },
      },
      moreKicker: "Außerdem gebaut",
      moreTitle: "Weitere Projekte",
      showAll: "Alle {n} Projekte zeigen",
      showFewer: "Weniger zeigen",
      more: [
        {
          title: "My Goals — Offline-First Ziel-Tracker",
          date: "2026 – heute",
          type: "Persönliches Projekt",
          summary: "Ein Tracker für Ziele und Gewohnheiten, der offline läuft und über Geräte synchronisiert.",
          shots: ["Ziele für heute", "Wochenfortschritt", "Ziel anlegen und verfolgen", "Belohnungen und Höhepunkte", "Mission und Sabbat-Rückblick"],
          highlights: [
            "Installierbar auf Handy und Desktop, mit Web-Push und Google-Kalender",
            "**624 Tests** und Größenbudgets in der CI",
            "Fachlogik ohne Mocks testbar",
          ],
        },
        {
          title: "Parlons Ghomálá — Sprachlern-PWA",
          date: "2026",
          type: "Persönliches Projekt · Prototyp",
          summary: "Gesprochenes Ghomálá', eine kamerunische Sprache, nach Gehör lernen — von KI-Agenten nach Spezifikation gebaut. Ein lokaler Prototyp, noch nicht veröffentlicht.",
          shots: ["Startseite", "Hörschritt mit Video", "Bildwortschatz", "Tonraster", "Dialektkarte"],
          highlights: [
            "19 Lektionen, Tonübungen, Hörspiele, ein Recorder auf dem Gerät",
            "Prüf-Agenten bewerten jeden Meilenstein (Schwelle 85/100)",
            "**19 Meilensteine in 6 Tagen** · 518 Unit- und 173 Datenbanktests",
          ],
        },
        {
          title: "GovBot — Conversational AI für den öffentlichen Sektor",
          date: "2018 – 2021",
          type: "Publicplan GmbH",
          summary: "Chatbots für Kommunen in ganz Deutschland.",
          highlights: ["Dialogdesign und NLU-Modelle", "Laufend verbessert, während sie im Betrieb waren"],
        },
        {
          title: "Wach Auf e.V. — Website-Redesign",
          date: "2026",
          type: "Ehrenamtliches Projekt",
          summary: "Redesign von wach-auf.com auf Deutsch, Französisch und Englisch — ein Entwurf, der auf die Freigabe des Vorstands wartet.",
          highlights: ["Seiten von Python-Skripten generiert", "Passwortgeschützte Fassung für den Vorstand"],
        },
        {
          title: "KI-gestützte Portfolio-Website",
          date: "2026 – heute",
          type: "Persönliches Projekt",
          summary: "Diese Seite — in drei Sprachen, mit einem KI-Assistenten in der Ecke.",
          highlights: ["Streaming-Antworten vom Open-Weight-Modell DeepSeek über OpenRouter", "Merkt sich die letzten Nachrichten und verlinkt seine Antworten auf den passenden Abschnitt dieser Seite", "Rate Limiting und Eingabevalidierung auf dem Server"],
        },
        {
          title: "VACOS — Dialogbasierte Objektsuche",
          date: "2021",
          type: "Universität · Duisburg-Essen",
          summary: "Erweitert eine Textsuchmaschine um einen Dialog in natürlicher Sprache.",
          highlights: ["Versteht Negationen und Modifikatoren in natürlicher Sprache"],
        },
        {
          title: "Kursempfehlungssystem",
          date: "2020 – 2021",
          type: "Universität · Duisburg-Essen",
          summary: "Empfiehlt Studierenden Vorlesungen nach Interessen und Studiengang.",
          highlights: [],
        },
        {
          title: "Bookiz — Buchsuche-App",
          date: "2019",
          type: "Universitätsprojekt",
          summary: "Findet die empfohlenen Bücher zu den Vorlesungen Studierender.",
          highlights: ["Bewertungen und Kommentare von Kommilitonen"],
        },
      ],
    },
    experience: {
      title: "Berufserfahrung",
      kicker: "Wo ich gearbeitet habe",
      intro: "Vier Unternehmen und der Wechsel ins AI Engineering in Vollzeit — von Chatbots für Behörden über Java-Unternehmenssysteme bis zu LLM-Anwendungen.",
      educationTitle: "Ausbildung",
      trainingTitle: "Weiterbildung",
      paperLabel: "Paper · LAK '24 (ACM)",
      stackLabel: "Stack",
      stackMore: "weitere Technologien",
      stackLess: "Weniger anzeigen",
      items: [
        {
          role: "Schwerpunkt AI Engineering",
          company: "Eigene Projekte · Turing College",
          period: "Jul 2026 – heute",
          kind: "In Eigenregie",
          summary: "Seit Juli 2026 konzentriere ich mich auf AI Engineering: LLM-Systeme bauen und messen, Zertifikate erwerben und seit November das Vollzeitprogramm am Turing College.",
          highlights: [
            "Ein hybrides RAG-System aus Graph- und Vektorsuche mit Evaluationsschicht gebaut",
            "Die drei Claude-Funktionen von Qetoret in Produktion für echte Nutzer betrieben",
          ],
        },
        {
          role: "IT-Berater",
          company: "Vision Consulting GmbH",
          period: "Jan 2024 – Jun 2026",
          kind: "Vollzeit",
          summary: "Eine Fachanwendung im agilen Team von ISA-Dialog nach Java (KDialog) migriert.",
          highlights: [
            "Die neue Java-Oberfläche umgesetzt und die Frontend-Logik der migrierten Anwendung neu aufgebaut",
            "Die Migration mit automatisierten JUnit- und UIBot-Tests abgesichert",
          ],
        },
        {
          role: "Java-Entwickler",
          company: "Cosinex GmbH",
          period: "Mai 2023 – Nov 2023",
          kind: "Vollzeit",
          summary: "Den Vergabemarktplatz VMP an die neuesten EU-Vergaberechtsreformen angepasst.",
          highlights: ["Full-Stack-Arbeit im agilen Team: Backend, Frontend, Datenbankmigrationen und Deployment"],
        },
        {
          role: "Web-Entwickler",
          company: "Adesso SE",
          period: "Apr 2021 – Mär 2023",
          kind: "Teilzeit",
          summary: "Fedorov gebaut, eine Plattform im Gesundheitswesen zur Selbstdiagnose von Augenerkrankungen und zum Sehtraining.",
          highlights: ["Am REST-Backend und am Angular-Frontend gearbeitet, mit automatisierten Tests auf beiden Seiten; Deployment auf Azure"],
        },
        {
          role: "Web-Entwickler — Conversational AI",
          company: "Publicplan GmbH",
          period: "Dez 2018 – Feb 2021",
          kind: "Teilzeit",
          summary: "Drei Projekte für den öffentlichen Sektor.",
          highlights: [
            "GovBot: Chatbots für Kommunen in ganz Deutschland, im Betrieb laufend verbessert (Cognigy, später Botpress)",
            "VSM: die neue API der Verwaltungssuchmaschine konzipiert, modelliert und gebaut",
            "RDFa-Validator: eine Java-Desktop-Anwendung mit JavaFX und Swing",
          ],
        },
      ],
      training: [
        {
          program: "AI Engineering (Vollzeit)",
          institution: "Turing College — Live-Unterricht, online",
          period: "Nov 2026 – Feb 2027",
          status: "laufend",
          description: "13 Wochen, 30 Stunden pro Woche:",
          steps: ["LLM-Grundlagen & Prompting", "LangChain & RAG", "Agenten, Memory & MCP", "Capstone: ein KI-Testagent"],
        },
      ],
      certificatesTitle: "Zertifikate",
      certificateLink: "Zertifikat ansehen",
      certificates: [
        { name: "Retrieval Augmented Generation (RAG)", issuer: "DeepLearning.AI", date: "Sep 2026" },
        { name: "Knowledge Graphs for RAG", issuer: "DeepLearning.AI · Neo4j", date: "Sep 2026" },
      ],
      education: [
        { degree: "M.Sc. Angewandte Informatik", institution: "Universität Duisburg-Essen", period: "2019 – 2023", thesis: "Masterarbeit: Empfehlung von Lernressourcen mit Knowledge Graphs und NLP" },
        { degree: "B.Sc. Informatik", institution: "Universität Duisburg-Essen", period: "2014 – 2018", thesis: "Bachelorarbeit: Ein didaktisches Spiel für das Briefträgerproblem" },
      ],
    },
    contact: {
      title: "Sprechen wir",
      kicker: "Kontakt",
      subtitle: "Offen für **AI-Engineer**-Stellen ab **März 2027** — remote oder hybrid, Standort Ruhrgebiet. Ich arbeite auf Deutsch oder Englisch.",
      email: "E-Mail schreiben",
      emailLabel: "E-Mail",
      copied: "Adresse kopiert",
      ask: "Meinen KI-Assistenten fragen",
      outside: "Neben dem Beruf",
      interests: "Gitarre & Lobpreismusik · Apps programmieren · Sport · Lesen",
      volunteering: "**Ehrenamt:** Missionsbewegung Wach Auf e.V. · Lobpreisdienst in meiner Gemeinde",
    },
    footer: {
      built: "Gebaut mit Next.js, Tailwind CSS & Claude Code · Assistent: DeepSeek über OpenRouter",
      top: "Nach oben",
    },
    chat: {
      title: "Fragen zu meiner Erfahrung",
      subtitle: "KI-Assistent · Antworten aus meinem Portfolio",
      greeting: "Unsicher, wo Sie anfangen sollen? Probieren Sie eine dieser Fragen:",
      placeholder: "Frage zu Paul...",
      suggestions: [
        "Welche KI-Anwendungen hat Paul produktiv im Einsatz?",
        "Wie bewertet sein RAG-System die Antworten?",
        "Welche Erfahrung hat er mit Software im Produktivbetrieb?",
        "Welche Stellen sucht Paul?",
      ],
      followUpsLabel: "Anschlussfragen",
      followUps: [
        "Was haben die Messungen an seinem RAG-System aufgedeckt?",
        "Wie hält Qetoret seine KI-Funktionen günstig und sicher?",
        "Welche ersten Nutzungszahlen hat Qetoret?",
        "Was hat er mit Java entwickelt?",
        "Worum ging es in seiner Masterarbeit?",
        "Ab wann und wo kann Paul anfangen?",
      ],
      emailPaul: "E-Mail an Paul",
      emailCopied: "Adresse kopiert",
      retry: "Erneut versuchen",
      answering: "Antwort wird erstellt…",
      open: "Assistent öffnen",
      close: "Assistent schließen",
      send: "Senden",
      errors: {
        generic: "Etwas ist schiefgelaufen.",
        rateLimited: "Zu viele Nachrichten. Bitte einen Moment warten.",
        tooLong: "Diese Nachricht ist zu lang.",
        unavailable: "Der Assistent ist gerade offline. Bitte später erneut versuchen.",
      },
    },
  },

  fr: {
    nav: {
      projects: "Projets",
      experience: "Expérience",
      skills: "Compétences",
      contact: "Contact",
      theme: "Mode sombre",
      language: "Langue",
      menu: "Menu",
    },
    hero: {
      badge: "Ingénieur IA · Ingénieur Logiciel",
      headline: "Je conçois des applications d'IA fiables — du prototype à la production.",
      description:
        "Ingénieur logiciel depuis 2018 — à temps partiel pendant mes études, à temps plein sur des systèmes Java d'entreprise de 2023 à 2026 — désormais centré sur les **applications LLM, le RAG et les agents IA**. Je livre des fonctions IA dans une appli en production, je mesure la qualité du retrieval et je m'appuie sur des tests automatisés pour rendre fiables les logiciels à base d'IA.",
      focusLabel: "Domaines",
      focus: ["Ingénierie IA", "RAG & LLM", "Logiciel en production"],
      availabilityLine: "Disponible à temps plein dès mars 2027 · Ruhr · télétravail ou hybride",
      cta1: "Voir mes projets",
      cta2: "Demander à mon assistant IA",
      cv: "CV (PDF, en anglais)",
      cvFile: "/cv/Paul-Arthur-Meteng-CV-EN.pdf",
      glance: {
        title: "En bref",
        availability: "Disponible",
        availabilityValue: "À partir de mars 2027, temps plein",
        location: "Basé dans",
        locationValue: "la Ruhr, NRW, Allemagne",
        workMode: "Mode de travail",
        workModeValue: "Télétravail ou hybride",
        languages: "Langues",
        languagesValue: "Allemand C2 · Anglais C2 · Français (langue maternelle)",
        education: "Formation",
        educationValue: "M.Sc. Informatique appliquée, Université de Duisburg-Essen",
        proof: [
          { value: "3", label: "fonctions Claude en production dans Qetoret, mon appli web et Android" },
          { value: "2018", label: "premier poste de développeur — chatbots pour des municipalités chez Publicplan (temps partiel)" },
          { value: "ACM", label: "article de recherche co-écrit (LAK '24)" },
        ],
      },
    },
    skills: {
      title: "Compétences",
      kicker: "Avec quoi je travaille",
      intro: "Je travaille en spec-driven avec Claude Code et Codex — tests, vérification des types et revues contrôlent ce que l'IA écrit avant la mise en ligne. Les outils essentiels d'abord, le reste en un clic.",
      coreLabel: "Essentiels",
      moreLabel: "Également",
      showMore: "+{n} de plus",
      showLess: "Voir moins",
      categories: [
        {
          category: "IA & LLM",
          blurb: "Des applis LLM qui cherchent, raisonnent — et sont mesurées.",
          core: ["Systèmes RAG", "LangChain / LangGraph", "Claude API", "Agents IA & MCP", "Neo4J / Graphes de connaissances", "Évaluation de LLM"],
          more: ["ChromaDB", "Mémoire d'agents", "Prompt Engineering", "Claude Code", "OpenAI Codex", "OpenAI API", "Google Gemini", "DeepSeek", "OpenRouter", "Streamlit", "spaCy", "NLP / NLU"],
        },
        {
          category: "IA Conversationnelle",
          blurb: "Des chatbots auxquels de vrais citoyens ont parlé, en production.",
          core: ["Cognigy AI", "Botpress", "Modèles NLU", "Conception de dialogue"],
          more: ["Cycle de vie chatbot", "Elasticsearch"],
        },
        {
          category: "Backend",
          blurb: "Des API et des données solides, en Java et en Python.",
          core: ["Java / Spring Boot", "Python", "FastAPI", "REST APIs"],
          more: ["Node.js / Express", "Flask", "PostgreSQL", "MongoDB", "MySQL", "Oracle"],
        },
        {
          category: "Frontend",
          blurb: "Des interfaces qu'on aime utiliser.",
          core: ["React", "TypeScript", "Angular", "TailwindCSS"],
          more: ["Redux", "JavaScript", "HTML / CSS"],
        },
        {
          category: "Cloud & DevOps",
          blurb: "Du commit à la production.",
          core: ["Docker", "Azure", "Vercel", "Supabase", "GitHub Actions"],
          more: ["Kubernetes", "Jenkins", "GitLab", "Git"],
        },
        {
          category: "Tests & Qualité",
          blurb: "L'IA écrit du code vite. Les tests le gardent honnête.",
          core: ["Contrôles qualité automatisés", "Playwright", "Vitest", "JUnit"],
          more: ["Mockito", "pgTAP", "Jasmine"],
        },
      ],
    },
    projects: {
      title: "Projets",
      kicker: "Ce que j'ai construit",
      subtitle: "Trois études de cas, avec les chiffres et où les vérifier.",
      links: { live: "En ligne", code: "Code", paper: "Article", page: "Page du projet", report: "Rapport Lighthouse" },
      techLabel: "Technologies",
      tagsMore: "autres technologies",
      tagsLess: "Voir moins",
      metricsLabel: "Chiffres clés",
      caseStudy: { open: "Lire l'étude de cas", close: "Masquer l'étude de cas" },
      shotViewer: { open: "Agrandir la capture", close: "Fermer", prev: "Capture précédente", next: "Capture suivante" },
      featured: [
        {
          title: "Système RAG avec graphe de connaissances",
          date: "2026 – présent",
          type: "Projet personnel",
          summary: "Répond aux questions à partir d'un graphe de connaissances et d'une recherche vectorielle — et mesure la qualité des réponses.",
          shots: ["Graphe de connaissances dans Neo4J", "Chat et statistiques du graphe", "API REST (FastAPI)"],
          metrics: [
            { value: "1,00", label: "recall@5", note: "le bon passage dans le top 5" },
            { value: "0,96", label: "MRR", note: "1er rang sauf une fois" },
            { value: "3/3", label: "questions sans réponse refusées" },
          ],
          metricsNote: "Petit jeu de 20 questions : un garde-fou contre les régressions, pas une preuve de qualité. La mesure a révélé deux bugs de retrieval.",
          sections: [
            {
              heading: "Problème",
              body: "Répondre à des questions sur un ensemble de documents — et savoir, chiffres à l'appui, si les réponses tiennent la route.",
            },
            {
              heading: "Architecture",
              body: "À l'ingestion, les documents sont découpés en chunks de 120 mots. Un LLM en extrait entités et relations vers un graphe Neo4J, et les mêmes chunks sont vectorisés dans ChromaDB. Pour chaque question, un retriever hybride combine une requête Cypher dans le graphe et une recherche vectorielle ; le LLM (Claude ou OpenAI) répond à partir des deux, en streaming via FastAPI.",
            },
            {
              heading: "Comment c'est mesuré",
              points: [
                "Des métriques codées à la main : exact match, F1 sur les tokens, similarité sémantique, recall@k, MRR, taux de refus",
                "Un LLM-juge pour l'exactitude, l'ancrage dans le contexte et les refus — construit et testé, mais pas encore calibré : aucun score du juge n'est donc publié",
                "Un runner de référence qui consigne chaque run : une ligne par changement dans RESULTS.md, les données brutes par question",
                "Jeu de test : 17 questions avec réponse, 3 sans réponse dans le corpus",
              ],
            },
            {
              heading: "Ce que la mesure a révélé",
              points: [
                "**Le vector store n'était jamais alimenté à l'ingestion** : le retriever « hybride » n'interrogeait que le graphe. Corrigé : chaque chunk est désormais indexé.",
                "**Des chunks de 500 mots pour un corpus de 269 mots** : tout tenait dans un seul chunk, et recall@5 = 1,0 était vrai par construction. Corrigé : chunks de 120 mots, corpus étendu à 1 497 mots → 16 chunks, 115 nœuds, 118 relations.",
                "**Un F1 de 0,14 mesurait la verbosité, pas la justesse** : les trois « pires » réponses étaient correctes. C'est la raison d'être du LLM-juge.",
              ],
            },
            {
              heading: "Limites et suite",
              points: [
                "Le corpus est petit et ses thèmes se recoupent à peine : le recall plafonne. Utile comme garde-fou contre les régressions, pas comme preuve de qualité.",
                "Ensuite : un corpus plus difficile, aux thèmes qui se recoupent, avec un jeu de test plus large ; une baseline vectorielle seule face à l'hybride ; et la calibration du juge sur des annotations humaines (pipeline prête, annotations pas encore collectées).",
                "311 tests automatisés (pytest).",
              ],
            },
          ],
        },
        {
          title: "Qetoret — Compagnon de prière",
          date: "2024 – présent",
          type: "Projet personnel",
          summary: "Une appli de prière web et Android en **16 langues**, avec trois fonctions IA.",
          shots: ["Page d'accueil", "Cercles de prière", "Plan et rythme de prière", "Témoignage de prière exaucée", "Vérifier avant l'envoi"],
          metrics: [
            { value: "3", label: "fonctions Claude en production" },
            { value: "34", label: "utilisateurs actifs mensuels en moyenne", note: "Google Play, nov. 2026" },
            { value: "95", label: "performance Lighthouse mobile", note: "Accessibilité 100" },
          ],
          sections: [
            {
              heading: "Problème",
              body: "Une aide IA pour les références bibliques, les suggestions de prière et la traduction, qui doit rester économique, sûre et respectueuse de la vie privée pour de vrais utilisateurs.",
            },
            {
              heading: "Utilisation",
              points: [
                "Définir un plan de prière et un rythme",
                "Demander à l'IA des références bibliques, une suggestion de prière ou une traduction",
                "Voir ce qui quittera l'appareil avant tout envoi (l'étape « Vérifier avant l'envoi »)",
                "Rejoindre des groupes via une invitation par QR code, et partager un témoignage quand une prière est exaucée",
              ],
            },
            {
              heading: "L'IA en production",
              points: [
                "Claude Haiku, appelé uniquement depuis le serveur de Qetoret",
                "Un budget de tokens par tâche, plus le prompt caching",
                "Des limites par utilisateur, à la minute et à la journée",
                "La consommation de tokens indiquée pour chaque réponse",
              ],
            },
            {
              heading: "Choix de sécurité et de confidentialité",
              points: [
                "Le texte des utilisateurs est traité comme des données, jamais comme des instructions",
                "Consentement d'abord, et avant l'envoi un contrôle qui avertit que le texte quitte l'appareil sans chiffrement et invite à masquer tout ce qui pourrait identifier quelqu'un",
                "Les noms sont masqués sur l'appareil avant tout envoi",
                "Chiffrement de bout en bout",
              ],
            },
            {
              heading: "Gestion des erreurs",
              points: [
                "Délai d'expiration de 50 secondes",
                "Retry-After quand le fournisseur est surchargé",
                "Les réponses tronquées sont écartées",
                "Chaque sortie est vérifiée par rapport au format attendu",
              ],
            },
            {
              heading: "Premiers utilisateurs (nov. 2026)",
              body: "Des chiffres précoces, chacun avec sa propre source.",
              points: [
                "**42** comptes — base de données de l'appli",
                "**35** installations — Google Play",
                "**34** utilisateurs actifs mensuels et **3,14** quotidiens en moyenne — Play Console, 28 jours jusqu'au 20 novembre 2026",
                "**+74 %** d'utilisateurs actifs mensuels en moyenne par rapport aux 28 jours précédents — Play Console",
              ],
            },
            {
              heading: "Qualité",
              points: [
                "PageSpeed Insights, mobile (Lighthouse 13.6, 21 novembre 2026) : Performance 95, Accessibilité 100, Bonnes pratiques 100, SEO 100",
                "First Contentful Paint 0,9 s, Largest Contentful Paint 3,0 s",
                "Ensuite : LCP sous 2,5 s, et mesurer la latence IA (p50/p95), le coût par réponse IA réussie et le taux de succès du cache. Aucun chiffre n'existe encore pour cela.",
              ],
            },
            {
              heading: "Autres fonctionnalités",
              body: "Recherche biblique, versets du jour via Supabase Edge Functions, notifications push, mode hors-ligne, connexion Google, export des données.",
            },
          ],
        },
        {
          title: "CourseMapper — Recommandation de ressources",
          date: "2022 – 2023",
          type: "Mémoire de master · Duisburg-Essen",
          summary: "Recommande des vidéos YouTube et des articles Wikipédia sur les notions qu'un apprenant n'a pas comprises — dans CourseMapper, la plateforme MOOC de l'université.",
          shots: ["Vidéos YouTube recommandées", "Articles Wikipédia recommandés", "Avis sur l'utilité"],
          metrics: [
            { value: "ACM", label: "article LAK '24, co-auteur" },
            { value: "2", label: "types de ressources recommandés", note: "Wikipédia, YouTube" },
          ],
          sections: [
            {
              heading: "Problème",
              body: "Sur la plateforme MOOC de l'université, les apprenants signalent les notions qu'ils n'ont pas comprises. Quelles ressources externes comblent précisément ces lacunes ?",
            },
            {
              heading: "Ma contribution",
              points: [
                "Mon mémoire de master : recommander des articles Wikipédia et des vidéos YouTube sur les notions qu'un apprenant n'a pas comprises, directement dans CourseMapper",
                "Un graphe de connaissances et des réseaux de neurones sur graphes modélisent l'état de connaissances de chaque apprenant pour choisir les ressources",
                "Les apprenants indiquent si chaque recommandation les a aidés ou non",
              ],
            },
            {
              heading: "Recherche",
              body: "Ce travail a nourri l'article co-écrit « Learner Modeling and Recommendation of Learning Resources using Personal Knowledge Graphs » (LAK '24, ACM).",
            },
          ],
        },
      ],
      diagram: {
        label: "Architecture du système RAG avec graphe de connaissances. Ingestion : les documents sont découpés en chunks ; un LLM en extrait entités et relations vers un graphe Neo4J, et les chunks sont vectorisés dans ChromaDB. Pour chaque question, un retriever hybride combine une requête dans le graphe et une recherche vectorielle, puis un LLM (Claude ou OpenAI) répond en streaming via FastAPI. Une couche d'évaluation note la recherche et les réponses avec des métriques et consigne chaque run ; un LLM-juge est prêt mais pas encore calibré.",
        ingest: "Ingestion",
        nodes: {
          docs: { title: "Documents", detail: "corpus de texte" },
          chunk: { title: "Découpage", detail: "120 mots chacun" },
          extract: { title: "Extraction LLM", detail: "entités et relations" },
          embed: { title: "Embeddings", detail: "sentence-transformer" },
          graph: { title: "Neo4J", detail: "graphe de\nconnaissances" },
          vectors: { title: "ChromaDB", detail: "base vectorielle" },
          question: { title: "Question" },
          retriever: { title: "Retriever hybride", detail: "requête graphe (Cypher)\n+ recherche vectorielle" },
          answer: { title: "Réponse du LLM", detail: "Claude ou OpenAI\nFastAPI, streaming" },
          evaluation: { title: "Évaluation", detail: "métriques · chaque run consigné\nLLM-juge : pas encore calibré" },
        },
      },
      moreKicker: "Également réalisé",
      moreTitle: "Autres projets",
      showAll: "Voir les {n} projets",
      showFewer: "Afficher moins",
      more: [
        {
          title: "My Goals — Suivi d'objectifs hors-ligne",
          date: "2026 – présent",
          type: "Projet personnel",
          summary: "Un suivi d'objectifs et d'habitudes qui marche hors-ligne et se synchronise entre appareils.",
          shots: ["Objectifs du jour", "Progrès de la semaine", "Création et suivi d'objectif", "Récompenses et temps forts", "Mission et bilan du sabbat"],
          highlights: [
            "S'installe sur téléphone et ordinateur, avec notifications push et Google Agenda",
            "**624 tests** et budgets de taille dans la CI",
            "Logique métier testable sans mocks",
          ],
        },
        {
          title: "Parlons Ghomálá — PWA d'apprentissage",
          date: "2026",
          type: "Projet personnel · prototype",
          summary: "Apprendre le ghomálá' parlé, une langue du Cameroun, à l'oreille — construit par des agents IA à partir d'une spec. Un prototype local, pas encore déployé.",
          shots: ["Page d'accueil", "Écoute avec vidéo", "Vocabulaire illustré", "Grille des tons", "Carte des parlers"],
          highlights: [
            "19 leçons, exercices de tons, jeux d'écoute, un enregistreur sur l'appareil",
            "Des agents de revue notent chaque jalon (seuil 85/100)",
            "**19 jalons en 6 jours** · 518 tests unitaires et 173 tests de base de données",
          ],
        },
        {
          title: "GovBot — IA conversationnelle pour le secteur public",
          date: "2018 – 2021",
          type: "Publicplan GmbH",
          summary: "Des chatbots pour des municipalités dans toute l'Allemagne.",
          highlights: ["Conception des dialogues et modèles NLU", "Améliorés en continu pendant qu'ils tournaient en production"],
        },
        {
          title: "Wach Auf e.V. — Refonte du site web",
          date: "2026",
          type: "Projet bénévole",
          summary: "Refonte de wach-auf.com en allemand, français et anglais — une maquette en attente de validation par le comité.",
          highlights: ["Pages générées par des scripts Python", "Version protégée par mot de passe pour le comité"],
        },
        {
          title: "Site portfolio avec assistant IA",
          date: "2026 – présent",
          type: "Projet personnel",
          summary: "Ce site — en trois langues, avec un assistant IA dans le coin.",
          highlights: ["Réponses en streaming du modèle open-weight DeepSeek via OpenRouter", "Garde en mémoire les derniers messages et renvoie ses réponses à la section correspondante de cette page", "Limitation de débit et validation des entrées côté serveur"],
        },
        {
          title: "VACOS — Recherche d'objets par dialogue",
          date: "2021",
          type: "Université · Duisburg-Essen",
          summary: "Ajoute un dialogue en langage naturel à un moteur de recherche textuel.",
          highlights: ["Comprend les négations et les modificateurs en langage naturel"],
        },
        {
          title: "Système de recommandation de cours",
          date: "2020 – 2021",
          type: "Université · Duisburg-Essen",
          summary: "Recommande des cours aux étudiants selon leurs intérêts et leur filière.",
          highlights: [],
        },
        {
          title: "Bookiz — Application de recherche de livres",
          date: "2019",
          type: "Projet universitaire",
          summary: "Trouve les livres recommandés pour les cours d'un étudiant.",
          highlights: ["Notes et commentaires des autres étudiants"],
        },
      ],
    },
    experience: {
      title: "Expérience",
      kicker: "Où j'ai travaillé",
      intro: "Quatre entreprises et un passage à plein temps vers l'ingénierie IA — des chatbots pour l'administration aux applications LLM, en passant par les systèmes Java d'entreprise.",
      educationTitle: "Formation",
      trainingTitle: "Formation continue",
      paperLabel: "Article · LAK '24 (ACM)",
      stackLabel: "Stack",
      stackMore: "autres technologies",
      stackLess: "Voir moins",
      items: [
        {
          role: "Spécialisation en ingénierie IA",
          company: "Projets personnels · Turing College",
          period: "Juil 2026 – présent",
          kind: "En autonomie",
          summary: "Depuis juillet 2026, je me consacre à l'ingénierie IA : concevoir et mesurer des systèmes LLM, obtenir des certificats et, depuis novembre, suivre le programme à temps plein de Turing College.",
          highlights: [
            "Système RAG hybride graphe + vecteurs construit, avec une couche d'évaluation",
            "Trois fonctions Claude de Qetoret exploitées en production pour de vrais utilisateurs",
          ],
        },
        {
          role: "Consultant IT",
          company: "Vision Consulting GmbH",
          period: "Jan 2024 – Juin 2026",
          kind: "Temps plein",
          summary: "Migration d'une application métier d'ISA-Dialog vers Java (KDialog), en équipe agile.",
          highlights: [
            "Livraison de la nouvelle interface Java et reconstruction de la logique frontend de l'application migrée",
            "Migration sécurisée par des tests automatisés JUnit et UIBot",
          ],
        },
        {
          role: "Développeur Java",
          company: "Cosinex GmbH",
          period: "Mai 2023 – Nov 2023",
          kind: "Temps plein",
          summary: "Plateforme des marchés publics (VMP) adaptée aux dernières réformes européennes.",
          highlights: ["Travail full-stack en équipe agile : backend, frontend, migrations de base de données et déploiement"],
        },
        {
          role: "Développeur Web",
          company: "Adesso SE",
          period: "Avr 2021 – Mar 2023",
          kind: "Temps partiel",
          summary: "Développement de Fedorov, plateforme de santé pour l'auto-diagnostic des maladies oculaires et l'entraînement de la vue.",
          highlights: ["Travail sur le backend REST et le frontend Angular, avec des tests automatisés des deux côtés ; déployé sur Azure"],
        },
        {
          role: "Développeur Web — IA Conversationnelle",
          company: "Publicplan GmbH",
          period: "Déc 2018 – Fév 2021",
          kind: "Temps partiel",
          summary: "Trois projets pour le secteur public.",
          highlights: [
            "GovBot : chatbots pour des municipalités dans toute l'Allemagne, améliorés en continu en production (Cognigy, puis Botpress)",
            "VSM : conception, modélisation et réalisation de la nouvelle API du moteur de recherche administratif",
            "Validateur RDFa : une application Java de bureau avec JavaFX et Swing",
          ],
        },
      ],
      training: [
        {
          program: "AI Engineering (temps plein)",
          institution: "Turing College — cours en direct, en ligne",
          period: "Nov 2026 – Fév 2027",
          status: "en cours",
          description: "13 semaines, 30 heures par semaine :",
          steps: ["Fondamentaux LLM & prompting", "LangChain & RAG", "Agents, mémoire & MCP", "Capstone : un agent de test IA"],
        },
      ],
      certificatesTitle: "Certificats",
      certificateLink: "Voir le certificat",
      certificates: [
        { name: "Retrieval Augmented Generation (RAG)", issuer: "DeepLearning.AI", date: "Sept 2026" },
        { name: "Knowledge Graphs for RAG", issuer: "DeepLearning.AI · Neo4j", date: "Sept 2026" },
      ],
      education: [
        { degree: "M.Sc. Informatique Appliquée", institution: "Université de Duisburg-Essen", period: "2019 – 2023", thesis: "Mémoire de master : recommandation de ressources d'apprentissage avec graphes de connaissances et NLP" },
        { degree: "B.Sc. Informatique", institution: "Université de Duisburg-Essen", period: "2014 – 2018", thesis: "Mémoire de bachelor : un jeu didactique pour le problème du postier chinois" },
      ],
    },
    contact: {
      title: "Parlons-en",
      kicker: "Contact",
      subtitle: "Ouvert aux postes d'**AI Engineer** à partir de **mars 2027** — télétravail ou hybride, depuis la Ruhr. Je travaille en allemand ou en anglais.",
      email: "M'écrire",
      emailLabel: "E-mail",
      copied: "Adresse copiée",
      ask: "Demander à mon assistant IA",
      outside: "En dehors du travail",
      interests: "Guitare & musique de louange · Coder des applis · Sport · Lecture",
      volunteering: "**Bénévolat :** mouvement missionnaire Wach Auf e.V. · Louange dans mon église",
    },
    footer: {
      built: "Construit avec Next.js, Tailwind CSS & Claude Code · Assistant : DeepSeek via OpenRouter",
      top: "Retour en haut",
    },
    chat: {
      title: "Questions sur mon expérience",
      subtitle: "Assistant IA · Réponses tirées de mon portfolio",
      greeting: "Vous ne savez pas par où commencer ? Essayez une question :",
      placeholder: "Une question sur Paul...",
      suggestions: [
        "Quelles applications d'IA Paul a-t-il mises en production ?",
        "Comment son système RAG évalue-t-il les réponses ?",
        "Quelle expérience a-t-il des logiciels en production ?",
        "Quels postes Paul recherche-t-il ?",
      ],
      followUpsLabel: "Questions de suivi",
      followUps: [
        "Qu'ont révélé les mesures de son système RAG ?",
        "Comment Qetoret garde-t-il ses fonctions IA sûres et peu coûteuses ?",
        "Quels sont les premiers chiffres d'utilisation de Qetoret ?",
        "Qu'a-t-il développé en Java ?",
        "Sur quoi portait son mémoire de master ?",
        "Quand et où Paul peut-il commencer ?",
      ],
      emailPaul: "Écrire à Paul",
      emailCopied: "Adresse copiée",
      retry: "Réessayer",
      answering: "Réponse en cours…",
      open: "Ouvrir l'assistant",
      close: "Fermer l'assistant",
      send: "Envoyer",
      errors: {
        generic: "Une erreur s'est produite.",
        rateLimited: "Trop de messages. Patientez un instant.",
        tooLong: "Ce message est trop long.",
        unavailable: "L'assistant est hors ligne. Réessayez plus tard.",
      },
    },
  },
} as const;

export type Translations = {
  nav: { projects: string; experience: string; skills: string; contact: string; theme: string; language: string; menu: string };
  hero: {
    badge: string; headline: string; description: string; focusLabel: string; focus: string[]; availabilityLine: string;
    cta1: string; cta2: string; cv: string; cvFile: string;
    glance: {
      title: string; availability: string; availabilityValue: string; location: string; locationValue: string;
      workMode: string; workModeValue: string; languages: string; languagesValue: string; education: string; educationValue: string;
      proof: { value: string; label: string }[];
    };
  };
  // `showMore`: "{n}" is replaced by the number of collapsed skills.
  skills: {
    title: string; kicker: string; intro: string; coreLabel: string; moreLabel: string; showMore: string; showLess: string;
    categories: { category: string; blurb: string; core: string[]; more: string[] }[];
  };
  projects: {
    title: string; kicker: string; subtitle: string;
    links: { live: string; code: string; paper: string; page: string; report: string };
    techLabel: string; tagsMore: string; tagsLess: string; metricsLabel: string;
    caseStudy: { open: string; close: string };
    shotViewer: { open: string; close: string; prev: string; next: string };
    // In the order of FEATURED in components/Projects.tsx; `shots` has one
    // caption per screenshot there. A section has a `body`, `points` or both.
    featured: {
      title: string; date: string; type: string; summary: string; shots: string[];
      metrics: { value: string; label: string; note?: string }[];
      metricsNote?: string;
      sections: { heading: string; body?: string; points?: string[] }[];
    }[];
    // Text of components/RagDiagram.tsx. SVG text does not wrap: "\n" starts a new line.
    diagram: {
      label: string; ingest: string;
      nodes: Record<"docs" | "chunk" | "extract" | "embed" | "graph" | "vectors" | "question" | "retriever" | "answer" | "evaluation", { title: string; detail?: string }>;
    };
    moreKicker: string; moreTitle: string; showAll: string; showFewer: string;
    // In the order of MORE in components/MoreProjects.tsx, same caption rule as above.
    more: { title: string; date: string; type: string; summary: string; highlights: string[]; shots?: string[] }[];
  };
  experience: {
    title: string; kicker: string; intro: string; educationTitle: string; trainingTitle: string; paperLabel: string;
    stackLabel: string; stackMore: string; stackLess: string;
    // In the order of the logos and stacks in components/Experience.tsx.
    items: { role: string; company: string; period: string; kind: string; summary: string; highlights: string[] }[];
    training: { program: string; institution: string; period: string; status: string; description: string; steps: string[] }[];
    // In the order of the certificate links in components/Experience.tsx.
    certificatesTitle: string; certificateLink: string;
    certificates: { name: string; issuer: string; date: string }[];
    education: { degree: string; institution: string; period: string; thesis: string }[];
  };
  contact: {
    title: string; kicker: string; subtitle: string; email: string; emailLabel: string; copied: string; ask: string;
    outside: string; interests: string; volunteering: string;
  };
  footer: { built: string; top: string };
  chat: {
    title: string;
    subtitle: string;
    greeting: string;
    placeholder: string;
    suggestions: string[];
    // Offered after an answer, minus questions already asked.
    followUpsLabel: string;
    followUps: string[];
    emailPaul: string;
    emailCopied: string;
    retry: string;
    answering: string;
    open: string;
    close: string;
    send: string;
    errors: { generic: string; rateLimited: string; tooLong: string; unavailable: string };
  };
};
