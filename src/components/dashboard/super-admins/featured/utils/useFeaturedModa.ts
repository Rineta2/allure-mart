import { useState } from "react";

import {
  FeaturedItem,
  FormData,
} from "@/components/dashboard/super-admins/featured/schema/Featured";

export const useFeaturedModal = (
  handleSave: (
    formData: FormData,
    editingFeature: FeaturedItem | null
  ) => Promise<boolean>
) => {
  const [editingFeature, setEditingFeature] = useState<FeaturedItem | null>(
    null
  );
  const [previewFeature, setPreviewFeature] = useState<FeaturedItem | null>(
    null
  );

  const handleSubmit = async (formData: FormData) => {
    const success = await handleSave(formData, editingFeature);
    if (success) {
      const modal = document.getElementById(
        "featured_modal"
      ) as HTMLDialogElement;
      modal?.close();
      setEditingFeature(null);
    }
  };

  const handleCloseModal = () => {
    const modal = document.getElementById(
      "featured_modal"
    ) as HTMLDialogElement;
    modal?.close();
    setEditingFeature(null);
  };

  const handleClosePreview = () => {
    const previewModal = document.getElementById(
      "preview_modal"
    ) as HTMLDialogElement;
    previewModal?.close();
    setPreviewFeature(null);
  };

  const openEditModal = (feature: FeaturedItem) => {
    setEditingFeature(feature);
    const modal = document.getElementById(
      "featured_modal"
    ) as HTMLDialogElement;
    modal?.showModal();
  };

  const handlePreview = (feature: FeaturedItem) => {
    setPreviewFeature(feature);
    const previewModal = document.getElementById(
      "preview_modal"
    ) as HTMLDialogElement;
    previewModal?.showModal();
  };

  return {
    editingFeature,
    previewFeature,
    handleSubmit,
    handleCloseModal,
    handleClosePreview,
    openEditModal,
    handlePreview,
  };
};
