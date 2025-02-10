"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Search, User } from "lucide-react";
import { Input } from "./ui/input";
import { usePathname } from "next/navigation";
import { MobileHeader } from "./mobile-header";

const navItems = [
  { label: "Developers", href: "/developers" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Messages", href: "/messages" },
  { label: "Projects", href: "/projects" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <div className="block sm:hidden">
        <MobileHeader />
      </div>
      <nav className="sticky top-0 z-50 w-full bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm">
        <div className="layout-container h-16 flex items-center gap-6">
          <Link href="/" className="font-bold text-xl shrink-0">Logo</Link>
          
          <div className="hidden sm:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${pathname === item.href ? 'nav-link-active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3">
        
            <div className="relative hidden sm:block w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input className="search-input" placeholder="Search..." />
            </div>
            {/* Mobile Search Button */}
            <Button size="icon" variant="ghost" className="sm:hidden rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
