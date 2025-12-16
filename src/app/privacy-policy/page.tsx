import type { Metadata } from 'next';
import PrivacyPageClient from './PrivacyPageClient';

export const metadata: Metadata = {
  title: 'Privacy Policy | Nyeras',
  description: 'Learn how Nyeras collects, uses, and protects your personal information in accordance with privacy laws and best practices.',
  keywords: 'privacy policy, data protection, personal information, Nyeras, EdTech, online learning',
};

export default function PrivacyPolicy() {
  return <PrivacyPageClient />;
}
