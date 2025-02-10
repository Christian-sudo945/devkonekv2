"use client";

import { Search, Home, Users, Code2, ShoppingBag, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { MobileSearch } from "./mobile-search";
import { motion } from "framer-motion";

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function MobileNav({ activeTab, setActiveTab }: MobileNavProps) {
  const [showSearch, setShowSearch] = useState(false);

  const navItems = [
    { id: 'feed', icon: Home, label: 'Feed' },
    { id: 'developers', icon: Users, label: 'Devs' },
    { id: 'codehelp', icon: Code2, label: 'Help' },
    { id: 'marketplace', icon: ShoppingBag, label: 'Shop' },
    { id: 'messages', icon: MessageCircle, label: 'Chat' },
    { id: 'search', icon: Search, label: 'Search' },
  ];

  return (
    <>
      {showSearch && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed inset-0 z-[60] bg-background"
        >
          <MobileSearch onClose={() => setShowSearch(false)} />
        </motion.div>
      )}

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t bg-background/95 backdrop-blur-lg"
      >
        <div className="grid grid-cols-6 h-16">
          {navItems.map(({ id, icon: Icon, label }) => (
            <motion.button
              key={id}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (id === 'search') {
                  setShowSearch(true);
                } else {
                  setActiveTab(id);
                }
              }}
              className="relative flex flex-col items-center justify-center py-2"
            >
              <Icon className={cn(
                "h-5 w-5 transition-colors duration-200",
                id === activeTab ? "text-primary" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-[10px] font-medium mt-1",
                id === activeTab ? "text-primary" : "text-muted-foreground"
              )}>
                {label}
              </span>
              {id === activeTab && (
                <motion.div
                  layoutId="activeTabMobile"
                  className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
