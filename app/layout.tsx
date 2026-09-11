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
  title: 'Geetha K S | CTO @ Krishvi International · AI & Enterprise Product Builder',
  description: 'Portfolio of Geetha K S — CTO at Krishvi International, software engineer and AI & enterprise product builder architecting platforms across education, enterprise operations and agriculture.',
  applicationName: 'GEETZ Portfolio',
  keywords: ['Geetha K S', 'GEETZ', 'CTO', 'Krishvi International', 'AI Product Builder', 'Enterprise Architecture', 'Software Engineer'],
  authors: [{ name: 'Geetha K S' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Geetha K S | CTO @ Krishvi International · AI & Enterprise Product Builder',
    description: 'CTO, software engineer and AI & enterprise product builder architecting platforms across education, enterprise operations and agriculture.',
    type: 'profile',
    siteName: 'GEETZ',
    url: '/',
    images: [{ url: '/og.png', width: 1536, height: 1024, alt: 'GEETZ — Geetha K S, CTO and AI & Enterprise Product Builder' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Geetha K S | CTO @ Krishvi International · AI & Enterprise Product Builder',
    description: 'CTO, software engineer and AI & enterprise product builder architecting platforms across education, enterprise operations and agriculture.',
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
