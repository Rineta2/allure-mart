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
    const data = await request.json();
    console.log("Updating transaction status with data:", data);

    const ordersRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_ORDERS as string
    );
    const q = query(ordersRef, where("orderId", "==", data.orderId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const orderDoc = querySnapshot.docs[0];

      let orderStatus: OrderStatus;
      const transactionStatus = data.transactionStatus as TransactionStatus;

      // Map transaction status to order status
      switch (transactionStatus) {
        case "success":
          orderStatus = "processing";
          break;
        case "pending":
          orderStatus = "pending";
          break;
        case "failure":
        case "expired":
        case "cancel":
          orderStatus = "cancelled";
          break;
        default:
          orderStatus = "pending";
      }

      const updateData = {
        transactionStatus: transactionStatus,
        orderStatus: orderStatus,
        transactionId: data.transactionId,
        paymentMethod: data.paymentType,
        transactionTime: data.transactionTime,
        updatedAt: serverTimestamp(),
      } as const;

      if (data.fraudStatus) {
        Object.assign(updateData, { fraudStatus: data.fraudStatus });
      }

      await updateDoc(orderDoc.ref, updateData);
      console.log("Order status updated successfully");

      return NextResponse.json({ status: "success" });
    } else {
      console.error("Order not found:", data.orderId);
      return NextResponse.json(
        { status: "error", message: "Order not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error updating transaction status:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to update transaction status" },
      { status: 500 }
    );
  }
}
