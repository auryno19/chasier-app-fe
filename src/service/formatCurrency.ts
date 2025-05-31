export const formatCurrency = (amount: number) => {
  if (isNaN(amount)) return "Rp 0";

  // Pastikan amount adalah angka
  const number = Number(amount);

  // Format manual dengan regex (ribuan pakai titik)
  const formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `Rp ${formatted}`;
};
