"use client";

import { X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface MobileSearchProps {
  onClose: () => void;
}

export function MobileSearch({ onClose }: MobileSearchProps) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Search</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <Input 
        placeholder="Search anything..." 
        className="w-full"
        autoFocus
      />
    </div>
  );
}
