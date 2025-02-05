import imagekitInstance from "@/utils/imageKit";

interface ImageKitError {
  message: string;
  [key: string]: unknown;
}

export const uploadImage = async (
  file: File,
  category: string,
  filename: string
) => {
  try {
    // Convert File to base64
    const base64 = await fileToBase64(file);

    // Remove data:image/[type];base64, prefix
    const base64Data = (base64 as string).split(",")[1];

    // Sanitize filename and category
    const sanitizedCategory = category.replace(/[^a-zA-Z0-9-_]/g, "_");
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9-_]/g, "_");

    // Create a timestamp to ensure unique filenames
    const timestamp = Date.now();

    // Upload to ImageKit
    const result = await imagekitInstance.upload({
      file: base64Data,
      fileName: `${sanitizedFilename}-${timestamp}`,
      folder: `/products/${sanitizedCategory}`,
      useUniqueFileName: true,
    });

    return result.url;
  } catch (error: unknown) {
    console.error("Error uploading image:", error);
    if (error instanceof Error || isImageKitError(error)) {
      throw new Error(error.message);
    }
    throw new Error("Failed to upload image");
  }
};

// Type guard untuk ImageKitError
function isImageKitError(error: unknown): error is ImageKitError {
  return typeof error === "object" && error !== null && "message" in error;
}

// Helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};
