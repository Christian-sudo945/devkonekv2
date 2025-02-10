"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, MessageSquare, Mail, Users2, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function MessagesSection() {
  const messages = []; // Empty messages array

  return (
    <div className="space-y-0.5">
      <div className="section-wrapper">
        <header className="section-header pb-2">
          <div className="w-full flex gap-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="search-input" />
            </div>
            <button className="filter-button">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </header>
        
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="flex flex-col items-center max-w-sm text-center space-y-4">
            <div className="p-4 rounded-full bg-gray-100/80 dark:bg-gray-800/50">
              <Mail className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg">No messages yet</h3>
            <p className="text-sm text-muted-foreground">
              Connect with developers and start collaborating on projects together.
            </p>
            <div className="flex flex-col gap-2 w-full mt-4">
              <Button className="w-full">
                <Users2 className="h-4 w-4 mr-2" />
                Find Developers
              </Button>
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-2">
                <Clock className="h-3 w-3" />
                Messages will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
