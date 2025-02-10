"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
}

const projects: Project[] = []; 

export default function ProjectsSection() {
  return (
    <main className="layout-container py-6">
      <section className="section-wrapper">
        <header className="section-header">
          <div className="w-full sm:max-w-md flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input placeholder="Search projects..." className="search-input" />
            </div>
            <button className="filter-button shrink-0">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
          <Button size="default" className="w-full sm:w-auto">
            New Project
          </Button>
        </header>

        {projects.length > 0 ? (
          <motion.div 
            className="content-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {projects.map((project) => (
              <motion.div 
                key={project.id}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="card-base">
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm text-foreground-muted">{project.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="section-content">
            <div className="empty-state">
              <h3 className="font-medium text-lg">No projects found</h3>
              <p className="text-sm text-gray-500">Create your first project to get started</p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
