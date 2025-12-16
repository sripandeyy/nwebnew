import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us | Nyeras',
  description: 'Get in touch with Nyeras EduTech Innovations. We\'re here to answer your questions and help you with your learning journey.',
  keywords: 'contact Nyeras, support, get in touch, customer service, education support',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
