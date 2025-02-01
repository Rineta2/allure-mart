import { db } from "@/utils/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";
import {
  OrderStatus,
  TransactionStatus,
} from "@/components/pages/checkout/hooks/schema/order";

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    console.log("Creating order with data:", orderData);

    const orderId = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const ordersRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_ORDERS as string
    );

    try {
      const orderDoc = await addDoc(ordersRef, {
        orderId,
        ...orderData,
        orderStatus: "pending" as OrderStatus,
        transactionStatus: "pending" as TransactionStatus,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      console.log("Order document created successfully:", orderDoc.id);

      return NextResponse.json({
        status: "success",
        orderId,
        orderDocId: orderDoc.id,
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      throw dbError;
    }
  } catch (error) {
    console.error("Error in create-order route:", error);
    return NextResponse.json(
      {
        status: "error",
        message:
          error instanceof Error ? error.message : "Error creating order",
      },
      { status: 500 }
    );
  }
}
