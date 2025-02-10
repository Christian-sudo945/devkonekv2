import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: "Invalid file type. Only jpg, png, gif, and mp4 are allowed" 
      }, { status: 400 });
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ 
        error: "File too large. Maximum size is 10MB" 
      }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueId = uuidv4();
    const ext = file.type.split('/')[1];
    const filename = `${uniqueId}.${ext}`;
    
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    await writeFile(path.join(uploadsDir, filename), buffer);

    return NextResponse.json({ 
      success: true,
      url: `/uploads/${filename}`,
      type: file.type.startsWith('image/') ? 'image' : 'video'
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
