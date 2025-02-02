import { z } from "zod";

export type LocationOption = {
  value: string;
  label: string;
  details?: {
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
};

export interface GeocodingComponent {
  city?: string;
  town?: string;
  state?: string;
  postcode?: string;
  country?: string;
  suburb?: string;
  neighbourhood?: string;
}

export interface GeocodingResult {
  formatted: string;
  components: GeocodingComponent;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  thumbnail: string;
  title: string;
}

export interface DefaultAddress {
  city: string;
  details: string;
  district: string;
  fullName: string;
  id: string;
  isDefault: boolean;
  phone: string;
  postalCode: string;
  province: string;
  streetAddress: string;
  type: string;
}

// User schema
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.string(),
});

export type User = z.infer<typeof userSchema>;

// Address schema
export const addressSchema = z.object({
  fullName: z.string(),
  phone: z.string(),
  streetAddress: z.string(),
  details: z.string().optional(),
  city: z.string(),
  province: z.string(),
  postalCode: z.string(),
  district: z.string(),
  type: z.string(),
});

export type Address = z.infer<typeof addressSchema>;

export type CheckoutFormData = {
  uid: string;
  fullName: string;
  photoURL: string;
  phone: string;
  email: string;
  address: string;
  addressDetail?: string;
  city: string;
  province: string;
  zipCode: string;
  district: string;
  type: string;
  message?: string;
};

// Checkout Form Props
export interface CheckoutFormProps {
  user: User;
  defaultAddress: Address;
  onSubmit: (data: OrderData) => Promise<OrderResponse>;
  cartItems?: CartItem[];
  totalItems?: number;
  total?: number;
}

export interface OrderData extends CheckoutFormData {
  userId: string;
  items: {
    id: string;
    quantity: number;
    price: number;
  }[];
  totalItems: number;
  totalAmount: number;
  createdAt: Date;
}

// Interface untuk hasil callback Midtrans
export interface MidtransResult {
  transaction_id: string;
  order_id: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status?: string;
  gross_amount?: string;
  currency?: string;
  status_code?: string;
  status_message?: string;
  payment_code?: string;
  bill_key?: string;
  biller_code?: string;
  pdf_url?: string;
  finish_redirect_url?: string;
  payment_method?: string;
}

// Interface untuk response order
export interface OrderResponse {
  orderId: string;
  totalAmount: number;
  userPhotoURL: string;
  snapToken: string;
}

// Order Summary Props
export interface OrderSummaryProps {
  cartItems: CartItem[];
  totalItems: number;
  total: number;
}
