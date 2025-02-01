// Status untuk pesanan
export type OrderStatus =
  | "pending" // Menunggu pembayaran
  | "processing" // Pembayaran berhasil, menunggu diproses
  | "packaging" // Sedang dikemas
  | "shipped" // Dalam pengiriman
  | "delivered" // Sudah diterima
  | "completed" // Selesai
  | "cancelled"; // Dibatalkan

// Status untuk transaksi pembayaran
export type TransactionStatus =
  | "pending"
  | "success"
  | "failure"
  | "expired"
  | "cancel";

// Interface untuk item dalam order
export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  name?: string;
}

// Interface untuk data transaksi
export interface TransactionData {
  transactionStatus: TransactionStatus;
  transactionId?: string;
  paymentMethod?: string;
  paymentTime?: Date;
  paymentExpiry?: Date;
  paymentAmount?: number;
  paymentFee?: number;
  paymentToken?: string;
}

// Interface untuk status pengiriman
export interface ShippingData {
  courier?: string;
  trackingNumber?: string;
  shippingCost?: number;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
}

// Interface utama untuk order
export interface Order {
  // Informasi dasar order
  orderId: string;
  fullName: string;
  email: string;
  phone: string;

  // Informasi alamat
  address: string;
  addressDetail: string;
  city: string;
  province: string;
  district: string;
  zipCode: string;
  type: string;

  // Informasi pesanan
  items: OrderItem[];
  totalItems: number;
  totalAmount: number;
  message: string;

  // Status dan waktu
  orderStatus: OrderStatus;
  transactionStatus: TransactionStatus;
  transactionId?: string;
  paymentMethod?: string;
  createdAt: Date;
  updatedAt: Date;

  // Data transaksi
  transactionData?: TransactionData;

  // Data pengiriman
  shippingData?: ShippingData;
}
