'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RoadmapCourse,
  PlanType,
  PLAN_SCHEDULES,
  isProPlanEligible,
} from './roadmapsData';
import { findCourseBySlug } from '../domains/data';
import {
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  AlertTriangle,
  Info,
  ArrowRight,
  ExternalLink,
  Award,
  BookOpen,
  Cpu,
  ChevronDown,
  ChevronUp,
  FileText,
  Send,
} from 'lucide-react';
import Link from 'next/link';
import CallbackForm from '../components/CallBackform';

interface CourseRoadmapFlowchartProps {
  course: RoadmapCourse;
  activePlan: PlanType;
  onPlanChange?: (plan: PlanType) => void;
  onOpenAdvisorModal?: (courseTitle: string) => void;
  hideCatalogAccordion?: boolean;
}

export default function CourseRoadmapFlowchart({
  course,
  activePlan,
  onPlanChange,
  onOpenAdvisorModal,
  hideCatalogAccordion = false,
}: CourseRoadmapFlowchartProps) {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number | null>(0);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [showCatalogDetails, setShowCatalogDetails] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  // Pro plan is strictly exclusive to HRM, Data Analytics, and Data Science
  const proEligible = isProPlanEligible(course);
  const effectivePlan: PlanType = !proEligible && activePlan === 'pro' ? 'advanced' : activePlan;
  const availablePlans: PlanType[] = proEligible ? ['basic', 'advanced', 'pro'] : ['basic', 'advanced'];

  const plan = PLAN_SCHEDULES[effectivePlan];

  // Try to find supplemental catalog modules from site data
  const catalogMatch = findCourseBySlug(course.slug);
  const catalogModules = catalogMatch.course?.curriculum || [];

  // Construct roadmap steps:
  // 1 to N: Stages from PDF flow
  // Next: Practical Work (suggested project)
  // Next: Assessments (for Advanced & Pro)
  // Final: Milestone / Certification
  const stageNodes = course.flow.map((stageName, idx) => {
    let weekSpan = '';
    let objective = '';
    let dependencyText = idx === 0 ? 'Prerequisites: None (Foundations)' : `Requires completion of Stage 0${idx}: ${course.flow[idx - 1]}`;

    if (idx === 0) {
      weekSpan = plan.stagesSchedule.stage1Weeks;
      objective = `Master foundational concepts, core syntax, environment setup, and fundamental principles of ${course.title}.`;
    } else if (idx === 1) {
      weekSpan = plan.stagesSchedule.stage2Weeks;
      objective = `Develop intermediate hands-on competency, component architecture, and practical implementation patterns in ${stageName}.`;
    } else if (idx === 2) {
      weekSpan = plan.stagesSchedule.stage3Weeks;
      objective = `Implement production-ready patterns, advanced optimizations, and integration workflows in ${stageName}.`;
    } else {
      weekSpan = effectivePlan === 'basic' ? 'Wk 7–8' : effectivePlan === 'advanced' ? 'Wk 10–13' : 'Wk 13–18';
      objective = `Applied domain focus and end-to-end integration for ${stageName}.`;
    }

    // Check if there is a matching catalog module for subtopics
    const matchedCatalogModule = catalogModules[idx];
    const subtopics = matchedCatalogModule ? matchedCatalogModule.topics : [];

    return {
      type: 'stage' as const,
      stepNumber: `0${idx + 1}`,
      title: stageName,
      subtitle: idx === 0 ? 'Foundations & Principles' : idx === 1 ? 'Core Competencies' : 'Specialization & Systems',
      weekSpan,
      dependencyText,
      objective,
      subtopics,
      isMissingPdfDetails: subtopics.length === 0,
    };
  });

  // Practical Work Node
  const practicalNode = {
    type: 'project' as const,
    stepNumber: `0${stageNodes.length + 1}`,
    title: effectivePlan === 'basic' ? 'Mini Project' : effectivePlan === 'advanced' ? 'Industry Capstone' : 'Enterprise Capstone',
    subtitle: course.suggestedProject,
    weekSpan: plan.stagesSchedule.practicalWorkWeeks,
    dependencyText: `Requires completion of all ${stageNodes.length} theoretical and lab stages`,
    objective: `Build, test, and package: "${course.suggestedProject}" for code review and portfolio integration.`,
    isProposal: true,
  };

  // Assessment Node (for Advanced & Pro)
  const assessmentNode =
    effectivePlan !== 'basic'
      ? {
          type: 'assessment' as const,
          stepNumber: `0${stageNodes.length + 2}`,
          title: effectivePlan === 'advanced' ? 'Technical Assessment & Interview Prep' : 'Mock Interviews & Placement Prep',
          subtitle: effectivePlan === 'advanced' ? '16th Week Evaluation' : '23rd–24th Week Placement Sprint',
          weekSpan: plan.stagesSchedule.assessmentWeeks || 'Wrap-up week',
          dependencyText: 'Requires project submission and milestone review',
          objective:
            effectivePlan === 'advanced'
              ? 'Comprehensive skills evaluation, viva review, resume tuning, and basic interview readiness.'
              : 'Rigorous 1-on-1 technical mock interviews, behavioral coaching, company-specific test prep, and placement matchmaking.',
        }
      : null;

  // Completion Milestone Node
  const milestoneStepIndex = stageNodes.length + (assessmentNode ? 2 : 1);
  const milestoneNode = {
    type: 'milestone' as const,
    stepNumber: `0${milestoneStepIndex}`,
    title: 'Milestone Completion & Certification',
    subtitle: course.domainId === 'job-guarantee' ? '100% Placement Assurance Program Exit' : 'Course & Internship Credentialing',
    weekSpan: `Week ${plan.durationWeeks}`,
    dependencyText: 'Final milestone upon fulfilling attendance and project criteria',
    objective: `Awarding of verified Nyeras credentials${activePlan !== 'basic' ? ', internship letter, and placement referral access' : ''}.`,
  };

  const allNodes = [
    ...stageNodes,
    practicalNode,
    ...(assessmentNode ? [assessmentNode] : []),
    milestoneNode,
  ];

  const toggleStepCompleted = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedSteps((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / allNodes.length) * 100);

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
      {/* Header Bar */}
      <div className="p-5 sm:p-6 lg:p-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900">
              {course.code}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {course.domainName}
            </span>
            {course.crossListedIn && course.crossListedIn.length > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                Also listed in: {course.crossListedIn.join(', ')}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" /> Industry-Aligned Pathway
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {course.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            {course.summary}
          </p>
        </div>

        {/* Plan Selector Pills */}
        <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Select Learning Plan
          </div>
          <div className="inline-flex p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 border border-slate-300/70 dark:border-slate-700">
            {availablePlans.map((pType) => {
              const pInfo = PLAN_SCHEDULES[pType];
              const isSelected = effectivePlan === pType;
              return (
                <button
                  key={pType}
                  type="button"
                  onClick={() => onPlanChange && onPlanChange(pType)}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-md scale-[1.02]'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  <span className="capitalize">{pType}</span>
                  <span className="ml-1 text-[11px] opacity-80">({pInfo.durationMonths}m)</span>
                </button>
              );
            })}
          </div>
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            {plan.durationWeeks} Weeks • {plan.liveHours} • {plan.lmsAccess}
            {!proEligible && (
              <span className="ml-1.5 opacity-75 font-semibold text-[10px]">
                (Pro Plan exclusive to HRM & Data tracks)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Feature Highlight if applicable */}
      {course.disclaimer && (
        <div className="px-5 sm:px-7 py-2.5 bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-950 dark:text-emerald-200 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="font-semibold">{course.disclaimer}</span>
          </div>
          <span className="inline-block px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900/60 font-bold text-[11px] text-emerald-950 dark:text-emerald-100 shrink-0">
            Career Guarantee
          </span>
        </div>
      )}

      {/* Progress & Simulation Bar */}
      <div className="px-5 sm:px-7 py-3 bg-slate-100/60 dark:bg-slate-900/40 border-b border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Pathway Progression Simulator:
          </span>
          <span className="text-xs font-mono font-extrabold text-slate-900 dark:text-white">
            {completedCount} / {allNodes.length} Completed ({progressPercent}%)
          </span>
        </div>
        <div className="w-32 sm:w-48 bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-slate-900 dark:bg-white h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Interactive Flowchart Visualizer */}
      <div className="p-5 sm:p-7 overflow-x-auto">
        <div className="min-w-[760px] pb-4">
          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> Learning Progression Flowchart ({plan.name})
          </div>

          {/* Flowchart Node Train */}
          <div className="flex items-stretch gap-3 lg:gap-4 relative">
            {allNodes.map((node, index) => {
              const isSelected = selectedNodeIndex === index;
              const isCompleted = !!completedSteps[index];

              let nodeBorderColor = 'border-slate-200 dark:border-slate-800';
              let badgeBg = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
              let iconElement = <BookOpen className="w-4 h-4" />;

              if (node.type === 'project') {
                badgeBg = 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300';
                iconElement = <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
              } else if (node.type === 'assessment') {
                badgeBg = 'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300';
                iconElement = <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
              } else if (node.type === 'milestone') {
                badgeBg = 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300';
                iconElement = <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
              }

              if (isSelected) {
                nodeBorderColor = 'border-slate-900 dark:border-white shadow-lg ring-2 ring-slate-900/10 dark:ring-white/10';
              }

              return (
                <React.Fragment key={index}>
                  <div
                    onClick={() => setSelectedNodeIndex(index)}
                    className={`flex-1 min-w-[170px] max-w-[240px] rounded-xl p-3.5 sm:p-4 border transition-all cursor-pointer flex flex-col justify-between relative group ${nodeBorderColor} ${
                      isSelected
                        ? 'bg-slate-50 dark:bg-slate-800/80 scale-[1.01]'
                        : 'bg-white dark:bg-slate-900 hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    {/* Top Node Meta */}
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${badgeBg}`}>
                          {node.type === 'stage'
                            ? `Stage ${node.stepNumber}`
                            : node.type === 'project'
                            ? 'Practical Work'
                            : node.type === 'assessment'
                            ? 'Assessment'
                            : 'Milestone'}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => toggleStepCompleted(index, e)}
                          title={isCompleted ? 'Mark uncompleted' : 'Mark completed'}
                          className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                            isCompleted
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        <Clock className="w-3 h-3" />
                        <span>{node.weekSpan}</span>
                      </div>

                      <h4 className="text-sm font-black text-slate-900 dark:text-white line-clamp-2 leading-snug">
                        {node.title}
                      </h4>
                    </div>

                    {/* Bottom Status / Dependency */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="truncate max-w-[120px]">
                        {node.type === 'project' ? 'Proposed Project' : node.type === 'milestone' ? 'Goal Target' : 'Prerequisite'}
                      </span>
                      <span className="font-extrabold group-hover:translate-x-0.5 transition-transform text-slate-900 dark:text-white">
                        Inspect →
                      </span>
                    </div>
                  </div>

                  {/* Flow Arrow to next node */}
                  {index < allNodes.length - 1 && (
                    <div className="self-center flex items-center px-0.5 text-slate-400 dark:text-slate-600 shrink-0">
                      <div className="w-4 h-0.5 bg-slate-300 dark:bg-slate-700 relative">
                        <ArrowRight className="w-3.5 h-3.5 absolute -right-1.5 -top-1.5 text-slate-400 dark:text-slate-500" />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Node Detailed Module Panel */}
      <div className="p-5 sm:p-7 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        {selectedNodeIndex !== null && allNodes[selectedNodeIndex] && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Node Details & Learning Architecture
                </span>
                <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
                  <span>Step {allNodes[selectedNodeIndex].stepNumber}: {allNodes[selectedNodeIndex].title}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">
                    {allNodes[selectedNodeIndex].weekSpan}
                  </span>
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsCallbackOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                  title="Inquire Now / Request a Callback"
                >
                  <Send className="w-3 h-3" />
                  <span>Inquire Now</span>
                </button>
                <Link
                  href={course.url}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-200/50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <span>Course Page</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Grid of Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Box 1: Dependencies & Learning Objectives */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div>
                  <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Dependency Requirement
                  </h5>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {allNodes[selectedNodeIndex].dependencyText}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Learning Objective
                  </h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {allNodes[selectedNodeIndex].objective}
                  </p>
                </div>
              </div>

              {/* Box 2: Topics, Subtopics & Core Competencies */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Topics & Subtopic Breakdown
                  </h5>
                  <span className="text-[11px] font-semibold text-slate-500">
                    Core Topics & Key Competencies
                  </span>
                </div>

                {/* If subtopics exist */}
                {'subtopics' in allNodes[selectedNodeIndex] &&
                (allNodes[selectedNodeIndex] as any).subtopics &&
                (allNodes[selectedNodeIndex] as any).subtopics.length > 0 ? (
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {(allNodes[selectedNodeIndex] as any).subtopics.map(
                        (topic: string, tIdx: number) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60"
                          >
                            {topic}
                          </span>
                        )
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">
                      *Core competencies mastered through interactive live sessions, code assignments, and weekly milestone checks.
                    </p>
                  </div>
                ) : allNodes[selectedNodeIndex].type === 'project' ? (
                  <div>
                    <div className="p-3 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-200">
                      <strong>Project Deliverable:</strong> {course.suggestedProject}
                    </div>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
                      *Industry-ready capstone project built with 1-on-1 mentor guidance and structured code reviews.
                    </p>
                  </div>
                ) : allNodes[selectedNodeIndex].type === 'assessment' ? (
                  <div className="p-3 rounded-lg bg-purple-50/70 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40 text-xs text-purple-900 dark:text-purple-200">
                    <strong>Milestone Scope:</strong> Live technical interview simulation, portfolio code review, ATS resume alignment, and placement referral readiness.
                  </div>
                ) : allNodes[selectedNodeIndex].type === 'milestone' ? (
                  <div className="p-3 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-200">
                    <strong>Certification Verification:</strong> Certified course completion & verified internship certificate registered under Nyera Educational Organisation.
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
                    <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                      Hands-On Stage Curriculum & Lab Modules
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Mentor-led live sessions, interactive coding exercises, and structured problem sets. Click{' '}
                      <button
                        type="button"
                        onClick={() => setIsCallbackOpen(true)}
                        className="underline font-bold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white cursor-pointer"
                      >
                        &quot;Inquire Now&quot;
                      </button>{' '}
                      to request a callback &amp; get the complete cohort syllabus PDF.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Supplemental Website Catalog Accordion */}
            {!hideCatalogAccordion && catalogModules.length > 0 && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowCatalogDetails(!showCatalogDetails)}
                  className="flex items-center justify-between w-full p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-slate-500" />
                    <span>View All Website Catalog Modules ({catalogModules.length} Modules Available)</span>
                  </span>
                  {showCatalogDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                <AnimatePresence>
                  {showCatalogDetails && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
                    >
                      <div className="text-xs font-semibold text-slate-500 mb-2">
                        Cross-referenced syllabus modules from the current website course catalog:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {catalogModules.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="p-3 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40"
                          >
                            <h6 className="text-xs font-extrabold text-slate-900 dark:text-white mb-1.5">
                              Module {mIdx + 1}: {m.title}
                            </h6>
                            <div className="flex flex-wrap gap-1">
                              {m.topics.map((t, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-medium"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Request Callback Modal for Inquire Now */}
      {isCallbackOpen && (
        <CallbackForm
          onClose={() => setIsCallbackOpen(false)}
          initialProgram={course.title}
          notes={
            selectedNodeIndex !== null && allNodes[selectedNodeIndex]
              ? `Inquiry from Roadmap Node: Step ${allNodes[selectedNodeIndex].stepNumber} - ${allNodes[selectedNodeIndex].title} (${allNodes[selectedNodeIndex].weekSpan}), Track: ${effectivePlan.toUpperCase()}`
              : `Roadmap Inquiry: ${course.title}, Track: ${effectivePlan.toUpperCase()}`
          }
          source="Roadmap Flowchart Inquire Now"
          title="Talk to an Academic Advisor"
          subtitle={`Get curriculum details, personalized roadmap, and cohort fee options for ${course.title}.`}
        />
      )}
    </div>
  );
}
