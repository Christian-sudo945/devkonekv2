"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function FeedSection() {
  return (
    <div className="layout-container py-8">
      <div className="section-wrapper">
        <div className="section-header">
          <div className="input-wrapper max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search feed..." className="search-input" />
          </div>
        </div>
        
        <div className="content-grid">
          {/* Feed items go here */}
        </div>
      </div>
    </div>
  );
}
