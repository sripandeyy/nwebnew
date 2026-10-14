import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import BackToTop from './components/BackToTop';
import CookieConsent from './components/CookieConsent';
import GridBackgroundTracer from './components/GridBackgroundTracer';
import ChatBot from './components/Chatbot';
import NyerasIntro from './components/NyerasIntro';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AuthModal from './components/AuthModal';
import SiteContentSync from './components/SiteContentSync';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://nyeras.com'),
  title: {
    default: "Nyeras - Affordable E-learning with Certification & Job Placement",
    template: "%s | Nyeras",
  },
  description: "Nyeras is an e-learning and career enablement platform by Nyera Educational Organisation, offering high-impact training with industry certifications, practical internships, 1:1 mentorship, and 100% placement assistance.",
  keywords: ["e-learning", "internships", "certifications", "job guarantee", "placement assistance", "tech training", "data science", "full stack"],
  openGraph: {
    title: "Nyeras - Affordable E-learning with Certification & Job Placement",
    description: "Empower your career with industry-recognized certifications, live mentorship, and 100% placement assistance.",
    url: "https://nyeras.com",
    siteName: "Nyeras",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Nyeras Edutech",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: { url: '/favicon.ico', type: 'image/x-icon' },
    shortcut: { url: '/favicon.ico', type: 'image/x-icon' },
    apple: { url: '/favicon.png', type: 'image/png' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={inter.variable} style={{ colorScheme: 'light' }}>
      <head>
        <link rel="icon" href="/favicon.ico?v=2" type="image/x-icon" />
        <meta name="color-scheme" content="light" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var root = document.documentElement;
                  root.classList.remove('dark');
                  root.setAttribute('data-theme', 'light');
                  root.style.colorScheme = 'light';
                  localStorage.setItem('nyeras-theme', 'light');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col relative`} style={{ colorScheme: 'light' }} suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            <SiteContentSync />
            <NyerasIntro />
            <AuthModal />
            <GridBackgroundTracer />
            <NextTopLoader 
              color="#334155"
              showSpinner={false}
              showAtBottom={false}
              crawlSpeed={200}
            />
            {children}
            <BackToTop />
            <CookieConsent />
            <ChatBot />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}