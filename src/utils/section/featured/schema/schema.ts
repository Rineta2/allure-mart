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

export interface FirestoreDocument {
  name: string;
  fields: {
    title?: { stringValue: string };
    createdAt?: { timestampValue: string };
    updatedAt?: { timestampValue: string };
    imageUrl?: { stringValue: string };
  };
}
