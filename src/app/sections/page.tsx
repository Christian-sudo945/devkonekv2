"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DevelopersSection } from "@/components/sections/developers";
import { CodeHelpSection } from "@/components/sections/code-help";
import { MarketplaceSection } from "@/components/sections/marketplace";
import MessagesSection from "@/components/sections/messages";
import { motion } from "framer-motion";

export default function SectionsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <Tabs defaultValue="developers" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="developers">Find Developers</TabsTrigger>
          <TabsTrigger value="codehelp">Code Help</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="developers">
            <DevelopersSection />
          </TabsContent>
          <TabsContent value="codehelp">
            <CodeHelpSection />
          </TabsContent>
          <TabsContent value="marketplace">
            <MarketplaceSection />
          </TabsContent>
          <TabsContent value="messages">
            <MessagesSection />
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  );
}
