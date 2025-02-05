export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  categoryName: string;
  authorId: string;
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
}

export interface ArticleFormData {
  title: string;
  content: string;
  description: string;
  image: File | null;
  categoryName: string;
  authorId: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  id: string;
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
