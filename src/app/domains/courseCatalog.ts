import type { Certificate, Course, CurriculumModule } from "./types";

const defaultCerts: Certificate[] = [
  { name: "Course Completion" },
  { name: "Internship Certificate" },
];

export function course(
  slug: string,
  title: string,
  summary: string,
  modules: CurriculumModule[],
  image?: string,
  extraCerts: Certificate[] = []
): Course {
  return {
    slug,
    title,
    summary,
    curriculum: modules,
    certificates: [...defaultCerts, ...extraCerts],
    ...(image ? { image } : {}),
  };
}

export const cseItCourses: Course[] = [
  course(
    "web-development-fullstack",
    "Full Stack Development",
    "Master HTML, CSS, JavaScript, React, and Node.js to build production-ready web applications.",
    [
      { title: "Frontend Foundations", topics: ["HTML5", "CSS3", "JavaScript ES6+", "Responsive Design"] },
      { title: "React & UI", topics: ["React Hooks", "State Management", "Routing", "Tailwind CSS"] },
      { title: "Backend Essentials", topics: ["Node.js", "Express", "REST APIs", "Auth & JWT"] },
      { title: "Databases & DevOps", topics: ["PostgreSQL", "MongoDB", "Docker", "CI/CD"] },
    ],
    "/courses/web-development-fullstack.png"
  ),
  course(
    "dotnet",
    ".NET Development",
    "Build enterprise applications with C#, ASP.NET Core, Entity Framework, and modern .NET architecture.",
    [
      { title: "C# Fundamentals", topics: ["Syntax", "OOP", "LINQ", "Async/Await"] },
      { title: "ASP.NET Core", topics: ["MVC", "Web API", "Middleware", "Dependency Injection"] },
      { title: "Data Access", topics: ["Entity Framework", "SQL Server", "Migrations", "Repository Pattern"] },
      { title: "Deployment", topics: ["Azure App Service", "CI/CD", "Security", "Performance"] },
    ],
    "/courses/dotnet.png"
  ),
  course(
    "agentic-ai",
    "Agentic AI",
    "Design autonomous AI agents with tool use, planning, memory, and multi-step reasoning workflows.",
    [
      { title: "Agent Foundations", topics: ["LLM Basics", "Prompt Engineering", "Tool Calling", "Memory"] },
      { title: "Agent Frameworks", topics: ["LangChain", "AutoGPT Patterns", "RAG", "Orchestration"] },
      { title: "Production Agents", topics: ["Evaluation", "Guardrails", "Monitoring", "Cost Control"] },
    ],
    "/courses/agentic-ai.png"
  ),
  course(
    "machine-learning",
    "AI/ML & Machine Learning",
    "Hands-on machine learning with scikit-learn, model evaluation, feature engineering, and deployment.",
    [
      { title: "ML Foundations", topics: ["Linear/Logistic Regression", "SVM", "Decision Trees", "Ensembles"] },
      { title: "Feature Engineering", topics: ["Pipelines", "Scaling", "Encoding", "Feature Selection"] },
      { title: "Model Operations", topics: ["Metrics", "Hyperparameter Tuning", "Explainability", "Deployment"] },
    ],
    "/courses/machine-learning.png"
  ),
  course(
    "android-app-development",
    "App Development",
    "Build Android apps with Kotlin, Jetpack Compose, APIs, and Play Store publishing.",
    [
      { title: "Android Essentials", topics: ["Kotlin", "Activities", "Fragments", "Jetpack Compose"] },
      { title: "Data & APIs", topics: ["Room Database", "Retrofit", "REST Integration", "Offline Sync"] },
      { title: "Publishing", topics: ["Testing", "Play Store", "Analytics", "Performance"] },
    ],
    "/courses/android-app-development.png"
  ),
  course(
    "aws",
    "AWS",
    "Master Amazon Web Services: IAM, EC2, S3, RDS, Lambda, and cloud architecture fundamentals.",
    [
      { title: "Cloud Foundations", topics: ["IAM", "VPC", "EC2", "Security Groups"] },
      { title: "Storage & Database", topics: ["S3", "EBS", "RDS", "DynamoDB"] },
      { title: "Serverless", topics: ["Lambda", "API Gateway", "CloudWatch", "Cost Optimization"] },
    ],
    "/courses/aws.png"
  ),
  course(
    "azure",
    "Azure",
    "Learn Microsoft Azure cloud services, virtual machines, storage, and Azure DevOps pipelines.",
    [
      { title: "Azure Basics", topics: ["Subscriptions", "Resource Groups", "Azure Portal", "ARM Templates"] },
      { title: "Compute & Storage", topics: ["VMs", "App Service", "Blob Storage", "Azure SQL"] },
      { title: "DevOps on Azure", topics: ["Azure DevOps", "CI/CD", "Monitoring", "Security Center"] },
    ],
    "/courses/azure.png"
  ),
  course(
    "ccna-200-301",
    "CCNA 200-301",
    "Prepare for Cisco CCNA certification with networking, routing, switching, and security essentials.",
    [
      { title: "Network Fundamentals", topics: ["OSI Model", "IP Addressing", "Subnetting", "Ethernet"] },
      { title: "Routing & Switching", topics: ["VLANs", "STP", "OSPF", "ACLs"] },
      { title: "Security & Automation", topics: ["Network Security", "Wireless", "Automation", "Exam Prep"] },
    ],
    "/courses/ccna-200-301.png"
  ),
  course(
    "cloud-computing",
    "Cloud Computing",
    "Understand cloud models, migration strategies, and multi-cloud architecture across AWS, Azure, and GCP.",
    [
      { title: "Cloud Concepts", topics: ["IaaS/PaaS/SaaS", "Cloud Economics", "Shared Responsibility", "Migration"] },
      { title: "Core Services", topics: ["Compute", "Storage", "Networking", "Identity"] },
      { title: "Architecture", topics: ["High Availability", "Disaster Recovery", "Well-Architected", "Hybrid Cloud"] },
    ],
    "/courses/cloud-computing.png"
  ),
  course(
    "data-analytics",
    "Data Analytics",
    "Practical analytics with SQL, Excel, Power BI, and real-world business dashboards.",
    [
      { title: "Excel & SQL", topics: ["Excel Advanced", "SQL Queries", "Joins", "Aggregations"] },
      { title: "BI & Visualization", topics: ["Power BI", "Data Modeling", "DAX", "Dashboard Design"] },
      { title: "Case Studies", topics: ["Sales Analytics", "Operations", "Marketing KPIs", "Storytelling"] },
    ],
    "/courses/data-analytics.png"
  ),
  course(
    "data-engineering",
    "Data Engineering",
    "Build scalable data pipelines with ETL, warehousing, Spark, and cloud data platforms.",
    [
      { title: "Data Pipelines", topics: ["ETL/ELT", "Airflow", "Data Modeling", "SQL"] },
      { title: "Big Data", topics: ["Spark", "Hadoop Basics", "Streaming", "Data Lakes"] },
      { title: "Cloud Data", topics: ["Snowflake", "Redshift", "dbt", "Orchestration"] },
    ],
    "/courses/data-engineering.png"
  ),
  course(
    "data-science",
    "Data Science",
    "Statistics, Python, Pandas, machine learning, and data storytelling dashboards.",
    [
      { title: "Foundations", topics: ["Python", "Statistics", "EDA", "Visualization"] },
      { title: "Machine Learning", topics: ["Supervised Learning", "Unsupervised", "Model Selection", "Validation"] },
      { title: "Projects", topics: ["Capstone", "Dashboarding", "Reporting", "Portfolio"] },
    ],
    "/courses/data-science.png"
  ),
  course(
    "data-structures",
    "Data Structures",
    "Master arrays, linked lists, trees, graphs, and algorithms for technical interviews.",
    [
      { title: "Linear Structures", topics: ["Arrays", "Linked Lists", "Stacks", "Queues"] },
      { title: "Trees & Graphs", topics: ["Binary Trees", "BST", "Graph Traversal", "Shortest Path"] },
      { title: "Algorithms", topics: ["Sorting", "Searching", "Dynamic Programming", "Complexity Analysis"] },
    ],
    "/courses/data-structures.png"
  ),
  course(
    "deep-learning",
    "Deep Learning",
    "Neural networks, CNNs, RNNs, transformers, and deep learning frameworks with TensorFlow and PyTorch.",
    [
      { title: "Neural Networks", topics: ["Perceptrons", "Backpropagation", "Activation Functions", "Optimization"] },
      { title: "Architectures", topics: ["CNNs", "RNNs", "Transformers", "Transfer Learning"] },
      { title: "Applications", topics: ["Computer Vision", "NLP", "Generative Models", "Deployment"] },
    ],
    "/courses/deep-learning.png"
  ),
  course(
    "devops",
    "DevOps",
    "CI/CD pipelines, Docker, Kubernetes fundamentals, and infrastructure monitoring.",
    [
      { title: "DevOps Culture", topics: ["Agile", "Git Workflows", "CI/CD", "Infrastructure as Code"] },
      { title: "Containers", topics: ["Docker", "Docker Compose", "Kubernetes", "Helm"] },
      { title: "Monitoring", topics: ["Prometheus", "Grafana", "Logging", "Incident Response"] },
    ],
    "/courses/devops.png"
  ),
  course(
    "docker",
    "Docker",
    "Containerize applications with Docker, compose multi-service stacks, and deploy to production.",
    [
      { title: "Docker Basics", topics: ["Images", "Containers", "Dockerfile", "Volumes"] },
      { title: "Orchestration Intro", topics: ["Docker Compose", "Networking", "Registry", "Best Practices"] },
      { title: "Production", topics: ["Security", "Multi-stage Builds", "CI Integration", "Troubleshooting"] },
    ],
    "/courses/docker.png"
  ),
  course(
    "python-fullstack",
    "Python Full Stack Development",
    "Python, Django/FastAPI, REST APIs, and frontend integration with testing and deployment.",
    [
      { title: "Core Python", topics: ["Data Types", "OOP", "Modules", "Virtualenv"] },
      { title: "Web Frameworks", topics: ["Django", "FastAPI", "ORM", "REST APIs"] },
      { title: "Full Stack", topics: ["React Integration", "Auth", "Testing", "Cloud Deploy"] },
    ],
    "/courses/python-fullstack.png"
  ),
  course(
    "generative-ai-llm",
    "Generative AI & LLM",
    "Build LLM-powered applications with prompt engineering, fine-tuning, RAG, and API integration.",
    [
      { title: "LLM Foundations", topics: ["Transformer Architecture", "Tokenization", "Embeddings", "APIs"] },
      { title: "Applications", topics: ["Prompt Engineering", "RAG", "Fine-tuning", "Agents"] },
      { title: "Production", topics: ["Evaluation", "Safety", "Cost Optimization", "Deployment"] },
    ],
    "/courses/generative-ai-llm.png"
  ),
  course(
    "java",
    "Java",
    "Core Java, collections, concurrency, and Spring Boot for enterprise development.",
    [
      { title: "Core Java", topics: ["Syntax", "OOP", "Collections", "Exception Handling"] },
      { title: "Advanced Java", topics: ["Multithreading", "Streams", "JDBC", "Design Patterns"] },
      { title: "Spring Boot", topics: ["REST APIs", "JPA", "Security", "Microservices Intro"] },
    ],
    "/courses/java.png"
  ),
  course(
    "java-fullstack",
    "Java Full Stack",
    "End-to-end Java development with Spring Boot, React, databases, and deployment.",
    [
      { title: "Backend", topics: ["Spring Boot", "REST", "JPA/Hibernate", "Security"] },
      { title: "Frontend", topics: ["React", "State Management", "API Integration", "UI Components"] },
      { title: "Full Stack Project", topics: ["Architecture", "Testing", "Docker", "Deployment"] },
    ],
    "/courses/java-fullstack.png"
  ),
  course(
    "manual-testing",
    "Manual Testing",
    "Software testing fundamentals, test cases, bug reporting, and QA lifecycle processes.",
    [
      { title: "Testing Basics", topics: ["SDLC/STLC", "Test Cases", "Bug Life Cycle", "Test Plans"] },
      { title: "Techniques", topics: ["Black Box", "White Box", "Boundary Value", "Equivalence Partitioning"] },
      { title: "QA Process", topics: ["Agile Testing", "Documentation", "UAT", "Reporting"] },
    ],
    "/courses/manual-testing.png"
  ),
  course(
    "metaverse",
    "Metaverse",
    "Explore virtual worlds, 3D environments, digital twins, and immersive experience design.",
    [
      { title: "Metaverse Concepts", topics: ["Virtual Worlds", "Avatars", "Digital Economy", "Platforms"] },
      { title: "Development", topics: ["Unity/Unreal Basics", "3D Assets", "Multiplayer", "Web3 Integration"] },
      { title: "Applications", topics: ["Education", "Retail", "Events", "Future Trends"] },
    ],
    "/courses/metaverse.png"
  ),
  course(
    "artificial-intelligence",
    "Artificial Intelligence",
    "Search algorithms, planning, NLP basics, and introduction to deep learning.",
    [
      { title: "AI Core", topics: ["Search", "Knowledge Representation", "Planning", "Expert Systems"] },
      { title: "NLP & Vision", topics: ["Text Processing", "Classification", "Computer Vision Intro", "Applications"] },
      { title: "Modern AI", topics: ["Deep Learning Intro", "Ethics", "AI Tools", "Projects"] },
    ],
    "/courses/artificial-intelligence.png"
  ),
  course(
    "python",
    "Python",
    "Python fundamentals through intermediate programming with real-world projects.",
    [
      { title: "Python Basics", topics: ["Syntax", "Data Types", "Control Flow", "Functions"] },
      { title: "Intermediate", topics: ["OOP", "File I/O", "Modules", "Error Handling"] },
      { title: "Projects", topics: ["APIs", "Automation", "Data Scripts", "Portfolio"] },
    ],
    "/courses/python.png"
  ),
  course(
    "quantum-computing",
    "Quantum Computing",
    "Introduction to qubits, quantum gates, algorithms, and quantum programming frameworks.",
    [
      { title: "Quantum Basics", topics: ["Qubits", "Superposition", "Entanglement", "Measurement"] },
      { title: "Algorithms", topics: ["Deutsch-Jozsa", "Grover", "Shor Intro", "Quantum Circuits"] },
      { title: "Programming", topics: ["Qiskit", "Simulators", "Applications", "Future Outlook"] },
    ],
    "/courses/quantum-computing.png"
  ),
  course(
    "sap",
    "SAP",
    "SAP overview with key modules and end-to-end business process mapping.",
    [
      { title: "SAP Overview", topics: ["ERP Concepts", "SAP Navigation", "Master Data", "Transactions"] },
      { title: "Core Modules", topics: ["FI", "CO", "MM", "SD"] },
      { title: "Implementation", topics: ["Configuration", "Integration", "Reporting", "Best Practices"] },
    ],
    "/courses/sap.png"
  ),
  course(
    "sap-grc-arm",
    "SAP GRC ARM",
    "SAP Governance, Risk, and Compliance with Access Risk Management and control monitoring.",
    [
      { title: "GRC Overview", topics: ["GRC Framework", "Risk Management", "Compliance", "Audit"] },
      { title: "Access Control", topics: ["ARM", "SOD Analysis", "Role Design", "Remediation"] },
      { title: "Monitoring", topics: ["Controls", "Reporting", "Workflows", "Certification"] },
    ],
    "/courses/sap-grc-arm.png"
  ),
  course(
    "sap-mm",
    "SAP MM",
    "SAP Materials Management module covering procurement, inventory, and vendor management.",
    [
      { title: "MM Basics", topics: ["Organizational Structure", "Master Data", "Procurement", "Inventory"] },
      { title: "Processes", topics: ["PR/PO Cycle", "Goods Receipt", "Invoice Verification", "MRP"] },
      { title: "Advanced", topics: ["Batch Management", "Valuation", "Integration", "Reporting"] },
    ],
    "/courses/sap-mm.png"
  ),
  course(
    "sap-security",
    "SAP Security",
    "SAP authorization concepts, role design, user management, and security auditing.",
    [
      { title: "Security Basics", topics: ["Users", "Roles", "Profiles", "Authorization Objects"] },
      { title: "Role Design", topics: ["Single Roles", "Composite Roles", "Derivation", "Testing"] },
      { title: "Audit & Compliance", topics: ["SOD", "Monitoring", "GRC Integration", "Best Practices"] },
    ],
    "/courses/sap-security.png"
  ),
  course(
    "sap-successfactors",
    "SAP SuccessFactors",
    "Cloud HCM suite covering recruitment, onboarding, performance, and employee central.",
    [
      { title: "SF Overview", topics: ["Employee Central", "Navigation", "Foundation Objects", "Workflows"] },
      { title: "Talent Modules", topics: ["Recruiting", "Onboarding", "Performance", "Learning"] },
      { title: "Administration", topics: ["Configuration", "Integration", "Reporting", "Security"] },
    ],
    "/courses/sap-successfactors.png"
  ),
  course(
    "sap-ui5-fiori",
    "SAP UI5 Fiori OData",
    "Build SAP Fiori apps with UI5, OData services, and SAP Gateway integration.",
    [
      { title: "UI5 Basics", topics: ["MVC Pattern", "Controls", "Data Binding", "Routing"] },
      { title: "OData", topics: ["OData Services", "CRUD Operations", "Filters", "Gateway"] },
      { title: "Fiori Apps", topics: ["Launchpad", "Custom Apps", "Theming", "Deployment"] },
    ],
    "/courses/sap-ui5-fiori.png"
  ),
  course(
    "sas-programming",
    "SAS Programming",
    "Statistical analysis and data manipulation with SAS programming language.",
    [
      { title: "SAS Basics", topics: ["DATA Step", "PROC Steps", "Variables", "Libraries"] },
      { title: "Analysis", topics: ["Descriptive Stats", "Regression", "Reporting", "Macros Intro"] },
      { title: "Applications", topics: ["Clinical Data", "Business Analytics", "Automation", "Projects"] },
    ],
    "/courses/sas-programming.png"
  ),
  course(
    "selenium-java",
    "Selenium Testing",
    "Selenium WebDriver automation with Java, TestNG, Page Object Model, and CI execution.",
    [
      { title: "Selenium Core", topics: ["WebDriver", "Locators", "Waits", "Actions"] },
      { title: "Test Framework", topics: ["TestNG", "Page Object Model", "Data-Driven Tests", "Reports"] },
      { title: "CI Integration", topics: ["Maven", "Jenkins", "Cross-browser", "Best Practices"] },
    ],
    "/courses/selenium-java.png"
  ),
  course(
    "servicenow",
    "ServiceNow",
    "ServiceNow platform administration, ITSM workflows, and custom application development.",
    [
      { title: "Platform Basics", topics: ["Navigation", "Tables", "Forms", "Lists"] },
      { title: "ITSM", topics: ["Incident", "Problem", "Change", "Service Catalog"] },
      { title: "Development", topics: ["Scripting", "Workflows", "Integration", "Reporting"] },
    ],
    "/courses/servicenow.png"
  ),
  course(
    "ui-ux",
    "UI/UX Design",
    "User research, wireframing, prototyping with Figma, and design systems.",
    [
      { title: "UX Research", topics: ["User Interviews", "Personas", "Journey Maps", "Usability Testing"] },
      { title: "UI Design", topics: ["Wireframes", "Figma", "Design Systems", "Prototyping"] },
      { title: "Portfolio", topics: ["Case Studies", "Handoff", "Accessibility", "Design Thinking"] },
    ],
    "/courses/ui-ux.png"
  ),
  course(
    "web3",
    "Web3",
    "Decentralized applications, smart contracts, wallets, and blockchain integration.",
    [
      { title: "Web3 Foundations", topics: ["Blockchain", "Wallets", "Smart Contracts", "DApps"] },
      { title: "Development", topics: ["Solidity Intro", "Web3.js/ethers.js", "IPFS", "Testing"] },
      { title: "Ecosystem", topics: ["DeFi", "NFTs", "Security", "Deployment"] },
    ],
    "/courses/web3.png"
  ),
  course(
    "web-development",
    "Web Development",
    "Front-end web development with HTML, CSS, JavaScript, and responsive design.",
    [
      { title: "HTML & CSS", topics: ["Semantic HTML", "Flexbox", "Grid", "Responsive Design"] },
      { title: "JavaScript", topics: ["DOM", "Events", "Fetch API", "ES6+ Features"] },
      { title: "Projects", topics: ["Landing Pages", "Portfolio Site", "Forms", "Deployment"] },
    ],
    "/courses/web-development.png"
  ),
  course(
    "ai-domain",
    "AI Domain",
    "Comprehensive AI track covering ML, deep learning, NLP, computer vision, and AI ethics.",
    [
      { title: "AI Foundations", topics: ["ML Basics", "Statistics", "Python for AI", "Data Prep"] },
      { title: "Specializations", topics: ["NLP", "Computer Vision", "Deep Learning", "Reinforcement Learning"] },
      { title: "Industry AI", topics: ["MLOps", "AI Products", "Ethics", "Capstone"] },
    ],
    "/courses/ai-domain.png"
  ),
  course(
    "ar-vr",
    "AR/VR",
    "Create immersive AR/VR experiences with Unity, 3D modeling, and XR interaction design.",
    [
      { title: "XR Fundamentals", topics: ["AR/VR Concepts", "3D Basics", "Unity Interface", "Spatial Design"] },
      { title: "Development", topics: ["C# Scripting", "XR SDKs", "Interactions", "Physics"] },
      { title: "Deployment", topics: ["Mobile AR", "VR Headsets", "WebXR", "Optimization"] },
    ],
    "/courses/ar-vr.png"
  ),
  course(
    "bioinformatics-tech",
    "Bioinformatics",
    "Sequence analysis, BLAST, genomics pipelines, and computational biology tools.",
    [
      { title: "Sequences", topics: ["DNA/RNA/Protein", "Alignment", "BLAST", "Databases"] },
      { title: "Pipelines", topics: ["NGS Basics", "Variant Calling", "Python/R Tools", "Visualization"] },
      { title: "Applications", topics: ["Drug Discovery", "Phylogenetics", "Structural Bio", "Projects"] },
    ],
    "/courses/bioinformatics.png"
  ),
  course(
    "blockchain",
    "Blockchain",
    "Blockchain fundamentals, consensus mechanisms, smart contracts, and Ethereum development.",
    [
      { title: "Blockchain Core", topics: ["Distributed Ledger", "Consensus", "Cryptography", "Wallets"] },
      { title: "Smart Contracts", topics: ["Solidity", "Ethereum", "Testing", "Security"] },
      { title: "Applications", topics: ["DeFi", "Supply Chain", "Tokenization", "Use Cases"] },
    ],
    "/courses/blockchain.png"
  ),
  course(
    "cyber-security",
    "Cybersecurity",
    "Network security, ethical hacking, vulnerability assessment, and risk management.",
    [
      { title: "Security Foundations", topics: ["Networking", "Threats", "Cryptography", "Policies"] },
      { title: "Offensive Security", topics: ["Reconnaissance", "Exploitation", "Web App Security", "Reporting"] },
      { title: "Defensive Security", topics: ["Firewalls", "SIEM", "Incident Response", "Compliance"] },
    ],
    "/courses/cyber-security.png"
  ),
  course(
    "graphic-design",
    "Graphic Design",
    "Branding, typography, color theory, and visual storytelling for print and digital media.",
    [
      { title: "Design Principles", topics: ["Typography", "Color Theory", "Layout", "Composition"] },
      { title: "Tools", topics: ["Adobe Illustrator", "Photoshop", "InDesign", "Canva Pro"] },
      { title: "Branding", topics: ["Logo Design", "Brand Guidelines", "Marketing Collateral", "Portfolio"] },
    ],
    "/courses/graphic-design.png"
  ),
  course(
    "iot",
    "Internet of Things (IoT)",
    "IoT devices, sensors, MQTT protocol, edge computing, and cloud dashboards.",
    [
      { title: "IoT Architecture", topics: ["Sensors", "Microcontrollers", "Protocols", "Cloud Integration"] },
      { title: "Development", topics: ["Arduino/ESP32", "MQTT", "Node-RED", "Dashboards"] },
      { title: "Projects", topics: ["Smart Home", "Industrial IoT", "Data Analytics", "Security"] },
    ],
    "/courses/iot.png"
  ),
  course(
    "computer-organization",
    "Computer Organization & Architecture",
    "CPU design, memory hierarchy, instruction sets, and computer system fundamentals.",
    [
      { title: "Digital Logic", topics: ["Boolean Algebra", "Combinational Circuits", "Sequential Circuits", "ALU"] },
      { title: "Computer Architecture", topics: ["Instruction Sets", "Pipelining", "Memory Hierarchy", "I/O Systems"] },
      { title: "Performance", topics: ["Caching", "Parallelism", "Benchmarking", "Modern Processors"] },
    ],
    "/courses/computer-organization.png"
  ),
  course(
    "dbms",
    "Database Management Systems (DBMS)",
    "Relational databases, SQL, normalization, transactions, and query optimization.",
    [
      { title: "Database Design", topics: ["ER Model", "Normalization", "Keys", "Constraints"] },
      { title: "SQL", topics: ["Queries", "Joins", "Subqueries", "Stored Procedures"] },
      { title: "Advanced", topics: ["Transactions", "Indexing", "NoSQL Intro", "Administration"] },
    ],
    "/courses/dbms.png"
  ),
  course(
    "probability-statistics",
    "Probability & Statistics",
    "Probability theory, statistical inference, hypothesis testing, and data analysis.",
    [
      { title: "Probability", topics: ["Random Variables", "Distributions", "Bayes Theorem", "Expectation"] },
      { title: "Statistics", topics: ["Descriptive Stats", "Hypothesis Testing", "Regression", "ANOVA"] },
      { title: "Applications", topics: ["Data Science Prep", "Sampling", "Confidence Intervals", "Projects"] },
    ],
    "/courses/probability-statistics.png"
  ),
];

export const eceCourses: Course[] = [
  course(
    "embedded-systems",
    "Embedded Systems",
    "Microcontrollers, RTOS basics, and peripheral interfacing for embedded applications.",
    [
      { title: "Embedded C", topics: ["C for MCU", "GPIO", "Timers", "Interrupts"] },
      { title: "Peripherals", topics: ["UART", "I2C", "SPI", "ADC/DAC"] },
      { title: "RTOS", topics: ["FreeRTOS Basics", "Tasks", "Synchronization", "Debugging"] },
    ],
    "/courses/embedded-systems.png"
  ),
  course(
    "vlsi",
    "VLSI",
    "Digital design, Verilog HDL, synthesis, and ASIC/FPGA design flow.",
    [
      { title: "Digital Design", topics: ["Combinational Logic", "Sequential Logic", "FSM", "Timing"] },
      { title: "Verilog", topics: ["RTL Coding", "Testbenches", "Simulation", "Synthesis"] },
      { title: "Physical Design", topics: ["Floorplanning", "Placement", "Routing", "Sign-off"] },
    ],
    "/courses/vlsi.png"
  ),
  course(
    "signals-and-systems",
    "Signals & Systems",
    "Continuous and discrete-time signals, Fourier analysis, Laplace transforms, and system response.",
    [
      { title: "Signal Analysis", topics: ["CT/DT Signals", "Convolution", "Fourier Series", "FT/DTFT"] },
      { title: "System Theory", topics: ["LTI Systems", "Laplace/Z-Transforms", "Frequency Response", "Stability"] },
      { title: "Applications", topics: ["Filters", "Sampling", "Modulation", "MATLAB/Simulink"] },
    ],
    "/courses/signals-and-systems.png"
  ),
  course(
    "scld",
    "SCLD",
    "Systems, control logic, and lab-oriented design for electronic engineering applications.",
    [
      { title: "System Modeling", topics: ["Block Diagrams", "Transfer Functions", "State Space", "Simulation"] },
      { title: "Control Logic", topics: ["PID Control", "Digital Logic Design", "PLCs", "Feedback Systems"] },
      { title: "Lab Design", topics: ["Prototyping", "Testing", "Instrumentation", "Project Implementation"] },
    ],
    "/courses/scld.png"
  ),
  course(
    "iot-systems",
    "Internet of Things (IoT)",
    "IoT devices, MQTT, sensors, and cloud-connected smart systems.",
    [
      { title: "IoT Stack", topics: ["Sensors", "Microcontrollers", "MQTT", "Cloud Platforms"] },
      { title: "Development", topics: ["Node-RED", "Edge Computing", "Dashboards", "Analytics"] },
      { title: "Applications", topics: ["Smart Agriculture", "Healthcare IoT", "Industrial", "Security"] },
    ],
    "/courses/iot.png"
  ),
  course(
    "robotics-automation",
    "Robotics",
    "Robot kinematics, control systems, ROS, and simulation environments.",
    [
      { title: "Robotics Math", topics: ["Kinematics", "Dynamics", "Jacobian", "Trajectory Planning"] },
      { title: "Control", topics: ["PID", "Motion Control", "Sensors", "Actuators"] },
      { title: "ROS", topics: ["Nodes", "Topics", "Simulation", "Navigation"] },
    ],
    "/courses/robotics.png"
  ),
  course(
    "power-systems",
    "Power Systems",
    "Power generation, transmission, distribution, and protection systems.",
    [
      { title: "Generation", topics: ["Thermal", "Hydro", "Renewable", "Grid Integration"] },
      { title: "Transmission", topics: ["Lines", "Transformers", "Load Flow", "Fault Analysis"] },
      { title: "Protection", topics: ["Relays", "Switchgear", "Stability", "Smart Grid"] },
    ],
    "/courses/power-systems.png"
  ),
  course(
    "hev-powertrains",
    "Hybrid & Electric Vehicles",
    "EV powertrains, battery management, motor control, and charging infrastructure.",
    [
      { title: "EV Architecture", topics: ["Powertrain", "BMS", "Motors", "Inverters"] },
      { title: "Battery Systems", topics: ["Li-ion Chemistry", "Thermal Management", "SOC/SOH", "Safety"] },
      { title: "Charging & Control", topics: ["On-board Charger", "Regenerative Braking", "CAN Bus", "Standards"] },
    ],
    "/courses/hev.png"
  ),
];

export const mechanicalCourses: Course[] = [
  course(
    "autocad-mech",
    "AutoCAD",
    "2D drafting and 3D modeling for mechanical engineering designs.",
    [
      { title: "2D Drafting", topics: ["Drawing Tools", "Dimensions", "Layers", "Annotations"] },
      { title: "3D Modeling", topics: ["Solid Modeling", "Assemblies", "Sections", "Rendering"] },
      { title: "Standards", topics: ["GD&T", "Templates", "Plotting", "Industry Practices"] },
    ],
    "/courses/autocad-mech.png"
  ),
  course(
    "catia",
    "CATIA",
    "Advanced surface modeling, part design, and complex assemblies in CATIA.",
    [
      { title: "Part Design", topics: ["Sketcher", "Features", "Parameters", "Draft Analysis"] },
      { title: "Surface Modeling", topics: ["Surfaces", "Hybrid Design", "Styling", "Class-A Surfaces"] },
      { title: "Assembly", topics: ["Constraints", "Kinematics", "Drafting", "DMU"] },
    ],
    "/courses/catia.png"
  ),
  course(
    "car-design",
    "Car Design",
    "Automotive styling, aerodynamics, and CAD-based vehicle design.",
    [
      { title: "Automotive Design", topics: ["Styling", "Ergonomics", "Package Layout", "Sketching"] },
      { title: "CAD Modeling", topics: ["Body Panels", "Class-A", "Interior", "Visualization"] },
      { title: "Aerodynamics", topics: ["CFD Basics", "Wind Tunnel", "Drag Reduction", "Thermal"] },
    ],
    "/courses/car-design.png"
  ),
  course(
    "machine",
    "Machine Design",
    "Mechanical systems, dynamics, machine elements, and design calculations.",
    [
      { title: "Mechanics", topics: ["Statics", "Dynamics", "Stress Analysis", "Materials"] },
      { title: "Machine Elements", topics: ["Gears", "Bearings", "Shafts", "Springs"] },
      { title: "Design Project", topics: ["FEA Intro", "Standards", "Drawings", "Prototyping"] },
    ],
    "/courses/machine.png"
  ),
  course(
    "hev",
    "Hybrid & Electric Vehicles",
    "EV powertrains, battery systems, and automotive electrification.",
    [
      { title: "EV Systems", topics: ["Powertrain", "BMS", "Motors", "Thermal Management"] },
      { title: "Design", topics: ["Chassis Integration", "Safety", "Testing", "Homologation"] },
      { title: "Industry", topics: ["OEM Trends", "Supply Chain", "Standards", "Future Tech"] },
    ],
    "/courses/hev.png"
  ),
  course(
    "robotics",
    "Robotics",
    "Industrial robotics, automation, and mechanical robot design.",
    [
      { title: "Robot Mechanics", topics: ["Arms", "End Effectors", "Kinematics", "Workspace"] },
      { title: "Automation", topics: ["PLCs", "Sensors", "Vision Systems", "Safety"] },
      { title: "Applications", topics: ["Manufacturing", "Welding", "Assembly", "Industry 4.0"] },
    ],
    "/courses/robotics.png"
  ),
  course(
    "drone-engineering",
    "Drone Engineering",
    "UAV design, flight dynamics, propulsion, and autonomous drone systems.",
    [
      { title: "Drone Design", topics: ["Airframe", "Propulsion", "Avionics", "Payload"] },
      { title: "Flight Control", topics: ["PID Tuning", "GPS Navigation", "Autopilot", "Telemetry"] },
      { title: "Applications", topics: ["Aerial Survey", "Delivery", "Regulations", "Projects"] },
    ],
    "/courses/drone-engineering.png"
  ),
  course(
    "ic-engine-design",
    "IC Engine Design",
    "Internal combustion engine thermodynamics, design, and performance analysis.",
    [
      { title: "Engine Theory", topics: ["Thermodynamic Cycles", "Combustion", "Fuel Systems", "Emissions"] },
      { title: "Design", topics: ["Piston/Cylinder", "Valvetrain", "Cooling", "Lubrication"] },
      { title: "Analysis", topics: ["Performance Maps", "Simulation", "Testing", "Modern Trends"] },
    ],
    "/courses/ic-engine-design.png"
  ),
  course(
    "aspen-hysys",
    "Aspen HYSYS",
    "Process simulation with Aspen HYSYS for chemical and petroleum engineering.",
    [
      { title: "HYSYS Basics", topics: ["Flowsheet", "Components", "Property Methods", "Streams"] },
      { title: "Unit Operations", topics: ["Separators", "Heat Exchangers", "Reactors", "Distillation"] },
      { title: "Simulation", topics: ["Case Studies", "Optimization", "Sensitivity", "Reporting"] },
    ],
    "/courses/aspen-hysys.png"
  ),
  course(
    "aspen-plus",
    "Aspen Plus",
    "Steady-state process modeling and simulation with Aspen Plus.",
    [
      { title: "Aspen Plus Setup", topics: ["Components", "Methods", "Flowsheet", "Convergence"] },
      { title: "Modeling", topics: ["Reactors", "Columns", "Heat Integration", "Utilities"] },
      { title: "Advanced", topics: ["Optimization", "Sensitivity Analysis", "Cost Estimation", "Projects"] },
    ],
    "/courses/aspen-plus.png"
  ),
  course(
    "petroleum-engineering",
    "Petroleum Engineering",
    "Reservoir engineering, drilling, production, and petroleum processing.",
    [
      { title: "Reservoir", topics: ["Rock Properties", "Fluid Properties", "Reserve Estimation", "Well Testing"] },
      { title: "Drilling & Production", topics: ["Drilling Operations", "Completion", "Artificial Lift", "Surface Facilities"] },
      { title: "Processing", topics: ["Separation", "Refining Basics", "Pipeline", "Safety"] },
    ],
    "/courses/petroleum-engineering.png"
  ),
];

export const civilCourses: Course[] = [
  course(
    "construction-planning",
    "Construction Planning",
    "Project scheduling, cost estimation, resource management, and site planning.",
    [
      { title: "Planning Basics", topics: ["WBS", "Gantt Charts", "CPM/PERT", "Milestones"] },
      { title: "Cost & Resources", topics: ["Estimation", "Budgeting", "Labor Planning", "Equipment"] },
      { title: "Site Management", topics: ["Safety", "Quality Control", "Contracts", "BIM Intro"] },
    ],
    "/courses/construction-planning.png"
  ),
];

export const managementCourses: Course[] = [
  course(
    "business-analytics",
    "Business Analytics",
    "BI tools, SQL, data visualization, and business intelligence dashboards.",
    [
      { title: "Analytics Foundations", topics: ["SQL", "Excel Advanced", "Statistics", "KPIs"] },
      { title: "Visualization", topics: ["Power BI", "Tableau Intro", "Dashboard Design", "Storytelling"] },
      { title: "Business Cases", topics: ["Sales", "Marketing", "Operations", "Forecasting"] },
    ],
    "/courses/business-analytics.png"
  ),
  course(
    "finance",
    "Finance",
    "Corporate finance, financial modeling, valuation, and investment analysis.",
    [
      { title: "Financial Statements", topics: ["Balance Sheet", "P&L", "Cash Flow", "Ratios"] },
      { title: "Modeling", topics: ["DCF", "Valuation", "Scenario Analysis", "Excel Models"] },
      { title: "Markets", topics: ["Equity", "Debt", "Portfolio Basics", "Risk Management"] },
    ],
    "/courses/finance.png"
  ),
  course(
    "digital-marketing",
    "Digital Marketing",
    "SEO, SEM, content marketing, social media, and analytics with GA4.",
    [
      { title: "Digital Strategy", topics: ["SEO", "SEM", "Content Marketing", "Social Media"] },
      { title: "Analytics", topics: ["GA4", "Conversion Tracking", "A/B Testing", "Reporting"] },
      { title: "Campaigns", topics: ["Google Ads", "Meta Ads", "Email Marketing", "Automation"] },
    ],
    "/courses/digital-marketing.png"
  ),
  course(
    "hr-management",
    "Human Resources (HR)",
    "Talent acquisition, L&D, payroll, compliance, and HR analytics.",
    [
      { title: "HR Core", topics: ["Recruitment", "Onboarding", "Performance", "Employee Relations"] },
      { title: "HR Operations", topics: ["Payroll", "Compliance", "Policies", "HRIS"] },
      { title: "HR Analytics", topics: ["Metrics", "Dashboards", "Workforce Planning", "Retention"] },
    ],
    "/courses/hr-management.png"
  ),
  course(
    "stock-marketing",
    "Stock Market",
    "Technical and fundamental analysis, options basics, and portfolio management.",
    [
      { title: "Market Basics", topics: ["Exchanges", "Order Types", "Indices", "Market Mechanics"] },
      { title: "Analysis", topics: ["Fundamental Analysis", "Technical Analysis", "Chart Patterns", "Indicators"] },
      { title: "Trading", topics: ["Options Intro", "Risk Management", "Portfolio", "Psychology"] },
    ],
    "/courses/stock-marketing.png"
  ),
  course(
    "supply-chain",
    "Supply Chain Management",
    "SCM planning, procurement, logistics, and inventory optimization.",
    [
      { title: "SCM Foundations", topics: ["Planning", "Procurement", "Inventory", "Logistics"] },
      { title: "Operations", topics: ["Demand Forecasting", "S&OP", "Lean", "Six Sigma Intro"] },
      { title: "Technology", topics: ["ERP", "WMS", "Analytics", "Global SCM"] },
    ],
    "/courses/supply-chain.png"
  ),
  course(
    "salesforce",
    "Salesforce",
    "Salesforce administration, automation, and custom app development.",
    [
      { title: "Admin Basics", topics: ["Objects", "Fields", "Relationships", "Security Model"] },
      { title: "Automation", topics: ["Flows", "Process Builder", "Validation Rules", "Reports"] },
      { title: "Development", topics: ["Apex Intro", "Lightning", "Integration", "AppExchange"] },
    ],
    "/courses/salesforce.png"
  ),
  course(
    "acca-f4-business",
    "ACCA F4 Business",
    "Business law and corporate governance for ACCA F4 certification preparation.",
    [
      { title: "Legal Framework", topics: ["Contract Law", "Agency", "Partnerships", "Companies Act"] },
      { title: "Corporate Governance", topics: ["Directors", "Shareholders", "Insolvency", "Ethics"] },
      { title: "Exam Prep", topics: ["Case Studies", "Past Papers", "Exam Technique", "Revision"] },
    ],
    "/courses/acca-f4-business.png"
  ),
  course(
    "entrepreneurship",
    "Entrepreneurship",
    "Startup ideation, business models, funding, and go-to-market strategy.",
    [
      { title: "Startup Basics", topics: ["Ideation", "Business Model Canvas", "MVP", "Validation"] },
      { title: "Growth", topics: ["Marketing", "Sales", "Operations", "Scaling"] },
      { title: "Funding", topics: ["Bootstrapping", "Angel/VC", "Pitch Deck", "Legal Basics"] },
    ],
    "/courses/entrepreneurship.png"
  ),
  course(
    "investment-banking",
    "Investment Banking",
    "M&A, capital markets, financial modeling, and deal structuring.",
    [
      { title: "IB Overview", topics: ["M&A", "IPO", "Debt Capital Markets", "Advisory"] },
      { title: "Modeling", topics: ["LBO Models", "Merger Models", "Comps", "DCF Valuation"] },
      { title: "Deal Process", topics: ["Due Diligence", "Pitch Books", "Presentations", "Career Prep"] },
    ],
    "/courses/investment-banking.png"
  ),
  course(
    "microsoft-excel",
    "Microsoft Excel",
    "Advanced Excel for business analysis, formulas, pivot tables, and automation.",
    [
      { title: "Advanced Formulas", topics: ["VLOOKUP/XLOOKUP", "INDEX-MATCH", "Array Formulas", "Logic Functions"] },
      { title: "Analysis", topics: ["Pivot Tables", "Charts", "What-If Analysis", "Power Query Intro"] },
      { title: "Automation", topics: ["Macros Intro", "VBA Basics", "Dashboards", "Data Cleaning"] },
    ],
    "/courses/microsoft-excel.png"
  ),
  course(
    "placement-preparation",
    "Placement Preparation",
    "Resume building, aptitude, mock interviews, and campus placement readiness.",
    [
      { title: "Aptitude", topics: ["Quantitative", "Logical Reasoning", "Verbal", "Data Interpretation"] },
      { title: "Technical Prep", topics: ["Coding Practice", "CS Fundamentals", "Projects", "GitHub"] },
      { title: "Interviews", topics: ["Resume", "HR Round", "Technical Mock", "Group Discussion"] },
    ],
    "/courses/placement-preparation.png"
  ),
  course(
    "power-bi",
    "Power BI",
    "Business intelligence dashboards, DAX, data modeling, and report publishing.",
    [
      { title: "Power BI Basics", topics: ["Data Import", "Transform", "Modeling", "Visualizations"] },
      { title: "DAX", topics: ["Calculated Columns", "Measures", "Time Intelligence", "Filter Context"] },
      { title: "Publishing", topics: ["Service", "Dashboards", "Row-Level Security", "Best Practices"] },
    ],
    "/courses/power-bi.png"
  ),
  course(
    "ai-for-economics",
    "AI for Economics",
    "Machine learning applications in econometrics, forecasting, and policy analysis.",
    [
      { title: "Economic Data", topics: ["Time Series", "Panel Data", "Causal Inference", "Feature Engineering"] },
      { title: "ML for Economics", topics: ["Forecasting", "Classification", "NLP for Text Data", "Causal ML"] },
      { title: "Applications", topics: ["Policy Analysis", "Market Prediction", "Risk Modeling", "Projects"] },
    ],
    "/courses/ai-for-economics.png"
  ),
  course(
    "product-management",
    "Product Management",
    "Product strategy, roadmaps, user research, and agile product delivery.",
    [
      { title: "Product Strategy", topics: ["Vision", "Roadmaps", "Prioritization", "OKRs"] },
      { title: "Discovery", topics: ["User Research", "Personas", "Prototyping", "Validation"] },
      { title: "Delivery", topics: ["Agile/Scrum", "Metrics", "Launch", "Stakeholder Management"] },
    ],
    "/courses/product-management.png"
  ),
];

export const bioCourses: Course[] = [
  course(
    "bioinformatics",
    "Bioinformatics",
    "Sequence analysis, BLAST, genomics pipelines, and computational biology.",
    [
      { title: "Bioinfo Core", topics: ["Sequences", "Alignment", "Databases", "BLAST"] },
      { title: "Genomics", topics: ["NGS", "Variant Analysis", "Pipelines", "Visualization"] },
      { title: "Programming", topics: ["Python/R", "Biopython", "Statistics", "Projects"] },
    ],
    "/courses/bioinformatics.png"
  ),
  course(
    "microbiology",
    "Microbiology",
    "Microbial techniques, culturing, microscopy, and laboratory applications.",
    [
      { title: "Microbiology Basics", topics: ["Cell Structure", "Classification", "Growth", "Metabolism"] },
      { title: "Lab Techniques", topics: ["Culturing", "Staining", "Microscopy", "Identification"] },
      { title: "Applications", topics: ["Food Micro", "Medical Micro", "Environmental", "Industry"] },
    ],
    "/courses/microbiology.png"
  ),
  course(
    "molecular-biology",
    "Molecular Biology",
    "DNA/RNA techniques, PCR, cloning, and gene expression analysis.",
    [
      { title: "Molecular Techniques", topics: ["DNA Extraction", "PCR", "Gel Electrophoresis", "Cloning"] },
      { title: "Gene Expression", topics: ["RT-PCR", "Western Blot", "Sequencing", "CRISPR Intro"] },
      { title: "Applications", topics: ["Diagnostics", "Research", "Biotech", "Lab Safety"] },
    ],
    "/courses/molecular-biology.png"
  ),
  course(
    "medical-coding",
    "Medical Coding",
    "ICD-10, CPT coding, medical terminology, and HIPAA compliance.",
    [
      { title: "Medical Terminology", topics: ["Anatomy", "Procedures", "Abbreviations", "Documentation"] },
      { title: "Coding Systems", topics: ["ICD-10", "CPT", "HCPCS", "Modifiers"] },
      { title: "Compliance", topics: ["HIPAA", "Auditing", "Revenue Cycle", "Career Prep"] },
    ],
    "/courses/medical-coding.png"
  ),
  course(
    "nano-tech",
    "Nanotechnology",
    "Nanomaterials, fabrication techniques, and nanotech applications.",
    [
      { title: "Nano Science", topics: ["Scale Effects", "Nanomaterials", "Characterization", "Synthesis"] },
      { title: "Fabrication", topics: ["Top-down", "Bottom-up", "Lithography", "Self-assembly"] },
      { title: "Applications", topics: ["Medicine", "Electronics", "Energy", "Environment"] },
    ],
    "/courses/nano-tech.png"
  ),
  course(
    "genetic-engineering",
    "Genetic Engineering",
    "Gene editing, vectors, CRISPR, and recombinant DNA technology.",
    [
      { title: "Genetics", topics: ["DNA/RNA", "Gene Expression", "Vectors", "Transformation"] },
      { title: "Editing", topics: ["CRISPR-Cas9", "TALENs", "Delivery Methods", "Validation"] },
      { title: "Applications", topics: ["Agriculture", "Medicine", "Biopharma", "Ethics"] },
    ],
    "/courses/genetic-engineering.png"
  ),
  course(
    "biostatistics",
    "Biostatistics",
    "Statistical methods for clinical trials, epidemiology, and biomedical research.",
    [
      { title: "Biostat Foundations", topics: ["Descriptive Stats", "Probability", "Distributions", "Hypothesis Testing"] },
      { title: "Clinical Stats", topics: ["Study Design", "Sample Size", "Survival Analysis", "Meta-analysis Intro"] },
      { title: "Software", topics: ["R/SAS", "SPSS", "Data Visualization", "Reporting"] },
    ],
    "/courses/biostatistics.png"
  ),
  course(
    "clinical-sas",
    "Clinical SAS",
    "SAS programming for clinical trial data management and CDISC standards.",
    [
      { title: "Clinical Data", topics: ["CDISC", "SDTM", "ADaM", "TLFs"] },
      { title: "SAS for Clinical", topics: ["Data Step", "PROC SQL", "Reporting", "Validation"] },
      { title: "Regulatory", topics: ["FDA Submissions", "QC", "Documentation", "Career Path"] },
    ],
    "/courses/clinical-sas.png"
  ),
  course(
    "pharmacovigilance",
    "Pharmacovigilance",
    "Drug safety monitoring, adverse event reporting, and regulatory compliance.",
    [
      { title: "PV Basics", topics: ["Adverse Events", "Case Processing", "MedDRA", "Regulations"] },
      { title: "Reporting", topics: ["ICSR", "PSUR/PBRER", "Signal Detection", "Risk Management"] },
      { title: "Career", topics: ["Global Guidelines", "Database Tools", "Audit", "Industry Roles"] },
    ],
    "/courses/pharmacovigilance.png"
  ),
  course(
    "psychology",
    "Psychology",
    "Foundations of psychology, behavioral science, and mental health awareness.",
    [
      { title: "Psychology Core", topics: ["Cognitive", "Developmental", "Social", "Personality"] },
      { title: "Applied", topics: ["Counseling Basics", "Health Psychology", "Organizational", "Research Methods"] },
      { title: "Careers", topics: ["Clinical Path", "HR Applications", "Education", "Ethics"] },
    ],
    "/courses/psychology.png"
  ),
];

export const foodTechCourses: Course[] = [
  course(
    "food-science",
    "Food Science and Technology",
    "Food chemistry, processing, preservation, and safety standards.",
    [
      { title: "Food Chemistry", topics: ["Macronutrients", "Food Additives", "Reactions", "Analysis"] },
      { title: "Processing", topics: ["Thermal Processing", "Packaging", "Preservation", "Quality Control"] },
      { title: "Safety", topics: ["HACCP", "Microbiology", "Regulations", "Shelf Life"] },
    ],
    "/courses/food-science.png"
  ),
  course(
    "sensory-science",
    "Sensory Science",
    "Sensory evaluation methods, consumer testing, and quality assurance.",
    [
      { title: "Sensory Methods", topics: ["Discrimination Tests", "Descriptive Analysis", "Acceptance Testing", "Panels"] },
      { title: "Statistics", topics: ["ANOVA", "Preference Mapping", "Panel Training", "Reporting"] },
      { title: "Applications", topics: ["Product Development", "QA", "Flavor Chemistry", "Industry Cases"] },
    ],
    "/courses/sensory-science.png"
  ),
];

export const futureSkillsSchoolCourses: Course[] = [
  {
    slug: "cpp-programming-foundations",
    title: "C++ Programming Foundations",
    summary:
      "C++ shows students how computers really work underneath: memory, logic and structure. Build high-performance problem-solving habits that carry into any language.",
    curriculum: [
      {
        title: "1. Getting Started",
        topics: [
          "What programming is",
          "Compiler and IDE setup",
          "Program structure & syntax",
          "Compiling and running a first program",
        ],
      },
      {
        title: "2. Variables & Data",
        topics: [
          "Data types and constants",
          "Input/output with cin and cout",
          "Arithmetic, assignment and logical operators",
          "Hands-on: Build a simple calculator or unit converter",
        ],
      },
      {
        title: "3. Decision Making",
        topics: [
          "if, else-if, else conditions",
          "Nested conditions & switch statements",
          "Decision-based problem solving",
          "Hands-on: Create a grade or menu-based quiz",
        ],
      },
      {
        title: "4. Loops & Logic",
        topics: [
          "while, do-while, and for loops",
          "break and continue control flows",
          "Nested loops & pattern logic",
          "Hands-on: Number games and star patterns",
        ],
      },
      {
        title: "5. Functions",
        topics: [
          "Declaration and definition",
          "Parameters and return values",
          "Pass by value vs reference",
          "Hands-on: Split calculator into modular functions",
        ],
      },
      {
        title: "6. Arrays & Strings",
        topics: [
          "1D and 2D arrays & iteration",
          "C-style strings and std::string",
          "Basic string handling & traversal",
          "Hands-on: Marks analyser & word counter",
        ],
      },
      {
        title: "7. Memory Concepts",
        topics: [
          "Addresses & pointers in C++",
          "Dereferencing and references",
          "Stack vs heap & dynamic arrays",
          "Hands-on: Trace memory using visual diagrams",
        ],
      },
      {
        title: "8. Object-Oriented Programming",
        topics: [
          "Classes and objects",
          "Access specifiers & encapsulation",
          "Constructors and destructors",
          "Hands-on: Model a Student or Book class",
        ],
      },
      {
        title: "9. Inheritance & Polymorphism",
        topics: [
          "Base and derived classes",
          "Overriding and overloading",
          "Virtual functions & abstract classes",
          "Hands-on: Extend into Student and Teacher classes",
        ],
      },
      {
        title: "10. Practical C++ & Capstone",
        topics: [
          "File reading and writing (fstream)",
          "Exception handling (try, catch, throw)",
          "Vectors, maps, pairs, sort and find",
          "Capstone: Console app (quiz, library or records)",
        ],
      },
    ],
    certificates: [
      { name: "Nyeras Future Skills School Certificate" },
      { name: "Console Software Capstone Certificate" },
    ],
    image: "/courses/cpp-foundations.png",
    category: "Future Skills School Program",
    duration: "6–8 Weeks",
  },
  {
    slug: "java-full-stack-foundations",
    title: "Java & Full-Stack Foundations",
    summary:
      "Follow the path from code to a working application: Java fundamentals, then how the web, interfaces, APIs and data fit together end-to-end.",
    curriculum: [
      {
        title: "1. Software & Full-Stack Landscape",
        topics: [
          "What software products are",
          "Frontend, backend and database roles",
          "How a web application is structured",
          "Hands-on: Map popular apps into frontend/backend/data",
        ],
      },
      {
        title: "2. Java Fundamentals",
        topics: [
          "Program structure & JVM execution",
          "Variables, data types & operators",
          "Input/output, conditions & loops",
          "Hands-on: Write a number checker and calculator",
        ],
      },
      {
        title: "3. Object-Oriented Java",
        topics: [
          "Classes and objects",
          "Encapsulation and constructors",
          "Inheritance and polymorphism",
          "Hands-on: Model a Student or Library class",
        ],
      },
      {
        title: "4. Collections & Practical Programming",
        topics: [
          "Structured data & Java collections",
          "Reusable modular code",
          "Debugging and error handling",
          "Hands-on: Store and search list of records",
        ],
      },
      {
        title: "5. Web Foundations",
        topics: [
          "How websites and web apps work",
          "HTML semantic document structure",
          "CSS layout and modern styling",
          "Hands-on: Build a personal profile page",
        ],
      },
      {
        title: "6. Frontend Thinking",
        topics: [
          "Pages, components and forms",
          "User interaction and interface logic",
          "Client-side events & DOM basics",
          "Hands-on: Add a working form with field validation",
        ],
      },
      {
        title: "7. Backend & APIs (Intro)",
        topics: [
          "Backend responsibilities & servers",
          "HTTP request and response lifecycle",
          "API fundamentals & data serialization",
          "Hands-on: Follow request from browser to server",
        ],
      },
      {
        title: "8. Data & Applications",
        topics: [
          "Why applications require persistent data",
          "Basic database concepts and tables",
          "Storing and retrieving information",
          "Hands-on: Design data tables for a small app",
        ],
      },
      {
        title: "9. Development Practices",
        topics: [
          "Project organisation & directory structure",
          "Version-control concepts & Git",
          "Testing mindset and bug prevention",
          "Responsible AI-assisted development",
        ],
      },
      {
        title: "10. Project & Presentation",
        topics: [
          "Plan, build and test a small application",
          "Connecting code, interface and database",
          "Presentation skills & project walkthrough",
          "Capstone: Full working application demo day",
        ],
      },
    ],
    certificates: [
      { name: "Nyeras Future Skills School Certificate" },
      { name: "Web & Full-Stack Capstone Certificate" },
    ],
    image: "/courses/java-fullstack.png",
    category: "Future Skills School Program",
    duration: "6–8 Weeks",
  },
  {
    slug: "ai-machine-learning-foundations",
    title: "AI & Machine Learning Foundations",
    summary:
      "Understand how AI systems solve problems and learn from data, from search and heuristics to neural networks, evaluation metrics, and responsible AI ethics.",
    curriculum: [
      {
        title: "1. What is AI?",
        topics: [
          "Definitions, goals and real-world applications",
          "Problem-solving agents & perception",
          "Search, planning and learning concepts",
          "Hands-on: Spot and critique AI in everyday apps",
        ],
      },
      {
        title: "2. How AI Solves Problems",
        topics: [
          "State spaces, actions, goals and paths",
          "Intuitive BFS and DFS search",
          "Informed search and heuristics",
          "Hands-on: Solve a maze or puzzle using search ideas",
        ],
      },
      {
        title: "3. From Search to Learning",
        topics: [
          "Why learning from data helps",
          "Supervised learning intuition",
          "Unsupervised & reinforcement learning concepts",
          "Hands-on: Sort real examples into three types",
        ],
      },
      {
        title: "4. Data & Machine Learning",
        topics: [
          "Features and target variables",
          "Training, validation and test splits",
          "Missing values, normalisation & encoding",
          "Hands-on: Clean and format a small dataset",
        ],
      },
      {
        title: "5. Exploring Data",
        topics: [
          "Visualising datasets and distributions",
          "Spotting patterns and correlations",
          "Introductory analytical summaries",
          "Hands-on: Chart a dataset and note 3 findings",
        ],
      },
      {
        title: "6. Prediction & Classification",
        topics: [
          "Regression and classification distinctions",
          "Decision boundaries in data",
          "Decision trees & practical examples",
          "Hands-on: Build a simple decision tree model",
        ],
      },
      {
        title: "7. Model Evaluation",
        topics: [
          "Accuracy, precision, recall, and F1-score",
          "Overfitting versus underfitting",
          "Why rigorous evaluation matters",
          "Hands-on: Evaluate a spam-filter prediction model",
        ],
      },
      {
        title: "8. Neural Networks",
        topics: [
          "Artificial neurons and layers",
          "Activation functions (ReLU, Sigmoid)",
          "Forward propagation overview",
          "Hands-on: Trace values through a tiny network",
        ],
      },
      {
        title: "9. AI in Real Life",
        topics: [
          "Recommendation algorithms and search engines",
          "Fraud detection and financial security",
          "Robotics and logistics optimization",
          "Hands-on: Case study discussion on modern deployments",
        ],
      },
      {
        title: "10. Responsible AI",
        topics: [
          "Data and algorithmic bias",
          "Fairness, accountability and transparency",
          "Human impact and safety boundaries",
          "Debate: Where should humans stay in charge?",
        ],
      },
      {
        title: "11. Guided AI/ML Project",
        topics: [
          "Choose a real problem and identify data",
          "Build a simple model or interactive prototype",
          "Evaluate performance and prepare slides",
          "Capstone: Guided AI/ML project showcase",
        ],
      },
    ],
    certificates: [
      { name: "Nyeras Future Skills School Certificate" },
      { name: "AI & Machine Learning Capstone Certificate" },
    ],
    image: "/courses/artificial-intelligence.png",
    category: "Future Skills School Program",
    duration: "6–8 Weeks",
  },
  {
    slug: "ai-in-economics-data-thinking",
    title: "AI in Economics & Data Thinking",
    summary:
      "Students learn to ask economic questions and answer them with data and clear reasoning: separating observations from assumptions, reading trends, and telling correlation from causation.",
    curriculum: [
      {
        title: "1. AI & Economic Problems",
        topics: [
          "How AI can support decision-making",
          "Problem formulation in economics",
          "Examples of quantitative economic dilemmas",
          "Hands-on: Turn a news headline into a testable question",
        ],
      },
      {
        title: "2. Data as Evidence",
        topics: [
          "Types of economic data (macro and micro)",
          "Patterns and trends over time",
          "Separating factual observations from assumptions",
          "Hands-on: Read a chart: fact vs assumption",
        ],
      },
      {
        title: "3. Decisions Under Uncertainty",
        topics: [
          "Information asymmetry in markets",
          "Uncertainty and probability in choices",
          "How decisions change with new data",
          "Hands-on: Decision game with new information",
        ],
      },
      {
        title: "4. Time-Series Thinking",
        topics: [
          "Time-series data fundamentals",
          "Trends, seasonality, and decomposition",
          "Introduction to economic forecasting",
          "Hands-on: Plot a time-series and spot its trend",
        ],
      },
      {
        title: "5. Correlation vs Causation",
        topics: [
          "Why correlation does not imply causation",
          "Confounding variables & misleading signals",
          "Practical reasoning exercises",
          "Hands-on: Find and deconstruct misleading correlations",
        ],
      },
      {
        title: "6. Markets & Consumer Behaviour",
        topics: [
          "Consumer and producer decisions",
          "Pricing dynamics and elasticity",
          "Competition and market structures",
          "Hands-on: Mock market: price a product",
        ],
      },
      {
        title: "7. AI Applications in Economics",
        topics: [
          "Nowcasting economic indicators",
          "Search-based indicators and sentiment",
          "Uncertainty signals and high-frequency data",
          "Hands-on: Explore how search trends reflect demand",
        ],
      },
      {
        title: "8. Capstone Project & Presentation",
        topics: [
          "Investigate a real-world economic question",
          "Use suitable public data and verify facts",
          "Explain evidence and present conclusions",
          "Capstone: Data-driven presentation on a real-world question",
        ],
      },
    ],
    certificates: [
      { name: "Nyeras Future Skills School Certificate" },
      { name: "Data Thinking & Economics Capstone Certificate" },
    ],
    image: "/courses/ai-for-economics.png",
    category: "Future Skills School Program",
    duration: "4–6 Weeks",
  },
  {
    slug: "finance-foundations",
    title: "Finance & Financial Literacy",
    summary:
      "Build lifelong financial confidence and smart money habits. Learn how money works, personal budgeting, banking systems, compound growth, financial statements, and managing risk in everyday life.",
    curriculum: [
      {
        title: "1. Understanding Money & Personal Finance",
        topics: [
          "What finance is & its role in business and everyday life",
          "Tracking daily cash flows and distinguishing needs vs. wants",
          "Setting realistic financial goals (short-term vs. long-term)",
          "Hands-on: Build an interactive personal monthly budget",
        ],
      },
      {
        title: "2. Banking Systems & Digital Payments",
        topics: [
          "Savings vs. current accounts, interest rates and banking ops",
          "Digital payments architecture: UPI, cards & payment gateways",
          "Digital banking security, two-factor authentication & scam defense",
          "Hands-on: Trace an end-to-end digital transaction lifecycle",
        ],
      },
      {
        title: "3. The Power of Compounding & Inflation",
        topics: [
          "Simple interest vs. compound interest calculations",
          "The Rule of 72 and exponential wealth growth",
          "Understanding inflation, purchasing power, and real returns",
          "Hands-on: Model a 10-year savings growth vs. inflation simulation",
        ],
      },
      {
        title: "4. Saving vs. Investing & Asset Classes",
        topics: [
          "Why saving alone is not enough: the case for investing",
          "Overview of fixed income, recurring deposits, gold, and debt funds",
          "Emergency funds, liquidity requirements, and asset allocation basics",
          "Hands-on: Design a personalized emergency fund strategy",
        ],
      },
      {
        title: "5. Understanding Business & Corporate Financials",
        topics: [
          "How companies earn revenue, incur expenses, and generate profit",
          "Gross margin, operating margin, and net profit margins",
          "Working capital and cash cycle fundamentals",
          "Hands-on: Analyze a simplified corporate income statement",
        ],
      },
      {
        title: "6. Financial Statements Demystified",
        topics: [
          "The Balance Sheet: Assets, liabilities, and owner's equity",
          "The Profit & Loss statement breakdown",
          "Cash Flow statement: Operating, investing, and financing cash flows",
          "Hands-on: Reconstruct a mini balance sheet from financial transactions",
        ],
      },
      {
        title: "7. Financial Risk Management & Insurance",
        topics: [
          "Types of financial risk: market, liquidity, credit, and health",
          "Risk transfer mechanisms: Life, health, and general insurance",
          "Balancing risk tolerance with life-stage financial priorities",
          "Hands-on: Run a family financial risk & insurance scenario analysis",
        ],
      },
      {
        title: "8. Taxation Basics & Public Budgets",
        topics: [
          "Direct taxes (Income tax slabs) vs. indirect taxes (GST fundamentals)",
          "Tax planning vs. tax evasion, ethics, and civic responsibility",
          "How governments collect taxes and allocate the Union Budget",
          "Hands-on: Break down a public budget allocation case study",
        ],
      },
      {
        title: "9. FinTech & The Future of Money",
        topics: [
          "Neo-banks, automated micro-investing, and digital lending",
          "Credit bureaus, credit scores (CIBIL), and responsible borrowing",
          "Safeguarding identity and avoiding deceptive debt/loan apps",
          "Hands-on: Compare modern digital financial tools & security models",
        ],
      },
      {
        title: "10. Financial Literacy Capstone",
        topics: [
          "Synthesizing budget, savings, insurance, and long-term goals",
          "Designing a comprehensive 5-year personal financial blueprint",
          "Defending financial choices and risk allocations on demo day",
          "Capstone: Comprehensive Personal Finance & Budgeting Blueprint",
        ],
      },
    ],
    certificates: [
      { name: "Nyeras Future Skills School Certificate" },
      { name: "Personal Finance & Financial Literacy Capstone Certificate" },
    ],
    image: "/courses/finance.png",
    category: "Future Skills School Program",
    duration: "4–6 Weeks",
  },
  {
    slug: "stock-market-awareness",
    title: "Stock Market Awareness",
    summary:
      "A structured, non-speculative introduction to how equity markets function. Learn how companies raise public capital, how stock exchanges operate, how to read charts and company fundamentals, and how SEBI protects investors.",
    curriculum: [
      {
        title: "1. Introduction to Capital Markets & Equity",
        topics: [
          "Why businesses need capital: debt vs. equity funding",
          "Public vs. private companies and share ownership fundamentals",
          "The economic role of stock markets in national wealth creation",
          "Hands-on: Map out how a growing private enterprise goes public",
        ],
      },
      {
        title: "2. Primary Markets & Initial Public Offerings (IPO)",
        topics: [
          "What is an IPO and reasons companies list on public exchanges",
          "The IPO journey: Draft Red Herring Prospectus (DRHP) to listing day",
          "Retail investor quotas, price bands, and allotment mechanics",
          "Hands-on: Review and extract key insights from a real IPO prospectus",
        ],
      },
      {
        title: "3. Secondary Markets & Stock Exchanges",
        topics: [
          "How stock exchanges operate: National Stock Exchange (NSE) & BSE",
          "Market participants: Retail investors, institutional investors (DII/FII), brokers",
          "Order types: Market orders, limit orders, stop-loss orders & matching engines",
          "Hands-on: Simulate placing market vs. limit orders in a sandbox environment",
        ],
      },
      {
        title: "4. Market Indices & Sector Classification",
        topics: [
          "Understanding headline benchmark indices: Nifty 50 and Sensex",
          "Free-float market capitalization and index weighting methodology",
          "Major economic sectors: IT, Banking, Auto, Pharma, Energy, FMCG",
          "Hands-on: Track and benchmark sectoral performance across trading weeks",
        ],
      },
      {
        title: "5. Fundamental Analysis Essentials",
        topics: [
          "Evaluating business models, competitive moats, and industry tailwinds",
          "Core valuation ratios: P/E, P/B, EPS, ROE, ROCE & Debt-to-Equity",
          "Reading quarterly earnings releases and management commentaries",
          "Hands-on: Perform a comparative fundamental analysis of two rival companies",
        ],
      },
      {
        title: "6. Technical Analysis & Reading Charts",
        topics: [
          "Price action fundamentals: Line, bar, and Japanese candlestick charts",
          "Identifying market trends, support & resistance levels",
          "Key technical indicators: Simple & Exponential Moving Averages, RSI, Volume",
          "Hands-on: Identify support, resistance, and trend reversals on historical charts",
        ],
      },
      {
        title: "7. Mutual Funds, ETFs & Index Investing",
        topics: [
          "Active mutual funds vs. passive index funds and Exchange Traded Funds (ETFs)",
          "Systematic Investment Plans (SIP) and rupee-cost averaging",
          "Long-term wealth creation vs. short-term speculation traps",
          "Hands-on: Construct an illustrative diversified index and ETF portfolio",
        ],
      },
      {
        title: "8. Behavioral Finance & Risk Management",
        topics: [
          "Psychological biases: FOMO, loss aversion, overconfidence, panic selling",
          "The dangers of unregulated 'trading tips', social media influencers & intraday leverage",
          "Position sizing, portfolio diversification, and risk containment rules",
          "Hands-on: Deconstruct historical market bubbles and panic crashes",
        ],
      },
      {
        title: "9. SEBI Regulations, Ethics & Investor Protection",
        topics: [
          "Regulatory framework and enforcement mandate of SEBI",
          "Combating insider trading, front-running, and market manipulation",
          "Investor rights, disclosure rules, and the SCORES grievance mechanism",
          "Case study: Landmark regulatory enforcement cases protecting public wealth",
        ],
      },
      {
        title: "10. Market Research & Virtual Portfolio Capstone",
        topics: [
          "Formulating an evidence-backed market research thesis",
          "Constructing a simulated virtual portfolio with fundamental rationale",
          "Measuring risk metrics, explaining portfolio decisions, and presentation",
          "Capstone: Virtual Portfolio Showcase & Equity Research Presentation",
        ],
      },
    ],
    certificates: [
      { name: "Nyeras Future Skills School Certificate" },
      { name: "Stock Market & Equity Awareness Capstone Certificate" },
    ],
    image: "/courses/stock-marketing.png",
    category: "Future Skills School Program",
    duration: "4–6 Weeks",
  },
  {
    slug: "chemistry-curriculum",
    title: "Chemistry Curriculum",
    summary:
      "A comprehensive, Cambridge and board-aligned chemistry foundation covering kinetic particle theory, atomic structure, chemical bonding, stoichiometry, and practical experimental techniques for Classes 9–12.",
    curriculum: [
      {
        title: "Module 1: States of Matter & Kinetic Particle Theory",
        topics: [
          "Arrangement, motion, and spacing of particles in solids, liquids, and gases",
          "Changes of state (melting, boiling, freezing, condensation, sublimation)",
          "Heating and cooling curves and energy changes during phase transitions",
          "Evidence for particle motion: Brownian motion and fluid dynamics",
          "Influence of temperature and pressure on gas volume and pressure",
        ],
      },
      {
        title: "Module 2: Diffusion and Particle Dynamics",
        topics: [
          "Fundamentals of diffusion in liquids and gases",
          "Factors affecting the rate of diffusion: concentration gradients and temperature",
          "Relationship between molecular mass (Mr) and diffusion rate (Graham's Law concept)",
          "Experimental demonstrations of diffusion (e.g., NH3(g) and HCl(g) tube experiment)",
          "Cambridge past-paper questions: Kinetic theory and diffusion scenarios",
        ],
      },
      {
        title: "Module 3: Basic Experimental & Separation Techniques",
        topics: [
          "Laboratory apparatus for measuring mass, time, temperature, and volume",
          "Criteria of purity: melting and boiling point determination",
          "Separation of insoluble solids from liquids: filtration and decanting",
          "Crystallization: producing pure crystals from saturated solutions",
          "Paper chromatography: principles, Rf value calculation, and locating agents",
        ],
      },
      {
        title: "Module 4: Distillation and Complex Mixtures",
        topics: [
          "Simple distillation: apparatus setup, principles, and solvent recovery",
          "Fractional distillation: fractionating columns, boiling point gradients, and industrial relevance",
          "Separation of miscible vs. immiscible liquids (using separating funnels)",
          "Selecting appropriate purification strategies for multi-component mixtures",
          "Common experimental errors, safety precautions, and past-paper troubleshooting",
        ],
      },
      {
        title: "Module 5: Atomic Structure & Subatomic Particles",
        topics: [
          "Protons, neutrons, and electrons: relative masses, charges, and positions",
          "Defining atomic number (Z) and mass / nucleon number (A)",
          "Isotopes: definition, characteristics, and chemical vs. physical properties",
          "Calculating relative atomic mass (Ar) from isotopic abundances",
          "Historical development of atomic models and notation representations",
        ],
      },
      {
        title: "Module 6: Electronic Configuration & Periodic Classification",
        topics: [
          "Rules of electron distribution across shells (2, 8, 8 model)",
          "Drawing electronic configuration diagrams for elements 1 to 20",
          "Correlation between valence electrons and Periodic Table group number",
          "Correlation between occupied electron shells and period number",
          "Noble gas configurations and the structural driving force for stability",
        ],
      },
      {
        title: "Module 7: Ionic Bonding & Ion Formation",
        topics: [
          "Formation of positive ions (cations) via electron loss",
          "Formation of negative ions (anions) via electron gain",
          "Electrostatic attractions in ionic bonds",
          "Dot-and-cross diagrams for Group I/II metals with Group VI/VII non-metals",
          "Determining empirical formulas of ionic compounds from ionic charges",
        ],
      },
      {
        title: "Module 8: Giant Ionic Lattices & Properties",
        topics: [
          "Three-dimensional giant ionic lattice structure (e.g., NaCl)",
          "High melting and boiling points explained by strong electrostatic forces",
          "Electrical conductivity: comparison between solid, molten, and aqueous states",
          "Solubility of ionic compounds in polar and non-polar solvents",
          "Mechanical properties of ionic crystals (brittleness and cleavage planes)",
        ],
      },
      {
        title: "Module 9: Covalent Bonding & Simple Molecular Substances",
        topics: [
          "Electron sharing between non-metallic elements",
          "Single, double, and triple covalent bonds",
          "Dot-and-cross diagrams for simple molecules (H2, Cl2, H2O, CH4, NH3, O2, CO2, N2)",
          "Intramolecular covalent bonds versus weak intermolecular forces",
          "Volatility, low melting/boiling points, and electrical conductivity of molecular compounds",
        ],
      },
      {
        title: "Module 10: Giant Covalent Structures & Allotropes of Carbon",
        topics: [
          "Definition and characteristics of macromolecules",
          "Diamond: tetrahedral structure, extreme hardness, and lack of electrical conductivity",
          "Graphite: hexagonal layered structure, weak van der Waals forces, and lubricity",
          "Delocalized electrons in graphite and its electrical conductivity",
          "Modern allotropes overview: graphene, carbon nanotubes, and fullerenes",
        ],
      },
      {
        title: "Module 11: Silicon, Silicon Dioxide & Structural Comparisons",
        topics: [
          "Crystalline structure of silicon and silicon dioxide (silica / quartz)",
          "Comparing silicon dioxide (SiO2) with carbon dioxide (CO2)",
          "Physical properties of silica: melting point, hardness, and thermal resistance",
          "Industrial applications of quartz and refractory materials",
          "Comprehensive comparison table: Giant ionic vs. Simple molecular vs. Giant covalent",
        ],
      },
      {
        title: "Module 12: Metallic Bonding & Properties of Pure Metals",
        topics: [
          "Lattice structure of metals: positive ions in a 'sea of delocalized electrons'",
          "Electrostatic forces holding metallic lattices together",
          "Explaining high electrical and thermal conductivity in metals",
          "Explaining malleability and ductility using shifting particle layers",
          "Variations in melting points and densities across transition and main-group metals",
        ],
      },
      {
        title: "Module 13: Alloys & Material Engineering",
        topics: [
          "Definition and composition of alloys (e.g., brass, bronze, steel, stainless steel)",
          "Structural explanation for alloy hardness: disrupted lattice layers preventing sliding",
          "Resistance of alloys to corrosion and oxidation",
          "Practical and industrial applications of specialized alloys",
          "Interpreting past-paper experimental data on metallic properties and material choices",
        ],
      },
      {
        title: "Module 14: Chemical Nomenclature, Formulas & Valency",
        topics: [
          "Writing chemical formulas using valency and oxidation states",
          "Polyatomic ions: sulfate (SO4²⁻), nitrate (NO3⁻), carbonate (CO3²⁻), hydroxide (OH⁻), ammonium (NH4⁺)",
          "Naming conventions: Roman numerals in transition metal compounds",
          "Constructing formulas for binary and ternary compounds",
          "Working with state symbols: (s), (l), (g), and (aq)",
        ],
      },
      {
        title: "Module 15: Chemical Equations & Stoichiometric Principles",
        topics: [
          "Law of Conservation of Mass in chemical reactions",
          "Step-by-step techniques for balancing chemical equations",
          "Deriving and balancing net ionic equations with spectator ions removed",
          "Writing half-equations for electron transfer processes",
          "Cambridge exam question walkthroughs on equation balancing",
        ],
      },
      {
        title: "Module 16: Properties & Theories of Acids and Bases",
        topics: [
          "Defining acids and bases (Arrhenius model vs. Brønsted-Lowry proton donor/acceptor)",
          "Characteristic reactions of acids with metals, carbonates, and bases",
          "Strong versus weak acids: complete vs. partial dissociation in water",
          "Concentrated versus dilute acids: distinction between concentration and strength",
          "Role of water in displaying acidic and basic properties",
        ],
      },
      {
        title: "Module 17: The pH Scale & Chemical Indicators",
        topics: [
          "The pH scale (0 to 14): acidic, neutral, and alkaline definitions",
          "Universal indicator and colorimetric pH measurement",
          "Litmus, phenolphthalein, and methyl orange: color changes in acidic/alkaline media",
          "Neutralization reactions and the formation of water (H⁺ + OH⁻ → H2O)",
          "Controlling soil and water acidity using lime, slaked lime, and calcium carbonate",
        ],
      },
      {
        title: "Module 18: Classification of Oxides",
        topics: [
          "Acidic oxides: non-metal oxides and reactions with bases",
          "Basic oxides: metallic oxides and reactions with acids",
          "Amphoteric oxides: behavior with both acids and bases (e.g., Al2O3, ZnO)",
          "Neutral oxides: non-metal oxides that do not react with acids or bases (e.g., CO, NO)",
          "Experimental procedures to identify the nature of an unknown oxide",
        ],
      },
      {
        title: "Module 19: Preparation of Soluble and Insoluble Salts",
        topics: [
          "General solubility rules for common salts (nitrates, sulfates, halides, carbonates)",
          "Method 1: Preparing soluble salts using acid and excess insoluble base/metal/carbonate",
          "Method 2: Preparing soluble salts via titration (acid + alkali)",
          "Method 3: Preparing insoluble salts via precipitation reactions",
          "Post-synthesis techniques: filtering, washing, and drying salt crystals",
        ],
      },
      {
        title: "Module 20: Volumetric Analysis & Titration Calculations",
        topics: [
          "Standard laboratory setup for acid-base titrations (burette, pipette, conical flask)",
          "Reading meniscus levels and recording concordant results (± 0.1 cm³)",
          "Basic concentration calculations (mol/dm³ and g/dm³)",
          "Determining unknown acid/base concentrations from titration data",
          "Structured review: Past-paper question styles, common calculation pitfalls, and exam tips",
        ],
      },
    ],
    certificates: [
      { name: "Nyeras Future Skills School Certificate" },
      { name: "Cambridge-Aligned Chemistry & Laboratory Mastery Certificate" },
    ],
    image: "/courses/chemistry-curriculum.png",
    category: "Future Skills School Program",
    duration: "8–10 Weeks",
  },
];

