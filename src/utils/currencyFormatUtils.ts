export function formatCurrency(amount: number): string {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      });
    return VND.format(amount)
}