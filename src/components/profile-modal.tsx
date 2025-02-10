"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface ProfileModalProps {
  user: {
    id: string;
    name: string;
    image: string;
    bio?: string;
    location?: string;
    createdAt: string;
    role?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ user, isOpen, onClose }: ProfileModalProps) {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image} />
            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="font-semibold text-lg">{user.name}</h3>
            {user.role && (
              <span className="text-sm text-muted-foreground">{user.role}</span>
            )}
          </div>
          {user.bio && (
            <p className="text-center text-sm text-muted-foreground">{user.bio}</p>
          )}
          {user.location && (
            <p className="text-sm text-muted-foreground">📍 {user.location}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Joined {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
          </p>
          <Button className="w-full">View Full Profile</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
