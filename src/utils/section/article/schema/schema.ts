export interface Article {
  status: number;
  message: string;
  data: ArticleData[];
}

export interface ArticleData {
  id: string;
  title: string;
  description: string;
  content: string;
  categoryName: string;
  slug: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorPhoto: string;
}
