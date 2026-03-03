import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            where: {
                isPublished: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                category: true,
            },
        });
        return NextResponse.json(products);
    } catch(error) {
        console.error("GET /api/products error:", error);
        return NextResponse.json(
            {error: "Error fetching products"},
            {status: 500}
        )
    }
}