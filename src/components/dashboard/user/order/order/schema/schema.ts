// Product item in the order
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
  productId: string;
  subtotal: number;
}

// Main order data structure
export interface OrderData {
  id: string;
  // User Information
  userId: string;
  fullName: string;
  email: string;
  phone: string;

  // Order Information
  orderId: string;
  orderStatus: "pending" | "processing" | "completed" | "cancelled";
  status: "pending" | "processing" | "completed" | "cancelled";
  items: OrderItem[];
  totalAmount: number;
  totalItems: number;
  message: string;

  // Transaction Information
  transactionId: string;
  transactionStatus: "pending" | "success" | "failed";
  transactionTime: string;
  paymentMethod: "bank_transfer" | "ewallet" | "cod";

  // Shipping Address
  address: string;
  addressDetail: string;
  city: string;
  province: string;
  district: string;
  zipCode: string;
  type: "rumah" | "kantor" | "apartemen";

  // Timestamps
  createdAt: string; // Firebase Timestamp
  updatedAt: string; // Firebase Timestamp
}

// Response wrapper
export interface Order {
  status: number;
  message: string;
  data: OrderData[];
}

// Order status types
export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

// Transaction status types
export type TransactionStatus = "pending" | "success" | "failed";

// Payment method types
export type PaymentMethod = "bank_transfer" | "ewallet" | "cod";

// Address types
export type AddressType = "rumah" | "kantor" | "apartemen";
