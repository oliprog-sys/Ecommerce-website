import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: {
        ...body,
        price: body.price ? Number(body.price) : undefined,
        stockQuantity: body.stockQuantity
          ? Number(body.stockQuantity)
          : undefined,
      },
    });

    return NextResponse.json(updatedProduct);

  } catch (error) {
    console.error("PUT product error:", error);
    return NextResponse.json(
      { error: "Error updating product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Deleted successfully" });

  } catch (error) {
    console.error("DELETE product error:", error);
    return NextResponse.json(
      { error: "Error deleting product" },
      { status: 500 }
    );
  }
}