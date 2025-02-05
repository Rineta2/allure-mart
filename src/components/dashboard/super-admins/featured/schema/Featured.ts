export interface FeaturedItem {
  id: string;
  title: string;
  imageUrl: string;
}

export interface FeaturedItem {
  id: string;
  title: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FormData {
  title: string;
  image: File | null;
}

// Card

export interface FeaturedCardProps {
  feature: FeaturedItem;
  onEdit: (feature: FeaturedItem) => void;
  onDelete: (id: string) => void;
  onPreview: (feature: FeaturedItem) => void;
}

// Form Modal

export interface FeaturedFormModalProps {
  editingFeature: FeaturedItem | null;
  isSaving: boolean;
  onSubmit: (formData: FormData) => Promise<void>;
  onClose: () => void;
}

// Preview Modal

export interface PreviewModalProps {
  feature: FeaturedItem | null;
  onClose: () => void;
}
