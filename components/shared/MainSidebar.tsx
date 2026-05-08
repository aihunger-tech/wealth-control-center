'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, TrendingUp, Newspaper, Wallet, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Strategies', href: '/strategy', icon: TrendingUp },
  { name: 'News Feed', href: '/news', icon: Newspaper },
  { name: 'Watchlist', href: '/watchlist', icon: Wallet },
  { name: 'Risk Profiler', href: '/risk', icon: ShieldAlert },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-terminal-dark border-r border-terminal-lightGray flex flex-col h-full">
      <div className="p-6 border-b border-terminal-lightGray">
        <h1 className="text-xl font-bold font-mono text-terminal-accent tracking-tighter">
          WEALTH<span className="text-white">CMD</span>
        </h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {NAV_ITEMS.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group",
              pathname === item.href 
                ? "bg-terminal-accent text-white" 
                : "text-gray-400 hover:bg-terminal-lightGray hover:text-white"
            )}
          >
            <item.icon size={20} className={cn(pathname === item.href ? "text-white" : "group-hover:text-white")} />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-terminal-lightGray text-[10px] font-mono text-gray-500">
        SYSTEM STATUS: <span className="text-terminal-up">OPERATIONAL</span><br/>
        VERSION: 1.0.4-STABLE
      </div>
    </aside>
  );
}
