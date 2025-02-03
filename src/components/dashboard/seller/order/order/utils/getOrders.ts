import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

export interface Order {
  id: string;
  address: string;
  addressDetail: string;
  city: string;
  createdAt: Timestamp;
  displayName: string;
  district: string;
  email: string;
  fullName: string;
  items: OrderItem[];
  message: string;
  orderId: string;
  orderStatus: "shipped" | string; // Add other possible statuses
  phone: string;
  province: string;
  totalAmount: number;
  totalItems: number;
  transactionId: string;
  transactionStatus: "success" | string; // Add other possible statuses
  transactionTime: string;
  type: string;
  updatedAt: Timestamp;
  userId: string;
  photoURL: string;
  zipCode: string;
}

export async function getOrders() {
  try {
    const ordersRef = collection(db, "orders");
    const ordersSnapshot = await getDocs(ordersRef);
    const orders = ordersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[];

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}
