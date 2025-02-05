export interface ProductData {
  id: string;
  category: {
    name: string;
  };
  author?: {
    uid: string;
    displayName: string;
    photoURL: string;
    role: string;
  };
  name: string;
  content: string;
  createdAt: Date;
  description: string;
  gender: {
    name: string;
  };
  imageSlider: string[];
  merek: {
    name: string;
  };
  price: number;
  slug: string;
  stock: number;
  thumbnail: string;
  title: string;
}

export interface Product {
  status: number;
  message: string;
  data: ProductData[];
}
