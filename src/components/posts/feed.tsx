"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share2, Code, Link, Verified, MoreVertical, ImagePlus, Link as LinkIcon, Globe, Lock, Users, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { CommentSection } from "./comment-section";
import { formatDistanceToNow } from "date-fns";
import { pusherClient } from "@/lib/pusher";
import { usePusher } from "@/providers/pusher-provider";
import { ProfileModal } from "@/components/profile-modal";
import { useRecentUsers } from "@/hooks/use-recent-users";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PostProps {
  id: string;
  author: {
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  attachments?: {
    type: 'image' | 'code' | 'link';
    content: string;
  }[];
}

const LikeAnimation = ({ isLiked }: { isLiked: boolean }) => {
  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={isLiked ? 
        { scale: [1, 1.5, 1], color: "#ef4444" } : 
        { scale: 1, color: "#64748b" }
      }
      transition={{ duration: 0.3 }}
    >
      <Heart className={`h-4 w-4 ${isLiked ? 'fill-current text-red-500' : ''}`} />
    </motion.div>
  );
};

const PostCard = ({ post }: { post: PostType }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [isLiking, setIsLiking] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleLike = async () => {
    setIsLiking(true);
    try {
      const response = await fetch(`/api/posts/${post.id}/like`, {
        method: 'POST',
      });
      const data = await response.json();
      
      if (data.success) {
        setLiked(data.liked);
        setLikeCount(data.likeCount);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl shadow-sm p-4"
    >
      {/* Post Header */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar 
          className="h-10 w-10 cursor-pointer hover:ring-2 ring-primary transition-all"
          onClick={() => setShowProfile(true)}
        >
          <AvatarImage src={post.author.image} />
          <AvatarFallback>{post.author.name?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p 
            className="font-semibold hover:underline cursor-pointer"
            onClick={() => setShowProfile(true)}
          >
            {post.author.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="space-y-4">
        <p className="whitespace-pre-wrap text-sm md:text-base">{post.content}</p>
        
        {post.code && (
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{post.code}</code>
          </pre>
        )}

        {post.link && (
          <a 
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline flex items-center gap-2"
          >
            <Link className="h-4 w-4" />
            {post.link}
          </a>
        )}

        {post.images?.length > 0 && (
          <div className="grid gap-4 mt-4">
            {post.images.map((image: string, index: number) => (
              <Image
                key={index}
                src={image}
                alt=""
                width={600}
                height={400}
                className="rounded-lg object-cover w-full"
              />
            ))}
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center gap-4 mt-4 border-t pt-4">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={handleLike}
          disabled={isLiking}
        >
          <LikeAnimation isLiked={liked} />
          <span>{likeCount}</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageSquare className="h-4 w-4" />
          <span>{post.commentCount || 0}</span>
        </Button>

        <Button variant="ghost" size="sm" className="gap-2 ml-auto">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t">
          <CommentSection postId={post.id} />
        </div>
      )}

      {/* Profile Modal */}
      <ProfileModal 
        user={{
          ...post.author,
          createdAt: post.createdAt,
        }}
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </motion.div>
  );
};

interface PostType {
  likeCount: number;
  commentCount: number;
  likes: any;
  comments: any;
  images: any;
  id: string;
  content: string;
  code?: string | null;
  link?: string | null;
  createdAt: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
}

export function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession({
    required: false,
  });
  const { channel } = usePusher();
  const { recentUsers, isLoadingUsers } = useRecentUsers();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacy, setPrivacy] = useState("public");

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          content, 
          type: privacy,
        }),
      });

      if (!response.ok) throw new Error("Failed to create post");

      setContent("");
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (!channel) return;

    const handleNewPost = (data: any) => {
      setPosts((prev) => [data.post, ...prev]);
    };

    const handleNewLike = (data: any) => {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === data.postId
            ? { ...post, likeCount: data.likeCount, liked: data.liked }
            : post
        )
      );
    };

    channel.bind("new-post", handleNewPost);
    channel.bind("post-liked", handleNewLike);

    return () => {
      channel.unbind("new-post", handleNewPost);
      channel.unbind("post-liked", handleNewLike);
    };
  }, [channel]);

  return (
    <div className="container mx-auto px-2 sm:px-4 py-6"> {/* Reduced padding on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6"> {/* Reduced gap on mobile */}
        {/* Mobile Profile & Recently Joined */}
        <div className="lg:hidden mb-6">
          {session?.user && (
            <Card className="p-4 mb-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={session.user.image || ""} />
                  <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{session.user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {session.user.email}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Recently Joined - Mobile View */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Recently Joined</h3>
            <div className="flex overflow-x-auto pb-2 gap-4 scrollbar-hide">
              {isLoadingUsers ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex-shrink-0 w-48">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-2 w-16" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                recentUsers?.map((user) => (
                  <div key={user.id} className="flex-shrink-0 w-48">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image || ""} />
                        <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Joined {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Left Sidebar - Desktop Only */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-4 space-y-4">
            {/* Profile Card */}
            <Card className="p-4">
              {session?.user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={session.user.image || ""} />
                      <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{session.user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Posts: 0</span>
                    <span>Following: 0</span>
                    <span>Followers: 0</span>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-muted-foreground">Sign in to post</p>
                </div>
              )}
            </Card>

            {/* Recently Joined Card */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Recently Joined</h3>
              <div className="space-y-4">
                {isLoadingUsers ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-2 w-16" />
                      </div>
                    </div>
                  ))
                ) : (
                  recentUsers?.map((user) => (
                    <div key={user.id} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image || ""} />
                        <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Joined {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <main className="lg:col-span-6 space-y-4 lg:space-y-6"> {/* Reduced spacing on mobile */}
          {session?.user && (
            <Card className="p-3 lg:p-4"> {/* Reduced padding on mobile */}
              <form onSubmit={handleCreatePost}>
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8 lg:w-10 lg:h-10 flex-shrink-0"> {/* Smaller avatar on mobile */}
                    <AvatarImage src={session.user.image || ""} />
                    <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <Textarea
                      id="post-input"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="What's on your mind?"
                      className="min-h-[100px] resize-none bg-muted/50 p-3"
                    />
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center">
                        <Select value={privacy} onValueChange={setPrivacy}>
                          <SelectTrigger className="w-[110px] h-8 text-xs bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">
                              <div className="flex items-center gap-2">
                                <Globe className="h-3 w-3" />
                                <span>Public</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="friends">
                              <div className="flex items-center gap-2">
                                <Users className="h-3 w-3" />
                                <span>Friends</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="private">
                              <div className="flex items-center gap-2">
                                <Lock className="h-3 w-3" />
                                <span>Private</span>
                              </div>
                            </SelectItem>
                          </SelectContent>  {/* Fixed: Added proper closing tag */}
                        </Select>

                        <div className="flex gap-0.5 ml-2">
                          <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                            <ImagePlus className="h-4 w-4" />
                          </Button>
                          <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                            <Code className="h-4 w-4" />
                          </Button>
                          <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                            <LinkIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        size="sm"
                        disabled={!content.trim() || isSubmitting}
                        className="h-8"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-3 w-3 animate-spin mr-2" />
                            Posting...
                          </>
                        ) : (
                          <>
                            Post
                            <Send className="ml-2 h-3 w-3" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </Card>
          )}
          
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-24 w-full" />
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </main>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-4 space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Trending Topics</h3>
              <div className="space-y-3">
                {/* Add trending topics here */}
                <p className="text-sm text-muted-foreground">No trending topics yet</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
