import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import AnimatedBackground from './components/AnimatedBackground';
const inter = Roboto({ weight: '700', subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default:"Nyeras - Affordable E-learning with Certification & Job Placement",
    template:"%s | Nyeras",
  },
  description: "Nyeras is an e-learning platform by Nyera Educational Trust (R), offers affordable courses with certifications and internships to prepare students for government and MNC jobs. With experienced faculty and 100% placement assistance, including mock interviews and LinkedIn profile guidance, Nyeras is committed to helping students become industry-ready. Join 2000+ successful students who have achieved top placements through our programs.",
  icons: {
    icon: { url: '/favicon.ico', type: 'image/x-icon' },
    shortcut: { url: '/favicon.ico', type: 'image/x-icon' },
    apple: { url: '/favicon.ico', type: 'image/x-icon' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico?v=2" type="image/x-icon" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
          <AnimatedBackground/>
          <NextTopLoader 
          color="#6600CC"
          showSpinner={false}
          showAtBottom={false}
          crawlSpeed={200}
          />
        {children}
      </body>
    </html>
  );
}