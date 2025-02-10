"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Globe, Users, Lock, Code, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

const postSchema = z.object({
  content: z.string().min(1, "Post content is required"),
  code: z.string().nullable().optional(),
  link: z.string().nullable().optional(),
  visibility: z.enum(["public", "developers", "private"]).default("public"),
});

type FormData = z.infer<typeof postSchema>;

interface Props {
  onPostCreated?: () => void;
}

export function CreatePostDialog({ onPostCreated }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedVisibility, setSelectedVisibility] = React.useState<FormData["visibility"]>("public");
  const [showCodeEditor, setShowCodeEditor] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      code: null,
      link: null,
      visibility: "public",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, visibility: selectedVisibility }),
      });

      if (!response.ok) throw new Error("Failed to create post");

      toast({ title: "Success", description: "Post created successfully!" });
      setIsOpen(false);
      form.reset();
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
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full"
        >
          <Button
            variant="outline"
            className="w-full flex items-center gap-3 h-12 px-4"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={session?.user?.image || ""} />
              <AvatarFallback>
                {session?.user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground">What's on your mind?</span>
          </Button>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={session?.user?.image || ""} />
              <AvatarFallback>
                {session?.user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{session?.user?.name}</span>
              <div className="flex gap-2">
                {["public", "developers", "private"].map((v) => (
                  <Button
                    key={v}
                    type="button"
                    size="sm"
                    variant={selectedVisibility === v ? "default" : "outline"}
                    onClick={() => setSelectedVisibility(v as FormData["visibility"])}
                    className={cn("flex gap-2", 
                      isLoading && "pointer-events-none opacity-50"
                    )}
                  >
                    {v === "public" && <Globe className="h-4 w-4" />}
                    {v === "developers" && <Users className="h-4 w-4" />}
                    {v === "private" && <Lock className="h-4 w-4" />}
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <Textarea
            placeholder="What's on your mind?"
            className="min-h-[120px] resize-none"
            {...form.register("content")}
            disabled={isLoading}
          />

          <AnimatePresence>
            {showCodeEditor && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <Textarea
                  placeholder="Share your code..."
                  className="font-mono"
                  {...form.register("code")}
                  disabled={isLoading}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowCodeEditor(!showCodeEditor)}
              disabled={isLoading}
            >
              <Code className="h-4 w-4 mr-2" />
              Code
            </Button>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Posting...
                </>
              ) : (
                "Post"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
