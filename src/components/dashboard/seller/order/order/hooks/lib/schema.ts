import { Order } from "@/components/dashboard/seller/order/order/utils/getOrders";

import { OrderStatus } from "@/components/dashboard/seller/order/order/hooks/lib";

// Desktop Order View

export interface DesktopOrderViewProps {
  orders: Order[];
  handleStatusChange: (
    orderId: string,
    newStatus: OrderStatus
  ) => Promise<void>;
  setSelectedOrder: (order: Order) => void;
}

// Items Modal

export interface ItemsModalProps {
  order: Order;
  onClose: () => void;
}

// Mobile Order View

export interface MobileOrderViewProps {
  orders: Order[];
  handleStatusChange: (
    orderId: string,
    newStatus: OrderStatus
  ) => Promise<void>;
  setSelectedOrder: (order: Order) => void;
}
