"use client"

import { motion } from "framer-motion";
import { departmentCategories } from "../data";
import Topbar from "../../components/Topbar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PremiumCourseCard from "../../components/PremiumCourseCard";
import { BookOpen, Cpu, Cog, TrendingUp, Microscope, Palette, Sparkles } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "cse-it": <Cpu className="w-10 h-10" />,
  "ece": <Cog className="w-10 h-10" />,
  "mech-civil": <TrendingUp className="w-10 h-10" />,
  "mgmt-commerce": <BookOpen className="w-10 h-10" />,
  "bio-food": <Microscope className="w-10 h-10" />,
  "future-skills-school": <Sparkles className="w-10 h-10" />,
};

const departmentTopics: Record<string, string[]> = {
  "cse-it": [
    "Full Stack MERN Development",
    "Python & Modern C++ Architectures",
    "Cloud Computing (AWS / Azure)",
    "Agentic AI & Generative Models",
    "Data Structures & Algorithms",
    "Cyber Security & Ethical Hacking",
    "DevOps & CI/CD Pipelines",
    "Mobile Apps (Flutter & Kotlin)",
    "Enterprise .NET Core & C#",
    "PostgreSQL & Database Design",
    "Docker & Kubernetes Clusters",
    "Linux Systems & Shell Scripting",
    "RESTful API & GraphQL Integration",
    "Production Capstone Projects",
  ],
  "ece": [
    "VLSI & Digital System Design",
    "Embedded Systems & Microcontrollers",
    "IoT & Smart Sensor Networks",
    "FPGA Design with Verilog / VHDL",
    "Digital Signal Processing (DSP)",
    "Wireless & 5G Telecommunications",
    "Robotics & Automation Controls",
    "PCB Schematic & Hardware Prototyping",
    "Embedded C & Real-Time OS (RTOS)",
    "Industrial SCADA & PLC Systems",
    "Automotive Protocols (CAN/LIN/SPI)",
    "Hardware Verification & Emulation",
    "Antenna Design & RF Circuitry",
    "Sensor Interfacing & Telemetry",
  ],
  "mech-civil": [
    "CAD/CAM 3D Modeling (SolidWorks/CATIA)",
    "Finite Element Analysis (ANSYS / FEA)",
    "Computational Fluid Dynamics (CFD)",
    "Structural Analysis (STAAD Pro / ETABS)",
    "Building Information Modeling (BIM/Revit)",
    "HVAC & MEP Engineering Systems",
    "Automobile & EV Powertrain Dynamics",
    "Total Station & GIS Survey Mapping",
    "CNC Tooling & Modern Manufacturing",
    "Quantity Surveying & Estimation",
    "Green Building & Sustainable Design",
    "Industrial Site Safety & ISO Protocols",
    "Hydraulics & Heavy Machinery",
    "Material Science & Strength Testing",
  ],
  "management": [
    "Strategic Financial Analysis",
    "Corporate HR Operations & Payroll",
    "Digital Marketing & SEO Strategies",
    "Business Intelligence & Power BI",
    "Supply Chain & Global Logistics",
    "Investment Banking & Equity Research",
    "Brand Management & Market Growth",
    "Talent Acquisition & HR Analytics",
    "Financial Modeling in Advanced Excel",
    "International Trade & Compliance",
    "Corporate Governance & Business Law",
    "Agile Leadership & Scrum Mastery",
    "Consumer Behavior & Advertising",
    "Startup Valuation & Fund Raising",
  ],
  "bio-food": [
    "Bioinformatics & Genomic Computing",
    "Genetic Engineering & CRISPR Methods",
    "Clinical Research & Trial Data Mgmt",
    "Food Safety Standards (FSSAI/HACCP)",
    "Fermentation & Bioprocess Engineering",
    "Industrial Microbiology & Sterile Ops",
    "Dairy Processing & Preservation Tech",
    "Pharmaceutical Formulation & QC",
    "Food Product Packaging & Shelf Life",
    "Sensory Analysis & Quality Audits",
    "Good Manufacturing Practices (GMP)",
    "Medical Coding & Regulatory Affairs",
    "Molecular Diagnostics & PCR Tech",
    "Nutraceuticals & Functional Foods",
  ],
  "future-skills-school": [
    "C++ Programming Foundations & OOP",
    "Java & Full-Stack Web Development",
    "AI & Machine Learning Foundations",
    "AI in Economics & Data Thinking",
    "Finance & Financial Literacy (Budgets/Compounding)",
    "Stock Market Awareness (Equities/IPOs/SEBI)",
    "Chemistry Curriculum (Matter/Bonding/Titration)",
    "Console Applications & Star Patterns",
    "Interactive Web Portals & Forms",
    "Spam Filters & Decision Tree Models",
    "Time-Series Trends & Economic Logic",
    "Personal Budgeting & Financial Ethics",
    "Learn • Practice • Build • Explore • Present",
    "Verified Nyeras School Certificates",
  ],
};

const creativeTopics = [
  "UI/UX Design Systems in Figma",
  "Graphic Design with Adobe Creative Cloud",
  "Automotive & Industrial 3D Styling",
  "User Research & Wireframing Flows",
  "Usability Testing & Design Sprints",
  "Brand Identity & Visual Typography",
  "Motion Graphics & Micro-Animations",
  "Design-to-Code Handoff Architecture",
  "Responsive Web & Native App Layouts",
  "Color Theory & Spatial Psychology",
  "Interaction Prototyping & Microcopy",
  "Design Portfolio & Agency Pitching",
];

export default function DepartmentsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Topbar />
      <Header />

      {/* Hero Header */}
      <div className="relative pt-32 pb-14 bg-transparent">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-4"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm mb-6">
              <BookOpen className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              Comprehensive Academic Curriculum
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Explore Academic & Tech{' '}
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-300 dark:to-slate-400 bg-clip-text text-transparent">
                Departments
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Every domain features in-depth industry modules, real-time live tools, verified credentials, and 100% placement support.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Cards Grid */}
      <main className="flex-grow pb-20">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {departmentCategories.map((cat, index) => (
              <PremiumCourseCard
                key={`dept-cat-${cat.id || index}`}
                href={`/domains/departments/${cat.id}`}
                title={cat.title}
                icon={iconMap[cat.id] || <BookOpen className="w-10 h-10" />}
                gradient="from-slate-700 via-slate-800 to-slate-900"
                topics={departmentTopics[cat.id] || []}
                index={index}
              />
            ))}
            
            {/* Creative Design Card */}
            <PremiumCourseCard
              href="/domains/creative-design"
              title="Creative / Design"
              summary="Graphic Design, UI/UX, Automotive Design"
              icon={<Palette className="w-10 h-10" />}
              gradient="from-slate-800 via-slate-850 to-slate-900"
              topics={creativeTopics}
              index={departmentCategories.length}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

