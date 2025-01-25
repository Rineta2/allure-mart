import { useState, useCallback } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/utils/firebase";

import { FirebaseError } from "firebase/app";

import imagekitInstance from "@/utils/imageKit";

import {
  FeaturedItem,
  FormData,
} from "@/components/pages/super-admins/featured/schema/Featured";

export const useFeaturedOperations = () => {
  const [features, setFeatures] = useState<FeaturedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchFeatures = useCallback(async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_FEATURED as string)
      );
      const featuredData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as FeaturedItem[];
      setFeatures(featuredData);
    } catch (error) {
      console.error("Error fetching features:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadImage = async (file: File) => {
    try {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = async (e) => {
          try {
            const base64 = (e.target?.result as string).split(",")[1];
            const upload = await imagekitInstance.upload({
              file: base64,
              fileName: `featured/${Date.now()}-${file.name}`,
              folder: "/featured",
            });
            resolve(upload.url);
          } catch (error) {
            reject(error);
          }
        };
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus featured ini?")) {
      try {
        await deleteDoc(
          doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_FEATURED as string, id)
        );
        await fetchFeatures();
      } catch (error) {
        if (error instanceof FirebaseError) {
          if (error.code === "permission-denied") {
            alert("Anda tidak memiliki izin untuk menghapus featured items.");
          } else {
            alert(
              "Terjadi kesalahan saat menghapus feature. Silakan coba lagi."
            );
          }
        }
        console.error("Error deleting feature:", error);
      }
    }
  };

  const handleSave = async (
    formData: FormData,
    editingFeature: FeaturedItem | null
  ) => {
    setIsSaving(true);
    try {
      if (editingFeature) {
        let imageUrl = editingFeature.imageUrl;
        if (formData.image) {
          imageUrl = (await uploadImage(formData.image)) as string;
        }

        await updateDoc(
          doc(
            db,
            process.env.NEXT_PUBLIC_COLLECTIONS_FEATURED as string,
            editingFeature.id
          ),
          {
            title: formData.title,
            imageUrl,
            updatedAt: new Date().toISOString(),
          }
        );
      } else {
        let imageUrl = "";
        if (formData.image) {
          imageUrl = (await uploadImage(formData.image)) as string;
        }

        await addDoc(
          collection(
            db,
            process.env.NEXT_PUBLIC_COLLECTIONS_FEATURED as string
          ),
          {
            title: formData.title,
            imageUrl,
            createdAt: new Date().toISOString(),
          }
        );
      }
      await fetchFeatures();
      return true;
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "permission-denied") {
          alert(
            editingFeature
              ? "Anda tidak memiliki izin untuk mengedit featured items."
              : "Anda tidak memiliki izin untuk menambahkan featured items. Pastikan Anda login sebagai super admin."
          );
        } else {
          alert("Terjadi kesalahan saat menyimpan feature. Silakan coba lagi.");
        }
        console.error("Error saving feature:", error);
      }
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    features,
    isLoading,
    isSaving,
    fetchFeatures,
    handleDelete,
    handleSave,
  };
};
