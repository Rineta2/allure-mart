export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

export interface OrderData {
  id: string;
  orderId: string;
  transactionId: string;
  orderStatus: string;
  status: string;
  transactionStatus: string;
  transactionTime: string;
  paymentMethod: string;
  bankName: string;
  fraudStatus: string;

  // Address related fields
  address: string;
  addressDetail: string;
  city: string;
  province: string;
  district: string;
  zipCode: string;
  type: string; // e.g. "rumah"

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
}

export interface Order {
  status: number;
  message: string;
  data: OrderData[];
}
