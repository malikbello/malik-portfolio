export const siteConfig = {
  name: "Malik Pelumi Bello",
  shortName: "Malik Pelumi Bello",
  aiName: "Time",
  resumeUrl: "/files/Malik-Pelumi-Bello-Resume.pdf",
  role: "AI / ML Engineer",
  company: "Wema Bank Plc",
  companyDetail: "Data Analytics & AI Team",
  location: "Lagos, Nigeria",
  email: "belloayopelumi@gmail.com",
  tagline:
    "Turning uncertainty into advantage through data, models, and judgment.",
  subline:
    "Too much data and big AI but no clarity? I design, deploy, and scale machine learning and GenAI systems that turn messy, real-world data into decisions people can act on.",
  philosophy: [
    { text: "Data is", highlight: "Everywhere." },
    { text: "Advantage is", highlight: "Rare." },
    { text: "I Build", highlight: "the Difference." },
  ],
  socials: {
    linkedin: "https://www.linkedin.com/in/malik-bello-data-scientist/",
    github: "https://github.com/HonTime2023",
    kaggle: "https://www.kaggle.com/bellomalik/code",
    medium: "https://medium.com/@belloayopelumi",
    researchgate: "https://www.researchgate.net/profile/Malik-Bello",
    orcid: "https://orcid.org/0009-0004-0906-2731",
    scholar: "https://scholar.google.com/citations?user=apurzZwAAAAJ&hl=en",
    youtube: "https://www.youtube.com/@BelloMalik-Data",
    linktree: "https://linktr.ee/bellomalik",
    babskenky: "https://www.babskenky.com/",
  },
};

// Manually-curated for now — swap for a live Spotify "currently playing" call
// once the Spotify Developer app + OAuth is wired up (see /api/now-playing).
export const nowPlaying = {
  connected: false,
  track: "On Repeat",
  artist: "Playlist syncing soon",
  spotifyUrl: "https://open.spotify.com/",
};

export const metrics = [
  { label: "Years in Applied Data & AI", value: "5+" },
  { label: "Production ML / GenAI Systems Shipped", value: "15+" },
  { label: "Peer-Reviewed & Conference Publications", value: "3" },
  { label: "Certifications Earned", value: "52" },
  { label: "Core Domain", value: "Fintech · Public Sector · Research" },
];

// Full skill taxonomy as endorsed/listed on LinkedIn — grouped the way LinkedIn
// itself groups them. This is the exhaustive list; `capabilities` above stays
// the curated, headline version.
export const skillGroups: { group: string; skills: string[] }[] = [
  {
    group: "Industry Knowledge",
    skills: [
      "AI Engineering", "Applied Machine Learning", "Machine Learning", "Artificial Intelligence (AI)",
      "Generative AI", "Natural Language Processing (NLP)", "Retrieval-Augmented Generation (RAG)",
      "Big Data Analytics", "Big Data Science", "Data Science", "Data Analytics", "Data Analysis",
      "Data Mining", "Data Modeling", "Data Visualization", "Data Warehousing", "Statistics",
      "Statistical Data Analysis", "Analytical Skills", "Business Intelligence (BI)",
      "Business Systems Analysis", "Data Ethics", "Statistical Consulting", "Research Skills",
      "Qualitative Research", "Research Design", "Policy Analysis", "Public Policy",
      "Behavioural Science", "Gender Equality", "Gender Analysis", "Auditing", "Tax Research",
      "Tax Law Research", "Digital Marketing", "Digital Marketing Innovations",
      "Digital Marketing Communications", "Digital Marketing Media", "Digital Marketing Analytics",
      "Search Engine Optimization (SEO)", "Marketing", "Sales & Marketing", "Entrepreneurship",
      "Artificial Intelligence for Business",
    ],
  },
  {
    group: "Tools & Technologies",
    skills: [
      "Git", "GitHub", "Version Control", "Microsoft Azure", "Azure AI Foundry", "Azure AI Studio",
      "Oracle Database", "Microsoft Copilot", "Microsoft PowerPoint", "Prompt Engineering",
      "Generative AI Tools", "Search Engine Technology", "Mathematics", "Propositional Logic",
    ],
  },
  {
    group: "Communication & Leadership",
    skills: [
      "Cross-functional Team Leadership", "Team Leadership", "Teamwork", "Communication",
      "Interpersonal Communication", "Technical Writing", "Creative Writing", "Web Content Writing",
      "Report Writing", "Scriptwriting", "Editing", "Writing", "Teaching", "Training",
      "Persuasion", "Plain Language", "Critical Thinking", "Decision-Making",
      "Creativity and Innovation", "Active Listening", "Soft Skills", "Emotional Intelligence",
      "Resiliency", "Building Trust", "Change Management", "Change Readiness",
      "Unconscious Bias Awareness Training", "Computer Ethics", "Media Ethics", "Business Acumen",
    ],
  },
  {
    group: "Other Skills",
    skills: [
      "Artificial Intelligence for Design", "Productivity Improvement", "Tech Career Skills", "Sales",
      "Business Planning", "Capital Raising", "Small Business Financial Management",
      "Small Business Management", "Small Business Marketing",
    ],
  },
];

export const capabilities = [
  {
    title: "Machine Learning Systems",
    desc: "Predictive modelling, classification, forecasting and decision-support engines trained on messy, real-world data.",
    tech: ["Python", "Scikit-learn", "XGBoost", "LightGBM", "Pandas", "Graph Embeddings", "Time Series"],
  },
  {
    title: "Agentic & GenAI Engineering",
    desc: "Retrieval-augmented generation, tool-using agents and multimodal reasoning — including the harness and loop design that makes agents reliable, not just clever.",
    tech: ["Anthropic Claude", "Gemini", "AWS Bedrock", "LangChain", "RAG", "MCP", "Agent Harness Engineering", "Loop Engineering"],
  },
  {
    title: "Cloud & MLOps",
    desc: "Infrastructure-as-code, containerised services and monitored pipelines that take a notebook from idea to production.",
    tech: ["AWS", "Azure", "Terraform", "Docker", "FastAPI / Flask"],
  },
  {
    title: "Data Engineering & Analytics",
    desc: "ETL pipelines, dimensional modelling and BI reporting that keep decision-makers working from a single source of truth.",
    tech: ["SQL", "Power BI", "Tableau", "dbt", "PySpark"],
  },
  {
    title: "Statistics & Research Design",
    desc: "Quasi-experimental design, hypothesis testing and econometrics applied to education, social science and financial data.",
    tech: ["SPSS", "Stata", "Econometrics", "Geospatial Analysis"],
  },
  {
    title: "Optimisation & Graph Engineering",
    desc: "Combinatorial routing, assignment and sequential-decision problems solved with constraint programming, graph structures and reinforcement learning.",
    tech: ["OR-Tools", "GeoPandas", "Mapbox", "Vehicle Routing", "Graph Engineering", "Reinforcement Learning"],
  },
];

export type ExperienceItem = {
  period: string;
  role: string;
  org: string;
  location: string;
  points: string[];
  current?: boolean;
  transition?: boolean; // links this entry visually to the one before it (a promotion, not a new job)
};

export const experience: ExperienceItem[] = [
  {
    period: "Feb 2026 — Present",
    role: "AI / ML Engineer",
    org: "Wema Bank Plc — Data Analytics & AI Team",
    location: "Marina, Lagos, Nigeria",
    current: true,
    transition: true,
    points: [],
  },
  {
    period: "Mar 2025 — Jan 2026",
    role: "Data Scientist",
    org: "Wema Bank Plc — Data Analytics & AI Team",
    location: "Marina, Lagos, Nigeria",
    points: [],
  },
  {
    period: "Jan 2020 — Aug 2025",
    role: "Data & Research Analyst, Digital Marketer, and Writer",
    org: "Upwork (Freelance)",
    location: "Remote, Nigeria",
    points: [],
  },
  {
    period: "May 2024 — Jan 2025",
    role: "Data Analyst",
    org: "Directorate of ICT, Olabisi Onabanjo University",
    location: "Ago Iwoye, Ogun, Nigeria",
    points: [],
  },
  {
    period: "Feb 2024 — Dec 2024",
    role: "Data Science Intern",
    org: "3MTT Nigeria — The Founding Network",
    location: "Osogbo, Osun, Nigeria",
    points: [],
  },
  {
    period: "Jul 2024 — Aug 2024",
    role: "Data Analysis Intern",
    org: "HNG Internship 11",
    location: "Remote, Nigeria",
    points: [],
  },
  {
    period: "Jul 2024 — Aug 2024",
    role: "Tax Analysis Intern",
    org: "KPMG US — Forage Tax Simulation",
    location: "Remote, US",
    points: [],
  },
  {
    period: "Jul 2023 — Feb 2024",
    role: "Graduate Research Assistant",
    org: "Science & Technology Education Dept., Obafemi Awolowo University",
    location: "Ife, Osun, Nigeria",
    points: [],
  },
  {
    period: "Mar 2020 — Mar 2021",
    role: "Head of Technical and Supplementary Services",
    org: "Lavender Tutors",
    location: "Ife, Osun, Nigeria",
    points: [],
  },
];

export const teaching = {
  role: "Data Analytics & Business Intelligence Tutor",
  org: "Baskenky",
  url: "https://www.babskenky.com/",
  desc: "Teaching analytics engineering, dbt, SQL, Python, Power BI, and Git/GitHub workflows to aspiring data professionals — translating production data practice into a structured, mentor-led curriculum.",
  topics: ["Analytics Engineering", "dbt", "SQL", "Git & GitHub", "Power BI", "Python for Analysts"],
};

export type Project = {
  name: string;
  category: "AI Engineering" | "ML & Data Science" | "Analytics" | "Research";
  year: string;
  description: string;
  stack: string[];
  links: { label: string; url: string }[];
  featured?: boolean;
  status?: string;
};

export const projectsNote =
  "Every project below is personal work, built and published in my own time. Source code for professional work — including everything built for Wema Bank Plc — is covered by NDA and isn't shown here, though I'm glad to speak to the impact and approach in conversation.";

export const projects: Project[] = [
  {
    name: "AIDER — AI-Driven Emergency Response",
    category: "AI Engineering",
    year: "2025",
    description:
      "A real-time disaster-intelligence system built for Africa. AIDER fuses live weather data, breaking disaster news and satellite imagery, then uses multimodal AI to generate actionable emergency briefs for any location on the continent.",
    stack: ["Flask", "Google Gemini Pro Vision", "OpenWeather API", "Serper.dev", "NASA Earth API"],
    links: [
      { label: "GitHub", url: "https://github.com/HonTime2023/AIDER" },
      { label: "Kaggle Notebook", url: "https://www.kaggle.com/code/bellomalik/aider-bello-malik" },
      { label: "Medium Write-up", url: "https://medium.com/@belloayopelumi/aider-how-i-built-a-real-time-ai-disaster-assistant-for-africa-1964d5fe79c2" },
      { label: "Watch Demo", url: "https://www.youtube.com/watch?v=yAWXHt9sXNg&t=424s" },
    ],
    featured: true,
  },
  {
    name: "Intelligent Document Processing — AWS Bedrock RAG",
    category: "AI Engineering",
    year: "2025",
    description:
      "An end-to-end retrieval-augmented generation pipeline on AWS, built as an AI Engineer Nanodegree capstone: PDFs are ingested into S3, indexed into Aurora Serverless Postgres with pgvector/HNSW, and served through a Bedrock Knowledge Base Agent that reasons over the corpus with Claude — with category-classification prompt validation keeping a heavy-machinery support bot on-topic.",
    stack: ["AWS Bedrock", "Aurora Serverless (pgvector)", "Terraform", "Streamlit", "Claude"],
    links: [
      { label: "GitHub", url: "https://github.com/HonTime2023/Intelligent-Document-Processing-System-with-Amazon-Bedrock" },
    ],
    featured: true,
  },
  {
    name: "Maya — Voice-First AI Companion",
    category: "AI Engineering",
    year: "2026",
    description:
      "A voice-first personal AI assistant running on a single real-time speech pipeline. Maya holds natural conversation while calling out to a live toolbelt — weather, alarms and reminders, health tracking (sleep, water, mood, medication), Spotify playback, Telegram messaging, and an emergency SOS routine with repeating alerts and motion detection.",
    stack: ["Deepgram Voice Agent (STT+TTS)", "GPT-4o-mini", "OpenCV", "Telegram Bot API", "Spotify OAuth"],
    links: [],
    status: "Coming soon — in final packaging for public release",
  },
  {
    name: "ESAAM — Exploratory & Sensitivity Analysis App",
    category: "ML & Data Science",
    year: "2024",
    description:
      "A LightGBM-powered application built during the 3MTT Nigeria fellowship to predict Multi-dimensional Poverty Index (MPI) and quantify how tech-skills training moves the needle on poverty reduction — open-sourced as a knowledge showcase for fellow analysts.",
    stack: ["Python", "LightGBM", "Streamlit", "Sensitivity Analysis"],
    links: [
      { label: "GitHub", url: "https://github.com/HonTime2023/3MTTshowcase" },
      { label: "Full Report", url: "http://bit.ly/4i8dhDn" },
      { label: "Live App", url: "https://bit.ly/3X4Otma" },
    ],
    featured: true,
  },
  {
    name: "Multi-Agent Vehicle Routing (TSP/VRP)",
    category: "ML & Data Science",
    year: "2025",
    description:
      "A real-world variant of the Travelling Salesman Problem: ~3,957 geolocated points assigned across 41 agents, with routes optimised for minimum combined distance and balanced per-agent workload, respecting Earth-curvature distances.",
    stack: ["OR-Tools", "GeoPandas", "Mapbox", "Google Vision", "Tesseract OCR"],
    links: [
      { label: "GitHub", url: "https://github.com/HonTime2023/Traveling-Salesman-Problem-MVP-variant-" },
    ],
  },
  {
    name: "NYC Green Taxi Operations & Demand Intelligence",
    category: "Analytics",
    year: "2024",
    description:
      "A two-part capstone turning 1.73M raw NYC green-taxi trip records (2017–2020) into a dispatcher-ready analytics model: Python cleans and profiles the data, while a SQL Server build/analysis pipeline answers demand, revenue and zone-performance questions for operations decision-making.",
    stack: ["Python", "Pandas", "SQL Server (T-SQL)", "Data Cleaning", "EDA"],
    links: [],
  },
  {
    name: "Nepal Climate Risk & Resilience — \"Before the Water Rises\"",
    category: "ML & Data Science",
    year: "2026",
    description:
      "A data-storytelling app tracing Nepal's climate and disaster risk from 1990 to the 2026 Bhote Koshi flood — from hazard evidence, through exposure and vulnerability, to regression-backed evidence supporting a $100M resilience-fund allocation. Built on NASA POWER, HydroSHEDS, national census, DesInventar/UNDRR and UNDP RAPIDA data.",
    stack: ["Python", "Streamlit", "GeoPandas", "Regression Analysis"],
    links: [],
    featured: true,
  },
  {
    name: "Fellow Data Web-Scraper",
    category: "Analytics",
    year: "2024",
    description:
      "A purpose-built scraping pipeline that collected fellow-level training data from a specialised public database, feeding the dataset later used to train ESAAM's MPI model.",
    stack: ["Python", "Web Scraping", "Data Pipelines"],
    links: [{ label: "GitHub", url: "https://github.com/HonTime2023/Webscrapper" }],
  },
  {
    name: "Indeed Job Market Scraper & Insights",
    category: "Analytics",
    year: "2025",
    description:
      "A proxy-backed scraping pipeline over the Oxylabs API that collects and parses live Indeed job postings, then rolls them up into a cleaned dataset with market insights on roles, locations and demand.",
    stack: ["Python", "Oxylabs API", "Pandas"],
    links: [{ label: "GitHub", url: "https://github.com/HonTime2023/indeed-job-market-scraper" }],
  },
];

export type Publication = {
  title: string;
  venue: string;
  year: string;
  type: "Journal Article" | "Conference Presentation";
  url?: string;
};

export const publications: Publication[] = [
  {
    title: "Interactivity as a Retention Factor for Learning Biology with the Protégé Effect",
    venue: "Journal of Teaching and Learning, 19(1), 107–130",
    year: "2025",
    type: "Journal Article",
  },
  {
    title: "The Influence of Emigration Potential (Japa Syndrome) on the Teaching Motivation and Teaching Efficacy of Pre-Service Teachers",
    venue: "Sapientia Foundation Journal of Education, Sciences and Gender Studies, 6(3), 235–251",
    year: "2024",
    type: "Journal Article",
  },
  {
    title: "The Influence of Interactivity on the Long-Term Retention Benefits of Learning Biology Concepts with the Protégé Effect",
    venue: "12th International Mardin Artuklu Scientific Researches Conference, Mardin, Türkiye",
    year: "2024",
    type: "Conference Presentation",
  },
];

export type Education = {
  period: string;
  degree: string;
  org: string;
  url?: string;
  logo?: string;
};

export const education: Education[] = [
  {
    period: "Jan 2025 — Jan 2027",
    degree: "M.Sc. Financial Engineering",
    org: "WorldQuant University",
    logo: "/images/logos/worldquant.png",
  },
  {
    period: "Nov 2025",
    degree: "AI Engineer Nanodegree",
    org: "Udacity (AWS-backed)",
    url: "https://www.udacity.com/certificate/e/ace6e02-8152-11f0-9d43-3bcb633ee64b",
    logo: "/images/logos/udacity.png",
  },
  {
    period: "Feb 2024 — May 2025",
    degree: "Professional Diploma in Data Analytics",
    org: "Baze University, Abuja, Nigeria",
    logo: "/images/logos/baze.png",
  },
  {
    period: "2023",
    degree: "B.Sc. Ed, Biology — First Class Honours (CGPA 4.83/5.0)",
    org: "Obafemi Awolowo University · Best Graduating Student, Faculty of Education",
    logo: "/images/logos/oau.png",
  },
];

export type Recommendation = {
  name: string;
  title: string;
  relationship: string;
  quote: string;
  avatar?: string;
};

// Add LinkedIn recommendations here as they come in — shape matches the
// Recommendation type above. Leave empty to show the "coming soon" state.
export const recommendations: Recommendation[] = [];

export type Certification = {
  title: string;
  issuer: string;
  date?: string;
  url?: string;
  logo?: string;
};

// The curated set shown publicly on the site. Verification links are only
// included where a real, confirmed URL exists — never guessed.
export const certifications: Certification[] = [
  { title: "Accelerating End-to-End Data Science Workflows", issuer: "NVIDIA", date: "Jan 2026", logo: "/images/logos/nvidia.png" },
  { title: "Certified Data Science Professional (CDSP)", issuer: "International Institute of Independent Professionals & Scholars (IIIPS)", date: "Oct 2025" },
  { title: "Career Essentials in GitHub Professional Certificate", issuer: "GitHub", date: "Aug 2025", logo: "/images/logos/github.png" },
  { title: "IDR Statistical Consulting Associate", issuer: "Dataville Research LLC", date: "Aug 2025" },
  { title: "Microsoft Certified: Azure AI Fundamentals (AI-900)", issuer: "Microsoft", date: "Jul 2025", url: "https://learn.microsoft.com/en-us/users/malikpelumibello-5390/credentials/3336168a43eb651d", logo: "/images/logos/azure.png" },
  { title: "Machine Learning Pipelines with Azure ML Studio", issuer: "Microsoft, via Coursera", date: "Aug 2025", url: "https://www.coursera.org/account/accomplishments/verify/WC3CDB375QJ4", logo: "/images/logos/azure.png" },
  { title: "Foundations of Financial Engineering", issuer: "WorldQuant University", date: "Jul 2025", url: "https://www.credly.com/badges/bfdab2b6-644a-4099-9dd9-9ffca71df463/public_url", logo: "/images/logos/ffe-badge.png" },
  { title: "Data Modeling in Power BI", issuer: "Microsoft, via Coursera", date: "Jul 2025", url: "https://coursera.org/verify/GFB3PL0Y8D3H", logo: "/images/logos/microsoft.png" },
  { title: "Aspire Leaders Program", issuer: "Aspire Institute (Harvard-affiliated faculty)", date: "May 2025" },
  { title: "ISO/IEC 27001 Information Security Associate", issuer: "SkillFront", date: "Mar 2025", url: "https://www.skillfront.com/Badges/26859328060599" },
  { title: "Data Science & Analytics", issuer: "HP LIFE", date: "Dec 2024", logo: "/images/logos/hp.png" },
  { title: "English for IT 1", issuer: "Cisco Networking Academy", date: "Jun 2024", logo: "/images/logos/cisco.png" },
  { title: "English for IT 2", issuer: "Cisco Networking Academy", date: "Jun 2024", logo: "/images/logos/cisco.png" },
];

// Every other real certification — not shown on the page, but still part of
// Time's grounding so it can answer specific questions about any of them.
export const additionalCertifications: Certification[] = [
  { title: "Microsoft Azure AI Essentials Professional Certificate", issuer: "Microsoft & LinkedIn", date: "Aug 2025" },
  { title: "Data Analyst", issuer: "Tech4Dev", date: "Jun 2025" },
  { title: "Programming Foundations: Version Control with Git", issuer: "LinkedIn Learning", date: "Aug 2025" },
  { title: "Git from Scratch", issuer: "LinkedIn Learning", date: "Aug 2025" },
  { title: "EF SET English Certificate — 69/100 (C1 Advanced)", issuer: "EF SET", date: "Jul 2025" },
  { title: "Women, Business and the Law", issuer: "The World Bank Group", date: "Jul 2025" },
  { title: "AWS Machine Learning Foundations", issuer: "AWS Educate", date: "Jun 2025" },
  { title: "Introductory Generative AI Engineering with AWS", issuer: "Udacity", date: "Jun 2025", url: "https://www.udacity.com/certificate/e/706403e8-3d47-11f0-9876-8754fb61bc61" },
  { title: "Introduction to Behavioral Science in Public Policy", issuer: "The World Bank Group", date: "Feb 2025" },
  { title: "KPMG U.S. — Career Catalyst: Tax Job Simulation", issuer: "Forage", date: "Aug 2024" },
  { title: "Career Essentials in Data Analysis", issuer: "Microsoft & LinkedIn", date: "Aug 2024" },
  { title: "Introduction to Career Skills in Data Analytics", issuer: "LinkedIn Learning", date: "Jul 2024" },
  { title: "AI Career Essentials (AiCE)", issuer: "ALX Africa", date: "Jul 2024" },
  { title: "Teamwork Foundations", issuer: "LinkedIn Learning", date: "Jun 2024" },
  { title: "Career Essentials in Generative AI", issuer: "Microsoft & LinkedIn", date: "Jun 2024" },
  { title: "Build Your Generative AI Productivity Skills", issuer: "Microsoft & LinkedIn", date: "Jun 2024" },
  { title: "Professional Soft Skills Learning Pathway", issuer: "LinkedIn Learning", date: "Jun 2024" },
  { title: "Fundamentals of Digital Marketing", issuer: "United Latino Students Association", date: "May 2024" },
  { title: "Effective Listening", issuer: "LinkedIn Learning", date: "Apr 2024" },
  { title: "An Introduction to Logic for Computer Science", issuer: "University of Leeds", date: "Apr 2024" },
  { title: "Banish Your Inner Critic to Unleash Creativity", issuer: "LinkedIn Learning", date: "Apr 2024" },
  { title: "Critical Thinking for Better Judgment and Decision-Making", issuer: "LinkedIn Learning", date: "Apr 2024" },
  { title: "Writing in Plain Language", issuer: "LinkedIn Learning", date: "Apr 2024" },
  { title: "Persuading Others", issuer: "LinkedIn Learning", date: "Mar 2024" },
  { title: "Why Trust Matters, with Rachel Botsman", issuer: "LinkedIn Learning", date: "Mar 2024" },
  { title: "Embracing Unexpected Change", issuer: "LinkedIn Learning", date: "Mar 2024" },
  { title: "Unconscious Bias", issuer: "LinkedIn Learning", date: "Mar 2024" },
  { title: "Small Business Marketing", issuer: "LinkedIn Learning", date: "Mar 2024" },
  { title: "Entrepreneurship Learning Pathway", issuer: "LinkedIn Learning", date: "Mar 2024" },
  { title: "Finance Essentials for Small Business", issuer: "LinkedIn Learning", date: "Mar 2024" },
  { title: "Foundations of Raising Capital", issuer: "LinkedIn Learning", date: "Mar 2024" },
  { title: "Creating a Business Plan", issuer: "LinkedIn Learning", date: "Mar 2024" },
  { title: "Understanding Business", issuer: "LinkedIn Learning", date: "Mar 2024" },
  { title: "Basic Financial Literacy", issuer: "Kudimata Nigeria Limited", date: "Mar 2024" },
  { title: "Entrepreneurship: Finding and Testing Your Business Idea", issuer: "LinkedIn Learning", date: "Mar 2024" },
  { title: "Guy Kawasaki on Entrepreneurship", issuer: "LinkedIn Learning", date: "Mar 2024" },
  { title: "Building Resilience", issuer: "LinkedIn Learning", date: "Mar 2024" },
  { title: "Developing Your Emotional Intelligence", issuer: "LinkedIn Learning", date: "Mar 2024" },
  { title: "Entrepreneurship Foundations", issuer: "LinkedIn Learning", date: "Mar 2024" },
];

export type Community = {
  title: string;
  issuer: string;
  url?: string;
  logo?: string;
};

export const communities: Community[] = [
  { title: "Registered Data Scientist", issuer: "Data Science Nigeria (DSN/AIPlus/2025/44220)", logo: "/images/logos/dsn.png" },
  { title: "Registered Data Analyst", issuer: "Nigerian Society of Data Analysts & BI Experts (NSDABIE)", logo: "/images/logos/nsdabie.png" },
  { title: "Registered Teacher", issuer: "Teachers' Registration Council of Nigeria (TRCN; OS/R/07203)", logo: "/images/logos/trcn.png" },
  { title: "Masakhane", issuer: "Grassroots African NLP research community", url: "https://github.com/masakhane-io/masakhane-community", logo: "/images/logos/masakhane.png" },
  { title: "ML Collective", issuer: "Open, global machine-learning research community", url: "https://mlcollective.org/", logo: "/images/logos/mlcollective.png" },
  { title: "Deep Learning Indaba", issuer: "Africa's annual machine-learning & AI community gathering", url: "https://deeplearningindaba.com/", logo: "/images/logos/dli.png" },
];

export const kaggleBadges = [
  "Bronze Medal — Notebook: AIDER",
  "Completed 5-Day Gen AI Intensive (Kaggle × Google)",
  "Python Coder",
  "Kaggle Community Member",
  "2 Years on Kaggle",
];

export const awards = [
  "2024 OAU Star Award of Excellence — exceptional academic performance",
  "2024 Best Debater, MTG NYSC Rivers State Inter-Platoon Debate Competition",
  "2023 Best Graduating Student (Summa Cum Laude), Faculty of Education, Obafemi Awolowo University",
  "2023 Chief Dr (Mrs) Oluremi Tinubu Prize — Best Graduating Student in STE Biology, OAU",
  "2023 Babs Fafunwa Educational Foundation Award",
  "2023 Departmental Association Award of Leadership and Academic Excellence",
  "2021 & 2022 Two-time Awardee, Aliu Abdul Kabir (AAF) Merit Scholarship",
  "2021 UNIFEMGA Undergraduates' Merit Scholarship",
];

export type VolunteeringItem = {
  period: string;
  role: string;
  org: string;
  points: string[];
  image?: string;
  imageFit?: "cover" | "contain";
};

export const volunteering: VolunteeringItem[] = [
  {
    period: "Jul 2024 — Present",
    role: "Data Analyst & Cohort Secretary",
    org: "HAVEK Leadership Academy",
    points: [
      "Built an assessment framework for scholars' graduation criteria and mentor performance.",
      "Led a full organisational capacity analysis using USAID's assessment guide.",
    ],
    image: "/images/havek.png",
    imageFit: "contain",
  },
  {
    period: "May 2024 — Present",
    role: "Research Lead & Interim Secretary",
    org: "Instride Pathways Youth Foundation",
    points: [
      "Part of the leadership team on Voice Africa, the foundation's flagship initiative.",
      "Led a team comparing Logistic Regression, SVM and XGBoost on health datasets.",
      "Coordinated data gathering across private secondary schools for the CIAY sensitisation programme.",
    ],
    image: "/images/instride.jpg",
    imageFit: "contain",
  },
  {
    period: "Oct 2024 — Present",
    role: "Active Member",
    org: "Humanity First Foundation",
    points: [
      "Planning committee member and keynote speaker for \"Pad-Up-A-Girl\" — reached 1,000+ students across two schools with sanitary pads and menstrual health education.",
    ],
    image: "/images/humanity-first.png",
  },
  {
    period: "Present",
    role: "Data Analysis Tutor",
    org: "The Ireti Foundation",
    points: ["Teaching data analysis fundamentals as part of the foundation's digital literacy programme."],
    image: "/images/ireti-foundation.jpg",
  },
];

export type ResearchInterest = {
  title: string;
  description: string;
};

export const researchInterests: ResearchInterest[] = [
  {
    title: "Graph & Network Models for African Trade and Economic Systems",
    description:
      "How relational, network-based machine learning — beyond flat tabular models — can capture the way African commodity and trade systems actually move together, especially under climate and macroeconomic shocks. Early-stage, ongoing work.",
  },
  {
    title: "Machine Learning for Financial Risk & Decision-Making",
    description:
      "Applying predictive modelling and econometrics to banking and fintech risk problems — bridging his Financial Engineering training with production ML practice in a live banking environment.",
  },
  {
    title: "Learning Science & the Protégé Effect",
    description:
      "Peer-reviewed research on interactivity and the Protégé Effect (teaching-to-learn) as retention factors in biology education — the original research thread his academic career started from.",
  },
  {
    title: "AI for Public Sector & Social Impact",
    description:
      "Applying geospatial analysis, forecasting and NLP to public-interest problems — election-integrity detection, flood prediction, and poverty-index modelling among them.",
  },
];

export const domainFocus = ["Banking & Fintech", "Financial Engineering", "Economics", "Biology & Health", "Public Sector"];

export type Dataset = {
  title: string;
  description: string;
  url?: string;
};

// Public datasets he's published for open use — empty until the first one ships.
export const datasets: Dataset[] = [];

export type OpenSourceContribution = {
  project: string;
  description: string;
  url?: string;
};

// Contributions to others' open-source projects — coming soon.
export const openSourceContributions: OpenSourceContribution[] = [];

export type CarouselIcon = "film" | "book" | "mic" | "shield" | "star" | "footprints";

export type CarouselItem = {
  title: string;
  subtitle?: string;
  image?: string;
  imageFit?: "cover" | "contain";
  icon?: CarouselIcon;
  url?: string;
};

export const hobbies = {
  intro:
    "Outside the notebooks and dashboards — the things that actually run in the background.",
  movies: [
    { title: "Foundation", subtitle: "Apple TV+ series", image: "/images/movies/foundation.jpg" },
    { title: "The 100", subtitle: "TV series", image: "/images/movies/the-100.jpg" },
    { title: "The Imitation Game", subtitle: "Film", image: "/images/movies/imitation-game.jpg" },
    { title: "Good Will Hunting", subtitle: "Film", image: "/images/movies/good-will-hunting.jpg" },
    { title: "The Theory of Everything", subtitle: "Film", image: "/images/movies/theory-of-everything.jpg" },
    { title: "The Boy Who Harnessed the Wind", subtitle: "Film", image: "/images/movies/boy-harnessed-wind.jpg" },
    { title: "Green Lantern", subtitle: "Film", image: "/images/movies/green-lantern.jpg" },
    { title: "Doctor Strange", subtitle: "Film", image: "/images/movies/doctor-strange.jpg" },
    { title: "Avengers", subtitle: "Marvel Cinematic Universe", image: "/images/movies/avengers.jpg" },
  ] as CarouselItem[],
  relax: [
    { title: "Max Amini", subtitle: "Stand-up comedy", icon: "mic", image: "/images/relax/max-amini.jpg" },
    { title: "Manchester City", subtitle: "Football club", icon: "shield", image: "/images/relax/man-city.jpg" },
    { title: "Lionel Messi", subtitle: "The GOAT", icon: "star", image: "/images/relax/messi.jpg" },
    { title: "Taking Walks", subtitle: "Thinking time", icon: "footprints", image: "/images/relax/taking-walks.jpg" },
    { title: "Writing Poems", subtitle: "Putting thoughts to page", icon: "book", image: "/images/relax/writing-poems.jpg" },
  ] as CarouselItem[],
  books: [
    { title: "Ikigai", subtitle: "Héctor García & Francesc Miralles", image: "/images/books/ikigai.jpg" },
    { title: "Atomic Habits", subtitle: "James Clear", image: "/images/books/atomic-habits.jpg" },
    { title: "Discipline Is Destiny", subtitle: "Ryan Holiday", image: "/images/books/discipline-is-destiny.jpg" },
    { title: "Zero to One", subtitle: "Peter Thiel", image: "/images/books/zero-to-one.jpg" },
    { title: "The Hundred-Page Machine Learning Book", subtitle: "Andriy Burkov", image: "/images/books/hundred-page-ml.jpg" },
    { title: "Deep Learning", subtitle: "Goodfellow, Bengio & Courville", image: "/images/books/deep-learning.jpg" },
  ] as CarouselItem[],
};
