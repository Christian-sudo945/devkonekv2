"use client";

import { useState, useRef } from "react";
import { Image as ImageIcon, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  onRemove: () => void;
  disabled?: boolean;
}

export function ImageUpload({ onImageUpload, onRemove, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to your storage service
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      onImageUpload(data.url);
    } catch (error) {
      console.error("Upload error:", error);
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onRemove();
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
        disabled={disabled || isUploading}
      />

      {!preview ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={cn(
            "w-full flex items-center gap-2",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || isUploading}
        >
          <ImageIcon className="h-4 w-4" />
          Add Image
        </Button>
      ) : (
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src={preview}
            alt="Preview"
            width={400}
            height={300}
            className="w-full object-cover rounded-lg"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemove}
            disabled={disabled || isUploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
    </div>
  );
}
