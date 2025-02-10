"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Mail, MapPin, Globe, Github } from "lucide-react";
import React from "react";

export interface UserData {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  skills?: string[];
}

export function UserProfile({ user }: { user: UserData }) {
  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-background/95 backdrop-blur-sm p-4 md:p-6"
    >
      <div className="container mx-auto max-w-2xl">
        <div className="bg-card rounded-lg shadow-lg border p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.image || undefined} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>

          {user.bio && (
            <p className="text-muted-foreground">{user.bio}</p>
          )}

          <div className="flex flex-wrap gap-2">
            {user.skills?.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {user.email && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mr-2" />
                {user.email}
              </div>
            )}
            {user.location && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                {user.location}
              </div>
            )}
            {user.website && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Globe className="w-4 h-4 mr-2" />
                <a href={user.website} target="_blank" rel="noopener noreferrer" 
                   className="hover:underline">
                  {user.website}
                </a>
              </div>
            )}
            {user.github && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Github className="w-4 h-4 mr-2" />
                <a href={`https://github.com/${user.github}`} 
                   target="_blank" rel="noopener noreferrer"
                   className="hover:underline">
                  {user.github}
                </a>
              </div>
            )}
          </div>

          {/* Add user posts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Posts</h3>
            <UserPosts userId={user.id} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function UserPosts({ userId }: { userId: string }) {
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchUserPosts() {
      try {
        const response = await fetch(`/api/posts?userId=${userId}`);
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserPosts();
  }, [userId]);

  if (isLoading) {
    return <div className="text-center">Loading posts...</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center text-muted-foreground">No posts yet</div>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post: any) => (
        <div key={post.id} className="bg-muted p-4 rounded-lg">
          <p>{post.content}</p>
          {post.code && (
            <pre className="mt-2 p-2 bg-muted-foreground/10 rounded">
              <code>{post.code}</code>
            </pre>
          )}
          {post.link && (
            <a 
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline mt-2 block"
            >
              {post.link}
            </a>
          )}
          <div className="mt-2 text-sm text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}
