import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { withAuthentication } from "@/lib/api-middlewares";

export async function POST(req: Request, { params }: { params: { postId: string } }) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const postId = params.postId;
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId: user.id,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id },
      });

      await prisma.post.update({
        where: { id: postId },
        data: { likeCount: { decrement: 1 } },
      });

      return NextResponse.json({ success: true, liked: false });
    }

    await prisma.like.create({
      data: {
        postId,
        userId: user.id,
      },
    });

    await prisma.post.update({
      where: { id: postId },
      data: { likeCount: { increment: 1 } },
    });

    return NextResponse.json({ success: true, liked: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process like" }, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const auth = await withAuthentication(req);
  if (auth.error) return auth.error;

  try {
    const { postId } = params;

    const [like, post] = await Promise.all([
      prisma.like.findFirst({
        where: {
          postId,
          userId: auth.user.id,
        },
      }),
      prisma.post.findUnique({
        where: { id: postId },
        select: { likeCount: true },
      }),
    ]);

    return NextResponse.json({
      success: true,
      liked: !!like,
      likeCount: post?.likeCount ?? 0,
    });
  } catch (error) {
    console.error("Like check error:", error);
    return NextResponse.json(
      { error: "Failed to check like status" },
      { status: 500 }
    );
  }
}
