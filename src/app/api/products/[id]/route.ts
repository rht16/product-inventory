import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Ensure Prisma is correctly imported

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const productId = parseInt(params.id, 10);

    if (isNaN(productId)) {
      console.error("Invalid Product ID");
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      console.error("Product not found:", productId);
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    console.log("Product deleted successfully:", productId);
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}