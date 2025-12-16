'use client';

import dynamic from 'next/dynamic';

// Dynamically import the RefundPolicyContent component with SSR disabled
const RefundPolicyContent = dynamic(
    () => import('./RefundPolicyContent'),
    { ssr: false }
);

export default function RefundPolicyPageClient() {
    return <RefundPolicyContent />;
}
