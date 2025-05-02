import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { Providers } from "./Providers";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Egecan Kahyaoglu | MSc Software Engineer',
  description: 'Egecan Kahyaoglu is a Software Engineer with expertise in React, Next.js, TypeScript, Node.js and full-stack development. View portfolio, projects, and contact information.',
  keywords: ['Egecan Kahyaoglu', 'Software Engineer', 'React Developer', 'Next.js', 'TypeScript', 'Full Stack Developer', 'Berlin', 'Canada'],
  authors: [{ name: 'Egecan Kahyaoglu' }],
  creator: 'Egecan Kahyaoglu',
  publisher: 'Egecan Kahyaoglu',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://egecankahyaoglu.netlify.app/',
    title: 'Egecan Kahyaoglu | MSc Software Engineer',
    description: 'Portfolio of Egecan Kahyaoglu, Software Engineer with expertise in React, Next.js, TypeScript, and Node.js',
    siteName: 'Egecan Kahyaoglu Portfolio',
    images: [
      {
        url: '/images/egecankahyaoglu.png',
        width: 800,
        height: 600,
        alt: 'Egecan Kahyaoglu'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Egecan Kahyaoglu | MSc Software Engineer',
    description: 'Portfolio of Egecan Kahyaoglu, Software Engineer with expertise in React, Next.js, TypeScript, and Node.js',
    images: ['/images/egecankahyaoglu.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large'
    }
  },
  verification: {
    google: 'Jp8ddzFpFUI9omm4o1Icb_Z3TJSuBZKIyBFq5X8',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
