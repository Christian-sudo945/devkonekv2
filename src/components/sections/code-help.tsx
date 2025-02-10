"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Share2, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

export function CodeHelpSection() {
  const questions = [
    {
      id: 1,
      title: "How to implement authentication in Next.js?",
      description: "I'm trying to implement authentication in my Next.js application using NextAuth.js. What's the best approach for handling protected routes and user sessions?",
      tags: ["next.js", "auth", "react"],
      author: {
        name: "Jane Smith",
        image: "JS"
      },
      responses: 12,
      likes: 34,
      timestamp: "2h ago"
    },
    {
      id: 2,
      title: "Best practices for React state management",
      description: "Looking for recommendations on state management solutions for a large React application. Considering Redux vs. Context API vs. Zustand.",
      tags: ["react", "state-management", "redux"],
      author: {
        name: "Mark Johnson",
        image: "MJ"
      },
      responses: 8,
      likes: 22,
      timestamp: "4h ago"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 md:space-y-6 p-4"
    >
      <div className="grid grid-cols-1 gap-4">
        <Card className="p-4 hover:shadow-lg transition-shadow">
          <div className="solid-header">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search questions..." className="solid-input" />
            </div>
            <Button>Ask Question</Button>
          </div>

          <div className="solid-content">
            {questions.map((question) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="solid-card">
                  <Card className="p-4 sm:p-6">
                    <div className="flex gap-3 sm:gap-4">
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {question.author.image}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0 space-y-3">
                        <div>
                          <h3 className="font-semibold text-base sm:text-lg leading-tight mb-1">
                            {question.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Asked by {question.author.name} • {question.timestamp}
                          </p>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {question.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {question.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs px-2">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4 pt-2">
                          <Button variant="ghost" size="sm" className="h-8">
                            <ThumbsUp className="h-4 w-4 mr-1.5" />
                            <span className="text-xs sm:text-sm">{question.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8">
                            <MessageSquare className="h-4 w-4 mr-1.5" />
                            <span className="text-xs sm:text-sm">{question.responses}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 ml-auto">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
