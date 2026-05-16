import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Sidebar from '@/components/shared/MainSidebar';
import MobileNav from '@/components/shared/MainMobileNav';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'Wealth Command Center',
  description: 'Professional Real-Time Market Intelligence',
  // Open Graph / Facebook
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wealth-command-center.example.com',
    siteName: 'Wealth Command Center',
    title: 'Wealth Command Center - Professional Real-Time Market Intelligence',
    description: 'Real-time market intelligence, portfolio tools, and strategy resources for informed investing decisions.',
    images: [
      {
        url: 'https://wealth-command-center.example.com/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Wealth Command Center Og Image',
      },
    ],
  },
  // Twitter
  twitter: {
    handle: '@wealthcmd',
    site: '@wealthcmd',
    cardType: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} font-sans bg-terminal-black text-gray-100`}>
        <div className="flex h-screen overflow-hidden">
          {/* Desktop Sidebar: Hidden on mobile */}
          <div className="hidden md:flex h-full">
            <Sidebar />
          </div>
          
          <main className="flex-1 h-full overflow-y-auto relative flex flex-col">
            {children}
          </main>

          {/* Mobile Bottom Nav: Only visible on mobile */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
            <MobileNav />
          </div>
        </div>
      </body>
    </html>
  );
}
