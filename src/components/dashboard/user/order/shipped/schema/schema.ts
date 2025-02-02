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
  orderStatus: string;
  totalAmount: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  addressDetail: string;
  city: string;
  province: string;
  zipCode: string;
  type: string;
  items: OrderItem[];
  totalItems: number;
  transactionId: string;
  transactionStatus: string;
  transactionTime: string;
  message: string;
  district: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface OrderResponse {
  status: string;
  data: OrderData[];
}
