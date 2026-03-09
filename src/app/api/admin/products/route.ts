import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { name, slug, description, price, stockQuantity, categoryId, sku } = body;

    if (!name || !slug || !price || !sku) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // check if slug already exists
    const existingSlug = await prisma.product.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      return NextResponse.json(
        { error: "Product with this slug already exists" },
        { status: 400 },
      );
    }

    // Check if SKU already exists
    const existingSku = await prisma.product.findUnique({
      where: { sku },
    });

     if (existingSku) {
      return NextResponse.json(
        { error: "Product with this SKU already exists" },
        { status: 400 },
      );
    }

    const finalCategoryId = !categoryId || categoryId === "" ? null : categoryId;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || "",
        sku,
        price: Number(price),
        stockQuantity: Number(stockQuantity) || 0,
        categoryId: finalCategoryId,
        isPublished: false,
        images: "[]", 
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    });

    const serializedProduct = {
      ...product,
      price: Number(product.price),
      images: JSON.parse(product.images as string),
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    };

    return NextResponse.json(serializedProduct, { status: 201 });

  } catch (error) {
    console.error("POST /api/admin/products error:", error);
    return NextResponse.json(
      { error: "Error creating product" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
   const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { 
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      },
    });

    const serializedProducts = products.map(product => ({
      ...product,
      price: Number(product.price),
      compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
      images: typeof product.images === 'string' ? JSON.parse(product.images) : product.images,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    }));

    return NextResponse.json(serializedProducts);

  } catch (error) {
    console.error("GET /api/admin/products error:", error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}
