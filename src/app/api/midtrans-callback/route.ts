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

import {
  OrderStatus,
  TransactionStatus,
} from "@/components/pages/checkout/hooks/schema/order";

export async function POST(request: Request) {
  try {
    const notification = await request.json();

    // Validate collection name
    if (!process.env.NEXT_PUBLIC_COLLECTIONS_ORDERS) {
      throw new Error("Collection name is not configured");
    }

    const ordersRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_ORDERS as string
    );
    const q = query(ordersRef, where("orderId", "==", notification.order_id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const orderDoc = querySnapshot.docs[0];

      let transactionStatus: TransactionStatus;
      let orderStatus: OrderStatus;

      switch (notification.transaction_status) {
        case "capture":
        case "settlement":
          transactionStatus = "success";
          orderStatus = "processing";
          break;
        case "pending":
          transactionStatus = "pending";
          orderStatus = "pending";
          break;
        case "deny":
        case "cancel":
          transactionStatus = "cancel";
          orderStatus = "cancelled";
          break;
        case "expire":
          transactionStatus = "expired";
          orderStatus = "cancelled";
          break;
        default:
          transactionStatus = "failure";
          orderStatus = "cancelled";
      }

      const updateData = {
        transactionStatus,
        transactionId: notification.transaction_id,
        paymentMethod: notification.payment_type || "unknown",
        orderStatus,
        updatedAt: serverTimestamp(),
        ...(notification.settlement_time && {
          settlementTime: notification.settlement_time,
        }),
        // Add status message if available
        ...(notification.status_message && {
          statusMessage: notification.status_message,
        }),
      };

      await updateDoc(orderDoc.ref, updateData);
    } else {
      throw new Error(`Order not found: ${notification.order_id}`);
    }

    return NextResponse.json({
      status: "success",
      message: "Notification processed successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to process callback",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
