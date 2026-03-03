import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function GET(
    req: Request,
    {params}: {params: {id: string}}
) {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: params.id,
            },
            include: {
                category: true,
                reviews: {
                    where: {isPublished: true},
                },
            },
        });
        
        if(!product || !product.isPublished) {
            return NextResponse.json(
                {error: "Product not found"},
                {status: 404}
            );
        }
        
        return NextResponse.json(product);

    }catch(error) {
        console.error("GET /api/products/[id] error:", error);
        return NextResponse.json(
            {error: "Error fetching product"},
            {status: 500}
        );
    }
}