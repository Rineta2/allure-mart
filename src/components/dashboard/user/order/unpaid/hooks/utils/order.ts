export interface OrderPaymentDetails {
  orderId: string;
  totalAmount: number;
  transactionId?: string;
}

export interface OrderItem {
  thumbnail: string;
  name: string;
  quantity: number;
  price: number;
}

export interface OrderData {
  id: string;
  orderId: string;
  transactionStatus: string;
  transactionTime: string;
  fullName: string;
  email: string;
  phone: string;
  type: string;
  address: string;
  addressDetail?: string;
  city: string;
  province: string;
  zipCode: string;
  items: OrderItem[];
  totalAmount: number;
}

// Define the Midtrans result type
export interface MidtransResult {
  transaction_id: string;
  transaction_time: string;
  transaction_status: string;
  payment_type: string;
  [key: string]: unknown;
}

// Define the Midtrans snap options type
export interface SnapOptions {
  onSuccess: (result: MidtransResult) => void | Promise<void>;
  onPending: (result: MidtransResult) => void;
  onError: (result: MidtransResult) => void;
  onClose: () => void;
}
