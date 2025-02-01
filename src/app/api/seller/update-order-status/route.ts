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
import { OrderStatus } from "@/components/pages/checkout/hooks/schema/order";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Updating order status with data:", data);

    // Validate the new status
    const validStatuses: OrderStatus[] = [
      "pending",
      "processing",
      "packaging",
      "shipped",
      "delivered",
      "completed",
      "cancelled",
    ];

    if (!validStatuses.includes(data.orderStatus as OrderStatus)) {
      return NextResponse.json(
        { status: "error", message: "Invalid order status" },
        { status: 400 }
      );
    }

    const ordersRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_ORDERS as string
    );
    const q = query(ordersRef, where("orderId", "==", data.orderId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const orderDoc = querySnapshot.docs[0];

      const updateData = {
        orderStatus: data.orderStatus,
        updatedAt: serverTimestamp(),
        shippingData: {
          ...(data.trackingNumber && { trackingNumber: data.trackingNumber }),
          ...(data.courier && { courier: data.courier }),
          ...(data.estimatedDelivery && {
            estimatedDelivery: data.estimatedDelivery,
          }),
          ...(data.actualDelivery && { actualDelivery: data.actualDelivery }),
        },
      } as const;

      await updateDoc(orderDoc.ref, updateData);
      console.log("Order status updated successfully");

      return NextResponse.json({
        status: "success",
        message: `Order status updated to ${data.orderStatus}`,
      });
    } else {
      console.error("Order not found:", data.orderId);
      return NextResponse.json(
        { status: "error", message: "Order not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to update order status" },
      { status: 500 }
    );
  }
}
