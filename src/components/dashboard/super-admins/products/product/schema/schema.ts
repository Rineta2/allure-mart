export interface Author {
  uid: string;
  displayName: string;
  photoURL?: string;
  role: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  stock: number;
  category: {
    name: string;
  };
  gender: {
    name: string;
  };
  merek: {
    name: string;
  };
  thumbnail: string;
  imageSlider: string[];
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  author: Author;
  seller?: {
    uid: string;
    displayName: string;
  };
}

export interface FormData {
  title: string;
  slug: string;
  price: number;
  description: string;
  content: string;
  stock: number;
  categoryId: string;
  genderId: string;
  merekId: string;
  thumbnail: File | null;
  imageSlider: File[];
}

export interface Category {
  name: string;
}

export interface Gender {
  name: string;
}

export interface Merek {
  id: string;
  name: string;
}

interface FirestoreObject {
  [key: string]:
    | string
    | number
    | Date
    | FirestoreObject
    | Array<string>
    | Author
    | { uid: string; displayName: string }
    | null
    | undefined;
}

export interface ProductUpdateData extends FirestoreObject {
  title: string;
  slug: string;
  price: number;
  description: string;
  stock: number;
  category: {
    name: string;
  };
  gender: {
    name: string;
  };
  merek: {
    name: string;
  };
  updatedAt: Date;
  thumbnail?: string | null;
  imageSlider?: string[] | null;
  author: Author;
  seller?: {
    uid: string;
    displayName: string;
  };
}

// Table

export interface ProductTableProps {
  loading: boolean;
  currentItems: Product[];
  itemsPerPage: number;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

// Delete

export interface DeleteModalProps {
  loading: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

// Product Modal

export interface ProductModalProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  categories: Category[];
  genders: Gender[];
  mereks: { name: string }[];
  loading: boolean;
  editingProduct: Product | null;
  handleAddProduct: (e: React.FormEvent) => Promise<void>;
  handleEditProduct: (e: React.FormEvent) => Promise<void>;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "thumbnail" | "slider"
  ) => Promise<void>;
  resetForm: () => void;
}

// Product Header

export interface ProductHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  openAddModal: () => void;
}
