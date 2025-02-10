"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, VideoIcon, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";

interface MediaUploadProps {
  onUpload: (media: { url: string; type: 'image' | 'video' }[]) => void;
  maxFiles?: number;
}

export function MediaUpload({ onUpload, maxFiles = 4 }: MediaUploadProps) {
  const [files, setFiles] = useState<{ url: string; type: 'image' | 'video' }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles?.length) return;

    if (files.length + selectedFiles.length > maxFiles) {
      toast({
        title: "Error",
        description: `Maximum ${maxFiles} files allowed`,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const uploadedFiles = await Promise.all(
        Array.from(selectedFiles).map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) throw new Error("Upload failed");

          const data = await response.json();
          return {
            url: data.url,
            type: file.type.startsWith("image/") ? "image" as const : "video" as const,
          };
        })
      );

      const newFiles = [...files, ...uploadedFiles];
      setFiles(newFiles);
      onUpload(newFiles);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload media",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onUpload(newFiles);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => document.getElementById("image-upload")?.click()}
          disabled={isUploading || files.length >= maxFiles}
        >
          <ImagePlus className="h-4 w-4 mr-2" />
          Add Image
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => document.getElementById("video-upload")?.click()}
          disabled={isUploading || files.length >= maxFiles}
        >
          <VideoIcon className="h-4 w-4 mr-2" />
          Add Video
        </Button>
      </div>

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleUpload}
      />
      <input
        id="video-upload"
        type="file"
        accept="video/*"
        multiple
        className="hidden"
        onChange={handleUpload}
      />

      {isUploading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Uploading...
        </div>
      )}

      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden">
              {file.type === "image" ? (
                <Image
                  src={file.url}
                  alt=""
                  width={200}
                  height={200}
                  className="object-cover"
                />
              ) : (
                <video
                  src={file.url}
                  className="w-full h-[200px] object-cover"
                  controls
                />
              )}
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
