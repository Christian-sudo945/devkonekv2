import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const postSchema = z.object({
  content: z.string().min(1, "Post content is required"),
  code: z.string().nullable().optional(),
  link: z.string().nullable().optional(),
  images: z.array(z.string()).optional().default([]),
  type: z.enum(["public", "developers", "private"]).default("public"),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await req.json();
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const post = await prisma.post.create({
      data: {
        content: json.content,
        authorId: user.id,
        type: json.type || "public",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Post creation error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const userId = searchParams.get("userId");

    // If userId is an email, find the user first
    let authorId = userId;
    if (userId?.includes('@')) {
      const user = await prisma.user.findUnique({
        where: { email: userId },
        select: { id: true },
      });
      authorId = user?.id ?? null;
    }

    const posts = await prisma.post.findMany({
      where: authorId ? { authorId } : undefined,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            role: true,
          },
        },
      },
    });

    const total = await prisma.post.count({
      where: authorId ? { authorId } : undefined,
    });

    return NextResponse.json({
      posts,
      metadata: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
