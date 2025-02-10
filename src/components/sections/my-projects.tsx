"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { SectionWrapper, itemVariants } from "./section-wrapper";
import { Plus, ExternalLink, Github } from "lucide-react";

export function MyProjectsSection() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with Next.js",
      status: "In Progress",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      githubUrl: "#",
      liveUrl: "#",
    },
  ];

  return (
    <SectionWrapper>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Projects</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                </div>
                <Badge variant={project.status === "In Progress" ? "secondary" : "default"}>
                  {project.status}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <Badge key={tech} variant="outline">{tech}</Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </Button>
                <Button size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
