export default function currencyMask(value) {
  const currencyNumber = Number(value.replace(/\D/g, '')) / 100 || 0;
  const currency = currencyNumber
    .toFixed(2)
    .replace('.', ',')
    .replace(/(?=(\d{3})+(\D))\B/g, '.');

  return `R$ ${currency}`;
}
