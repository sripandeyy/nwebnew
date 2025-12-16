'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';

export default function DomainsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const showFooter = pathname === '/domains/departments' || 
                    pathname === '/domains/job-guarantee';

  return (
    <div className="relative">
      <AnimatedBackground />
      <div className="relative z-10">
        {children}
        {showFooter && (
          <div className="bg-white/60">
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
}
