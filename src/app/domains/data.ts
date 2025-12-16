export type Certificate = { name: string; description?: string };
export type CurriculumModule = { title: string; topics: string[] };
export type Course = {
  slug: string;
  title: string;
  summary: string;
  jobGuarantee?: boolean;
  curriculum: CurriculumModule[];
  certificates: Certificate[];
  image?: string;
};
export type Domain = {
  id: string;
  name: string;
  courses: Course[];
};

export const domains: Domain[] = [
  {
    id: "cse-it",
    name: "CSE / IT",
    courses: [
      {
        slug: "web-development-fullstack",
        title: "Full Stack Web Development",
        summary:
          "Master HTML, CSS, JS, React, Node.js and build responsive, production-ready web apps with CI/CD and cloud deployment.",
        curriculum: [
          { title: "Frontend Foundations", topics: ["HTML5", "CSS3", "JavaScript ES6+", "Responsive Design", "Accessibility"] },
          { title: "React & UI", topics: ["React Hooks", "State Mgmt", "Routing", "Tailwind CSS", "Testing"] },
          { title: "Backend Essentials", topics: ["Node.js", "Express", "REST APIs", "Auth & JWT", "ORM/Prisma"] },
          { title: "Databases & DevOps", topics: ["PostgreSQL", "MongoDB", "Docker Basics", "CI/CD", "Cloud Deploy (Vercel/Netlify)"] },
          { title: "Capstone", topics: ["End-to-end Project", "Code Review", "Portfolio & Resume", "Interview Prep"] },
        ],
        certificates: [
          { name: "Course Completion" },
          { name: "Internship Certificate" },
          { name: "Project Excellence (Top Performers)" },
        ],
        image: "/courses/FWD.png",
      },
      {
        slug: "ar-vr",
        title: "AR/VR Development",
        summary: "Create immersive AR/VR experiences with Unity and WebXR technologies.",
        curriculum: [
          { title: "Fundamentals", topics: ["AR/VR Concepts", "3D Modeling Basics", "Unity Interface"] },
          { title: "Development", topics: ["Unity 3D", "C# Programming", "XR Interaction"] },
          { title: "Deployment", topics: ["WebXR", "Mobile AR", "VR Headsets"] },
          { title: "Advanced Topics", topics: ["Spatial Audio", "Hand Tracking", "Multiplayer VR"] },
        ],
        certificates: [
          { name: "Course Completion" },
          { name: "Project Certificate" },
        ],
        image: "/ARVR.jpeg"
      },
      {
        slug: "python-fullstack",
        title: "Python Full Stack",
        summary: "Python, Django/FastAPI, REST, React/Vue integration with testing and deployment.",
        curriculum: [
          { title: "Core Python", topics: ["Data Types", "OOP", "File I/O", "Modules", "Virtualenv"] },
          { title: "Web Frameworks", topics: ["Django", "ORM", "Templates", "DRF", "FastAPI Basics"] },
          { title: "Frontend Integration", topics: ["REST APIs", "React/Vue Basics", "Auth", "CORS"] },
          { title: "Testing & Deploy", topics: ["PyTest", "GitHub Actions", "Docker", "Cloud Hosting"] },
        ],
        certificates: [{ name: "Course Completion" }, { name: "Internship Certificate" }],
      },
      {
        slug: "machine-learning",
        title: "Machine Learning",
        summary: "Hands-on ML with scikit-learn, model evaluation, feature engineering, and deployment.",
        curriculum: [
          { title: "ML Foundations", topics: ["Linear/Logistic Reg.", "SVM", "Trees", "Ensembles"] },
          { title: "Feature Engineering", topics: ["Pipelines", "Scaling", "Encoding", "Selection"] },
          { title: "Model Ops", topics: ["Metrics", "Hyperparam Tuning", "Explainability", "Deployment"] },
        ],
        certificates: [{ name: "Course Completion" }, { name: "Internship Certificate" }],
        image: "/courses/ML.png",
      },
      { slug: "android-app-development", title: "Android App Development", summary: "Kotlin, Jetpack, APIs, and Play Store publishing.", curriculum: [ { title: "Android Essentials", topics: ["Kotlin", "Activities", "Fragments", "Jetpack", "Room"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/App_Development.png" },
      { slug: "data-science", title: "Data Science", summary: "Statistics, Python, Pandas, ML, and storytelling dashboards.", curriculum: [ { title: "DS Track", topics: ["Stats", "EDA", "Pandas", "ML", "Dashboarding"] } ], certificates: [{ name: "Course Completion" }, { name: "Internship Certificate" }], image: "/courses/datascience.jpg" },
      { slug: "artificial-intelligence", title: "Artificial Intelligence", summary: "Search, planning, NLP basics, and intro to deep learning.", curriculum: [ { title: "AI Core", topics: ["Search", "Planning", "NLP Basics", "DL Intro"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/ai.png" },
      { slug: "ui-ux", title: "UI/UX", summary: "User research, wireframing, Figma, and design systems.", curriculum: [ { title: "Design", topics: ["Research", "Wireframes", "Figma", "Systems"] } ], certificates: [{ name: "Course Completion" }, { name: "Portfolio Project" }], image: "/courses/Uiux.png" },
      { slug: "graphic-design", title: "GRAPHIC DESIGN", summary: "Branding, typography, and visual storytelling.", curriculum: [ { title: "Design Suite", topics: ["Branding", "Typography", "Color", "Layouts"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/GrapicDesign.png" },
      { slug: "ar-vr", title: "AR/VR", summary: "Unity basics, interactions, and XR prototyping.", curriculum: [ { title: "XR", topics: ["Unity", "XR SDKs", "Interactions", "Prototyping"] } ], certificates: [{ name: "Course Completion" }] },
      { slug: "devops", title: "DEV OPS", summary: "CI/CD pipelines, Docker, K8s fundamentals, and monitoring.", curriculum: [ { title: "DevOps", topics: ["GitHub Actions", "Docker", "Kubernetes", "Monitoring"] } ], certificates: [{ name: "Course Completion" }] },
      { slug: "selenium-java", title: "SELENIUM TESTING WITH JAVA", summary: "Selenium WebDriver, TestNG, Page Objects, CI execution.", curriculum: [ { title: "QA", topics: ["WebDriver", "TestNG", "POM", "CI"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/se with java.png" },
      { slug: "aws", title: "AWS", summary: "Cloud basics, IAM, EC2, S3, RDS, and serverless intro.", curriculum: [ { title: "Cloud", topics: ["IAM", "EC2", "S3", "RDS", "Lambda"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/aws.png" },
      { slug: "java", title: "JAVA", summary: "Core Java, collections, concurrency, and Spring Boot.", curriculum: [ { title: "Java", topics: ["Core", "Collections", "Concurrency", "Spring Boot"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/java.jpg" },
      { slug: "python", title: "PYTHON", summary: "Python fundamentals to intermediate with projects.", curriculum: [ { title: "Python", topics: ["Syntax", "OOP", "Data", "Projects"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/python.png" },
      { slug: "cyber-security", title: "Cyber Security", summary: "Network security, ethical hacking, and risk management.", curriculum: [ { title: "Security Basics", topics: ["Networks", "Vulns", "Threats"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/cybersecurity.jpeg" },
      { slug: "blockchain", title: "Blockchain", summary: "Blockchain fundamentals, smart contracts, and Ethereum basics.", curriculum: [ { title: "Blockchain Core", topics: ["Ledger", "Consensus", "Smart Contracts"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/blockchain.png" },
      { slug: "sap", title: "SAP", summary: "SAP overview with key modules and business process mapping.", curriculum: [ { title: "SAP Modules", topics: ["FI", "CO", "MM", "SD"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/sap.png" },
      { slug: "business-analytics", title: "Business Analytics", summary: "BI tools, SQL, and dashboards.", curriculum: [ { title: "BA", topics: ["SQL", "Power BI", "Dashboards"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/businessAnalytics.jpeg" },
    ],
  },
  {
    id: "ece",
    name: "ECE Domains",
    courses: [
      { slug: "embedded-systems", title: "Embedded Systems", summary: "MCUs, RTOS basics, and peripheral interfacing.", curriculum: [ { title: "Embedded", topics: ["C for MCU", "GPIO", "UART", "I2C", "SPI"] } ], certificates: [{ name: "Course Completion" }], image: "/embedded_systems.png" },
      { slug: "hev", title: "Hybrid Electric Vehicle", summary: "EV powertrains and control systems.", curriculum: [ { title: "EV", topics: ["BMS", "Motors", "Converters", "Charging"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/hybrid_electric_vehicle.png" },
      { slug: "vlsi", title: "VLSI", summary: "Digital design, Verilog, and synthesis.", curriculum: [ { title: "Chip Design", topics: ["Logic", "Verilog", "Synthesis", "Timing"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/vlsi.png" },
      { slug: "iot", title: "IOT", summary: "IoT devices, MQTT, and cloud dashboards.", curriculum: [ { title: "IoT Stack", topics: ["Sensors", "MQTT", "Node-RED", "Cloud"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/iot.jpg" },
      { slug: "robotics", title: "Robotics", summary: "Kinematics, control, and ROS basics.", curriculum: [ { title: "Robotics", topics: ["Kinematics", "Control", "ROS", "Simulation"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/robotics.png" },
      { slug: "power-systems", title: "POWER SYSTEMS", summary: "Power generation, transmission, and protection.", curriculum: [ { title: "Power", topics: ["Generation", "Transmission", "Protection"] } ], certificates: [{ name: "Course Completion" }], image: "/powerSystem.png" },
    ],
  },
  {
    id: "mechanical",
    name: "Mechanical Engineering Domains",
    courses: [
      { slug: "autocad-mech", title: "AutoCAD", summary: "2D drafting and 3D modeling for mechanical designs.", curriculum: [ { title: "CAD", topics: ["2D Drafting", "3D Modeling", "Assemblies"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/ACad.jpeg" },
      { slug: "catia", title: "CATIA", summary: "Surface modeling and complex assemblies.", curriculum: [ { title: "CATIA", topics: ["Sketcher", "Part", "Surface", "Assembly"] } ], certificates: [{ name: "Course Completion" }] },
      { slug: "car-design", title: "CAR DESIGN", summary: "Automotive design fundamentals and aerodynamics.", curriculum: [ { title: "Auto Design", topics: ["Styling", "CAD", "CFD Basics"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/CAR.png" },
      { slug: "machine", title: "MACHINE", summary: "Mechanical systems, dynamics, and machine design basics.", curriculum: [ { title: "Machines", topics: ["Mechanics", "Dynamics", "Design"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/Machinefor.png" },
    ],
  },
  {
    id: "civil",
    name: "Civil Engineering Domains",
    courses: [],
  },
  {
    id: "management",
    name: "Management & Commerce Domains",
    courses: [
      { slug: "finance", title: "FINANCE", summary: "Corporate finance foundations and modeling.", curriculum: [ { title: "Finance", topics: ["Statements", "Valuation", "Modeling"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/FINANCE.png" },
      { slug: "digital-marketing", title: "Digital Marketing", summary: "SEO, Ads, Content, and Analytics.", curriculum: [ { title: "Marketing", topics: ["SEO", "SEM", "Content", "GA4"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/digitalmarketing.jpg" },
      { slug: "hr-management", title: "HR Management", summary: "Talent lifecycle and HR analytics.", curriculum: [ { title: "HR", topics: ["TA", "L&D", "Payroll", "Analytics"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/hrm.webp" },
      { slug: "stock-marketing", title: "STOCK MARKETING", summary: "Markets, TA vs FA, and portfolio.", curriculum: [ { title: "Markets", topics: [" TA/FA ", "Options Basics", "Risk Mgmt"] } ], certificates: [{ name: "Course Completion" }] },
      { slug: "supply-chain", title: "SUPPLY CHAIN MANAGEMENT", summary: "SCM fundamentals and tools.", curriculum: [ { title: "SCM", topics: ["Planning", "Procurement", "Logistics"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/supplychainManagement.png" },
      { slug: "salesforce", title: "SALES FORCE", summary: "Salesforce admin basics and automation.", curriculum: [ { title: "SFDC", topics: ["Data Model", "Flows", "Apps"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/salesForce.png" },
    ],
  },
  {
    id: "bio",
    name: "BIO DOMAINS",
    courses: [
      { slug: "bioinformatics", title: "Bioinformatics", summary: "Sequence analysis, BLAST, and pipelines.", curriculum: [ { title: "Bioinfo", topics: ["Sequences", "Alignment", "Pipelines"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/bioInformatics.jpeg" },
      { slug: "microbiology", title: "Microbiology", summary: "Microbial techniques and applications.", curriculum: [ { title: "Micro", topics: ["Culturing", "Microscopy", "Testing"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/microBiology.jpeg" },
      { slug: "molecular-biology", title: "Molecular biology", summary: "DNA/RNA techniques and PCR.", curriculum: [ { title: "Molecular", topics: ["DNA/RNA", "PCR", "Cloning"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/molecular.png" },
      { slug: "medical-coding", title: "MEDICAL CODING", summary: "ICD, CPT, and HIPAA basics.", curriculum: [ { title: "Coding", topics: ["ICD", "CPT", "HIPAA"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/medicalCoding.jpeg" },
      { slug: "nano-tech", title: "NANO SCIENCE AND TECHNOLOGY", summary: "Nanomaterials and applications.", curriculum: [ { title: "Nano", topics: ["Materials", "Fabrication", "Apps"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/nano.png" },
      { slug: "genetic-engineering", title: "GENETIC ENGINEERING", summary: "Gene editing and vectors.", curriculum: [ { title: "Genetics", topics: ["CRISPR", "Vectors", "Delivery"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/genetic engineering.png" },
    ],
  },
  {
    id: "food-tech",
    name: "FOOD TECHNOLOGY",
    courses: [
      { slug: "food-science", title: "FOOD SCIENCE AND TECHNOLOGY", summary: "Food chemistry, processing, safety.", curriculum: [ { title: "Food Sci", topics: ["Chemistry", "Processing", "Safety"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/FOOD%20SCIENCE%20AND%20TECHNOLOGY.png" },
      { slug: "sensory-science", title: "SENSORY SCIENCE", summary: "Sensory evaluation and QA.", curriculum: [ { title: "Sensory", topics: ["Evaluation", "Panels", "QA"] } ], certificates: [{ name: "Course Completion" }], image: "/courses/sensory_science.png" },
    ],
  },
];

export const jobGuaranteeCourses: Course[] = [
  {
    slug: "data-science-job-guarantee",
    title: "Data Science (Job Guarantee)",
    summary:
      "Project-heavy DS track with mentoring, mock interviews, and placement support.",
    jobGuarantee: true,
    curriculum: [
      { title: "Foundations", topics: ["Python", "Stats", "EDA", "SQL"] },
      { title: "ML Core", topics: ["Supervised/Unsupervised", "Modeling", "Validation"] },
      { title: "Analytics & BI", topics: ["Power BI", "Dashboards", "Storytelling"] },
      { title: "Career", topics: ["Resume", "LinkedIn", "Mock Interviews"] },
    ],
    certificates: [
      { name: "Course Completion" },
      { name: "Internship Certificate" },
      { name: "Job Guarantee Certificate" },
    ],
    image: "/courses/datascience.jpg",
  },
  {
    slug: "data-analytics-job-guarantee",
    title: "Data Analytics (Job Guarantee)",
    summary:
      "Practical analytics track with SQL, Excel, Power BI and real dashboards.",
    jobGuarantee: true,
    curriculum: [
      { title: "Excel & SQL", topics: ["Excel Advanced", "SQL Queries", "Joins", "CTEs"] },
      { title: "BI & Visualization", topics: ["Power BI", "Data Modeling", "DAX", "Publishing"] },
      { title: "Case Studies", topics: ["Sales", "Ops", "Marketing Analytics"] },
      { title: "Career", topics: ["Portfolio", "Resume", "Mocks"] },
    ],
    certificates: [
      { name: "Course Completion" },
      { name: "Internship Certificate" },
      { name: "Job Guarantee Certificate" },
    ],
    image: "/courses/dataanalytics.jpg",
  },
  {
    slug: "hrm-job-guarantee",
    title: "Human Resource Management (Job Guarantee)",
    summary: "End-to-end HRM with TA, payroll, compliance, HR analytics, and HRIS tools.",
    jobGuarantee: true,
    curriculum: [
      { title: "HR Core", topics: ["Talent Acquisition", "Onboarding", "L&D", "Performance Mgmt"] },
      { title: "HR Ops", topics: ["Payroll", "Compliance", "Policies", "Employee Relations"] },
      { title: "HR Analytics", topics: ["Excel & SQL", "Dashboards", "Reporting"] },
      { title: "Career", topics: ["Resume", "LinkedIn", "Mock Interviews"] },
    ],
    certificates: [
      { name: "Course Completion" },
      { name: "Internship Certificate" },
      { name: "Job Guarantee Certificate" },
    ],
    image: "/courses/hrm.webp",
  },
];

export function findCourseBySlug(slug: string): { course: Course | null; domainName?: string } {
  for (const d of domains) {
    const c = d.courses.find((c) => c.slug === slug);
    if (c) return { course: c, domainName: d.name };
  }
  const j = jobGuaranteeCourses.find((c) => c.slug === slug);
  if (j) return { course: j, domainName: "Job Guarantee" };
  return { course: null };
}

export type DepartmentCategory = {
  id: string;
  title: string;
  domainIds: string[];
};

export const departmentCategories: DepartmentCategory[] = [
  { id: "cse-it", title: "CSE / IT", domainIds: ["cse-it"] },
  { id: "ece", title: "ECE", domainIds: ["ece"] },
  { id: "mech-civil", title: "Mechanical / Civil", domainIds: ["mechanical", "civil"] },
  { id: "management", title: "Management & Commerce", domainIds: ["management"] },
  { id: "bio-food", title: "BIO Domains / FOOD TECHNOLOGY", domainIds: ["bio", "food-tech"] },
];

export function getCoursesForDepartmentCategory(categoryId: string): { title: string; courses: Course[] } | null {
  const cat = departmentCategories.find((c) => c.id === categoryId);
  if (!cat) return null;
  const courses: Course[] = [];
  for (const id of cat.domainIds) {
    const d = domains.find((dd) => dd.id === id);
    if (d) courses.push(...d.courses);
  }
  return { title: cat.title, courses };
}
