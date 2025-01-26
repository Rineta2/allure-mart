export interface FeaturedData {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
}

export interface Featured {
  status: number;
  message: string;
  data: FeaturedData[];
}
