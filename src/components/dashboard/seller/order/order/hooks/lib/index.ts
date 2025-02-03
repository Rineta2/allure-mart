export type OrderStatus =
  | "pending"
  | "processing"
  | "packaging"
  | "shipped"
  | "delivered"
  | "completed"
  | "cancel";

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "packaging":
      return "bg-purple-100 text-purple-800";
    case "shipped":
      return "bg-green-100 text-green-800";
    case "delivered":
      return "bg-teal-100 text-teal-800";
    case "completed":
      return "bg-indigo-100 text-indigo-800";
    case "cancel":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
