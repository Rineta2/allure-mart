export type OrderItem = {
  name: string;
  thumbnail: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  orderStatus: string;
  transactionStatus: string;
  displayName: string;
  photoURL: string;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  addressDetail: string;
  city: string;
  province: string;
  zipCode: string;
  items: OrderItem[];
  totalAmount: number;
};

// ProductsModal

export type ProductsModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: OrderItem[];
};

// OrderCard

export type OrderCardProps = {
  order: Order;
  onViewAllProducts: (items: OrderItem[]) => void;
};
