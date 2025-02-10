"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Code, Link, Image, Loader2 } from "lucide-react";

const postSchema = z.object({
  content: z.string().min(1, "Post content is required"),
  code: z.string().nullable().optional(),
  link: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
  visibility: z.enum(["public", "private", "followers"]).default("public"),
});

export function CreatePost({ onPostCreated }: { onPostCreated?: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      code: "",
      link: "",
      tags: [],
      visibility: "public",
    },
  });

  const onSubmit = async (data: z.infer<typeof postSchema>) => {
    try {
      setIsLoading(true);
      
      const postData = {
        ...data,
        code: data.code || null,
        link: data.link || null,
        tags: data.tags || [],
      };

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create post");
      }

      form.reset();
      toast({
        title: "Success",
        description: "Post created successfully!",
      });

      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.error("Post creation error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create post",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Textarea
          placeholder="What's on your mind?"
          {...form.register("content")}
          className="min-h-[100px]"
        />
        {form.formState.errors.content && (
          <p className="text-sm text-red-500">
            {form.formState.errors.content.message}
          </p>
        )}

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                const code = form.getValues("code");
                form.setValue("code", code ? "" : " ");
              }}
            >
              <Code className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                const link = form.getValues("link");
                form.setValue("link", link ? "" : "https://");
              }}
            >
              <Link className="h-4 w-4" />
            </Button>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Post"
            )}
          </Button>
        </div>

        {form.watch("code") && (
          <Textarea
            placeholder="Add your code here..."
            {...form.register("code")}
            className="font-mono text-sm"
          />
        )}

        {form.watch("link") && (
          <input
            type="url"
            placeholder="https://"
            {...form.register("link")}
            className="w-full p-2 border rounded"
          />
        )}
      </form>
    </Card>
  );
}
