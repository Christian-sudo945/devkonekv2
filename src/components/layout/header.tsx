"use client";

import { Moon, Sun, Search, User as UserIcon, LogOut, Settings, Home, Users, Code2, ShoppingBag, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";  // Add this import
import { useState, useEffect } from "react"; // Add this import

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onProfileClick?: () => void;
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    firstName?: string | null;
    lastName?: string | null;
  };
}

export function Header({ activeTab, setActiveTab, onProfileClick, user }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'developers', label: 'Developers', icon: Users },
    { id: 'codehelp', label: 'Code Help', icon: Code2 },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
  ];

  return (
    <motion.header
      className={cn(
        "fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-sm",
        scrolled ? "shadow-sm" : ""
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Logo />
            <nav className="hidden lg:flex items-center">
              {navItems.map(({ id, label, icon: Icon }) => (
                <motion.div
                  key={id}
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => setActiveTab(id)}
                    className={cn(
                      "px-4 relative",
                      activeTab === id ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {label}
                    </span>
                  </Button>
                  {activeTab === id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-9 pr-4"
              />
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.image || undefined} />
                      <AvatarFallback>{user?.name?.[0] || '?'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={onProfileClick}>
                    <UserIcon className="mr-2 h-4 w-4" />Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
