import { useState, useEffect } from "react";

import axios from "axios";

import {
  Featured,
  FirestoreDocument,
} from "@/utils/section/featured/schema/schema";

export const useFetchFeatured = () => {
  const [featured, setFeatured] = useState<Featured>({
    status: 200,
    message: "Loading...",
    data: [],
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
        const collectionPath = process.env.NEXT_PUBLIC_COLLECTIONS_FEATURED;
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        const response = await axios.get(
          `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionPath}?key=${apiKey}`
        );

        if (response.data && response.data.documents) {
          const dataArray = response.data.documents.map(
            (doc: FirestoreDocument) => {
              const docId = doc.name.split("/").pop();
              const fields = doc.fields;

              return {
                id: docId,
                title: fields.title?.stringValue || "",
                createdAt: fields.createdAt?.timestampValue || "",
                updatedAt: fields.updatedAt?.timestampValue || "",
                imageUrl: fields.imageUrl?.stringValue || "",
              };
            }
          );

          setFeatured({
            status: 200,
            message: "Data fetched successfully",
            data: dataArray,
          });
        } else {
          setFeatured({
            status: 404,
            message: "No data found",
            data: [],
          });
        }
      } catch (err) {
        setFeatured({
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

  return { featured, loading };
};
