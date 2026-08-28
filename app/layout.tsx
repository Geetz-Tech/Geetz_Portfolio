import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://geetz-portfolio.geethasritnj.chatgpt.site';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Geetha K S | Senior AI Product Engineer · Founder, GEETZ',
  description: 'Portfolio of Geetha K S — Senior AI Product Engineer and Python full-stack developer, Founder of Kripra’s Digital AI Pvt. Ltd., building AI-assisted enterprise products.',
  applicationName: 'GEETZ Portfolio',
  keywords: ['Geetha K S', 'GEETZ', 'Senior AI Product Engineer', 'Python Full-Stack Developer', 'AI Product Builder', 'Kripra Digital AI'],
  authors: [{ name: 'Geetha K S' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Geetha K S | Senior AI Product Engineer · Founder, GEETZ',
    description: 'Senior AI Product Engineer and Python full-stack developer building AI-assisted enterprise products.',
    type: 'profile',
    siteName: 'GEETZ',
    url: '/',
    images: [{ url: '/og.png', width: 1536, height: 1024, alt: 'GEETZ — Geetha K S, Senior AI Product Engineer and Founder' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Geetha K S | Senior AI Product Engineer · Founder, GEETZ',
    description: 'Senior AI Product Engineer and Python full-stack developer building AI-assisted enterprise products.',
    images: ['/og.png'],
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
          '@context': 'https://schema.org',
          '@type': 'Person',
          '@id': `${siteUrl}/#person`,
          url: siteUrl,
          name: 'Geetha K S',
          alternateName: 'GEETZ',
          jobTitle: 'Founder · Software Engineer · AI Product Builder',
          email: 'mailto:geethasritnj@gmail.com',
          sameAs: [
            'https://www.linkedin.com/in/geethaks20',
            'https://github.com/Geetz_tech',
          ],
          worksFor: {
            '@type': 'Organization',
            name: 'Kripra’s Digital AI Pvt. Ltd.',
            url: 'https://kriprasdigitalai.com/en',
          },
        }) }} />
      </body>
    </html>
  );
}
