"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

interface CommentSectionProps {
  postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch comments when component mounts
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/posts/${postId}/comments`);
        const data = await res.json();
        if (data.success) {
          setComments(data.comments);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: comment }),
      });

      if (!res.ok) throw new Error('Failed to post comment');

      const data = await res.json();
      setComments(prev => [data.comment, ...prev]);
      setComment("");
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {session?.user && (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={session.user.image || ""} />
            <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="min-h-[40px] resize-none"
              rows={1}
            />
            {comment.trim() && (
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="sm"
                  disabled={isSubmitting}
                  className="px-4"
                >
                  {isSubmitting ? "Posting..." : "Post"}
                </Button>
              </div>
            )}
          </div>
        </form>
      )}

      <AnimatePresence>
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex gap-3"
          >
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={comment.author.image} />
              <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-muted rounded-lg p-3">
                <p className="font-medium text-sm">{comment.author.name}</p>
                <p className="text-sm mt-1">{comment.content}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
