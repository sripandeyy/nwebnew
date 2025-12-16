'use client';

import dynamic from 'next/dynamic';

// Dynamically import the ContactContent component with SSR disabled
const ContactContent = dynamic(
    () => import('./ContactContent'),
    { ssr: false }
);

export default function ContactPageClient() {
    return <ContactContent />;
}
