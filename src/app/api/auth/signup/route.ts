import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signUpSchema } from "@/lib/validations/auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = signUpSchema.parse(body);

    if (!validatedData.email || !validatedData.password || !validatedData.firstName || !validatedData.lastName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const conditions = [];
    conditions.push({ email: validatedData.email.toLowerCase() });
    if (validatedData.phoneNumber) {
      conditions.push({ phoneNumber: `${validatedData.phonePrefix}${validatedData.phoneNumber}` });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: conditions,
      },
      include: {
        accounts: true,
      },
    });

    if (existingUser) {
      if (existingUser.email === validatedData.email.toLowerCase()) {
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 400 }
        );
      }
      if (existingUser.phoneNumber === `${validatedData.phonePrefix}${validatedData.phoneNumber}`) {
        return NextResponse.json(
          { error: "Phone number already registered" },
          { status: 400 }
        );
      }
    }

    const hashedPassword = await hash(validatedData.password, 12);

    const user = await prisma.user.create({
      data: {
        email: validatedData.email.toLowerCase(),
        firstName: validatedData.firstName.trim(),
        lastName: validatedData.lastName.trim(),
        name: `${validatedData.firstName} ${validatedData.lastName}`.trim(),
        phoneNumber: validatedData.phoneNumber 
          ? `${validatedData.phonePrefix}${validatedData.phoneNumber}`
          : null,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      );
    }
    
    console.error("Signup error:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error occurred"
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: Request) {
  return NextResponse.json({}, { status: 200 });
}
