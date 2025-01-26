import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/utils/firebase";

import toast from "react-hot-toast";

import {
  Product,
  Category,
  Gender,
  FormData,
  ProductUpdateData,
} from "@/components/pages/super-admins/products/product/schema/schema";

import { uploadImage, generateSlug } from "../utils/uploadImage";

import { compressImage } from "@/components/helper/imageCompression";

export const useProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [genders, setGenders] = useState<Gender[]>([]);
  const [mereks, setMereks] = useState<{ name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<FormData>({
    title: "",
    price: 0,
    description: "",
    content: "",
    stock: 0,
    categoryId: "",
    genderId: "",
    merekId: "",
    thumbnail: null,
    imageSlider: [],
    slug: "",
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCTS as string)
      );
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      })) as Product[];

      setProducts(
        productsData.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        )
      );
    } catch {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoriesAndGenders = async () => {
    try {
      const categoriesSnapshot = await getDocs(
        collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_CATEGORIES_PRODUCTS as string
        )
      );
      const gendersSnapshot = await getDocs(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_GENDERS as string)
      );
      const mereksSnapshot = await getDocs(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_MEREKS as string)
      );

      setCategories(
        categoriesSnapshot.docs.map((doc) => ({
          name: doc.data().name,
        }))
      );

      setGenders(
        gendersSnapshot.docs.map((doc) => ({
          name: doc.data().name,
        }))
      );

      setMereks(
        mereksSnapshot.docs.map((doc) => ({
          name: doc.data().name,
        }))
      );
    } catch {
      toast.error("Failed to fetch categories, genders, and mereks");
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "thumbnail" | "slider"
  ) => {
    const files = e.target.files;
    if (!files) return;

    try {
      if (type === "thumbnail") {
        const compressedFile = await compressImage(files[0]);
        setFormData((prev) => ({ ...prev, thumbnail: compressedFile }));
      } else {
        const compressedFiles = await Promise.all(
          Array.from(files).map((file) => compressImage(file))
        );
        setFormData((prev) => ({ ...prev, imageSlider: compressedFiles }));
      }
    } catch {
      toast.error("Failed to process images");
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const category = categories.find((c) => c.name === formData.categoryId);
      const gender = genders.find((g) => g.name === formData.genderId);
      const merek = mereks.find((m) => m.name === formData.merekId);

      if (!category || !gender || !merek || !formData.thumbnail) {
        toast.error("Please fill all required fields");
        return;
      }

      const slug = generateSlug(formData.title);

      const [thumbnailUrl, sliderUrls] = await Promise.all([
        uploadImage(
          formData.thumbnail,
          category.name,
          `${slug}-thumbnail.${formData.thumbnail.name.split(".").pop()}`
        ),
        Promise.all(
          formData.imageSlider.map((file, index) =>
            uploadImage(
              file,
              category.name,
              `${slug}-slider-${index}.${file.name.split(".").pop()}`
            )
          )
        ),
      ]);

      await addDoc(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCTS as string),
        {
          title: formData.title,
          slug,
          price: formData.price,
          description: formData.description,
          content: formData.content,
          stock: formData.stock,
          category: {
            name: category.name,
          },
          gender: {
            name: gender.name,
          },
          merek: {
            name: merek.name,
          },
          thumbnail: thumbnailUrl,
          imageSlider: sliderUrls,
          createdAt: new Date(),
        }
      );

      resetForm();
      toast.success("Product added successfully");
    } catch {
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      setLoading(true);

      const category = categories.find((c) => c.name === formData.categoryId);
      const gender = genders.find((g) => g.name === formData.genderId);
      const merek = mereks.find((m) => m.name === formData.merekId);

      if (!category || !gender || !merek) {
        toast.error("Please fill all required fields");
        return;
      }

      const slug = generateSlug(formData.title);
      const updateData: ProductUpdateData = {
        title: formData.title,
        slug,
        price: formData.price,
        description: formData.description,
        content: formData.content,
        stock: formData.stock,
        category: {
          name: category.name,
        },
        gender: {
          name: gender.name,
        },
        merek: {
          name: merek.name,
        },
        updatedAt: new Date(),
      };

      if (formData.thumbnail || formData.imageSlider.length > 0) {
        const uploadPromises = [];

        if (formData.thumbnail) {
          uploadPromises.push(
            uploadImage(
              formData.thumbnail,
              category.name,
              `${slug}-thumbnail.${formData.thumbnail.name.split(".").pop()}`
            ).then((url) => (updateData.thumbnail = url))
          );
        }

        if (formData.imageSlider.length > 0) {
          uploadPromises.push(
            Promise.all(
              formData.imageSlider.map((file, index) =>
                uploadImage(
                  file,
                  category.name,
                  `${slug}-slider-${index}.${file.name.split(".").pop()}`
                )
              )
            ).then((urls) => (updateData.imageSlider = urls))
          );
        }

        await Promise.all(uploadPromises);
      }

      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCTS as string,
        editingProduct.id
      );
      await updateDoc(docRef, updateData);

      resetForm();
      toast.success("Product updated successfully");
    } catch {
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      setLoading(true);
      await deleteDoc(
        doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCTS as string, id)
      );

      const modal = document.getElementById(
        "delete_modal"
      ) as HTMLDialogElement;
      modal?.close();
      setDeletingProduct(null);

      fetchProducts();
      toast.success("Product deleted successfully");
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      price: 0,
      description: "",
      content: "",
      stock: 0,
      categoryId: "",
      genderId: "",
      merekId: "",
      thumbnail: null,
      imageSlider: [],
      slug: "",
    });
    setEditingProduct(null);
    const modal = document.getElementById("product_modal") as HTMLDialogElement;
    modal?.close();
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
    fetchCategoriesAndGenders();
  }, []);

  return {
    products,
    categories,
    genders,
    mereks,
    loading,
    searchTerm,
    setSearchTerm,
    formData,
    setFormData,
    editingProduct,
    setEditingProduct,
    deletingProduct,
    setDeletingProduct,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleFileChange,
    resetForm,
  };
};
