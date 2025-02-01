declare global {
  interface MidtransResult {
    transaction_status: string;
    status_code: string;
    status_message: string;
    order_id: string;
    gross_amount: string;
    payment_type: string;
    transaction_id: string;
    transaction_time: string;
    fraud_status?: string;
  }

  interface Window {
    snap: {
      pay: (
        snapToken: string,
        options: {
          onSuccess: (result: MidtransResult) => Promise<void> | void;
          onPending: (result: MidtransResult) => void;
          onError: (result: MidtransResult) => void;
          onClose: () => void;
        }
      ) => void;
    };
  }
}

export {};
