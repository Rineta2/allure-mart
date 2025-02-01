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
    console.log("Received Midtrans notification:", notification);

    const ordersRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_ORDERS as string
    );
    const q = query(ordersRef, where("orderId", "==", notification.order_id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const orderDoc = querySnapshot.docs[0];

      // Map Midtrans transaction status ke status aplikasi
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

      console.log("Updating order status:", {
        orderId: notification.order_id,
        transactionStatus,
        orderStatus,
      });

      await updateDoc(orderDoc.ref, {
        transactionStatus,
        transactionId: notification.transaction_id,
        paymentMethod: notification.payment_type,
        orderStatus,
        updatedAt: serverTimestamp(),
      });

      console.log("Order status updated successfully");
    } else {
      console.error("Order not found:", notification.order_id);
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Midtrans callback error:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to process callback" },
      { status: 500 }
    );
  }
}
