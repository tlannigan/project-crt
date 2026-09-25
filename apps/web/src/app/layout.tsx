import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import { ibmVgaMono } from '@/styles/fonts/fonts';
import '../styles/globals.css';

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-mono-ibm',
  subsets: ['latin'],
  weight: ['400']
});

export const metadata: Metadata = {
  title: 'Tristan Lannigan - Web Developer',
  description: "Tristan Lannigan's Portfolio"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmVgaMono.variable} ${ibmPlexMono.variable} h-full`}>
      <body className="min-h-full flex flex-col font-vga">{children}</body>
    </html>
  );
}
