import {
  CartItem,
  CheckoutFormData,
} from "@/components/pages/checkout/hooks/schema/Checkout";

export const generateOrderId = () => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(7);
  return `ORD${timestamp}${randomStr}`;
};

export const createOrderMessage = (
  orderId: string,
  data: CheckoutFormData,
  cartItems: CartItem[],
  total: number
) => {
  return `📋 NEW ORDER NOTIFICATION
──────────────

🔖 ORDER ID: #${orderId}

👤 CUSTOMER INFORMATION
▪️ Name: ${data.firstName} ${data.lastName}
▪️ Phone: ${data.phone}
▪️ Email: ${data.email}

📦 SHIPPING ADDRESS
▪️ Address: ${data.address.value}
▪️ Detail: ${data.addressDetail}
▪️ City: ${data.city}
▪️ Province: ${data.province}
▪️ ZIP: ${data.zipCode}
${data.additionalInfo ? `▪️ Note: ${data.additionalInfo}` : ""}

🛒 ORDER DETAILS
${cartItems
  .map(
    (item) => `▪️ *${item.name}*
   × Quantity: ${item.quantity}
   × Price: $${item.price.toLocaleString()}
   × Subtotal: $${(item.price * item.quantity).toLocaleString()}`
  )
  .join("\n\n")}

💳 PAYMENT SUMMARY
▪️ Method: *${
    data.paymentMethod === "cod" ? "Cash On Delivery" : "Bank Transfer"
  }*
▪️ Total Amount: *$${total.toLocaleString()}*

📅 Order Date: ${new Date().toLocaleString()}
──────────────
_Thank you for your order! We will process it shortly._`;
};

export const createPaymentMessage = (
  formValues: CheckoutFormData,
  cartItems: CartItem[],
  total: number
) => {
  return `📋 *PAYMENT CONFIRMATION*
_____________________

👤 *CUSTOMER INFO*
Name: ${formValues.firstName} ${formValues.lastName}
Phone: ${formValues.phone || "N/A"}

ORDER ID: #${generateOrderId()}

📦 *ORDER DETAILS*
${cartItems
  .map(
    (item) => `${item.name}
× Quantity: ${item.quantity}
× Price: $${item.price.toLocaleString()}
× Subtotal: $${(item.price * item.quantity).toLocaleString()}`
  )
  .join("\n\n")}

💳 *PAYMENT SUMMARY*
Method: Bank Transfer
Total Amount: *$${total.toLocaleString()}*

📅 Order Date: ${new Date().toLocaleString()}
_____________________

_Please confirm my payment for this order. Thank you!_`;
};
