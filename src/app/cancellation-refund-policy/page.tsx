import type { Metadata } from 'next';
import RefundPolicyPageClient from './RefundPolicyPageClient';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy | Nyeras',
  description: 'Learn about our cancellation and refund policies for courses and services at Nyeras EduTech Innovations.',
  keywords: 'cancellation policy, refund policy, course refund, Nyeras refund, education refund',
};

export default function RefundPolicyPage() {
  return <RefundPolicyPageClient />;
}
