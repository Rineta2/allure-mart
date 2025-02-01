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
  role: z.string(), // Added role field
  // Add other user fields as needed
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

// Checkout form schema
export const checkoutSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Street address is required"),
  addressDetail: z.string().optional(),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  district: z.string().min(1, "District is required"),
  type: z.string().min(1, "Address type is required"),
  message: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

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
  status: "pending" | "success" | "failed";
}

export interface OrderResponse {
  orderId: string;
  totalAmount: number;
  snapToken: string;
}

// Order Summary Props
export interface OrderSummaryProps {
  cartItems: CartItem[];
  totalItems: number;
  total: number;
}
