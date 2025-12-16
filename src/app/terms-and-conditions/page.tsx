import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Import the client component dynamically
const TermsContent = dynamic(() => import('./TermsContent'), { ssr: true });

export const metadata: Metadata = {
  title: 'Terms and Conditions | Nyeras Edutech',
  description: 'Read our Terms and Conditions to understand the rules and guidelines for using Nyeras Edutech services.',
  openGraph: {
    title: 'Terms and Conditions | Nyeras Edutech',
    description: 'Read our Terms and Conditions to understand the rules and guidelines for using Nyeras Edutech services.',
    url: 'https://nyeras.com/terms-and-conditions',
    siteName: 'Nyeras Edutech',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms and Conditions | Nyeras Edutech',
    description: 'Read our Terms and Conditions to understand the rules and guidelines for using Nyeras Edutech services.',
  },
};

export default function TermsAndConditions() {
  return <TermsContent />;
}
