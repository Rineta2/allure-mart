import { toast } from "react-hot-toast";

import { OrderPaymentDetails } from "@/components/dashboard/user/order/unpaid/hooks/utils/order";

export const usePayment = () => {
  const handleContinuePayment = async (order: OrderPaymentDetails) => {
    const loadingToast = toast.loading("Processing payment...");

    try {
      const response = await fetch("/api/continue-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.orderId,
          amount: order.totalAmount,
        }),
      });

      const data = await response.json();

      if (data.status === "success" && window.snap) {
        toast.dismiss(loadingToast);
        window.snap.pay(data.token, {
          onSuccess: async (result) => {
            try {
              const updateData = {
                orderId: order.orderId,
                transactionStatus: "success",
                transactionId: result.transaction_id,
                transactionTime: result.transaction_time,
                paymentMethod: result.payment_type,
              };

              const updateResponse = await fetch(
                "/api/update-transaction-status",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(updateData),
                }
              );

              const responseText = await updateResponse.text();
              const responseData = JSON.parse(responseText);

              if (updateResponse.ok) {
                toast.success("Payment completed successfully!");
                window.location.href = `/order/success/${order.orderId}`;
              } else {
                toast.error(
                  `Failed to update status: ${
                    responseData.message || "Unknown error"
                  }`
                );
              }
            } catch {
              toast.error("Failed to update transaction status");
            }
          },
          onPending: () => {
            toast.loading("Payment is pending");
          },
          onError: () => {
            toast.error("Payment failed");
          },
          onClose: () => {
            toast.loading("Payment window closed");
          },
        });
      } else {
        toast.dismiss(loadingToast);
        toast.error("Failed to initialize payment. Please try again.");
      }
    } catch {
      toast.dismiss(loadingToast);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return { handleContinuePayment };
};
