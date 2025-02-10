import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";

export async function withAuthentication(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return { error: NextResponse.json({ error: "User not found" }, { status: 404 }) };
    }

    return { user };
  } catch (error) {
    return { 
      error: NextResponse.json({ error: "Authentication failed" }, { status: 500 }) 
    };
  }
}
