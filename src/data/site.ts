export const profile = {
  name: "Vivek Shanbhag",
  firstName: "Vivek",
  lastName: "Shanbhag",
  role: "Software Development Engineer II",
  company: "Amazon Web Services",
  location: "Seattle, Washington",
  email: "vivekduq@gmail.com",
  github: "https://github.com/vivshanbhag",
  linkedin: "https://www.linkedin.com/in/vivshanbhag",
  resume: "/Vivek-Shanbhag-Resume.pdf",
  intro: "I design software and tooling that makes complex systems easier to run.",
  aboutTitle: "Engineering thoughtful solutions to complex problems.",
  about: [
    "My work has run from automation and data platforms to cloud architecture, often in customer-facing and operational roles. That spans cloud, finance, healthcare, energy, and mining. At AWS I focus on system design and emerging AI capabilities, building on a Master of Science in Analytics and Information Management.",
    "Outside engineering, I'm a professional swimmer. I've represented India in competitive and open-water events and held state and national records. My name appears in the 2008 Asian Beach Games 5 km results on Wikipedia. The discipline swimming demands is the same mindset I bring to complex engineering work.",
  ],
  wikipedia:
    "https://en.wikipedia.org/wiki/Open_water_swimming_at_the_2008_Asian_Beach_Games#:~:text=Vivek%20Shanbhag",
};

export const stats = [
  { value: "11+", label: "Years building software" },
  { value: "8", label: "Roles across 5 industries" },
  { value: "4.0", label: "M.S. GPA, summa cum laude" },
  { value: "AWS", label: "Current team, Seattle" },
];

// Umami Cloud (https://cloud.umami.is). Fill these in after creating the site:
// websiteId is the UUID from Settings → Websites, dashboardUrl is the private share link.
// While websiteId is empty the tracker is never loaded and no data is collected.
export const analytics = {
  scriptUrl: "https://cloud.umami.is/script.js",
  websiteId: "",
  dashboardUrl: "",
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Toolkit", href: "#skills" },
  { label: "Education", href: "#credentials" },
  { label: "Contact", href: "#contact" },
];

export const marqueeItems = [
  "Python",
  "Rust",
  "TypeScript",
  "Java",
  "AWS CDK",
  "Amazon Bedrock",
  "SageMaker",
  "Kafka",
  "Spark",
  "Databricks",
  "DynamoDB",
  "Lambda",
  "React",
  "SQL",
  "OpenTelemetry",
];

export const featuredProject = {
  eyebrow: "Open-source project · AWS reference implementation",
  status: "Public repository",
  type: "Agentic workflows · Incident response",
  title: "Incident Triage Agent",
  summary:
    "A human-in-the-loop reference app that turns a CloudWatch alarm into an evidence-based incident brief. A bounded agent workflow gathers read-only diagnostics, uses Amazon Bedrock for analysis, records the result, and notifies an operator for review.",
  note: "An independently built public project; it does not expose employer-internal code or implementation details.",
  repo: "https://github.com/vivshanbhag/incident-triage-agent",
  capabilities: [
    {
      title: "Bounded agent loop",
      body: "Model tool use is constrained to a small, code-enforced allowlist.",
    },
    {
      title: "Evidence-first triage",
      body: "Read-only alarm and log evidence informs a concise, reviewable brief.",
    },
    {
      title: "Human-controlled response",
      body: "Operators verify recommendations; the agent does not execute remediation.",
    },
  ],
  docs: [
    {
      tag: "HLD",
      title: "High-Level Design",
      body: "Architecture, trust boundaries, data flow, and operations",
      href: "https://github.com/vivshanbhag/incident-triage-agent/blob/main/docs/HLD.md",
    },
    {
      tag: "LLD",
      title: "Low-Level Design",
      body: "Event contracts, tool protocol, persistence, and failure behavior",
      href: "https://github.com/vivshanbhag/incident-triage-agent/blob/main/docs/LLD.md",
    },
  ],
  stack: ["Amazon Bedrock", "CloudWatch", "Human-in-the-loop", "Read-only tool use"],
};

export const systemsProjects = [
  {
    name: "MCP Policy Gateway",
    kicker: "Integration · Safety",
    summary:
      "A dual-era MCP server in front of a scheduler: caller scopes, per-tool rate limits, idempotency keys, execution budgets, and a redacted audit trail for every call.",
    stack: ["Python", "MCP", "SQLite"],
    repo: "https://github.com/vivshanbhag/mcp-policy-gateway",
    design: "https://github.com/vivshanbhag/mcp-policy-gateway/blob/main/docs/HLD.md",
  },
  {
    name: "Agent Eval Harness",
    kicker: "Evaluation · Reliability",
    summary:
      "Trajectory-based evaluation for agents: ordered tool assertions, forbidden calls, cost and latency budgets, pass@k, stability, and record/replay for a deterministic CI gate.",
    stack: ["Python", "CI", "Cassettes"],
    repo: "https://github.com/vivshanbhag/agent-eval-harness",
    design: "https://github.com/vivshanbhag/agent-eval-harness/blob/main/docs/HLD.md",
  },
  {
    name: "Durable Agent Runtime",
    kicker: "Durability · Human control",
    summary:
      "Crash-safe execution for multi-step workflows: a side-effect ledger that never repeats a write, persisted approvals, worker leases, and explicit review when a crash leaves a step ambiguous.",
    stack: ["Python", "SQLite", "State machines"],
    repo: "https://github.com/vivshanbhag/durable-agent-runtime",
    design: "https://github.com/vivshanbhag/durable-agent-runtime/blob/main/docs/HLD.md",
  },
];

export type Role = {
  period: string;
  company: string;
  location: string;
  title: string;
  summary?: string;
  points?: string[];
  tags?: string[];
  award?: { label: string; value: string };
  mark: string;
  current?: boolean;
};

export const experience: Role[] = [
  {
    period: "Mar 2024 — Present",
    company: "Amazon Web Services",
    location: "Seattle, WA",
    title: "Software Development Engineer II",
    summary:
      "Build and improve reliable systems, automation, and internal engineering tools. Current areas include system design, AI-enabled workflows, operational visibility, and on-call reliability. Recently created a serverless scheduler and an MCP tool that exposes it to AI assistants. Implementation details remain high-level to respect confidentiality.",
    tags: ["Software engineering", "Agentic AI", "MCP tooling", "System design", "Operational excellence"],
    mark: "AWS",
    current: true,
  },
  {
    period: "Aug 2022 — Mar 2024",
    company: "Amazon Web Services",
    location: "Boston, MA",
    title: "Forward Deployed Engineer — EMR",
    summary:
      "Supported AWS customers with cloud architecture, migration, and troubleshooting; developed automation to help engineers deliver customer assistance and published technical guidance for AWS EMR. Served as a Quality Champion for the NA-East region.",
    tags: ["Customer engineering", "Cloud architecture", "Automation", "Apache Spark"],
    mark: "AWS",
  },
  {
    period: "May 2022 — Aug 2022",
    company: "Highmark Health",
    location: "Pittsburgh, PA",
    title: "Data Engineering Intern",
    points: [
      "Collaborated on data-pipeline migration from Informatica BDM to Google Cloud using Kafka and Databricks.",
      "Built an ARIMA model to identify irregular insurance-claims patterns, reducing database anomalies by 8% and improving KPIs by 26%.",
      "Created Tableau visualizations to support insurance-pricing and sales decisions.",
    ],
    mark: "HH",
  },
  {
    period: "Apr 2022 — May 2022",
    company: "Carmeuse Americas",
    location: "Pittsburgh, PA",
    title: "Data Scientist Intern",
    summary:
      "Developed machine-learning models to predict usable lime production and automated weekly, site-level reporting for operations managers.",
    tags: ["Machine learning", "Python", "Automation"],
    mark: "CA",
  },
  {
    period: "Jul 2021 — Mar 2022",
    company: "Biomotivate",
    location: "Pittsburgh, PA",
    title: "Data Science Intern",
    points: [
      "Applied statistical and machine-learning methods to healthcare and wearable-sensor data.",
      "Built ETL pipelines and an XGBoost classifier that achieved 85% accuracy on a treatment-dropout prediction task.",
      "Developed reusable data-resampling code and KPI dashboards for clinical staff.",
    ],
    mark: "BM",
  },
  {
    period: "May 2021 — Mar 2022",
    company: "Duquesne University",
    location: "Pittsburgh, PA",
    title: "Graduate Research Assistant",
    summary:
      "Supported faculty research in machine learning and data engineering, helped design data-collection activities, and built Python models for sports analytics.",
    mark: "DU",
  },
  {
    period: "Dec 2016 — Apr 2021",
    company: "TCS Ltd.",
    location: "Mumbai, India",
    title: "Information Technology Analyst / Team Lead",
    points: [
      "Led a seven-person software development and consulting team on the TCS iON Energy project.",
      "Designed and developed a ticket escalation module that saved over 200 hours per year and contributed to a 6.4% revenue increase.",
      "Built executive dashboards and energy analytics modules; introduced development guidelines and training that contributed to a 15% productivity increase.",
    ],
    award: { label: "Recognition", value: "Best Process Improvement Award · April 2020" },
    mark: "TCS",
  },
  {
    period: "Apr 2014 — Dec 2016",
    company: "Intellect Design Arena Ltd.",
    location: "Mumbai, India",
    title: "Product Engineer",
    points: [
      "Automated multilingual report generation, reducing a client's manual reporting workload by 80% (about 10 hours per week).",
      "Developed a Java Spring and REST currency exchange calculator to provide a unified view of investment holdings.",
      "Supported requirements translation, unit testing, technical documentation, and WebLogic server upgrades.",
    ],
    mark: "IDA",
  },
];

export const skillGroups = [
  {
    title: "Software Engineering",
    blurb: "Languages, APIs, and the craft of shipping maintainable systems.",
    items: [
      "Python",
      "Rust",
      "TypeScript",
      "Java",
      "JavaScript",
      "REST APIs",
      "SQL",
      "Full-stack development",
      "System design",
      "Backend engineering",
      "Automation",
      "Unit testing",
    ],
  },
  {
    title: "AI & Machine Learning",
    blurb: "Agentic workflows, model tooling, and applied ML.",
    items: [
      "Agentic AI systems",
      "AI workflow orchestration",
      "LLM tool use",
      "Amazon Bedrock",
      "SageMaker",
      "Machine learning",
      "NLP",
      "Classification & regression",
      "XGBoost",
      "TensorFlow",
      "scikit-learn",
    ],
  },
  {
    title: "Systems & Cloud Engineering",
    blurb: "Infrastructure, reliability, and observability at scale.",
    items: [
      "AWS (EMR, Glue, Lambda, S3, EC2, DynamoDB, IAM, VPC)",
      "AWS CDK",
      "Cloud architecture",
      "Distributed systems",
      "Infrastructure as code",
      "Automation",
      "Observability",
      "Reliability engineering",
    ],
  },
  {
    title: "Data Engineering & Analytics",
    blurb: "Pipelines, distributed processing, and decision-ready data.",
    items: [
      "Data pipelines",
      "SQL",
      "NoSQL",
      "Kafka",
      "Spark",
      "Hadoop",
      "Databricks",
      "Pandas",
      "Tableau",
      "Power BI",
      "Statistical analysis",
    ],
  },
];

export const education = [
  {
    year: "2022",
    title: "Master of Science in Analytics & Information Management",
    detail: "Duquesne University · Summa Cum Laude · GPA 4.0 / 4.0",
  },
  {
    year: "2019",
    title: "M.B.A., Finance",
    detail: "Welingkar Institute of Management · Distinction · Ranked first in Finance batch",
  },
  {
    year: "2013",
    title: "Bachelor of Engineering in Computer Engineering",
    detail: "University of Pune · First Class",
  },
];

export const recognition = [
  { year: "2025", title: "AWSome Builder Award", detail: "Winner, AWS GSSO Innovation Hackathon" },
  { year: "2024", title: "AWSome Builder Awards", detail: "Amazon Web Services · June and August" },
  { year: "2024", title: "Python Certification", detail: "HackerRank" },
  { year: "2024", title: "Intro to Python", detail: "O'Reilly" },
  { year: "2013", title: "HTML5, JavaScript & CSS3 Specialist", detail: "Microsoft" },
];
