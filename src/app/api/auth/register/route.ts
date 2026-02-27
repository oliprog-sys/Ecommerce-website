// src/app/api/auth/register/route.ts
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("📝 Registration attempt started");
    
    const body = await req.json();
    console.log("Request body:", { ...body, password: '[REDACTED]' });

    const { email, password, firstName, lastName } = body;

    // Validate input
    if (!email || !password) {
      console.log("❌ Missing required fields");
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log("🔍 Checking for existing user...");
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("❌ User already exists:", email);
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    console.log("✅ No existing user found");

    // Hash password
    console.log("🔐 Hashing password...");
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("✅ Password hashed");

    // Create user
    console.log("📦 Creating user in database...");
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName: firstName || null,
        lastName: lastName || null,
        role: "CUSTOMER",
      },
    });
    console.log("✅ User created successfully:", user.id);

    // Return success
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Registration error details:", {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    return NextResponse.json(
      { error: "Something went wrong: " + (error instanceof Error ? error.message : "Unknown error") },
      { status: 500 }
    );
  }
}