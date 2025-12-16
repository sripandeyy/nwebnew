'use client';

import dynamic from 'next/dynamic';

// Dynamically import the PrivacyContent component with SSR disabled
const PrivacyContent = dynamic(
    () => import('./PrivacyContent'),
    { ssr: false }
);

export default function PrivacyPageClient() {
    return <PrivacyContent />;
}
