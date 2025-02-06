import { adminDb } from "@/utils/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { productId, quantity } = await request.json();

    // Validasi input
    if (!productId || typeof quantity !== "number" || quantity <= 0) {
      return NextResponse.json(
        {
          error: "Invalid input. Product ID and positive quantity are required",
        },
        { status: 400 }
      );
    }

    // Get product reference
    const productRef = adminDb
      .collection(process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCTS as string)
      .doc(productId);

    // Get current product data
    const productDoc = await productRef.get();

    if (!productDoc.exists) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const productData = productDoc.data();
    const currentStock = productData?.stock || 0;
    const currentSold = productData?.sold || 0;
    const currentTotalSold = productData?.totalSold || 0;

    // Validasi stock availability
    if (currentStock < quantity) {
      return NextResponse.json(
        {
          error: "Insufficient stock",
          available: currentStock,
          requested: quantity,
        },
        { status: 400 }
      );
    }

    // Calculate new values
    const newStock = currentStock - quantity;
    const newSold = currentSold + quantity;
    const newTotalSold = currentTotalSold + quantity;

    // Update the document with transaction untuk atomic operation
    await adminDb.runTransaction(async (transaction) => {
      // Re-read the document inside transaction
      const doc = await transaction.get(productRef);
      if (!doc.exists) {
        throw new Error("Product no longer exists");
      }

      const data = doc.data();
      if (data?.stock < quantity) {
        throw new Error("Stock became insufficient");
      }

      transaction.update(productRef, {
        stock: newStock,
        sold: newSold,
        totalSold: newTotalSold,
        updatedAt: Timestamp.now(),
      });
    });

    return NextResponse.json({
      success: true,
      productId,
      previousStock: currentStock,
      newStock,
      previousSold: currentSold,
      newSold,
      previousTotalSold: currentTotalSold,
      newTotalSold,
      quantityReduced: quantity,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating product stock:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to update product stock",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
