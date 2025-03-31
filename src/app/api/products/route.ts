import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Product, ProductPayload } from '@/lib/types';

export async function GET(): Promise<NextResponse<Product[] | { error: string }>> {
    try {
      const products: Product[] = await prisma.product.findMany();
      return NextResponse.json(products);
    } catch (error) {
      console.error("GET error:", error);
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
  }

  export async function POST(req: Request): Promise<NextResponse<Product | { error: string }>> {
    try {
      const { title, description, category, price, quantity, imageUrl }: ProductPayload = await req.json();
  
      const newProduct: Product = await prisma.product.create({
        data: {
          title,
          description,
          category,
          price: Number(price),
          quantity: Number(quantity),
          imageUrl,
        },
      });
  
      return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
      console.error("POST error:", error);
      return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
  }


  export async function PUT(req: Request): Promise<NextResponse<Product | { error: string }>> {
    try {
      const { id, title, description, category, price, quantity, imageUrl }: Partial<Product> = await req.json();
  
      const payload: Partial<Product> = {};
  
      if (title) payload.title = title;
      if (description) payload.description = description;
      if (category) payload.category = category;
      if (price !== undefined) payload.price = Number(price);
      if (quantity !== undefined) payload.quantity = Number(quantity);
      if (imageUrl) payload.imageUrl = imageUrl;
  
      const updatedProduct: Product = await prisma.product.update({
        where: { id },
        data: payload,
      });
  
      return NextResponse.json(updatedProduct);
    } catch (error) {
      console.error("PUT error:", error);
      return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
  }