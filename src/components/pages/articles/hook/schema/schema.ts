export interface ArticleType {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl?: string;
  categoryName: string;
  createdAt: string;
  authorName: string;
  authorRole: string;
  authorPhoto?: string;
}

// Filter

export interface ArticleFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}

// Grid

export interface ArticleGridProps {
  articles: ArticleType[];
}

// Author

export interface ArticleAuthorProps {
  photo?: string;
  name: string;
  role: string;
}

// Metadata

export interface ArticleMetadataProps {
  date: string;
  category: string;
}

// Top Articles

export interface TopArticlesProps {
  articles: ArticleType[];
}
