export type Lang = "en" | "de" | "fr";

// Text wrapped in **double asterisks** is rendered bold by components/Rich.tsx.
// All three languages must keep the same shape: components index the arrays
// in parallel with their own data (tags, links), and tests/translations.test.ts
// checks the parity.
export const translations = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
    },
    hero: {
      badge: "AI Engineer · Software Engineer",
      lead: "I build",
      rotating: ["RAG pipelines", "knowledge graphs", "chatbots for cities", "apps in 16 languages", "offline-first PWAs"],
      shuffle: "Show another thing I build",
      description:
        "Software engineer since 2018, now going **all-in on AI Engineering**. I pair solid Java and TypeScript craft with LLMs, RAG and agents — and I ship to production.",
      cta1: "Start the journey",
      cta2: "Ask my AI assistant",
      mapHint: "Pick a stop on the map",
    },
    journey: {
      next: "Next stop",
      map: "Journey map",
      doneTitle: "You've seen every stop!",
      doneBody: "Thanks for exploring. Say hello, or ask my assistant anything.",
      sayHello: "Say hello",
      ask: "Ask the assistant",
      close: "Close",
    },
    about: {
      title: "About me",
      kicker: "Who I am",
      bio1: "I'm a **software engineer in Germany** with a Master's in Applied Computer Science from the University of Duisburg-Essen.",
      bio2: "Since 2018 — part-time alongside my studies until 2023 — I've built **web apps, chatbots for public authorities and recommendation systems**. Now I'm going all-in on **AI Engineering**.",
      bio3: "I work **spec-driven with Claude Code and Codex**, and automated quality gates check every line the AI writes. What drives me: making AI genuinely useful for real people.",
      factsTitle: "Quick facts",
      location: "Location",
      locationValue: "Germany",
      education: "Education",
      educationValue: "M.Sc. Applied Computer Science — Uni Duisburg-Essen",
      languages: "Languages",
      languagesValue: "French (native) · German (C2) · English (C2)",
      interests: "Interests",
      interestsValue: "Guitar & worship music · Coding apps · Sport · Reading",
      engagement: "Volunteering",
      engagementValue: "Wach Auf e.V. mission movement · Worship team at my church",
      stats: [
        { value: 4, label: "companies since 2018" },
        { value: 16, label: "languages in Qetoret" },
        { value: 597, label: "tests in My Goals" },
        { value: 3, label: "languages I speak" },
      ],
    },
    skills: {
      title: "Skills",
      kicker: "What I work with",
      intro: "Open a drawer of the toolbox. The core tools come first.",
      coreLabel: "Core",
      moreLabel: "Also in the drawer",
      categories: [
        {
          category: "AI & LLM",
          blurb: "LLM apps that retrieve, reason — and get measured.",
          core: ["RAG Systems", "LangChain / LangGraph", "Claude API", "AI Agents & MCP", "Neo4J / Knowledge Graphs", "LLM Evaluation"],
          more: ["ChromaDB", "Agent Memory", "Prompt Engineering", "Claude Code", "OpenAI Codex", "OpenAI API", "Google Gemini", "OpenRouter", "Streamlit", "spaCy", "NLP / NLU"],
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
      subtitle: "Start with the highlights, then filter by what interests you.",
      filters: { featured: "Highlights", ai: "AI & LLM", apps: "Apps", work: "Client & work", uni: "University", all: "All" },
      links: { live: "Live", code: "Code", paper: "Paper" },
      showTags: "Show all technologies",
      items: [
        {
          title: "Knowledge Graph RAG System",
          date: "2026 – present",
          type: "Personal project",
          summary: "Answers questions from a Neo4J knowledge graph and vector search — and measures how good the answers are.",
          highlights: [
            "Hybrid retrieval: graph traversal plus semantic search",
            "Entities and relations extracted by an LLM",
            "Hand-built metrics, a calibrated LLM judge, every run recorded",
          ],
        },
        {
          title: "AI-Powered Portfolio",
          date: "2026 – present",
          type: "Personal project",
          summary: "This site — in three languages, with a Claude assistant in the corner.",
          highlights: ["Streaming answers from Claude", "Rate limiting and input validation on the server"],
        },
        {
          title: "Qetoret — Prayer Companion",
          date: "2024 – present",
          type: "Personal project",
          summary: "A prayer app for web and Android in 16 languages, with three AI features.",
          highlights: [
            "Bible references, prayer suggestions and translation with Claude Haiku",
            "Claude only behind its own server: token budgets, prompt caching, per-user limits",
            "Answers format-checked, names redacted on the device, end-to-end encrypted",
          ],
        },
        {
          title: "My Goals — Offline-First Goal Tracker",
          date: "2026 – present",
          type: "Personal project",
          summary: "A goal and habit tracker that works offline and syncs across devices.",
          highlights: [
            "Installs on phone and desktop, with web push and Google Calendar",
            "597 tests and size budgets in CI",
            "Domain logic testable without mocks",
          ],
        },
        {
          title: "Parlons Ghomálá — Language Learning PWA",
          date: "2026",
          type: "Personal project",
          summary: "Learn spoken Ghomálá', a Cameroonian language, by ear — built by AI agents from a spec.",
          highlights: [
            "19 lessons, tone drills, listening games, an on-device recorder",
            "Review agents score every milestone (pass mark 85/100)",
            "19 milestones in 6 days · 518 unit and 173 database tests",
          ],
        },
        {
          title: "Wach Auf e.V. — Website Redesign",
          date: "2026",
          type: "Client project",
          summary: "Redesign of wach-auf.com in German, French and English.",
          highlights: ["Pages generated by Python build scripts", "Password-protected copy for the board to review"],
        },
        {
          title: "Learning Resource Recommendation (Master's Thesis)",
          date: "2022 – 2023",
          type: "University · Duisburg-Essen",
          summary: "Recommends Wikipedia articles and YouTube videos for the concepts a learner is stuck on.",
          highlights: ["Knowledge graph and graph neural networks on a MOOC platform", "Fed into a co-authored paper at LAK '24 (ACM)"],
        },
        {
          title: "VACOS — Dialog-based Object Search",
          date: "2021",
          type: "University · Duisburg-Essen",
          summary: "Gave a text search engine a dialog.",
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
          title: "GovBot — Conversational AI for Public Sector",
          date: "2018 – 2021",
          type: "Publicplan GmbH",
          summary: "Chatbots for municipalities across Germany.",
          highlights: ["Conversation design and NLU models", "Tuned continuously while they ran in production"],
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
      intro: "Four companies, from public-sector chatbots to Java enterprise systems.",
      educationTitle: "Education",
      trainingTitle: "Further education",
      paperLabel: "Paper · LAK '24 (ACM)",
      stackLabel: "Stack",
      items: [
        {
          role: "IT Consultant",
          company: "Vision Consulting GmbH",
          period: "Jan 2024 – Jun 2026",
          kind: "Full-time",
          summary: "Moved a business application from ISA-Dialog to Java (KDialog) in an agile team.",
          highlights: [
            "Built the user interface and rebuilt the frontend logic",
            "Covered it with JUnit and UIBot tests",
            "Trained in Java web services: SOAP and REST with Apache CXF, WS-Security",
          ],
        },
        {
          role: "Java Developer",
          company: "Cosinex GmbH",
          period: "May 2023 – Nov 2023",
          kind: "Full-time",
          summary: "Kept a public procurement marketplace (VMP) in step with the latest EU reforms.",
          highlights: ["Spring and JPA backend, Wicket frontend", "Oracle and MySQL with Liquibase migrations", "Deployed via GitLab to JBoss"],
        },
        {
          role: "Web Developer",
          company: "Adesso SE",
          period: "Apr 2021 – Mar 2023",
          kind: "Part-time",
          summary: "Built Fedorov, a healthcare platform for self-diagnosing eye diseases and training eyesight.",
          highlights: [
            "REST backend with Spring Boot, Hibernate, PostgreSQL and Flyway",
            "Angular frontend",
            "Tested with JUnit, Mockito and Jasmine; deployed on Azure",
          ],
        },
        {
          role: "Web Developer — Conversational AI",
          company: "Publicplan GmbH",
          period: "Dec 2018 – Feb 2021",
          kind: "Part-time",
          summary: "Three projects for the public sector.",
          highlights: [
            "GovBot: chatbots for municipalities with Cognigy, later Botpress",
            "VSM: designed and built the new API of the administration search engine",
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
      education: [
        { degree: "M.Sc. Applied Computer Science", institution: "University of Duisburg-Essen", period: "2019 – 2023", thesis: "Master's thesis: recommending learning resources with knowledge graphs and NLP" },
        { degree: "B.Sc. Computer Science", institution: "University of Duisburg-Essen", period: "2014 – 2018", thesis: "Bachelor's thesis: a didactic game for the Chinese postman problem" },
      ],
    },
    contact: {
      title: "Let's talk",
      kicker: "Final stop",
      subtitle: "Open to AI Engineer roles and projects, in German or English.",
      email: "Email me",
      ask: "Ask my AI assistant",
    },
    footer: {
      built: "Built with Next.js, Tailwind CSS & Claude",
      top: "Back to the start",
    },
    chat: {
      title: "Paul's Assistant",
      subtitle: "Ask about Paul's work",
      greeting: "Ask about Paul's experience, projects or skills.",
      placeholder: "Ask about Paul...",
      suggestions: [
        "What AI projects has Paul built?",
        "What is Paul training in right now?",
        "What roles is Paul looking for?",
        "Tell me about his RAG experience",
        "What's his tech stack?",
      ],
      errors: {
        generic: "Something went wrong. Try again.",
        rateLimited: "Too many messages. Wait a moment.",
        tooLong: "That message is too long.",
        unavailable: "The assistant is offline right now. Try again later.",
      },
    },
  },

  de: {
    nav: {
      about: "Über mich",
      skills: "Skills",
      projects: "Projekte",
      experience: "Erfahrung",
      contact: "Kontakt",
    },
    hero: {
      badge: "AI Engineer · Software Engineer",
      lead: "Ich baue",
      rotating: ["RAG-Pipelines", "Wissensgraphen", "Chatbots für Kommunen", "Apps in 16 Sprachen", "Offline-first-PWAs"],
      shuffle: "Zeig mir etwas anderes, das ich baue",
      description:
        "Softwareentwickler seit 2018, jetzt **voll auf AI Engineering** ausgerichtet. Ich verbinde solides Java- und TypeScript-Handwerk mit LLMs, RAG und Agenten — und bringe es in Produktion.",
      cta1: "Reise starten",
      cta2: "Meinen KI-Assistenten fragen",
      mapHint: "Wähle eine Station auf der Karte",
    },
    journey: {
      next: "Nächste Station",
      map: "Reisekarte",
      doneTitle: "Du hast jede Station gesehen!",
      doneBody: "Danke fürs Entdecken. Sag Hallo oder frag meinen Assistenten, was du willst.",
      sayHello: "Hallo sagen",
      ask: "Assistenten fragen",
      close: "Schließen",
    },
    about: {
      title: "Über mich",
      kicker: "Wer ich bin",
      bio1: "Ich bin **Softwareentwickler in Deutschland** mit einem Master in Angewandter Informatik von der Universität Duisburg-Essen.",
      bio2: "Seit 2018 — bis 2023 in Teilzeit neben dem Studium — habe ich **Webanwendungen, Chatbots für Behörden und Empfehlungssysteme** gebaut. Jetzt setze ich voll auf **AI Engineering**.",
      bio3: "Ich entwickle **spec-getrieben mit Claude Code und Codex**, und automatisierte Qualitäts-Gates prüfen jede Zeile, die die KI schreibt. Was mich antreibt: KI, die echten Menschen wirklich nützt.",
      factsTitle: "Kurz und knapp",
      location: "Standort",
      locationValue: "Deutschland",
      education: "Ausbildung",
      educationValue: "M.Sc. Angewandte Informatik — Uni Duisburg-Essen",
      languages: "Sprachen",
      languagesValue: "Französisch (Muttersprache) · Deutsch (C2) · Englisch (C2)",
      interests: "Interessen",
      interestsValue: "Gitarre & Lobpreismusik · Apps programmieren · Sport · Lesen",
      engagement: "Engagement",
      engagementValue: "Missionsbewegung Wach Auf e.V. · Lobpreisdienst in meiner Gemeinde",
      stats: [
        { value: 4, label: "Firmen seit 2018" },
        { value: 16, label: "Sprachen in Qetoret" },
        { value: 597, label: "Tests in My Goals" },
        { value: 3, label: "Sprachen, die ich spreche" },
      ],
    },
    skills: {
      title: "Skills",
      kicker: "Womit ich arbeite",
      intro: "Öffne eine Schublade des Werkzeugkastens. Die Kernwerkzeuge kommen zuerst.",
      coreLabel: "Kern",
      moreLabel: "Außerdem in der Schublade",
      categories: [
        {
          category: "KI & LLM",
          blurb: "LLM-Anwendungen, die suchen, schlussfolgern — und gemessen werden.",
          core: ["RAG-Systeme", "LangChain / LangGraph", "Claude API", "KI-Agenten & MCP", "Neo4J / Wissensgraphen", "LLM-Evaluation"],
          more: ["ChromaDB", "Agenten-Memory", "Prompt Engineering", "Claude Code", "OpenAI Codex", "OpenAI API", "Google Gemini", "OpenRouter", "Streamlit", "spaCy", "NLP / NLU"],
        },
        {
          category: "Conversational AI",
          blurb: "Chatbots, mit denen echte Bürger gesprochen haben, im Betrieb.",
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
          blurb: "KI schreibt Code schnell. Tests halten ihn ehrlich.",
          core: ["Automatisierte Qualitäts-Gates", "Playwright", "Vitest", "JUnit"],
          more: ["Mockito", "pgTAP", "Jasmine"],
        },
      ],
    },
    projects: {
      title: "Projekte",
      kicker: "Was ich gebaut habe",
      subtitle: "Starte mit den Highlights und filtere dann nach dem, was dich interessiert.",
      filters: { featured: "Highlights", ai: "KI & LLM", apps: "Apps", work: "Kunden & Beruf", uni: "Universität", all: "Alle" },
      links: { live: "Live", code: "Code", paper: "Paper" },
      showTags: "Alle Technologien zeigen",
      items: [
        {
          title: "Knowledge Graph RAG System",
          date: "2026 – heute",
          type: "Persönliches Projekt",
          summary: "Beantwortet Fragen aus einem Neo4J-Wissensgraphen und Vektorsuche — und misst, wie gut die Antworten sind.",
          highlights: [
            "Hybrides Retrieval: Graph-Traversierung plus semantische Suche",
            "Entitäten und Relationen vom LLM extrahiert",
            "Selbst gebaute Metriken, kalibrierter LLM-Judge, jeder Lauf protokolliert",
          ],
        },
        {
          title: "KI-gestützte Portfolio-Website",
          date: "2026 – heute",
          type: "Persönliches Projekt",
          summary: "Diese Seite — in drei Sprachen, mit einem Claude-Assistenten in der Ecke.",
          highlights: ["Streaming-Antworten von Claude", "Rate Limiting und Eingabevalidierung auf dem Server"],
        },
        {
          title: "Qetoret — Gebetsbegleiter",
          date: "2024 – heute",
          type: "Persönliches Projekt",
          summary: "Eine Gebets-App für Web und Android in 16 Sprachen, mit drei KI-Funktionen.",
          highlights: [
            "Bibelhinweise, Gebetsvorschläge und Übersetzung mit Claude Haiku",
            "Claude nur über den eigenen Server: Token-Budgets, Prompt-Caching, Limits pro Nutzer",
            "Antworten formatgeprüft, Namen auf dem Gerät geschwärzt, Ende-zu-Ende verschlüsselt",
          ],
        },
        {
          title: "My Goals — Offline-First Ziel-Tracker",
          date: "2026 – heute",
          type: "Persönliches Projekt",
          summary: "Ein Tracker für Ziele und Gewohnheiten, der offline läuft und über Geräte synchronisiert.",
          highlights: [
            "Installierbar auf Handy und Desktop, mit Web-Push und Google-Kalender",
            "597 Tests und Größenbudgets in der CI",
            "Fachlogik ohne Mocks testbar",
          ],
        },
        {
          title: "Parlons Ghomálá — Sprachlern-PWA",
          date: "2026",
          type: "Persönliches Projekt",
          summary: "Gesprochenes Ghomálá', eine kamerunische Sprache, nach Gehör lernen — von KI-Agenten nach Spezifikation gebaut.",
          highlights: [
            "19 Lektionen, Tonübungen, Hörspiele, ein Recorder auf dem Gerät",
            "Prüf-Agenten bewerten jeden Meilenstein (Schwelle 85/100)",
            "19 Meilensteine in 6 Tagen · 518 Unit- und 173 Datenbanktests",
          ],
        },
        {
          title: "Wach Auf e.V. — Website-Redesign",
          date: "2026",
          type: "Kundenprojekt",
          summary: "Redesign von wach-auf.com auf Deutsch, Französisch und Englisch.",
          highlights: ["Seiten von Python-Skripten generiert", "Passwortgeschützte Fassung für den Vorstand"],
        },
        {
          title: "Lernressourcen-Empfehlung (Masterarbeit)",
          date: "2022 – 2023",
          type: "Universität · Duisburg-Essen",
          summary: "Empfiehlt Wikipedia-Artikel und YouTube-Videos zu den Konzepten, an denen Lernende hängen.",
          highlights: ["Wissensgraph und Graph-Neuronale-Netze auf einer MOOC-Plattform", "Floss in ein mitverfasstes Paper auf der LAK '24 (ACM) ein"],
        },
        {
          title: "VACOS — Dialogbasierte Objektsuche",
          date: "2021",
          type: "Universität · Duisburg-Essen",
          summary: "Hat einer Textsuchmaschine einen Dialog gegeben.",
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
          title: "GovBot — Conversational AI für den öffentlichen Sektor",
          date: "2018 – 2021",
          type: "Publicplan GmbH",
          summary: "Chatbots für Kommunen in ganz Deutschland.",
          highlights: ["Dialogdesign und NLU-Modelle", "Laufend verbessert, während sie im Betrieb waren"],
        },
        {
          title: "Bookiz — Buchsuche App",
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
      intro: "Vier Firmen, von Chatbots für Behörden bis zu Java-Unternehmenssystemen.",
      educationTitle: "Ausbildung",
      trainingTitle: "Weiterbildung",
      paperLabel: "Paper · LAK '24 (ACM)",
      stackLabel: "Stack",
      items: [
        {
          role: "IT-Berater",
          company: "Vision Consulting GmbH",
          period: "Jan 2024 – Jun 2026",
          kind: "Vollzeit",
          summary: "Eine Fachanwendung im agilen Team von ISA-Dialog nach Java (KDialog) migriert.",
          highlights: [
            "Oberflächen entwickelt und Frontend-Logik nachgebaut",
            "Mit JUnit- und UIBot-Tests abgesichert",
            "Schulung zu Java Web Services: SOAP und REST mit Apache CXF, WS-Security",
          ],
        },
        {
          role: "Java-Entwickler",
          company: "Cosinex GmbH",
          period: "Mai 2023 – Nov 2023",
          kind: "Vollzeit",
          summary: "Eine Vergabemarktplattform (VMP) an die neuesten EU-Reformen angepasst.",
          highlights: ["Spring und JPA im Backend, Wicket im Frontend", "Oracle und MySQL mit Liquibase-Migrationen", "Deployment über GitLab auf JBoss"],
        },
        {
          role: "Web-Entwickler",
          company: "Adesso SE",
          period: "Apr 2021 – Mär 2023",
          kind: "Teilzeit",
          summary: "Fedorov gebaut, eine Plattform im Gesundheitswesen zur Selbstdiagnose von Augenerkrankungen und zum Sehtraining.",
          highlights: [
            "REST-Backend mit Spring Boot, Hibernate, PostgreSQL und Flyway",
            "Angular-Frontend",
            "Getestet mit JUnit, Mockito und Jasmine; Deployment auf Azure",
          ],
        },
        {
          role: "Web-Entwickler — Conversational AI",
          company: "Publicplan GmbH",
          period: "Dez 2018 – Feb 2021",
          kind: "Teilzeit",
          summary: "Drei Projekte für den öffentlichen Sektor.",
          highlights: [
            "GovBot: Chatbots für Kommunen mit Cognigy, später Botpress",
            "VSM: die neue API der Verwaltungssuchmaschine konzipiert und gebaut",
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
      education: [
        { degree: "M.Sc. Angewandte Informatik", institution: "Universität Duisburg-Essen", period: "2019 – 2023", thesis: "Masterarbeit: Empfehlung von Lernressourcen mit Knowledge Graphs und NLP" },
        { degree: "B.Sc. Informatik", institution: "Universität Duisburg-Essen", period: "2014 – 2018", thesis: "Bachelorarbeit: Ein didaktisches Spiel für das Briefträgerproblem" },
      ],
    },
    contact: {
      title: "Lass uns reden",
      kicker: "Letzte Station",
      subtitle: "Offen für AI-Engineer-Stellen und Projekte, auf Deutsch oder Englisch.",
      email: "Schreib mir",
      ask: "Meinen KI-Assistenten fragen",
    },
    footer: {
      built: "Gebaut mit Next.js, Tailwind CSS & Claude",
      top: "Zurück zum Start",
    },
    chat: {
      title: "Pauls Assistent",
      subtitle: "Fragen zu Pauls Arbeit",
      greeting: "Fragen Sie nach Pauls Erfahrung, Projekten oder Skills.",
      placeholder: "Frage zu Paul...",
      suggestions: [
        "Welche KI-Projekte hat Paul gebaut?",
        "Welche Weiterbildung macht Paul gerade?",
        "Welche Stellen sucht Paul?",
        "Erzähl mir von seiner RAG-Erfahrung",
        "Was ist sein Tech-Stack?",
      ],
      errors: {
        generic: "Etwas ist schiefgelaufen. Bitte erneut versuchen.",
        rateLimited: "Zu viele Nachrichten. Bitte einen Moment warten.",
        tooLong: "Diese Nachricht ist zu lang.",
        unavailable: "Der Assistent ist gerade offline. Bitte später erneut versuchen.",
      },
    },
  },

  fr: {
    nav: {
      about: "À propos",
      skills: "Compétences",
      projects: "Projets",
      experience: "Expérience",
      contact: "Contact",
    },
    hero: {
      badge: "Ingénieur IA · Ingénieur Logiciel",
      lead: "Je construis",
      rotating: ["des pipelines RAG", "des graphes de connaissances", "des chatbots pour les villes", "des applis en 16 langues", "des PWA hors-ligne"],
      shuffle: "Montre-moi autre chose que je construis",
      description:
        "Ingénieur logiciel depuis 2018, désormais **à fond sur l'ingénierie IA**. J'allie un solide savoir-faire Java et TypeScript aux LLM, au RAG et aux agents — et je livre en production.",
      cta1: "Commencer le voyage",
      cta2: "Demander à mon assistant IA",
      mapHint: "Choisis une étape sur la carte",
    },
    journey: {
      next: "Prochaine étape",
      map: "Carte du voyage",
      doneTitle: "Tu as vu toutes les étapes !",
      doneBody: "Merci pour la visite. Dis bonjour, ou pose tes questions à mon assistant.",
      sayHello: "Dire bonjour",
      ask: "Demander à l'assistant",
      close: "Fermer",
    },
    about: {
      title: "À propos de moi",
      kicker: "Qui je suis",
      bio1: "Je suis **ingénieur logiciel en Allemagne**, titulaire d'un Master en Informatique Appliquée de l'Université de Duisburg-Essen.",
      bio2: "Depuis 2018 — à temps partiel pendant mes études jusqu'en 2023 — j'ai construit des **applications web, des chatbots pour les administrations et des systèmes de recommandation**. Aujourd'hui, je mise tout sur l'**ingénierie IA**.",
      bio3: "Je développe **en spec-driven avec Claude Code et Codex**, et des contrôles qualité automatisés vérifient chaque ligne écrite par l'IA. Ce qui me motive : une IA vraiment utile pour de vraies personnes.",
      factsTitle: "En bref",
      location: "Localisation",
      locationValue: "Allemagne",
      education: "Formation",
      educationValue: "M.Sc. Informatique Appliquée — Uni Duisburg-Essen",
      languages: "Langues",
      languagesValue: "Français (langue maternelle) · Allemand (C2) · Anglais (C2)",
      interests: "Intérêts",
      interestsValue: "Guitare & musique de louange · Coder des applis · Sport · Lecture",
      engagement: "Engagement",
      engagementValue: "Mouvement missionnaire Wach Auf e.V. · Louange dans mon église",
      stats: [
        { value: 4, label: "entreprises depuis 2018" },
        { value: 16, label: "langues dans Qetoret" },
        { value: 597, label: "tests dans My Goals" },
        { value: 3, label: "langues que je parle" },
      ],
    },
    skills: {
      title: "Compétences",
      kicker: "Avec quoi je travaille",
      intro: "Ouvre un tiroir de la boîte à outils. Les outils principaux d'abord.",
      coreLabel: "Essentiels",
      moreLabel: "Aussi dans le tiroir",
      categories: [
        {
          category: "IA & LLM",
          blurb: "Des applis LLM qui cherchent, raisonnent — et sont mesurées.",
          core: ["Systèmes RAG", "LangChain / LangGraph", "Claude API", "Agents IA & MCP", "Neo4J / Graphes de connaissances", "Évaluation de LLM"],
          more: ["ChromaDB", "Mémoire d'agents", "Prompt Engineering", "Claude Code", "OpenAI Codex", "OpenAI API", "Google Gemini", "OpenRouter", "Streamlit", "spaCy", "NLP / NLU"],
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
      subtitle: "Commence par les temps forts, puis filtre selon ce qui t'intéresse.",
      filters: { featured: "Temps forts", ai: "IA & LLM", apps: "Applis", work: "Clients & travail", uni: "Université", all: "Tous" },
      links: { live: "En ligne", code: "Code", paper: "Article" },
      showTags: "Voir toutes les technologies",
      items: [
        {
          title: "Système RAG avec graphe de connaissances",
          date: "2026 – présent",
          type: "Projet personnel",
          summary: "Répond aux questions à partir d'un graphe Neo4J et d'une recherche vectorielle — et mesure la qualité des réponses.",
          highlights: [
            "Recherche hybride : parcours du graphe plus recherche sémantique",
            "Entités et relations extraites par un LLM",
            "Métriques écrites à la main, LLM-juge calibré, chaque run consigné",
          ],
        },
        {
          title: "Site portfolio avec assistant IA",
          date: "2026 – présent",
          type: "Projet personnel",
          summary: "Ce site — en trois langues, avec un assistant Claude dans le coin.",
          highlights: ["Réponses de Claude en streaming", "Limitation de débit et validation des entrées côté serveur"],
        },
        {
          title: "Qetoret — Compagnon de prière",
          date: "2024 – présent",
          type: "Projet personnel",
          summary: "Une appli de prière web et Android en 16 langues, avec trois fonctions IA.",
          highlights: [
            "Références bibliques, suggestions de prière et traduction avec Claude Haiku",
            "Claude uniquement via le serveur : budgets de tokens, prompt caching, limites par utilisateur",
            "Réponses vérifiées, noms masqués sur l'appareil, chiffrement de bout en bout",
          ],
        },
        {
          title: "My Goals — Suivi d'objectifs hors-ligne",
          date: "2026 – présent",
          type: "Projet personnel",
          summary: "Un suivi d'objectifs et d'habitudes qui marche hors-ligne et se synchronise entre appareils.",
          highlights: [
            "S'installe sur téléphone et ordinateur, avec notifications push et Google Agenda",
            "597 tests et budgets de taille dans la CI",
            "Logique métier testable sans mocks",
          ],
        },
        {
          title: "Parlons Ghomálá — PWA d'apprentissage",
          date: "2026",
          type: "Projet personnel",
          summary: "Apprendre le ghomálá' parlé, une langue du Cameroun, à l'oreille — construit par des agents IA à partir d'une spec.",
          highlights: [
            "19 leçons, exercices de tons, jeux d'écoute, un enregistreur sur l'appareil",
            "Des agents de revue notent chaque jalon (seuil 85/100)",
            "19 jalons en 6 jours · 518 tests unitaires et 173 tests de base de données",
          ],
        },
        {
          title: "Wach Auf e.V. — Refonte du site web",
          date: "2026",
          type: "Projet client",
          summary: "Refonte de wach-auf.com en allemand, français et anglais.",
          highlights: ["Pages générées par des scripts Python", "Version protégée par mot de passe pour le comité"],
        },
        {
          title: "Recommandation de ressources d'apprentissage (Mémoire de Master)",
          date: "2022 – 2023",
          type: "Université · Duisburg-Essen",
          summary: "Recommande des articles Wikipedia et des vidéos YouTube sur les notions qui bloquent l'apprenant.",
          highlights: ["Graphe de connaissances et réseaux de neurones sur graphes sur une plateforme MOOC", "A donné lieu à un article co-écrit, publié à LAK '24 (ACM)"],
        },
        {
          title: "VACOS — Recherche d'objets par dialogue",
          date: "2021",
          type: "Université · Duisburg-Essen",
          summary: "A donné un dialogue à un moteur de recherche textuel.",
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
          title: "GovBot — IA conversationnelle pour le secteur public",
          date: "2018 – 2021",
          type: "Publicplan GmbH",
          summary: "Des chatbots pour des municipalités dans toute l'Allemagne.",
          highlights: ["Conception des dialogues et modèles NLU", "Améliorés en continu pendant qu'ils tournaient en production"],
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
      intro: "Quatre entreprises, des chatbots pour l'administration aux systèmes Java d'entreprise.",
      educationTitle: "Formation",
      trainingTitle: "Formation continue",
      paperLabel: "Article · LAK '24 (ACM)",
      stackLabel: "Stack",
      items: [
        {
          role: "Consultant IT",
          company: "Vision Consulting GmbH",
          period: "Jan 2024 – Juin 2026",
          kind: "Temps plein",
          summary: "Migration d'une application métier d'ISA-Dialog vers Java (KDialog), en équipe agile.",
          highlights: [
            "Interfaces développées et logique frontend reconstruite",
            "Couvertes par des tests JUnit et UIBot",
            "Formation aux services web Java : SOAP et REST avec Apache CXF, WS-Security",
          ],
        },
        {
          role: "Développeur Java",
          company: "Cosinex GmbH",
          period: "Mai 2023 – Nov 2023",
          kind: "Temps plein",
          summary: "Plateforme des marchés publics (VMP) adaptée aux dernières réformes européennes.",
          highlights: ["Spring et JPA côté backend, Wicket côté frontend", "Oracle et MySQL avec migrations Liquibase", "Déploiement via GitLab sur JBoss"],
        },
        {
          role: "Développeur Web",
          company: "Adesso SE",
          period: "Avr 2021 – Mar 2023",
          kind: "Temps partiel",
          summary: "Développement de Fedorov, plateforme de santé pour l'auto-diagnostic des maladies oculaires et l'entraînement de la vue.",
          highlights: [
            "Backend REST avec Spring Boot, Hibernate, PostgreSQL et Flyway",
            "Frontend Angular",
            "Testé avec JUnit, Mockito et Jasmine ; déployé sur Azure",
          ],
        },
        {
          role: "Développeur Web — IA Conversationnelle",
          company: "Publicplan GmbH",
          period: "Déc 2018 – Fév 2021",
          kind: "Temps partiel",
          summary: "Trois projets pour le secteur public.",
          highlights: [
            "GovBot : chatbots pour des municipalités avec Cognigy, puis Botpress",
            "VSM : conception et réalisation de la nouvelle API du moteur de recherche administratif",
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
      education: [
        { degree: "M.Sc. Informatique Appliquée", institution: "Université de Duisburg-Essen", period: "2019 – 2023", thesis: "Mémoire de master : recommandation de ressources d'apprentissage avec graphes de connaissances et NLP" },
        { degree: "B.Sc. Informatique", institution: "Université de Duisburg-Essen", period: "2014 – 2018", thesis: "Mémoire de bachelor : un jeu didactique pour le problème du postier chinois" },
      ],
    },
    contact: {
      title: "Parlons-en",
      kicker: "Dernière étape",
      subtitle: "Ouvert aux postes d'AI Engineer et aux projets, en allemand ou en anglais.",
      email: "M'écrire",
      ask: "Demander à mon assistant IA",
    },
    footer: {
      built: "Construit avec Next.js, Tailwind CSS & Claude",
      top: "Retour au départ",
    },
    chat: {
      title: "Assistant de Paul",
      subtitle: "Questions sur le travail de Paul",
      greeting: "Posez vos questions sur l'expérience, les projets ou les compétences de Paul.",
      placeholder: "Une question sur Paul...",
      suggestions: [
        "Quels projets IA Paul a-t-il réalisés ?",
        "Quelle formation Paul suit-il en ce moment ?",
        "Quels postes Paul recherche-t-il ?",
        "Parlez-moi de son expérience RAG",
        "Quel est son stack technique ?",
      ],
      errors: {
        generic: "Une erreur s'est produite. Réessayez.",
        rateLimited: "Trop de messages. Patientez un instant.",
        tooLong: "Ce message est trop long.",
        unavailable: "L'assistant est hors ligne. Réessayez plus tard.",
      },
    },
  },
} as const;

export type Translations = {
  nav: { about: string; skills: string; projects: string; experience: string; contact: string };
  hero: { badge: string; lead: string; rotating: string[]; shuffle: string; description: string; cta1: string; cta2: string; mapHint: string };
  journey: { next: string; map: string; doneTitle: string; doneBody: string; sayHello: string; ask: string; close: string };
  about: {
    title: string; kicker: string; bio1: string; bio2: string; bio3: string; factsTitle: string;
    location: string; locationValue: string; education: string; educationValue: string; languages: string; languagesValue: string;
    interests: string; interestsValue: string; engagement: string; engagementValue: string;
    stats: { value: number; label: string }[];
  };
  skills: { title: string; kicker: string; intro: string; coreLabel: string; moreLabel: string; categories: { category: string; blurb: string; core: string[]; more: string[] }[] };
  projects: {
    title: string; kicker: string; subtitle: string;
    filters: { featured: string; ai: string; apps: string; work: string; uni: string; all: string };
    links: { live: string; code: string; paper: string };
    showTags: string;
    items: { title: string; date: string; type: string; summary: string; highlights: string[] }[];
  };
  experience: {
    title: string; kicker: string; intro: string; educationTitle: string; trainingTitle: string; paperLabel: string; stackLabel: string;
    items: { role: string; company: string; period: string; kind: string; summary: string; highlights: string[] }[];
    training: { program: string; institution: string; period: string; status: string; description: string; steps: string[] }[];
    education: { degree: string; institution: string; period: string; thesis: string }[];
  };
  contact: { title: string; kicker: string; subtitle: string; email: string; ask: string };
  footer: { built: string; top: string };
  chat: {
    title: string;
    subtitle: string;
    greeting: string;
    placeholder: string;
    suggestions: string[];
    errors: { generic: string; rateLimited: string; tooLong: string; unavailable: string };
  };
};
