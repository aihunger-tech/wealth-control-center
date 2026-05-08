'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, TrendingUp, Newspaper, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOBILE_NAV_ITEMS = [
  { name: 'Dash', href: '/', icon: LayoutDashboard },
  { name: 'Strat', href: '/strategy', icon: TrendingUp },
  { name: 'News', href: '/news', icon: Newspaper },
  { name: 'Watch', href: '/watchlist', icon: Wallet },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-terminal-dark border-t border-terminal-lightGray flex justify-around items-center py-3 px-2 pb-6">
      {MOBILE_NAV_ITEMS.map((item) => (
        <Link 
          key={item.href} 
          href={item.href}
          className={cn(
            "flex flex-col items-center gap-1 transition-all duration-200",
            pathname === item.href 
              ? "text-terminal-accent" 
              : "text-gray-500"
          )}
        >
          <item.icon size={22} />
          <span className="text-[10px] font-medium uppercase tracking-tighter">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}
