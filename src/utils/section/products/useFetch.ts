import { useState, useEffect } from "react";

import { collection, onSnapshot, query } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { Product } from "@/utils/section/products/schema/schema";

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product>({
    status: 200,
    message: "Loading...",
    data: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const productsRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCTS as string
    );
    const q = query(productsRef);

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const dataArray = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.title,
            title: data.title,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            description: data.description,
            category: {
              name: data.category?.name,
              content: data.category?.content,
            },
            content: data.content,
            price: data.price || 0,
            stock: data.stock || 0,
            slug: data.slug,
            author: {
              displayName: data.author?.displayName,
              photoURL: data.author?.photoURL,
              uid: data.author?.uid,
              role: data.author?.role,
            },
            gender: {
              name: data.gender?.name,
            },
            imageSlider: data.imageSlider || [],
            merek: {
              name: data.merek?.name,
            },
            thumbnail: data.thumbnail,
          };
        });

        setProducts({
          status: 200,
          message: "Data fetched successfully",
          data: dataArray,
        });
        setLoading(false);
      },
      (error) => {
        setProducts({
          status: 500,
          message: error.message,
          data: [],
        });
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { products, loading };
};
