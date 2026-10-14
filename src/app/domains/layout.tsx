'use client';

import { ReactNode } from 'react';

export default function DomainsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-100 selection:bg-slate-500/20">
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
