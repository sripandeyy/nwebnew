import type { CurriculumModule } from "./types";

interface CourseInput {
  title: string;
  summary: string;
  image?: string;
  curriculum: CurriculumModule[];
  jobGuarantee?: boolean;
}

interface DomainPlanConfig {
  basicExtraModules: CurriculumModule[];
  advancedExtraModules: CurriculumModule[];
  proExtraModules: CurriculumModule[];
}

/**
 * Enriches any course curriculum with comprehensive, domain-tailored
 * industry topics, production tools, testing, architecture, and capstone modules.
 *
 * - Basic Plan: 6 In-Depth Modules (2 Months)
 * - Advanced Plan: 12 Comprehensive Modules (4 Months)
 * - Pro Plan: 16 Enterprise Masterclass Modules (6 Months Job Guarantee)
 */
export function enrichCourseCurriculum(
  course: CourseInput,
  domainName?: string,
  plan: 'basic' | 'advanced' | 'job-assistance' | 'pro' = 'advanced'
): CurriculumModule[] {
  const titleLower = (course.title || "").toLowerCase();
  const summaryLower = (course.summary || "").toLowerCase();
  const domainLower = (domainName || "").toLowerCase();

  // If this is part of the Future Skills School Program, preserve the authentic school syllabus modules from the curriculum
  const isSchoolCourse =
    domainLower.includes("school") ||
    (course as any).category === "Future Skills School Program" ||
    titleLower.includes("programming foundations") ||
    titleLower.includes("full-stack foundations") ||
    titleLower.includes("machine learning foundations") ||
    titleLower.includes("data thinking") ||
    titleLower.includes("market awareness");

  if (isSchoolCourse && course.curriculum && course.curriculum.length > 0) {
    return course.curriculum;
  }

  // Determine domain category
  const isWebDev = titleLower.includes("web") || titleLower.includes("full stack") || titleLower.includes("frontend") || titleLower.includes("backend") || titleLower.includes("mern") || titleLower.includes("mean") || titleLower.includes("react") || titleLower.includes("node");
  const isDotNet = titleLower.includes(".net") || titleLower.includes("dotnet") || titleLower.includes("c#");
  const isAI_ML = titleLower.includes("agentic") || titleLower.includes("ai") || titleLower.includes("machine learning") || titleLower.includes("deep learning") || titleLower.includes("genai") || titleLower.includes("llm");
  const isDataScience = titleLower.includes("data science") || summaryLower.includes("data science");
  const isDataAnalytics = titleLower.includes("data analytics") || titleLower.includes("business intelligence") || titleLower.includes("power bi");
  const isAppDev = titleLower.includes("android") || titleLower.includes("flutter") || titleLower.includes("ios") || titleLower.includes("mobile") || titleLower.includes("app");
  const isCloudDevOps = titleLower.includes("aws") || titleLower.includes("azure") || titleLower.includes("cloud") || titleLower.includes("devops") || titleLower.includes("docker") || titleLower.includes("kubernetes");
  const isCyberSec = titleLower.includes("cyber") || titleLower.includes("security") || titleLower.includes("ethical hack");
  const isECE_VLSI = titleLower.includes("vlsi") || titleLower.includes("embedded") || titleLower.includes("iot") || titleLower.includes("fpga") || titleLower.includes("verilog") || domainLower.includes("ece");
  const isMech = titleLower.includes("cad") || titleLower.includes("solidworks") || titleLower.includes("ansys") || titleLower.includes("cfd") || titleLower.includes("mechanical") || titleLower.includes("catia") || domainLower.includes("mech");
  const isCivil = titleLower.includes("civil") || titleLower.includes("revit") || titleLower.includes("staad") || titleLower.includes("bim") || titleLower.includes("etabs") || domainLower.includes("civil");
  const isManagement = titleLower.includes("hr") || titleLower.includes("management") || titleLower.includes("finance") || titleLower.includes("marketing") || titleLower.includes("business") || domainLower.includes("mgmt") || domainLower.includes("commerce");
  const isBio = titleLower.includes("bio") || titleLower.includes("genomic") || titleLower.includes("clinical") || domainLower.includes("bio");
  const isFoodTech = titleLower.includes("food") || titleLower.includes("dairy") || titleLower.includes("fssai") || domainLower.includes("food");
  const isCreative = titleLower.includes("design") || titleLower.includes("ui/ux") || titleLower.includes("graphic") || titleLower.includes("figma") || domainLower.includes("creative");

  // Deep clone existing initial modules and expand their topics
  const enrichedBase: CurriculumModule[] = (course.curriculum || []).map((mod, idx) => {
    const existingTopics = mod.topics || [];
    let extraTopics: string[] = [];

    if (isWebDev) {
      if (idx === 0) extraTopics = ["HTML5 Semantic Elements", "Modern CSS3 Grid & Flexbox", "JavaScript ES6+ Async/Await & Event Loop", "DOM Manipulation & Web APIs", "Cross-Browser Responsive Design", "Web Accessibility (a11y) Standards"];
      else if (idx === 1) extraTopics = ["React 18/19 Architecture & Virtual DOM", "Hooks (useState, useEffect, useMemo, useCallback)", "State Management (Redux Toolkit & Zustand)", "Next.js App Router & Server Components", "Tailwind CSS & Framer Motion Animations", "Client-side Routing & Navigation"];
      else if (idx === 2) extraTopics = ["Node.js Asynchronous Runtime", "Express.js Middleware & Route Handlers", "RESTful API Architecture & Swagger Docs", "JWT Authentication & Role-Based Access Control", "Bcrypt Password Hashing & Security Headers", "GraphQL Querying & Resolvers"];
      else if (idx === 3) extraTopics = ["PostgreSQL Relational Schema Design & Indexing", "MongoDB NoSQL Aggregation Pipelines", "Docker Containerization & Multi-Stage Builds", "GitHub Actions CI/CD Pipeline Automation", "Redis In-Memory Caching & Session Management", "Nginx Reverse Proxy & Cloud Deployment"];
    } else if (isDotNet) {
      if (idx === 0) extraTopics = ["C# 12 Language Features & Memory Safety", "OOP Principles, Generics & Collections", "LINQ Query Operators & Lambda Expressions", "Asynchronous Programming with Async/Await", "Exception Handling & Diagnostic Logging", "Memory Management & Garbage Collection"];
      else if (idx === 1) extraTopics = ["ASP.NET Core Web API Architecture", "Middleware Pipeline & Filter Attributes", "Dependency Injection Lifecycle (Scoped/Singleton)", "Request Validation with FluentValidation", "JWT Bearer Authentication & Policy Authorization", "Swagger / OpenAPI Documentation"];
      else if (idx === 2) extraTopics = ["Entity Framework Core (Code-First & Db-First)", "LINQ to Entities & Query Optimization", "Database Migrations & Seeding Strategies", "SQL Server Stored Procedures & Triggers", "Repository & Unit of Work Design Patterns", "Redis Caching in .NET Core"];
      else if (idx === 3) extraTopics = ["Azure App Service & Azure SQL Deployment", "CI/CD with Azure DevOps Pipelines", "Dockerizing .NET Core Applications", "Unit Testing with xUnit & Moq", "Microservices Communication with MassTransit", "Application Insights Performance Monitoring"];
    } else if (isDataScience || isAI_ML) {
      if (idx === 0) extraTopics = ["Python Data Structures & NumPy Vectorization", "Pandas Data Cleaning & Advanced Transformations", "Exploratory Data Analysis (EDA) & Outlier Detection", "Probability Distributions & Hypothesis Testing (p-values, z-test, t-test)", "Advanced SQL for Data Science (Joins, CTEs, Windowing)", "Data Visualization with Seaborn & Matplotlib"];
      else if (idx === 1) extraTopics = ["Supervised Learning (Regression, Logistic, SVM, KNN)", "Ensemble Methods (Random Forest, XGBoost, LightGBM)", "Unsupervised Learning (K-Means, PCA, Hierarchical Clustering)", "Feature Engineering, Scaling & One-Hot Encoding", "Cross-Validation & Hyperparameter Tuning (Optuna, GridSearchCV)", "Model Evaluation Metrics (ROC-AUC, Precision-Recall, F1)"];
      else if (idx === 2) extraTopics = ["Deep Learning Architectures with PyTorch & TensorFlow", "Convolutional Neural Networks (CNN) for Computer Vision", "Recurrent Neural Networks (RNN) & LSTM Networks", "Transformer Models & Hugging Face Ecosystem", "Generative AI Prompt Engineering & Fine-Tuning", "RAG Pipelines with LangChain, LlamaIndex & Vector DBs"];
      else if (idx === 3) extraTopics = ["PySpark Big Data Distributed Computing", "Cloud Data Warehouses (Google BigQuery & Snowflake)", "FastAPI Model Serving & Docker Containerization", "MLOps Pipelines with MLflow & DVC", "Interactive Executive Dashboards in Power BI / Tableau", "End-to-End Production ML Deployment"];
    } else if (isDataAnalytics) {
      if (idx === 0) extraTopics = ["Advanced Microsoft Excel (XLOOKUP, Dynamic Arrays, Nested IFs)", "Pivot Tables, Slicers & Power Query ETL Transformations", "Complex SQL Queries (Window Functions, Aggregate CTEs, Joins)", "Database Normalization & Relational Schema Modeling", "Data Cleaning, Duplicate Handling & Missing Value Treatment", "Statistical Analysis & Standard Deviation KPI Calculations"];
      else if (idx === 1) extraTopics = ["Power BI Desktop & Power BI Service Publishing", "DAX Calculations (CALCULATE, FILTER, Time Intelligence)", "Star Schema & Snowflake Data Modeling", "Executive KPI Scorecards & Interactive Drill-Through Reports", "Tableau Visual Storytelling, Parameters & Calculated Fields", "Color Psychology & Visual Hierarchy in Dashboards"];
      else if (idx === 2) extraTopics = ["Python for Analytics (Pandas, Matplotlib & Seaborn)", "Exploratory Trend Analysis & Forecasting", "Customer Churn, Cohort & Retention Analysis", "Marketing Funnel & Conversion Rate Optimization (CRO)", "Financial Metrics & Profitability Modeling", "Supply Chain Inventory & Operational Efficiency Analysis"];
      else if (idx === 3) extraTopics = ["Automated Email Reporting & Script Scheduling", "A/B Testing Methodology & Statistical Significance", "Business Case Study Presentation & Executive Pitching", "ATS Resume Engineering for Business Analysts", "Technical Mock Interviews with Senior Industry Mentors", "Direct Referrals to Hiring Partner Networks"];
    } else if (isAppDev) {
      if (idx === 0) extraTopics = ["Kotlin Language Fundamentals & Coroutines Flow", "Android Studio Setup & Gradle Build Configuration", "Activities, Fragments & Intent Communication", "Jetpack Compose Declarative UI Development", "Material Design 3 Components & Theming", "Responsive Layouts for Tablets & Foldables"];
      else if (idx === 1) extraTopics = ["MVVM Architecture with StateFlow & SharedFlow", "Room Persistence Database & SQLite Queries", "Retrofit 2 REST API Client & JSON Parsing (Moshi/Gson)", "Dependency Injection with Dagger Hilt", "Offline-First Sync & WorkManager Background Jobs", "Firebase Cloud Messaging & Push Notifications"];
      else if (idx === 2) extraTopics = ["Unit Testing with JUnit 5 & Mockk", "UI Automated Testing with Espresso & Compose Test", "App Performance Profiling (Memory, CPU, Battery)", "Play Store Publishing, ProGuard & App Bundles", "Google Maps, CameraX & Device Sensors Integration", "Payment Gateways & In-App Purchases (IAP)"];
      else if (idx === 3) extraTopics = ["Cross-Platform Architecture with Flutter & Dart", "BLoC & Provider State Management", "Clean Architecture Pattern Implementation", "CI/CD Deployment with Fastlane & GitHub Actions", "Crashlytics Performance Diagnostics", "App Store Optimization (ASO) & Release Strategy"];
    } else if (isCloudDevOps) {
      if (idx === 0) extraTopics = ["Cloud Architecture Fundamentals & Multi-Region Setup", "IAM Security Policies, Roles & Multi-Factor Auth", "Virtual Private Clouds (VPC), Subnets & Route Tables", "Compute Scaling (EC2, Auto Scaling Groups, Load Balancers)", "Serverless Computing with AWS Lambda & API Gateway", "Cloud Cost Optimization & Billing Alerts"];
      else if (idx === 1) extraTopics = ["Object Storage with S3 (Lifecycle, Versioning, Replication)", "Block & File Storage (EBS, EFS)", "Relational Databases (Amazon RDS & Aurora)", "NoSQL Solutions (DynamoDB Global Tables)", "Cloud Networking with CloudFront CDN & Route 53 DNS", "CloudWatch Monitoring, Metrics & Alarm Triggers"];
      else if (idx === 2) extraTopics = ["Infrastructure as Code (IaC) with Terraform", "Docker Containerization & Image Optimization", "Kubernetes (EKS/AKS) Cluster Deployment & Pod Scheduling", "CI/CD Pipelines with Jenkins & GitHub Actions", "GitOps Workflows with ArgoCD", "Cloud Security, Compliance & Vulnerability Scanning"];
      else if (idx === 3) extraTopics = ["Site Reliability Engineering (SRE) Principles", "Prometheus & Grafana Centralized Observability", "Helm Chart Templating & Release Lifecycle", "Secrets Management with HashiCorp Vault", "Service Mesh with Istio & Envoy", "Disaster Recovery Planning & Multi-AZ Failover"];
    } else if (isCyberSec) {
      if (idx === 0) extraTopics = ["Information Security Fundamentals (CIA Triad)", "Network Protocols Analysis (TCP/IP, UDP, DNS, HTTPS)", "Packet Sniffing & Traffic Analysis with Wireshark", "Linux Administration & Bash Scripting for Security", "Port Scanning & Reconnaissance with Nmap", "Vulnerability Assessment with Nessus & OpenVAS"];
      else if (idx === 1) extraTopics = ["OWASP Top 10 Web Vulnerabilities (SQLi, XSS, CSRF, SSRF)", "Web Penetration Testing with Burp Suite Professional", "Authentication & Session Hijacking Exploits", "API Security Testing & Rate Limit Bypasses", "Privilege Escalation Techniques (Linux & Windows)", "Metasploit Framework & Payload Delivery"];
      else if (idx === 2) extraTopics = ["Network Defense: Firewalls, IDS/IPS & SIEM (Splunk)", "SOC Operations & Threat Hunting Methodology", "Cryptography: Symmetric, Asymmetric, Hashing & PKI", "Incident Response, Malware Analysis & Digital Forensics", "Active Directory Penetration Testing & Kerberoasting", "Industry Certifications Preparation (CEH / Security+ / OSCP)"];
      else if (idx === 3) extraTopics = ["Reverse Engineering with Ghidra & IDA Pro", "Cloud Security Auditing (AWS Security Hub, Prowler)", "Red Team Tactics & Command-and-Control (C2)", "MITRE ATT&CK Framework Mapping", "Security Compliance (ISO 27001, SOC 2, HIPAA)", "Live Capture-the-Flag (CTF) Defense Exercises"];
    } else if (isECE_VLSI) {
      if (idx === 0) extraTopics = ["Digital Logic Design & Finite State Machines (FSM)", "Verilog HDL & SystemVerilog Modeling", "RTL Coding Guidelines & Functional Verification", "FPGA Architecture & Synthesis with Xilinx Vivado", "Static Timing Analysis (STA) & Setup/Hold Violations", "ASIC Design Flow: Synthesis, Place & Route (P&R)"];
      else if (idx === 1) extraTopics = ["ARM Cortex-M & STM32 Microcontroller Architecture", "Embedded C Programming & Hardware Registers", "Serial Communication: UART, SPI, I2C, CAN & LIN Buses", "Interrupt Service Routines (ISR) & Hardware Timers", "Real-Time Operating Systems (FreeRTOS Tasks & Queues)", "ADC/DAC Interfacing & Analog Sensor Signal Conditioning"];
      else if (idx === 2) extraTopics = ["IoT Node Architecture with ESP32 & NodeMCU", "MQTT, HTTP & CoAP IoT Networking Protocols", "Cloud Telemetry with AWS IoT Core & ThingsBoard", "PCB Schematic & Multi-Layer Layout in KiCad / Altium", "Signal Integrity, Decoupling & Ground Plane Design", "Hardware Prototyping, Soldering & Oscilloscope Debugging"];
      else if (idx === 3) extraTopics = ["UVM (Universal Verification Methodology) Architecture", "SystemVerilog Assertions & Constrained Random Testing", "High-Speed Board Design (DDR4/PCIe Layout)", "Low-Power VLSI Design Techniques & UPF", "Post-Silicon Validation & Boundary Scan JTAG", "Automotive Embedded Standards (AUTOSAR & ISO 26262)"];
    } else if (isMech) {
      if (idx === 0) extraTopics = ["3D Parametric Modeling in SolidWorks & CATIA", "Advanced Part Design, Surfacing & Sheet Metal", "Assembly Modeling, Exploded Views & Bill of Materials (BOM)", "GD&T (Geometric Dimensioning & Tolerancing) per ASME Y14.5", "2D Manufacturing Engineering Drawings & Fits/Tolerances", "Design for Manufacturing & Assembly (DFM / DFA)"];
      else if (idx === 1) extraTopics = ["Finite Element Analysis (FEA) in ANSYS Mechanical", "Static Structural, Modal & Dynamic Vibrations Analysis", "Mesh Generation, Mesh Quality Metrics & Convergence", "Stress Concentration Factors & Von Mises Yield Criterion", "Thermal Steady-State & Transient Heat Transfer Simulation", "Non-Linear Material Behavior, Plasticity & Contact Formulations"];
      else if (idx === 2) extraTopics = ["Computational Fluid Dynamics (CFD) with ANSYS Fluent", "Boundary Layer Aerodynamics, Lift & Drag Forces", "Internal & External Flow Fluid Dynamics Simulation", "Automobile Powertrain & EV Battery Thermal Management", "CNC G-Code / M-Code Programming & CAM Toolpaths", "DFMEA Risk Analysis & ISO Quality Control Documentation"];
      else if (idx === 3) extraTopics = ["Explicit Dynamics & Automotive Crash Simulation (LS-DYNA)", "Composite Material Modeling & Failure Theories", "EV Powertrain & Battery Enclosure Optimization", "Additive Manufacturing (3D Printing) Toolpaths & Slicing", "Tolerance Stack-up Analysis in 1D & 3D", "Geometric Topology Optimization for Light-Weighting"];
    } else if (isCivil) {
      if (idx === 0) extraTopics = ["Architectural 2D Drafting & Municipal Plans in AutoCAD", "Building Information Modeling (BIM) with Autodesk Revit", "Revit Structural Modeling & Rebar Detailing", "3D Architectural Visualization & Walkthroughs", "Clash Detection & Navisworks Coordination", "NBC (National Building Code) Guidelines & Zoning Bylaws"];
      else if (idx === 1) extraTopics = ["Structural Analysis & Design using STAAD.Pro & ETABS", "Reinforced Concrete Frame Design per IS 456 / ACI 318", "Seismic Load Analysis (IS 1893) & Response Spectrum", "Wind Load Calculations (IS 875 Part 3)", "Steel Structure Truss & Connection Design per IS 800", "Foundation Design (Isolated, Combined, Mat & Pile Foundations)"];
      else if (idx === 2) extraTopics = ["Quantity Surveying, Bar Bending Schedules (BBS) in Excel", "Detailed Cost Estimation, Rate Analysis & Tender BOQ", "Construction Scheduling & Critical Path in Primavera P6 / MS Project", "Total Station Surveying & Modern GPS Mapping", "GIS Spatial Analysis with QGIS / ArcGIS", "Green Building Standards (LEED / GRIHA / IGBC) & Site Safety (OSHA)"];
      else if (idx === 3) extraTopics = ["Bridge & Culvert Structural Design in MIDAS Civil", "Deep Excavation & Retaining Wall Design (Plaxis / GeoStudio)", "Pre-Stressed & Post-Tensioned Concrete Detailing", "Highway & Pavement Alignment in AutoCAD Civil 3D", "Contract Management & EPC Tender Documentation", "Smart City Infrastructure Planning & Drainage Modeling"];
    } else if (isManagement) {
      if (idx === 0) extraTopics = ["Strategic Human Resource Management & Org Structure", "Talent Acquisition Funnels, Sourcing & Headhunting", "Recruitment Platforms (LinkedIn Recruiter, Naukri, Indeed)", "Behavioural & Competency-Based Interview Techniques", "Employer Branding, Campus Hiring & Onboarding SOPs", "Diversity, Equity & Inclusion (DEI) Frameworks"];
      else if (idx === 1) extraTopics = ["Corporate Payroll Processing & CTC Compensation Structuring", "Statutory Compliance: PF, ESI, Gratuity, Bonus & POSH Act", "Indian Labour Codes & Industrial Relations Dispute Settlement", "HRIS Administration (Workday, Darwinbox, Zoho People)", "Performance Management Systems (OKRs, KPIs & 360 Reviews)", "Employee Engagement & Attrition Retention Strategies"];
      else if (idx === 2) extraTopics = ["HR Analytics: Attrition Prediction & Workforce Forecasting", "Corporate Financial Modeling & Valuation in Advanced Excel", "Digital Marketing Strategy, SEO & Performance Marketing", "Supply Chain Operations & Global Logistics Management", "Agile Project Management, Scrum & Sprint Ceremonies", "Corporate Governance, Ethics & Executive Leadership"];
      else if (idx === 3) extraTopics = ["HRBP Leadership & Change Management Strategy", "Global Executive Compensation (ESOPs, LTIs & RSUs)", "Mergers & Acquisitions HR Due Diligence", "Workplace Mental Health & Employee Assistance Programs (EAP)", "Executive Presentation & C-Suite Stakeholder Management", "International Human Resource Management & Expat Policies"];
    } else if (isBio || isFoodTech) {
      if (idx === 0) extraTopics = ["Bioinformatics Sequence Alignment (BLAST, ClustalW)", "Molecular Modeling & Docking with AutoDock & PyMOL", "Genomic & Proteomic Databases (NCBI, UniProt, PDB)", "Recombinant DNA Tech & CRISPR-Cas9 Gene Editing", "Mammalian & Bacterial Cell Culture Protocols", "Bioprocess Fermentation & Upstream Bioreactor Operations"];
      else if (idx === 1) extraTopics = ["Downstream Processing, Filtration & Chromatography Purification", "Clinical Trial Protocols, GCP/GLP & CDISC Data Standards", "Regulatory Affairs & Quality Assurance (FDA, EMA, CDSCO)", "Food Microbiology, Pathogen Testing & Sterile Sampling", "Food Preservation & Packaging (MAP, Retort, Aseptic)", "Food Safety Standards: FSSAI, HACCP, ISO 22000 & GMP Audits"];
      else if (idx === 2) extraTopics = ["Dairy Processing, Beverage Tech & Bakery Formulations", "Analytical Instrumentation: HPLC, GC-MS, UV-Vis Spectrophotometry", "Sensory Evaluation & Food Shelf-Life Stability Testing", "Nutraceuticals, Functional Ingredients & Product R&D", "Biopharmaceutical Quality Control (QC) & Batch Release", "Life Sciences Technical Documentation & Career Enablement"];
      else if (idx === 3) extraTopics = ["Biostatistics in Clinical Trials with R / SAS", "Vaccine Manufacturing & Lyophilization Processes", "Good Manufacturing Practices (cGMP) Validation & Audit", "Cleanroom Classifications & Air Handling Units (HVAC)", "Patent Searching & Life Sciences Intellectual Property (IP)", "Formulation Science & Novel Drug Delivery Systems (NDDS)"];
    } else if (isCreative) {
      if (idx === 0) extraTopics = ["Human-Centered Design & Design Thinking Methodology", "User Research: In-Depth Interviews, Surveys & Personas", "Empathy Mapping & User Journey Flow Architecture", "Information Architecture, Card Sorting & Sitemap Design", "Low-Fidelity & High-Fidelity Wireframing in Figma", "Heuristic Evaluation & Usability Testing Frameworks"];
      else if (idx === 1) extraTopics = ["Advanced Figma Design Systems: Auto-Layout 5.0 & Tokens", "Component Variants, Interactive States & Variables", "Visual Hierarchy, Typography Scale & Color Psychology", "Responsive Layouts for iOS, Android & Desktop Breakpoints", "Micro-Interactions & Prototyping in Protopie / Figma", "Accessibility Design Guidelines (WCAG 2.1 AA Standards)"];
      else if (idx === 2) extraTopics = ["Adobe Creative Cloud Suite: Photoshop & Illustrator", "UI Motion Design with After Effects & Lottie", "Design-to-Engineering Handoff Architecture (Dev Mode)", "Design Sprints & Cross-Functional Product Collaboration", "Behance & Dribbble Case Study Storytelling", "Design Portfolio Defense & Agency Client Pitching"];
      else if (idx === 3) extraTopics = ["3D Product Modeling in Spline & Three.js Integration", "Design Ops & Multi-Brand Component Governance", "Growth UX, Product Analytics & Conversion Funnels", "Voice UI & Conversational Interface Design", "Augmented Reality (AR) Interface Prototyping", "Design Leadership & Creative Studio Operations"];
    } else {
      extraTopics = [
        "Industry Standard Tools & Workflow Environment",
        "Foundational Architecture & Best Practices",
        "Live Case Studies & Scenario-Based Applications",
        "Troubleshooting, Debugging & Quality Assurance",
        "Production Standards & Maintainability",
      ];
    }

    const mergedTopics = Array.from(new Set([...existingTopics, ...extraTopics]));
    return {
      title: mod.title,
      topics: mergedTopics,
    };
  });

  // Ensure base has at least 4 modules
  while (enrichedBase.length < 4) {
    const idx = enrichedBase.length + 1;
    enrichedBase.push({
      title: `Module ${idx}: Core Professional Fundamentals & Applied Tooling`,
      topics: [
        "Core Concepts & Architecture Foundations",
        "Standard Industry Workflows & Software Setup",
        "Hands-on Lab Exercises & Best Practices",
        "Debugging, Verification & Error Analysis",
        "Guided Implementation Drills",
      ],
    });
  }

  // --- 1. BASIC PLAN (6 Modules • 2 Months) ---
  const basicModules: CurriculumModule[] = [
    enrichedBase[0],
    enrichedBase[1],
    enrichedBase[2],
    enrichedBase[3],
    {
      title: "Module 5: Practical Problem Solving, Logic & Debugging Workflows",
      topics: [
        "Domain-Specific Algorithm & Logic Building Drills",
        "Common Error Patterns, Exceptions & Diagnostic Techniques",
        "Code / System Refactoring & Clean Coding Conventions",
        "Version Control Workflows with Git & GitHub",
        "Collaborative Pull Requests & Code Review Fundamentals",
      ],
    },
    {
      title: "Module 6: Essential Guided Lab Project & Credential Assessment",
      topics: [
        "End-to-End Guided Practical Implementation Project",
        "Step-by-Step System Validation & Milestone Review",
        "Comprehensive Project Documentation & Deliverable Packaging",
        "Mentor-Led Doubt Clearance & Milestone Assessment",
        "Verified Nyeras Course Completion Certification",
      ],
    },
  ];

  if (plan === 'basic') {
    return basicModules;
  }

  // --- 2. ADVANCED PLAN (12 Modules • 4 Months) ---
  const advancedExtraModules: CurriculumModule[] = [
    {
      title: "Module 5: Intermediate Architecture & Applied Design Patterns",
      topics: [
        "Modular Component & Clean Architecture Principles",
        "High-Performance Data Structures & State Management",
        "Service-Oriented Design & Decoupled Modules",
        "Configuration Management & Multi-Environment Configurations",
        "Industry Best Practices & Code Maintainability Metrics",
      ],
    },
    {
      title: "Module 6: Advanced Domain Mastery & Deep Framework Specialization",
      topics: [
        "Deep-Dive into Enterprise Frameworks & Ecosystem Libraries",
        "Advanced Asynchronous Execution & Concurrency Models",
        "Custom Plugins, Custom Hooks & Domain Extension Modules",
        "Complex Pipeline Orchestration & Workflow Automation",
        "Industry-Standard Case Studies & Real-World Implementations",
      ],
    },
    {
      title: "Module 7: Database Engineering, Caching & Data Layer Optimization",
      topics: [
        "Relational Schema Optimization, Indexing & Query Execution Plans",
        "NoSQL Data Modeling, Aggregation Pipelines & Document Stores",
        "In-Memory Caching (Redis/Memcached) & Session Layer Design",
        "Data Migration Strategies, Transaction Isolation & Concurrency Control",
        "Backup, Recovery & Data Consistency Guarantees",
      ],
    },
    {
      title: "Module 8: Automated Testing, Quality Assurance & Security Hardening",
      topics: [
        "Unit Testing & Integration Testing Test Suites",
        "End-to-End (E2E) Automated Testing & UI Test Harnesses",
        "Security Vulnerability Assessment & OWASP Top 10 Mitigation",
        "Authentication Protocols, Role-Based Access Control (RBAC) & OAuth2",
        "Static Code Analysis, Linters & Automated Security Scanners",
      ],
    },
    {
      title: "Module 9: Cloud Infrastructure, Docker & CI/CD Pipelines",
      topics: [
        "Docker Containerization, Multi-Stage Builds & Image Optimization",
        "Infrastructure as Code (IaC) & Cloud Resource Provisioning",
        "Automated CI/CD Pipelines (GitHub Actions / Jenkins / GitLab)",
        "Environment Secrets Management & Deployment Automation",
        "Cloud Hosting, Serverless Architecture & CDN Edge Deployment",
      ],
    },
    {
      title: "Module 10: Industry Capstone Project I - Architecture & Core Build",
      topics: [
        "Real-World Industry Problem Statement & Client Requirements Brief",
        "High-Level Design (HLD) & Low-Level Design (LLD) Blueprinting",
        "Hands-On Core System Implementation & Database Engineering",
        "Milestone Code Reviews with Senior Technical Mentors",
        "Sprint Retrospectives & Agile Jira Project Management",
      ],
    },
    {
      title: "Module 11: Industry Capstone Project II - Production Deployment & Tuning",
      topics: [
        "Full System Integration & End-to-End Acceptance Testing",
        "Live Production Cloud Deployment & Custom Domain Configuration",
        "Performance Benchmarking, Load Testing & Latency Optimization",
        "Interactive User Documentation, Swagger API Specs & Video Walkthrough",
        "Final Capstone Project Defense & Panel Code Review",
      ],
    },
    {
      title: "Module 12: Career Enablement & Technical Interview Mastery",
      topics: [
        "ATS-Optimized Resume Engineering & Domain Keyword Tuning",
        "High-Impact GitHub / Portfolio Case Study Storytelling",
        "LinkedIn Personal Branding & Direct Recruiter Outreach Strategy",
        "1:1 Technical Mock Interviews & Live Whiteboard Drills",
        "Direct Placement Support with 100+ Hiring Partner Companies",
      ],
    },
  ];

  const advancedModules: CurriculumModule[] = [
    enrichedBase[0],
    enrichedBase[1],
    enrichedBase[2],
    enrichedBase[3],
    ...advancedExtraModules,
  ];

  if (plan === 'advanced') {
    return advancedModules;
  }

  // --- 3. PRO PLAN (16 Modules • 6 Months Job Guarantee) ---
  const proMasterclassModules: CurriculumModule[] = [
    {
      title: "Module 13: Enterprise Distributed Systems, High Availability & Scale",
      topics: [
        "Distributed Microservices Architecture & High-Throughput Message Brokers",
        "Horizontal vs Vertical Scaling, Load Balancing & Global Anycast Routing",
        "Fault-Tolerant Architectures, Circuit Breakers & Graceful Degradation",
        "Multi-Region Active-Active Deployments & Global Replication",
        "Enterprise System Design Mastery for Senior Engineering Roles",
      ],
    },
    {
      title: "Module 14: Real-Time Observability, Chaos Engineering & SRE Incident Response",
      topics: [
        "Centralized Logging, Metrics & Distributed Tracing (OpenTelemetry)",
        "SLIs, SLOs, SLAs & Error Budget Governance",
        "Chaos Engineering Simulations & Production Disaster Recovery Drills",
        "Live On-Call Incident Management, Post-Mortems & RCA Documentation",
        "Cost Optimization (FinOps) & Enterprise Cloud Governance",
      ],
    },
    {
      title: "Module 15: 1:1 Executive Mentorship, Whiteboard Drills & Fast-Track Referrals",
      topics: [
        "Direct 1:1 Live Mock Coding & Architecture Interviews with Staff Engineers",
        "Behavioral (STAR) & Executive Leadership Interview Preparation",
        "Proprietary MNC Hiring Question Banks & Live Solve Sessions",
        "Fast-Track Interview Referrals via Nyeras Corporate Alumni Network",
        "Personalized Skill Gap Assessment & Custom Career Roadmap",
      ],
    },
    {
      title: "Module 16: 100% Guaranteed Corporate Placement Drives & Offer Negotiation",
      topics: [
        "Formal 100% Placement Guarantee Agreement & Bond Execution",
        "Exclusive Corporate Hiring Drives with 100+ Tier-1 Partner Companies",
        "Direct Scheduled Interviews with Hiring Managers & HR Directors",
        "Executive CTC & Compensation Negotiation Strategy Coaching",
        "Lifetime Access to Alumni Network, Masterclasses & Career Advisory",
      ],
    },
  ];

  const proModules: CurriculumModule[] = [
    ...advancedModules,
    ...proMasterclassModules,
  ];

  return proModules;
}
