import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const product = await prisma.product.create({
      data: {
        name: body.name,
        price: parseFloat(body.price),
        stock: parseInt(body.stock),
        imageUrl: body.imageUrl || "",
        categoryId: body.categoryId, // gunakan nama field yang baru
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
