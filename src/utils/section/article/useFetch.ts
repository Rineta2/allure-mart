import { useState, useEffect } from "react";

import { collection, onSnapshot, query } from "firebase/firestore";

import { db } from "@/utils/firebase";

import { Article, ArticleData } from "@/utils/section/article/schema/schema";

export const useFetchArticles = () => {
  const [articles, setArticles] = useState<Article>({
    status: 200,
    message: "Loading...",
    data: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const articlesRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_ARTICLES as string
    );
    const q = query(articlesRef);

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const dataArray = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            description: data.description,
            content: data.content,
            categoryName: data.categoryName,
            slug: data.slug,
            imageUrl: data.imageUrl,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            authorId: data.authorId,
            authorName: data.authorName,
            authorRole: data.authorRole,
            authorPhoto: data.authorPhoto,
          };
        });

        setArticles({
          status: 200,
          message: "Data fetched successfully",
          data: dataArray as ArticleData[],
        });
        setLoading(false);
      },
      (error) => {
        setArticles({
          status: 500,
          message: error.message,
          data: [],
        });
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { articles, loading };
};
