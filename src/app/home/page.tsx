"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Feed } from "@/components/posts/feed";
import { DevelopersSection } from '@/components/sections/developers';
import { CodeHelpSection } from '@/components/sections/code-help';
import { MarketplaceSection } from '@/components/sections/marketplace';
import { Header } from '@/components/layout/header';
import { MobileNav } from "@/components/mobile-nav";
import MessagesSection from "@/components/sections/messages";
import ProjectsSection from '@/components/sections/projects';
import { MobileSearch } from "@/components/mobile-search";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/components/profile/UserProfile";
import { UserData } from "@/components/profile/UserProfile";

interface ExtendedUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  role?: string | null;
}

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('feed');
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white" />
      </div>
    );
  }
  if (!session?.user) {
    return null;
  }

  const userData: UserData = {
    id: session?.user?.email || 'default-id',
    name: session?.user?.name || null,
    email: session?.user?.email || null,
    image: session?.user?.image || null,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onProfileClick={() => setShowProfile(!showProfile)}
        user={userData}
      />

      <main className="container mx-auto px-4 pt-20 pb-24 md:pb-6">
        {showProfile ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <UserProfile user={userData} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {activeTab === "feed" && <Feed />}
            {activeTab === "developers" && <DevelopersSection />}
            {activeTab === "codehelp" && <CodeHelpSection />}
            {activeTab === "marketplace" && <MarketplaceSection />}
            {activeTab === "messages" && <MessagesSection />}
          </motion.div>
        )}
      </main>

      <MobileNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      />
    </div>
  );
}