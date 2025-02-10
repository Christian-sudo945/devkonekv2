import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const recentUsers = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        name: true,
        image: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      users: recentUsers,
    });
  } catch (error) {
    console.error('Error fetching recent users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent users' },
      { status: 500 }
    );
  }
}
