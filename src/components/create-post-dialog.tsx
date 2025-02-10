"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Code, Globe, Lock, Users, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const postSchema = z.object({
  content: z.string().min(1, "Post content is required"),
  code: z.string().nullable().optional(),
  link: z.string().nullable().optional(),
  privacy: z.enum(["public", "developers", "private"]).default("public"),
});

type PostFormData = z.infer<typeof postSchema>;

interface CreatePostDialogProps {
  onPostCreated?: () => void;
}

export function CreatePostDialog({ onPostCreated }: CreatePostDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showCode, setShowCode] = React.useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      code: null,
      link: null,
      privacy: "public",
    },
  });

  const onSubmit = async (data: PostFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      toast({
        title: "Success",
        description: "Post created successfully!",
      });

      form.reset();
      setIsOpen(false);
      if (onPostCreated) onPostCreated();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={session?.user?.image || ""} />
            <AvatarFallback>
              {session?.user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          What's on your mind?
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={session?.user?.image || ""} />
              <AvatarFallback>
                {session?.user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{session?.user?.name}</p>
              <Select
                onValueChange={(value) => form.setValue("privacy", value as "public" | "developers" | "private")}
                defaultValue="public"
              >
                <SelectTrigger className="w-[140px] h-8 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      Public
                    </div>
                  </SelectItem>
                  <SelectItem value="developers">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Developers
                    </div>
                  </SelectItem>
                  <SelectItem value="private">
                    <div className="flex items-center">
                      <Lock className="w-4 h-4 mr-2" />
                      Private
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[100px]"
              {...form.register("content")}
            />

            <AnimatePresence>
              {showCode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Textarea
                    placeholder="Share your code snippet..."
                    className="font-mono"
                    {...form.register("code")}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowCode(!showCode)}
              >
                <Code className="h-4 w-4 mr-2" />
                Code
              </Button>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Post"
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
