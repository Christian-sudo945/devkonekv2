"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Mail, Globe, Github, Twitter, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    role: string;
    bio: string;
    location: string;
    email: string;
    website: string;
    github?: string;
    twitter?: string;
    skills: string[];
    status: string;
    badges?: string[];
    languages?: string[];
    certifications?: string[];
    projects: React.ReactNode;
    followers: React.ReactNode;
    verified?: boolean;
  };
}

export function ProfileModal({ isOpen, onClose, user }: ProfileModalProps) {
  const [showMore, setShowMore] = useState(false);

  if (!user) return null;

  const renderBadge = (badge: string) => {
    const badgeType = badge.toLowerCase();
    const className = cn(
      "verified-badge",
      {
        'ceo': badgeType.includes('ceo'),
        'developer': badgeType.includes('developer')
      }
    );

    return (
      <motion.span
        key={badge}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={className}
      >
        {badge}
      </motion.span>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed left-[50%] top-[50%] z-50 w-[95vw] max-w-2xl translate-x-[-50%] translate-y-[-50%] bg-white dark:bg-gray-950 rounded-lg shadow-xl border-0">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <DialogTitle className="sr-only">
          {user?.name}'s Profile
        </DialogTitle>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="p-6 space-y-6"
        >
          {/* Header with badges */}
          <div className="flex gap-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  {user.name[0]}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                {user.verified && (
                  <motion.svg
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-5 h-5 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </motion.svg>
                )}
              </div>
              
              <p className="text-muted-foreground">{user.role}</p>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {user.badges?.map(renderBadge)}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Bio */}
            <p className="text-muted-foreground">{user.bio}</p>

            {/* Links */}
            <div className="grid gap-2">
              <a href={`mailto:${user.email}`} className="flex items-center gap-2 text-sm hover:text-primary">
                <Mail className="h-4 w-4" /> {user.email}
              </a>
              <a href={user.website} className="flex items-center gap-2 text-sm hover:text-primary">
                <Globe className="h-4 w-4" /> {user.website}
              </a>
              {user.github && (
                <a href={user.github} className="flex items-center gap-2 text-sm hover:text-primary">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              )}
              {user.twitter && (
                <a href={user.twitter} className="flex items-center gap-2 text-sm hover:text-primary">
                  <Twitter className="h-4 w-4" /> Twitter
                </a>
              )}
            </div>

            {/* Skills and Additional Info */}
            <div className={`space-y-6 ${!showMore && 'max-h-80 overflow-hidden'}`}>
              {/* Skills */}
              <div>
                <h3 className="font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill) => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>

              {/* Expanded Content */}
              {showMore && (
                <div className="space-y-6">
                  {/* Languages */}
                  {user.languages && (
                    <div>
                      <h3 className="font-semibold mb-2">Languages & Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.languages.map((lang) => (
                          <Badge key={lang} variant="outline">{lang}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certifications */}
                  {user.certifications && (
                    <div>
                      <h3 className="font-semibold mb-2">Certifications</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {user.certifications.map((cert) => (
                          <li key={cert}>{cert}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="font-semibold">{user.projects}</div>
                      <div className="text-sm text-muted-foreground">Projects</div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="font-semibold">{user.followers}</div>
                      <div className="text-sm text-muted-foreground">Followers</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Toggle Button */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Show Less' : 'See More'}
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
