import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Geetha K S | Founder · Software Engineer · AI Product Builder',
  description: 'Portfolio of Geetha K S — Founder of Kripra’s Digital AI Pvt. Ltd., Software Engineer and AI Product Builder creating intelligent products and enterprise digital platforms.',
  applicationName: 'GEETZ Portfolio',
  keywords: ['Geetha K S', 'GEETZ', 'Software Engineer', 'AI Product Builder', 'Kripra Digital AI'],
  authors: [{ name: 'Geetha K S' }],
  openGraph: {
    title: 'Geetha K S | Founder · Software Engineer · AI Product Builder',
    description: 'Founder, software engineer, and AI product builder creating intelligent products and enterprise platforms.',
    type: 'profile',
    siteName: 'GEETZ',
  },
  twitter: {
    card: 'summary',
    title: 'Geetha K S | Founder · Software Engineer · AI Product Builder',
    description: 'Founder, software engineer, and AI product builder creating intelligent products and enterprise platforms.',
  },
  robots: { index: true, follow: true },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Person', name: 'Geetha K S', alternateName: 'GEETZ',
          jobTitle: ['Founder', 'Software Engineer', 'AI Product Builder'],
          worksFor: { '@type': 'Organization', name: 'Kripra’s Digital AI Pvt. Ltd.' },
        }) }} />
      </body>
    </html>
  );
}
