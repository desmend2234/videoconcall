import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { ClerkLoaded, ClerkProvider, ClerkLoading } from '@clerk/nextjs';
import Navbar from './components/Navbar';

import { dark } from '@clerk/themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Call friends',
  description: 'Call friends,righ now',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={inter.className}>
          <ClerkLoading>
            <div className="flex justify-center items-center text-2xl h-screen">Loading...</div>
          </ClerkLoading>
          <ClerkLoaded>
            <div className="">
              <div className="flex flex-col h-screen">
                <Navbar />
                {children}
              </div>
            </div>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
