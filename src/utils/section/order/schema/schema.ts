export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  thumbnail: string;
  hasRating?: boolean;
}

export interface OrderData {
  id: string;
  orderId: string;
  transactionId: string;
  orderStatus: string;
  transactionStatus: string;
  transactionTime: string;

  // Address related fields
  address: string;
  addressDetail?: string;
  city: string;
  province: string;
  district: string; // Contains coordinates like "-7.4126406,108.1850556"
  zipCode: string;
  type: string; // e.g. "kantor"

  // User information
  userId: string;
  fullName: string;
  email: string;
  phone: string;

  // Order details
  items: OrderItem[];
  totalAmount: number;
  totalItems: number;
  message: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;

  hasRating?: boolean;
}

// Definisikan tipe error yang lebih spesifik
export interface OrderError {
  code?: string;
  message: string;
}

export interface Order {
  status: number;
  message: string;
  data: OrderData[];
  loading: boolean;
  error: OrderError | null;
}
