import { db } from "@/utils/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";
import { TransactionStatus } from "@/components/pages/checkout/hooks/schema/order";

// Define the schema for the transaction update data

export async function POST(request: Request) {
  try {
    const { orderId, transactionStatus } = await request.json();

    const ordersRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_ORDERS as string
    );

    // Validate collection name
    if (!process.env.NEXT_PUBLIC_COLLECTIONS_ORDERS) {
      throw new Error("Collection name is not configured");
    }

    const q = query(ordersRef, where("orderId", "==", orderId));
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

    await updateDoc(orderDoc.ref, {
      transactionStatus: transactionStatus as TransactionStatus,
      updatedAt: new Date(),
    });

    return NextResponse.json({
      status: "success",
      message: "Transaction status updated successfully",
    });
  } catch (error) {
    console.error("Error updating transaction status:", error);
    return NextResponse.json(
      {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Error updating transaction status",
      },
      { status: 500 }
    );
  }
}
