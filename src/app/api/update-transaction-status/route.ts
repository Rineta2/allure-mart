import { db } from "@/utils/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { NextResponse } from "next/server";
import { z } from "zod";

// Define the schema for the transaction update data
const transactionUpdateSchema = z.object({
  orderId: z.string().nonempty("Order ID is required"),
  transactionStatus: z.string().optional(),
  orderStatus: z.string().optional(),
  transactionId: z.string().nonempty("Transaction ID is required"),
  transactionTime: z.string().nonempty("Transaction time is required"),
});

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate the data against the schema
    const validatedData = transactionUpdateSchema.parse(data);

    const ordersRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_ORDERS as string
    );

    // Validate collection name
    if (!process.env.NEXT_PUBLIC_COLLECTIONS_ORDERS) {
      throw new Error("Collection name is not configured");
    }

    const q = query(ordersRef, where("orderId", "==", validatedData.orderId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json(
        {
          status: "error",
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    const orderDoc = querySnapshot.docs[0];

    const updateData = {
      transactionStatus: validatedData.transactionStatus || "pending",
      orderStatus:
        validatedData.orderStatus ||
        validatedData.transactionStatus ||
        "pending",
      updatedAt: serverTimestamp(),
      transactionId: validatedData.transactionId,
      transactionTime: validatedData.transactionTime,
    };

    try {
      await updateDoc(orderDoc.ref, updateData);

      return NextResponse.json({
        status: "success",
        message: "Transaction status updated successfully",
        data: updateData,
      });
    } catch (updateError) {
      throw new Error(
        `Failed to update document: ${
          updateError instanceof Error ? updateError.message : "Unknown error"
        }`
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to update transaction status",
      },
      { status: 500 }
    );
  }
}
