"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Users, MessageSquare, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  { icon: Home, label: 'Feed', value: 'feed' },
  { icon: Users, label: 'Developers', value: 'developers' },
  { icon: MessageSquare, label: 'Code Help', value: 'codehelp' },
  { icon: ShoppingBag, label: 'Marketplace', value: 'marketplace' }
];

export function NavigationMenu({ activeTab, setActiveTab }: {
  activeTab: string;
  setActiveTab: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {navigationItems.map((item) => (
        <motion.div
          key={item.value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            onClick={() => setActiveTab(item.value)}
            className={cn(
              "flex items-center gap-2",
              activeTab === item.value && "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span className="hidden md:inline">{item.label}</span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
