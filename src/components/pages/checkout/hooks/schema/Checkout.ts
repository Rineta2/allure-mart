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
}

export interface GeocodingResult {
  formatted: string;
  components: GeocodingComponent;
}

export interface ProvinceOption {
  value: string;
  label: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  thumbnail: string;
  title: string;
}

export const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  address: z.object({
    label: z.string(),
    value: z.string(),
    details: z
      .object({
        city: z.string().optional(),
        state: z.string().optional(),
        postcode: z.string().optional(),
        country: z.string().optional(),
      })
      .optional(),
  }),
  addressDetail: z.string().min(1, "Detail address is required"),
  city: z.string().min(2, "City must be at least 2 characters"),
  province: z.string(),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),
  email: z.string().email("Invalid email address"),
  additionalInfo: z.string().optional(),
  paymentMethod: z.enum(["bank-transfer", "cod"]),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

// Bank Modal

export interface BankModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  total: number;
  bankAccounts: BankAccount[];
}

// Checkout Form

export interface User {
  displayName?: string | null;
  email?: string | null;
}

export interface CheckoutFormProps {
  user: User | null;
  locationOptions: LocationOption[];
  isSearching: boolean;
  provinceOptions: ProvinceOption[];
  onLocationSearch: (value: string) => void;
  onSubmit: (data: CheckoutFormData) => void;
}

// Features Section

export interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Order Summary

export interface OrderSummaryProps {
  cartItems: CartItem[];
  totalItems: number;
  total: number;
}
