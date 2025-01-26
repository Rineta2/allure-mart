import { useState, useEffect } from "react";

import axios from "axios";

import { Product } from "@/utils/section/products/schema/schema";

interface IntegerValue {
  integerValue: number;
}

interface DoubleValue {
  doubleValue: number;
}

type NumberValue = IntegerValue | DoubleValue | undefined;

function isIntegerValue(value: NumberValue): value is IntegerValue {
  return value !== undefined && "integerValue" in value;
}

function isDoubleValue(value: NumberValue): value is DoubleValue {
  return value !== undefined && "doubleValue" in value;
}

// Define Firestore document structure
interface FirestoreDocument {
  name: string;
  fields: {
    title?: { stringValue: string };
    createdAt?: { timestampValue: string };
    updatedAt?: { timestampValue: string };
    description?: { stringValue: string };
    category?: {
      mapValue: {
        fields: {
          name: { stringValue: string };
          content: { stringValue: string };
        };
      };
    };
    price?: IntegerValue | DoubleValue;
    stock?: { integerValue: number };
    slug?: { stringValue: string };
    content?: { stringValue: string };
    gender?: { mapValue: { fields: { name: { stringValue: string } } } };
    imageSlider?: { arrayValue: { values: { stringValue: string }[] } };
    merek?: { mapValue: { fields: { name: { stringValue: string } } } };
    thumbnail?: { stringValue: string };
  };
}

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product>({
    status: 200,
    message: "Loading...",
    data: [],
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
        const collectionPath = process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCTS;
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        const response = await axios.get(
          `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionPath}?key=${apiKey}`
        );

        if (response.data && response.data.documents) {
          const dataArray = response.data.documents.map(
            (doc: FirestoreDocument) => {
              const docId = doc.name.split("/").pop();

              return {
                id: docId,
                title: doc.fields?.title?.stringValue || "",
                createdAt: doc.fields?.createdAt?.timestampValue || "",
                updatedAt: doc.fields?.updatedAt?.timestampValue || "",
                description: doc.fields?.description?.stringValue || "",
                category: {
                  name:
                    doc.fields?.category?.mapValue?.fields?.name?.stringValue ||
                    "",
                  content:
                    doc.fields?.category?.mapValue?.fields?.content
                      ?.stringValue || "",
                },
                content: doc.fields?.content?.stringValue || "",
                price: isIntegerValue(doc.fields?.price)
                  ? doc.fields.price.integerValue
                  : isDoubleValue(doc.fields?.price)
                  ? doc.fields.price.doubleValue
                  : 0,
                stock: doc.fields?.stock?.integerValue || 0,
                slug: doc.fields?.slug?.stringValue || "",
                gender: {
                  name:
                    doc.fields?.gender?.mapValue?.fields?.name?.stringValue ||
                    "",
                },
                imageSlider:
                  doc.fields?.imageSlider?.arrayValue?.values?.map(
                    (v) => v.stringValue
                  ) || [],
                merek: {
                  name:
                    doc.fields?.merek?.mapValue?.fields?.name?.stringValue ||
                    "",
                },
                thumbnail: doc.fields?.thumbnail?.stringValue || "",
              };
            }
          );

          setProducts({
            status: 200,
            message: "Data fetched successfully",
            data: dataArray,
          });
        } else {
          setProducts({
            status: 404,
            message: "No data found",
            data: [],
          });
        }
      } catch (err) {
        setProducts({
          status: 500,
          message: err instanceof Error ? err.message : "An error occurred",
          data: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return { products, loading };
};
