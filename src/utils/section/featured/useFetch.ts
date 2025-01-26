import { useState, useEffect } from "react";

import { collection, onSnapshot, query } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { Featured } from "@/utils/section/featured/schema/schema";

export const useFetchFeatured = () => {
  const [featured, setFeatured] = useState<Featured>({
    status: 200,
    message: "Loading...",
    data: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const featuredRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_FEATURED as string
    );
    const q = query(featuredRef);

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const dataArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          createdAt: doc.data().createdAt,
          updatedAt: doc.data().updatedAt,
          imageUrl: doc.data().imageUrl,
        }));

        setFeatured({
          status: 200,
          message: "Data fetched successfully",
          data: dataArray,
        });
        setLoading(false);
      },
      (error) => {
        setFeatured({
          status: 500,
          message: error.message,
          data: [],
        });
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { featured, loading };
};
