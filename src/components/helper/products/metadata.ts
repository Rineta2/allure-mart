import { Metadata } from "next";

import { db } from "@/utils/firebase";

import { collection, getDocs, query, where } from "firebase/firestore";

export interface Product {
  title: string;
  description: string;
  thumbnail: string[];
  slug: string;
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const productsRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCTS as string
    );
    const q = query(productsRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const productData = querySnapshot.docs[0].data() as Product;
    return productData;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);

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
