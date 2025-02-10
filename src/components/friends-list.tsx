"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Star, Briefcase, Verified } from "lucide-react";

export function FriendsList() {
  const developers = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Full Stack Developer",
      avatar: "",
      verified: true,
      projects: 45,
      rating: 4.9,
      skills: ["React", "Node.js", "TypeScript"]
    },
    // Add more developers...
  ];

  return (
    <div className="space-y-4">
      {developers.map(dev => (
        <Card key={dev.id} className="p-4">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src={dev.avatar} alt={dev.name} className="h-12 w-12" />
              <AvatarFallback className="h-12 w-12">{dev.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{dev.name}</h3>
                {dev.verified && <Verified className="h-4 w-4 text-blue-500" />}
              </div>
              <p className="text-sm text-gray-500">{dev.title}</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  {dev.projects} projects
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  {dev.rating}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {dev.skills.map(skill => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
            <Button size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Connect
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
