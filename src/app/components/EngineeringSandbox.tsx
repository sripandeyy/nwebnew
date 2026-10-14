'use client';

import React, { useState } from 'react';
import { 
  Terminal, 
  Code2, 
  Play, 
  CheckCircle2, 
  Cpu, 
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';
import Link from 'next/link';

interface CodeSnippet {
  title: string;
  tab: string;
  filename: string;
  language: string;
  runtime: string;
  code: string;
  metrics: { label: string; value: string; color: string }[];
  review: {
    reviewer: string;
    role: string;
    avatar: string;
    comment: string;
  };
}

const SNIPPETS: Record<string, CodeSnippet> = {
  fullstack: {
    title: "Next.js 15 Server Actions & Postgres Transaction",
    tab: "Full Stack (Next.js + SQL)",
    filename: "app/actions/checkout.ts",
    language: "typescript",
    runtime: "Node.js 22 LTS • Prisma ORM",
    code: `// Nyeras Capstone: High-Concurrency Checkout Pipeline
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function processOrder({ userId, cartItems, idempotencyKey }: OrderPayload) {
  return await db.$transaction(async (tx) => {
    // 1. Pessimistic lock on inventory to prevent overselling
    const inventory = await tx.product.findMany({
      where: { id: { in: cartItems.map(i => i.id) } },
      select: { id: true, stock: true }
    });
    
    // 2. Validate real-time stock availability
    for (const item of cartItems) {
      const match = inventory.find(p => p.id === item.id);
      if (!match || match.stock < item.quantity) {
        throw new Error(\`Insufficient stock for product \${item.id}\`);
      }
      await tx.product.update({
        where: { id: item.id },
        data: { stock: { decrement: item.quantity } }
      });
    }

    // 3. Commit idempotent order record & trigger background webhook
    const order = await tx.order.create({
      data: { userId, idempotencyKey, status: "CONFIRMED", items: cartItems }
    });

    revalidateTag(\`orders_\${userId}\`);
    return { success: true, orderId: order.id };
  });
}`,
    metrics: [
      { label: "p99 Execution", value: "24ms", color: "text-emerald-400" },
      { label: "Concurrency", value: "5,000 req/s", color: "text-cyan-400" },
      { label: "Test Coverage", value: "98.4%", color: "text-slate-300" },
    ],
    review: {
      reviewer: "Saurabh Sharma",
      role: "Lead Architect @ Nyeras (ex-Amazon)",
      avatar: "/s1.png",
      comment: "LGTM! Excellent use of Prisma pessimistic locking inside the transaction to eliminate race conditions under high concurrency."
    }
  },
  ai: {
    title: "FastAPI + RAG Vector Search with LangChain & OpenAI",
    tab: "AI & Data Engine",
    filename: "services/rag_engine.py",
    language: "python",
    runtime: "Python 3.12 • Qdrant Vector DB",
    code: `# Nyeras Capstone: Enterprise RAG Semantic Retrieval Engine
from fastapi import FastAPI, Depends
from langchain_community.vectorstores import Qdrant
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.chains import create_retrieval_chain

app = FastAPI(title="Nyeras Vector Retrieval Microservice")

async def search_enterprise_kb(query: str, top_k: int = 5):
    embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
    client = Qdrant(client=get_qdrant_client(), collection_name="mou_docs", embeddings=embeddings)
    
    # Cosine similarity vector search over 500k embedded documents
    retriever = client.as_retriever(search_type="similarity_score_threshold", search_kwargs={"score_threshold": 0.82, "k": top_k})
    docs = await retriever.ainvoke(query)
    
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.2)
    return {"query": query, "retrieved_chunks": len(docs), "status": "CONFIRMED"}`,
    metrics: [
      { label: "Search Latency", value: "48ms", color: "text-emerald-400" },
      { label: "Embed Dim", value: "3072", color: "text-cyan-400" },
      { label: "Relevance Score", value: "94.2%", color: "text-slate-300" },
    ],
    review: {
      reviewer: "Ananya Deshmukh",
      role: "Principal AI Scientist (ex-Google)",
      avatar: "/s2.png",
      comment: "Clean retrieval pipeline with strict cosine thresholding to filter out vector hallucinations. Approved for production."
    }
  },
  devops: {
    title: "Terraform AWS Multi-Region EKS Cluster & Ingress",
    tab: "Cloud & DevOps (Terraform)",
    filename: "infra/terraform/eks.tf",
    language: "hcl",
    runtime: "Terraform 1.9 • AWS Provider v5",
    code: `# Nyeras Capstone: Production Auto-Scaling Kubernetes Infra
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = "nyeras-prod-workloads"
  cluster_version = "1.30"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    app_tier = {
      instance_types = ["c6i.2xlarge"]
      min_size     = 3
      max_size     = 50
      desired_size = 6

      capacity_type = "SPOT"
      labels = { Environment = "production", ManagedBy = "NyerasEngine" }
    }
  }

  enable_cluster_creator_admin_permissions = true
}`,
    metrics: [
      { label: "Infra Provision", value: "100% IaC", color: "text-emerald-400" },
      { label: "Node Scaling", value: "3 -> 50 pods", color: "text-cyan-400" },
      { label: "Spot Cost Saved", value: "72%", color: "text-slate-300" },
    ],
    review: {
      reviewer: "Harsha Vardhan",
      role: "Staff DevOps Lead @ DXC (Nyeras Alum)",
      avatar: "/harsha new nyeras.jpeg",
      comment: "Well-structured EKS module. Spot capacity configuration delivers massive cloud cost reductions without compromising SLA."
    }
  }
};

export default function EngineeringSandbox() {
  const [selectedKey, setSelectedKey] = useState<string>('fullstack');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [runStage, setRunStage] = useState<number>(0);
  const [hasRun, setHasRun] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const current = SNIPPETS[selectedKey];

  const handleRunTests = () => {
    if (isRunning) return;
    setIsRunning(true);
    setHasRun(false);
    setRunStage(1);

    setTimeout(() => {
      setRunStage(2);
    }, 700);

    setTimeout(() => {
      setRunStage(3);
    }, 1500);

    setTimeout(() => {
      setIsRunning(false);
      setRunStage(0);
      setHasRun(true);
    }, 2300);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden bg-gradient-to-b from-transparent via-slate-100/30 to-transparent">
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
            <Terminal className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span>Interactive Code Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            See the Exact Code You Will Build & Ship
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal">
            No dummy "Hello World" exercises. Every Nyeras cohort student builds production-grade, tested code audited line-by-line by industry mentors.
          </p>
        </div>

        {/* Studio Window Mockup */}
        <div className="relative rounded-3xl bg-[#090d16] glossy-black-card shadow-2xl shadow-slate-950/40 overflow-hidden">
          
          {/* Top Window Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3.5 bg-[#0e1424] border-b border-slate-800">
            
            {/* Window Controls & Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/90" />
                <div className="w-3 h-3 rounded-full bg-amber-500/90" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
              </div>
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 ml-2">
                <Code2 className="w-3.5 h-3.5 text-slate-400" />
                {current.filename}
              </span>
            </div>

            {/* Track Switcher Tabs */}
            <div className="flex items-center gap-1.5 skeuo-track p-1 rounded-xl">
              {Object.entries(SNIPPETS).map(([key, data], sIdx) => (
                <button
                  key={`sandbox-track-${key}-${sIdx}`}
                  type="button"
                  onClick={() => {
                    setSelectedKey(key);
                    setHasRun(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                    selectedKey === key
                      ? 'skeuo-tab-active text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {data.tab}
                </button>
              ))}
            </div>

            {/* Actions: Run & Copy */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg skeuo-btn-secondary text-slate-950 dark:text-white text-xs font-extrabold"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                type="button"
                onClick={handleRunTests}
                disabled={isRunning}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg skeuo-btn-primary text-white font-extrabold text-xs disabled:opacity-75"
              >
                <Play className={`w-3.5 h-3.5 fill-current text-emerald-400 ${isRunning ? 'animate-spin' : ''}`} />
                <span>{isRunning ? 'Running CI Tests...' : 'Run Test Suite'}</span>
              </button>
            </div>

          </div>

          {/* Code Viewer Body */}
          <div className="p-6 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto bg-[#070b14]/95 leading-relaxed">
            <pre className="text-slate-300">
              <code>{current.code}</code>
            </pre>
          </div>

          {/* Test Suite & Metrics Footer Bar */}
          <div className="px-6 py-4 bg-[#0a0f1d] border-t border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Live Metrics */}
            <div className="md:col-span-6 flex flex-wrap items-center gap-4">
              {current.metrics.map((metric, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">{metric.label}:</span>
                  <span className={`text-xs font-bold font-mono ${metric.color}`}>{metric.value}</span>
                </div>
              ))}
            </div>

            {/* Test Status Feedback */}
            <div className="md:col-span-6 flex items-center justify-end gap-3">
              {hasRun ? (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all duration-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>5/5 Integration & Load Tests Passed (0.8s)</span>
                </div>
              ) : isRunning ? (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-all duration-300">
                  <span className="w-2 h-2 rounded-full bg-slate-400 animate-ping-gentle" />
                  <span>
                    {runStage === 1 && "📦 Booting isolated Docker sandbox..."}
                    {runStage === 2 && "⚡ Running 5 concurrency & mutation tests..."}
                    {runStage === 3 && "🔒 Auditing SQL injection & security policies..."}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-slate-400" />
                  {current.runtime}
                </span>
              )}
            </div>

          </div>

          {/* Simulated Senior Mentor PR Review Box */}
          <div className="px-6 py-4 bg-[#0d1326] border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <img
                src={current.review.avatar}
                alt={current.review.reviewer}
                className="w-10 h-10 rounded-full object-cover border-2 border-slate-700 shadow-md shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{current.review.reviewer}</span>
                  <span className="text-[11px] font-semibold text-slate-400">({current.review.role})</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                    PR Approved
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 italic">
                  "{current.review.comment}"
                </p>
              </div>
            </div>

            <Link
              href="/domains"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors shrink-0 underline underline-offset-4"
            >
              <span>Explore All Track Curricula</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
