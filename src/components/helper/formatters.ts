export const formatPrice = (price: number) => {
  return price.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const parsePrice = (value: string) => {
  return parseInt(value.replace(/\./g, "")) || 0;
};
