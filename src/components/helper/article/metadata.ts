import { Metadata } from "next";

import { db } from "@/utils/firebase";

import { collection, getDocs, query, where } from "firebase/firestore";

export interface Article {
  title: string;
  description: string;
  thumbnail: string[];
  slug: string;
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const articleRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_ARTICLES as string
    );
    const q = query(articleRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const articleData = querySnapshot.docs[0].data() as Article;
    return articleData;
  } catch (error) {
    console.error("Error fetching Article:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getArticle(params.slug);

  return {
    title: product ? `${product.title}` : "Product Not Found",
    description: product?.description || "Product description not available",
    openGraph: {
      title: product ? `${product.title}` : "Product Not Found",
      description: product?.description || "Product description not available",
      images: product?.thumbnail ? [product.thumbnail[0]] : [],
    },
  };
}
