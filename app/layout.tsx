import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Sidebar from '@/components/shared/MainSidebar';
import MobileNav from '@/components/shared/MainMobileNav';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'Wealth Command Center',
  description: 'Professional Real-Time Market Intelligence',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} font-sans bg-terminal-black text-gray-200`}>
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
