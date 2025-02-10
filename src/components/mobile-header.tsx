"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import Link from "next/link";

export function MobileHeader() {
  return (
    <>
      <div className="h-14" /> {/* Spacer */}
      <div className="mobile-header border-0">
        <div className="mobile-search-container">
          <Link href="/" className="text-base font-semibold shrink-0">
            Logo
          </Link>
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="search-input border-0 bg-gray-100 dark:bg-gray-800/50" 
            />
          </div>
        </div>
      </div>
    </>
  );
}
