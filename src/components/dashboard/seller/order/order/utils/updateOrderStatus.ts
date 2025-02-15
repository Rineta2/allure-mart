import { db } from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { OrderStatus } from "@/components/pages/checkout/hooks/schema/order";

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  try {
    const orderRef = doc(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_ORDERS as string,
      orderId
    );
    await updateDoc(orderRef, {
      orderStatus: status,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}
