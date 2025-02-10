"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Filter, LayoutGrid, List } from "lucide-react";
import { motion } from "framer-motion";
import { ProfileModal } from "@/components/ui/profile-modal";
import { SectionWrapper, itemVariants } from "./section-wrapper";
import { cn } from "@/lib/utils";

export function DevelopersSection() {
  const [selectedDev, setSelectedDev] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const developers = [
    {
      id: 1,
      name: "Marcus Salopaso",
      role: "CEO & Lead Developer",
      bio: "Passionate about web development and building great user experiences",
      location: "Manila, Philippines",
      email: "marcus@devkonek.com",
      website: "https://marcus.dev",
      github: "https://github.com/marcus",
      twitter: "https://twitter.com/marcus",
      skills: ["React", "Node.js", "TypeScript", "MongoDB"],
      languages: [
        "React", "Next.js", "TypeScript", "Node.js", 
        "Python", "FastAPI", "MongoDB", "Docker", "AWS"
      ],
      badges: ["CEO", "Verified Developer", "Senior Developer"],
      certifications: ["AWS Certified Developer", "MongoDB Certified"],
      verified: true,
      projects: 15,
      followers: 230,
      status: "Available for work",
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Christian Emmanuel",
      role: "CEO & Lead Developer",
      bio: "CEO & Lead Developer at DevKonek",
      location: "Davao City, Philippines",
      email: "christian@devkonek.com",
      website: "https://devkonek.com",
      github: "https://github.com/christian",
      twitter: "https://twitter.com/christian",
      skills: ["React", "Vue.js", "TailwindCSS", "Figma"],
      languages: [
        "React", "Next.js", "Tailwind CSS", "Node.js",
        "PostgreSQL", "Docker", "AWS", "Django"
      ],
      badges: ["CEO", "Verified Developer"],
      certifications: ["Google Certified Developer", "Vue.js Expert"],
      verified: true,
      projects: 23,
      followers: 180,
      status: "Currently employed",
      lastActive: "5 minutes ago"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 md:space-y-6 p-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Add developer cards here */}
        {developers.map((dev) => (
          <motion.div 
            key={dev.id}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-4 hover:shadow-lg transition-shadow" onClick={() => {
              setSelectedDev(dev);
              setIsProfileOpen(true);
            }}>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                      {dev.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{dev.name}</h3>
                      {dev.verified && (
                        <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{dev.role}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {dev.badges?.slice(0, 3).map((badge, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{dev.location}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {dev.languages?.slice(0, 4).map((lang, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                  {dev.languages?.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{dev.languages.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedDev && (
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => {
            setIsProfileOpen(false);
            setSelectedDev(null);
          }}
          user={selectedDev}
        />
      )}
    </motion.div>
  );
}
