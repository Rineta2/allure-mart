import { useState, useEffect } from "react";

import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { useAuth } from "@/components/router/auth/AuthContext";

import { OrderData } from "@/utils/section/order/schema/schema";

export interface Order {
  status: number;
  message: string;
  data: OrderData[];
  loading: boolean;
  error: string | null;
}

export const useFetchOrder = () => {
  const [order, setOrder] = useState<Order>({
    status: 200,
    message: "Loading...",
    data: [],
    loading: true,
    error: null,
  });

  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setOrder((prev) => ({
          ...prev,
          loading: false,
          error: "User not authenticated",
        }));
        return;
      }

      try {
        const ordersRef = collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_ORDERS as string
        );
        const q = query(ordersRef, where("userId", "==", user.uid));
        const querySnapshot = await onSnapshot(
          q,
          (snapshot) => {
            const dataArray = snapshot.docs
              .map((doc) => {
                const data = doc.data();
                return {
                  id: doc.id,
                  orderId: data.orderId,
                  transactionId: data.transactionId,
                  orderStatus: data.orderStatus,
                  transactionStatus: data.transactionStatus,
                  transactionTime: data.transactionTime,

                  // Address related fields
                  address: data.address,
                  addressDetail: data.addressDetail,
                  city: data.city,
                  province: data.province,
                  district: data.district,
                  zipCode: data.zipCode,
                  type: data.type,

                  // User information
                  userId: data.userId,
                  fullName: data.fullName,
                  email: data.email,
                  phone: data.phone,

                  // Order details
                  items: data.items || [],
                  totalAmount: data.totalAmount,
                  totalItems: data.totalItems,
                  message: data.message,

                  // Timestamps
                  createdAt: data.createdAt,
                  updatedAt: data.updatedAt,
                } as OrderData;
              })
              .sort((a, b) => {
                const timeA = new Date(a.transactionTime || 0).getTime();
                const timeB = new Date(b.transactionTime || 0).getTime();
                return timeB - timeA;
              });

            setOrder({
              status: 200,
              message: "Orders fetched successfully",
              data: dataArray,
              loading: false,
              error: null,
            });
          },
          (error) => {
            console.error("Error fetching orders:", error);
            setOrder({
              status: 500,
              message: "Failed to fetch orders",
              data: [],
              loading: false,
              error:
                error instanceof Error
                  ? error.message
                  : "Unknown error occurred",
            });
          }
        );

        return () => {
          querySnapshot();
        };
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrder({
          status: 500,
          message: "Failed to fetch orders",
          data: [],
          loading: false,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
    };

    fetchOrders();
  }, [user]);

  return order;
};
