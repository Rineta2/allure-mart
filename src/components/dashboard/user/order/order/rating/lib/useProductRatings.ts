import { useState, useEffect } from "react";

import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { Rating } from "@/components/dashboard/user/order/order/schema/schema";

export const useProductRatings = (productId: string) => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ratingsRef = collection(db, "products", productId, "ratings");
    const ratingsQuery = query(ratingsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      ratingsQuery,
      (snapshot) => {
        const newRatings = snapshot.docs.map((doc) => ({
          ...doc.data(),
        })) as Rating[];
        setRatings(newRatings);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching ratings:", err);
        setError("Failed to load ratings");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [productId]);

  return { ratings, loading, error };
};
