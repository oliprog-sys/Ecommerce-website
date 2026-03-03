// src/app/api/test-db/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log(" Testing database connection...");
    
    const result = await prisma.$runCommandRaw({
      ping: 1
    });
    
    console.log(" Database ping successful:", result);
    
    const userCount = await prisma.user.count();
    console.log(` User count: ${userCount}`);
    
    return NextResponse.json({
      success: true,
      message: "Database connected successfully",
      userCount,
      ping: result
    });
  } catch (error) {
    console.error(" Database connection failed:", {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    return NextResponse.json({
      success: false,
      error: "Database connection failed",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}