export type Lang = "en" | "de" | "fr";

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
      description:
        "I build intelligent systems — from RAG pipelines and knowledge graphs to conversational AI. Currently transitioning fully into AI Engineering, combining 6+ years of software craftsmanship with modern LLM architectures.",
      cta1: "View Projects",
      cta2: "Get in touch",
    },
    about: {
      title: "About me",
      bio1: "I'm a software engineer based in Germany with a Master's in Applied Computer Science from the University of Duisburg-Essen. Over 6 years, I've built web applications, conversational AI bots, and recommendation systems — and I'm now focusing entirely on AI Engineering.",
      bio2: "My hands-on experience with LLMs, RAG architectures, knowledge graphs (Neo4J), and AI platforms like Cognigy and Botpress gives me a practical edge: I know how to design, build, and ship AI systems end-to-end.",
      bio3: "I'm curious, collaborative, and driven by the challenge of making AI useful for real people.",
      location: "Location",
      locationValue: "Germany",
      education: "Education",
      educationValue: "M.Sc. Applied Computer Science — Uni Duisburg-Essen",
      languages: "Languages",
      languagesValue: "French (native) · German (C2) · English (C2)",
      interests: "Interests",
      interestsValue: "AI · NLP · Knowledge Graphs · Recommendation Systems · Chatbots",
    },
    skills: {
      title: "Skills",
      categories: [
        { category: "AI & LLM", skills: ["LangChain", "RAG Systems", "Neo4J / Knowledge Graphs", "Claude API", "Prompt Engineering", "ChromaDB", "spaCy", "NLP / NLU"] },
        { category: "Conversational AI", skills: ["Cognigy AI", "Botpress", "NLU Models", "Conversation Design", "Chatbot Lifecycle", "Elasticsearch"] },
        { category: "Backend", skills: ["Python", "FastAPI", "Java / Spring Boot", "Node.js / Express", "REST APIs", "Flask"] },
        { category: "Frontend", skills: ["React / Redux", "Angular", "TypeScript", "JavaScript", "HTML / CSS", "TailwindCSS"] },
        { category: "DevOps & Tools", skills: ["Docker", "Kubernetes", "Azure", "Jenkins", "Git", "PostgreSQL", "MongoDB", "MySQL", "Oracle"] },
      ],
    },
    projects: {
      title: "Projects",
      subtitle: "AI projects, university research, and professional work.",
      items: [
        {
          title: "AI-Powered Portfolio Website",
          date: "2026 – present",
          type: "Personal Project",
          description: "Multilingual (EN/DE/FR) portfolio built with Next.js and Tailwind CSS, featuring an embedded Claude-powered chat assistant that answers recruiter questions about my experience in real time with streaming responses and markdown formatting.",
        },
        {
          title: "Pray For Me — AI Prayer Companion",
          date: "2025",
          type: "Personal Project",
          description: "Full-stack PWA prayer journal with AI-generated prayer points and Bible verse references via Claude Haiku. Features 16-language support, daily shared Bible verses via Supabase Edge Functions, scripture search with Bible.com integration, weekly prayer planning, native push notifications, Google OAuth, and offline support.",
        },
        {
          title: "Knowledge Graph RAG System",
          date: "2026 – present",
          type: "Personal Project",
          description: "Hybrid RAG system combining Neo4J knowledge graph traversal with semantic vector search (ChromaDB). Automatic entity and relation extraction from raw text via LLM. REST API with FastAPI, streaming support, and an integrated web UI.",
        },
        {
          title: "Learning Resource Recommendation (Master's Thesis)",
          date: "2022 – 2023",
          type: "University · Duisburg-Essen",
          description: "Personalised recommendation system for a MOOC platform based on Knowledge Graphs and Graph Neural Networks. Models the learner's knowledge state to recommend Wikipedia articles and YouTube videos for difficult concepts.",
        },
        {
          title: "VACOS — Dialog-based Object Search",
          date: "2021",
          type: "University · Duisburg-Essen",
          description: "Extended a text-based search engine with natural-language, dialog-oriented interaction. NLP processing of negations and modifiers using Elasticsearch as the backend.",
        },
        {
          title: "Course Recommendation System",
          date: "2020 – 2021",
          type: "University · Duisburg-Essen",
          description: "Web application recommending lectures to students based on their interests and study programme. Built with Python/Flask, Elasticsearch, and machine learning models.",
        },
        {
          title: "GovBot — Conversational AI for Public Sector",
          date: "2018 – 2021",
          type: "Publicplan GmbH",
          description: "Designed and implemented customised chatbots for municipalities across Germany using Cognigy AI and Botpress. Responsible for conversation design, NLU modelling, and ongoing optimisation.",
        },
        {
          title: "Bookiz — Book Search App",
          date: "2019",
          type: "University Project",
          description: "Web app helping students find recommended books for their courses, with ratings and discussion. Built with the MERN stack.",
        },
      ],
    },
    experience: {
      title: "Experience",
      educationTitle: "Education",
      items: [
        {
          role: "IT Consultant",
          company: "Vision Consulting GmbH",
          period: "Jan 2024 – present",
          description: "Migration of the StundE project from ISA-Dialog to Java (KDialog). UI development, rebuilding frontend logic, and implementing tests with JUnit.",
        },
        {
          role: "Java Developer",
          company: "Cosinex GmbH",
          period: "May 2023 – Nov 2023",
          description: "Maintenance and development of the procurement marketplace platform (VMP) with the latest EU reforms. Spring backend, Wicket frontend, Oracle/MySQL databases.",
        },
        {
          role: "Web Developer",
          company: "Adesso SE",
          period: "Apr 2021 – Mar 2023",
          description: "Developed the Fedorov platform for online self-diagnosis of eye diseases. Spring Boot backend, Angular frontend, PostgreSQL, deployment on Azure.",
        },
        {
          role: "Web Developer — Conversational AI",
          company: "Publicplan GmbH",
          period: "Dec 2018 – Feb 2021",
          description: "Designed, implemented, and deployed conversational AI solutions (chatbots) for municipalities across Germany. Responsible for requirements analysis, conversation design, and NLU logic.",
        },
      ],
      education: [
        { degree: "M.Sc. Applied Computer Science", institution: "University of Duisburg-Essen", period: "2019 – 2023" },
        { degree: "B.Sc. Computer Science", institution: "University of Duisburg-Essen", period: "2014 – 2018" },
      ],
    },
    contact: {
      title: "Get in touch",
      subtitle: "I'm open to AI Engineering roles and interesting projects. Feel free to reach out.",
    },
    footer: "Built with Next.js & Tailwind CSS",
    chat: {
      title: "Paul's Assistant",
      subtitle: "Ask me anything about Paul",
      greeting: "Hi! I can answer questions about Paul's experience, projects, and skills.",
      placeholder: "Ask about Paul...",
      suggestions: [
        "What AI projects has Paul built?",
        "What roles is Paul targeting?",
        "Tell me about his RAG experience",
        "What's his tech stack?",
      ],
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
      description:
        "Ich entwickle intelligente Systeme — von RAG-Pipelines und Wissensgraphen bis hin zu Conversational AI. Ich vollziehe gerade den Wechsel in die AI-Entwicklung und verbinde dabei 6+ Jahre Software-Erfahrung mit modernen LLM-Architekturen.",
      cta1: "Projekte ansehen",
      cta2: "Kontakt aufnehmen",
    },
    about: {
      title: "Über mich",
      bio1: "Ich bin ein Softwareentwickler aus Deutschland mit einem Master in Angewandter Informatik von der Universität Duisburg-Essen. In über 6 Jahren habe ich Webanwendungen, Conversational-AI-Bots und Empfehlungssysteme entwickelt — jetzt konzentriere ich mich vollständig auf AI Engineering.",
      bio2: "Meine praktische Erfahrung mit LLMs, RAG-Architekturen, Wissensgraphen (Neo4J) und KI-Plattformen wie Cognigy und Botpress verschafft mir einen echten Vorteil: Ich kann KI-Systeme von Anfang bis Ende konzipieren, bauen und ausliefern.",
      bio3: "Ich bin neugierig, teamorientiert und motiviert durch die Herausforderung, KI für echte Menschen nützlich zu machen.",
      location: "Standort",
      locationValue: "Deutschland",
      education: "Ausbildung",
      educationValue: "M.Sc. Angewandte Informatik — Uni Duisburg-Essen",
      languages: "Sprachen",
      languagesValue: "Französisch (Muttersprache) · Deutsch (C2) · Englisch (C2)",
      interests: "Interessen",
      interestsValue: "KI · NLP · Wissensgraphen · Empfehlungssysteme · Chatbots",
    },
    skills: {
      title: "Skills",
      categories: [
        { category: "KI & LLM", skills: ["LangChain", "RAG-Systeme", "Neo4J / Wissensgraphen", "Claude API", "Prompt Engineering", "ChromaDB", "spaCy", "NLP / NLU"] },
        { category: "Conversational AI", skills: ["Cognigy AI", "Botpress", "NLU-Modelle", "Dialogdesign", "Chatbot-Lifecycle", "Elasticsearch"] },
        { category: "Backend", skills: ["Python", "FastAPI", "Java / Spring Boot", "Node.js / Express", "REST APIs", "Flask"] },
        { category: "Frontend", skills: ["React / Redux", "Angular", "TypeScript", "JavaScript", "HTML / CSS", "TailwindCSS"] },
        { category: "DevOps & Tools", skills: ["Docker", "Kubernetes", "Azure", "Jenkins", "Git", "PostgreSQL", "MongoDB", "MySQL", "Oracle"] },
      ],
    },
    projects: {
      title: "Projekte",
      subtitle: "KI-Projekte, Universitätsprojekte und professionelle Arbeit.",
      items: [
        {
          title: "KI-gestützte Portfolio-Website",
          date: "2026 – present",
          type: "Persönliches Projekt",
          description: "Mehrsprachige (EN/DE/FR) Portfolio-Webseite mit Next.js und Tailwind CSS, inklusive eingebettetem Claude-basierten Chat-Assistenten, der Recruiter-Fragen zu meiner Erfahrung in Echtzeit mit Streaming und Markdown-Formatierung beantwortet.",
        },
        {
          title: "Pray For Me — KI-Gebetsbegleiter",
          date: "2025",
          type: "Persönliches Projekt",
          description: "Progressive Web App für Gebetstagebücher mit KI-generierten Gebetspunkten und Bibelvers-Referenzen via Claude Haiku. Unterstützt 16 Sprachen, tägliche Bibelverse per Supabase Edge Functions, Bibelsuche mit Bible.com-Integration, wöchentliche Planung, Push-Benachrichtigungen, Google OAuth und Offline-Support.",
        },
        {
          title: "Knowledge Graph RAG System",
          date: "2026 – heute",
          type: "Persönliches Projekt",
          description: "Hybrides RAG-System, das Neo4J-Wissensgraph-Traversierung mit semantischer Vektorsuche (ChromaDB) kombiniert. Automatische Entitäts- und Relationsextraktion aus Rohtexten via LLM. REST-API mit FastAPI, Streaming-Unterstützung und integrierter Web-UI.",
        },
        {
          title: "Lernressourcen-Empfehlung (Masterarbeit)",
          date: "2022 – 2023",
          type: "Universität · Duisburg-Essen",
          description: "Personalisiertes Empfehlungssystem für eine MOOC-Plattform basierend auf Wissensgraphen und Graph-Neuronalen-Netzen. Modelliert den Wissensstand des Lernenden, um Wikipedia-Artikel und YouTube-Videos für schwierige Konzepte zu empfehlen.",
        },
        {
          title: "VACOS — Dialogbasierte Objektsuche",
          date: "2021",
          type: "Universität · Duisburg-Essen",
          description: "Erweiterung einer textbasierten Suchmaschine um natürlichsprachliche, dialogorientierte Interaktion. NLP-Verarbeitung von Negationen und Modifikatoren mit Elasticsearch als Backend.",
        },
        {
          title: "Kursempfehlungssystem",
          date: "2020 – 2021",
          type: "Universität · Duisburg-Essen",
          description: "Webanwendung zur Empfehlung von Vorlesungen basierend auf Interessen und Studienprogramm. Entwickelt mit Python/Flask, Elasticsearch und Machine-Learning-Modellen.",
        },
        {
          title: "GovBot — Conversational AI für den öffentlichen Sektor",
          date: "2018 – 2021",
          type: "Publicplan GmbH",
          description: "Konzeption und Entwicklung individualisierter Chatbots für Kommunen in Deutschland mit Cognigy AI und Botpress. Verantwortlich für Dialogdesign, NLU-Modellierung und kontinuierliche Optimierung.",
        },
        {
          title: "Bookiz — Buchsuche App",
          date: "2019",
          type: "Universitätsprojekt",
          description: "Webanwendung, die Studierenden hilft, empfohlene Bücher für ihre Vorlesungen zu finden, mit Bewertungen und Kommentarfunktion. Entwickelt mit dem MERN-Stack.",
        },
      ],
    },
    experience: {
      title: "Berufserfahrung",
      educationTitle: "Ausbildung",
      items: [
        {
          role: "IT-Berater",
          company: "Vision Consulting GmbH",
          period: "Jan 2024 – heute",
          description: "Migration des StundE-Projekts von ISA-Dialog zu Java (KDialog). UI-Entwicklung, Nachbau der Frontend-Logik und Implementierung von Tests mit JUnit.",
        },
        {
          role: "Java-Entwickler",
          company: "Cosinex GmbH",
          period: "Mai 2023 – Nov 2023",
          description: "Pflege und Weiterentwicklung der Vergabemarktplattform (VMP) gemäß den neuesten EU-Reformen. Spring-Backend, Wicket-Frontend, Oracle/MySQL-Datenbanken.",
        },
        {
          role: "Web-Entwickler",
          company: "Adesso SE",
          period: "Apr 2021 – Mär 2023",
          description: "Entwicklung der Fedorov-Plattform zur Online-Selbstdiagnose von Augenkrankheiten. Spring Boot Backend, Angular Frontend, PostgreSQL, Deployment auf Azure.",
        },
        {
          role: "Web-Entwickler — Conversational AI",
          company: "Publicplan GmbH",
          period: "Dez 2018 – Feb 2021",
          description: "Konzeption, Entwicklung und Deployment von Conversational-AI-Lösungen (Chatbots) für Kommunen in Deutschland. Verantwortlich für Anforderungsanalyse, Dialogdesign und NLU-Logik.",
        },
      ],
      education: [
        { degree: "M.Sc. Angewandte Informatik", institution: "Universität Duisburg-Essen", period: "2019 – 2023" },
        { degree: "B.Sc. Informatik", institution: "Universität Duisburg-Essen", period: "2014 – 2018" },
      ],
    },
    contact: {
      title: "Kontakt aufnehmen",
      subtitle: "Ich bin offen für AI-Engineering-Stellen und interessante Projekte. Melden Sie sich gerne.",
    },
    footer: "Erstellt mit Next.js & Tailwind CSS",
    chat: {
      title: "Pauls Assistent",
      subtitle: "Stellen Sie mir Fragen zu Paul",
      greeting: "Hallo! Ich beantworte Fragen zu Pauls Erfahrung, Projekten und Skills.",
      placeholder: "Fragen Sie nach Paul...",
      suggestions: [
        "Welche KI-Projekte hat Paul gebaut?",
        "Welche Stellen sucht Paul?",
        "Erzähl mir von seiner RAG-Erfahrung",
        "Was ist sein Tech-Stack?",
      ],
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
      description:
        "Je construis des systèmes intelligents — des pipelines RAG et graphes de connaissances à l'IA conversationnelle. En transition vers l'ingénierie IA, je combine 6+ ans d'expérience logicielle avec les architectures LLM modernes.",
      cta1: "Voir les projets",
      cta2: "Me contacter",
    },
    about: {
      title: "À propos de moi",
      bio1: "Je suis ingénieur logiciel basé en Allemagne, titulaire d'un Master en Informatique Appliquée de l'Université de Duisburg-Essen. En 6+ ans, j'ai développé des applications web, des bots d'IA conversationnelle et des systèmes de recommandation — je me concentre maintenant entièrement sur l'ingénierie IA.",
      bio2: "Mon expérience pratique avec les LLMs, les architectures RAG, les graphes de connaissances (Neo4J) et les plateformes IA comme Cognigy et Botpress me donne un avantage concret : je sais concevoir, construire et déployer des systèmes IA de bout en bout.",
      bio3: "Je suis curieux, collaboratif et motivé par le défi de rendre l'IA utile pour les vraies personnes.",
      location: "Localisation",
      locationValue: "Allemagne",
      education: "Formation",
      educationValue: "M.Sc. Informatique Appliquée — Uni Duisburg-Essen",
      languages: "Langues",
      languagesValue: "Français (langue maternelle) · Allemand (C2) · Anglais (C2)",
      interests: "Intérêts",
      interestsValue: "IA · NLP · Graphes de connaissances · Systèmes de recommandation · Chatbots",
    },
    skills: {
      title: "Compétences",
      categories: [
        { category: "IA & LLM", skills: ["LangChain", "Systèmes RAG", "Neo4J / Graphes de connaissances", "Claude API", "Prompt Engineering", "ChromaDB", "spaCy", "NLP / NLU"] },
        { category: "IA Conversationnelle", skills: ["Cognigy AI", "Botpress", "Modèles NLU", "Conception de dialogue", "Cycle de vie chatbot", "Elasticsearch"] },
        { category: "Backend", skills: ["Python", "FastAPI", "Java / Spring Boot", "Node.js / Express", "REST APIs", "Flask"] },
        { category: "Frontend", skills: ["React / Redux", "Angular", "TypeScript", "JavaScript", "HTML / CSS", "TailwindCSS"] },
        { category: "DevOps & Outils", skills: ["Docker", "Kubernetes", "Azure", "Jenkins", "Git", "PostgreSQL", "MongoDB", "MySQL", "Oracle"] },
      ],
    },
    projects: {
      title: "Projets",
      subtitle: "Projets IA, recherche universitaire et travail professionnel.",
      items: [
        {
          title: "Site portfolio avec assistant IA",
          date: "2026 – present",
          type: "Projet personnel",
          description: "Portfolio multilingue (EN/DE/FR) développé avec Next.js et Tailwind CSS, avec un assistant conversationnel basé sur Claude qui répond en temps réel aux questions des recruteurs sur mon expérience, avec streaming et formatage Markdown.",
        },
        {
          title: "Pray For Me — Compagnon de prière IA",
          date: "2025",
          type: "Projet personnel",
          description: "PWA de journal de prière avec points de prière générés par Claude Haiku et références bibliques. Support de 16 langues, verset biblique quotidien partagé via Supabase Edge Functions, recherche de versets avec intégration Bible.com, planification hebdomadaire, notifications push natives, Google OAuth et support hors-ligne.",
        },
        {
          title: "Système RAG avec graphe de connaissances",
          date: "2026 – présent",
          type: "Projet personnel",
          description: "Système RAG hybride combinant la traversée de graphe de connaissances Neo4J avec la recherche vectorielle sémantique (ChromaDB). Extraction automatique d'entités et de relations via LLM. API REST avec FastAPI, streaming et interface web intégrée.",
        },
        {
          title: "Recommandation de ressources d'apprentissage (Mémoire de Master)",
          date: "2022 – 2023",
          type: "Université · Duisburg-Essen",
          description: "Système de recommandation personnalisé pour une plateforme MOOC basé sur des graphes de connaissances et des réseaux de neurones graphiques. Modélise l'état des connaissances de l'apprenant pour recommander des articles Wikipedia et des vidéos YouTube.",
        },
        {
          title: "VACOS — Recherche d'objets par dialogue",
          date: "2021",
          type: "Université · Duisburg-Essen",
          description: "Extension d'un moteur de recherche textuel avec une interaction en langage naturel orientée dialogue. Traitement NLP des négations et des modificateurs avec Elasticsearch comme backend.",
        },
        {
          title: "Système de recommandation de cours",
          date: "2020 – 2021",
          type: "Université · Duisburg-Essen",
          description: "Application web recommandant des cours aux étudiants selon leurs intérêts et leur programme d'études. Développée avec Python/Flask, Elasticsearch et des modèles de machine learning.",
        },
        {
          title: "GovBot — IA conversationnelle pour le secteur public",
          date: "2018 – 2021",
          type: "Publicplan GmbH",
          description: "Conception et développement de chatbots personnalisés pour des municipalités allemandes avec Cognigy AI et Botpress. Responsable de la conception des dialogues, de la modélisation NLU et de l'optimisation continue.",
        },
        {
          title: "Bookiz — Application de recherche de livres",
          date: "2019",
          type: "Projet universitaire",
          description: "Application web aidant les étudiants à trouver des livres recommandés pour leurs cours, avec évaluations et discussion. Développée avec le stack MERN.",
        },
      ],
    },
    experience: {
      title: "Expérience",
      educationTitle: "Formation",
      items: [
        {
          role: "Consultant IT",
          company: "Vision Consulting GmbH",
          period: "Jan 2024 – présent",
          description: "Migration du projet StundE d'ISA-Dialog vers Java (KDialog). Développement UI, reconstruction de la logique frontend et implémentation de tests avec JUnit.",
        },
        {
          role: "Développeur Java",
          company: "Cosinex GmbH",
          period: "Mai 2023 – Nov 2023",
          description: "Maintenance et développement de la plateforme de marché des marchés publics (VMP) conformément aux dernières réformes européennes. Backend Spring, frontend Wicket, bases de données Oracle/MySQL.",
        },
        {
          role: "Développeur Web",
          company: "Adesso SE",
          period: "Avr 2021 – Mar 2023",
          description: "Développement de la plateforme Fedorov pour l'auto-diagnostic en ligne des maladies oculaires. Backend Spring Boot, frontend Angular, PostgreSQL, déploiement sur Azure.",
        },
        {
          role: "Développeur Web — IA Conversationnelle",
          company: "Publicplan GmbH",
          period: "Déc 2018 – Fév 2021",
          description: "Conception, développement et déploiement de solutions d'IA conversationnelle (chatbots) pour des municipalités allemandes. Responsable de l'analyse des besoins, de la conception des dialogues et de la logique NLU.",
        },
      ],
      education: [
        { degree: "M.Sc. Informatique Appliquée", institution: "Université de Duisburg-Essen", period: "2019 – 2023" },
        { degree: "B.Sc. Informatique", institution: "Université de Duisburg-Essen", period: "2014 – 2018" },
      ],
    },
    contact: {
      title: "Me contacter",
      subtitle: "Je suis ouvert aux postes d'ingénieur IA et aux projets intéressants. N'hésitez pas à me contacter.",
    },
    footer: "Créé avec Next.js & Tailwind CSS",
    chat: {
      title: "Assistant de Paul",
      subtitle: "Posez-moi des questions sur Paul",
      greeting: "Bonjour ! Je réponds à vos questions sur l'expérience, les projets et les compétences de Paul.",
      placeholder: "Posez une question sur Paul...",
      suggestions: [
        "Quels projets IA Paul a-t-il réalisés ?",
        "Quels postes Paul recherche-t-il ?",
        "Parlez-moi de son expérience RAG",
        "Quel est son stack technique ?",
      ],
    },
  },
} as const;

export type Translations = {
  nav: { about: string; skills: string; projects: string; experience: string; contact: string };
  hero: { badge: string; description: string; cta1: string; cta2: string };
  about: { title: string; bio1: string; bio2: string; bio3: string; location: string; locationValue: string; education: string; educationValue: string; languages: string; languagesValue: string; interests: string; interestsValue: string };
  skills: { title: string; categories: { category: string; skills: string[] }[] };
  projects: { title: string; subtitle: string; items: { title: string; date: string; type: string; description: string }[] };
  experience: { title: string; educationTitle: string; items: { role: string; company: string; period: string; description: string }[]; education: { degree: string; institution: string; period: string }[] };
  contact: { title: string; subtitle: string };
  footer: string;
  chat: { title: string; subtitle: string; greeting: string; placeholder: string; suggestions: string[] };
};
