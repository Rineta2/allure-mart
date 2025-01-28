export interface Product {
  id: string;
  category: {
    name: string;
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

export interface BrandGroup {
  count: number;
  product: Product;
}

export interface GroupedBrands {
  [key: string]: BrandGroup;
}
