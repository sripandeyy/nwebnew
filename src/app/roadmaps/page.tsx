import { Metadata } from 'next';
import Topbar from '../components/Topbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CallbackFlashcard from '../components/CallbackFlashcard';
import CourseRoadmapsSection from './CourseRoadmapsSection';

export const metadata: Metadata = {
  title: 'Course Roadmaps & Interactive Learning Pathways | Nyeras',
  description:
    'Browse complete learning pathways and interactive roadmaps across 6 engineering and business domains. Explore module dependencies, practical work, assessments, and completion milestones for Basic, Advanced, and Pro plans.',
  keywords: [
    'Course Roadmaps',
    'Learning Pathways',
    'Full Stack Roadmap',
    'AI ML Roadmap',
    'Cloud Computing Roadmap',
    'VLSI Roadmap',
    'Mechanical CAD Roadmap',
    'Nyeras Plans',
  ],
};

export default function RoadmapsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-[#070913]/50 transition-colors duration-300 relative">
      <Topbar />
      <Header />
      <main className="flex-grow relative z-10 pt-4 sm:pt-6">
        <CourseRoadmapsSection isStandalonePage={true} />
      </main>
      <Footer />
      <CallbackFlashcard />
    </div>
  );
}
