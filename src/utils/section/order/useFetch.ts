import { useState, useEffect } from "react";

import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db, auth } from "@/utils/firebase";

import { Order } from "@/utils/section/order/schema/schema";

export const useFetchOrder = () => {
  const [order, setOrder] = useState<Order>({
    status: 200,
    message: "Loading...",
    data: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      setOrder({
        status: 403,
        message: "User not authenticated",
        data: [],
      });
      setLoading(false);
      return;
    }

    const orderRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_ORDERS as string
    );
    const q = query(orderRef, where("userId", "==", currentUser.uid));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const dataArray = querySnapshot.docs
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
            };
          })
          .sort((a, b) => {
            const timeA = new Date(a.transactionTime || 0).getTime();
            const timeB = new Date(b.transactionTime || 0).getTime();
            return timeB - timeA;
          });

        setOrder({
          status: 200,
          message: "Data fetched successfully",
          data: dataArray,
        });
        setLoading(false);
      },
      (error) => {
        setOrder({
          status: 500,
          message: error.message,
          data: [],
        });
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { order, loading };
};
