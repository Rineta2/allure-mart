interface Window {
  snap: {
    pay: (
      token: string,
      callbacks: import("../components/pages/checkout/hooks/schema/Checkout").MidtransCallbacks
    ) => void;
  };
}
