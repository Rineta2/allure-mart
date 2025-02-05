export interface Category {
  id: string;
  name: string;
  createdAt: Date;
}

export interface FormData {
  name: string;
}

export interface CategoryTableProps {
  loading: boolean;
  currentItems: Category[];
  itemsPerPage: number;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export interface CategoryHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAddClick: () => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

export interface CategoryModalProps {
  loading: boolean;
  formData: FormData;
  editingCategory: Category | null;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (formData: FormData) => void;
  onClose: () => void;
}

export interface CategoryTableProps {
  loading: boolean;
  currentItems: Category[];
  itemsPerPage: number;
  currentPage: number;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export interface DeleteModalProps {
  loading: boolean;
  onConfirm: () => void;
  onClose: () => void;
}
