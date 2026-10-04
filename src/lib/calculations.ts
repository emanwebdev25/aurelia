export function getStoreSettings() {
  const savedSettings = localStorage.getItem(
    "aurelia-settings"
  );

  if (!savedSettings) {
    return {
      shippingThreshold: 25000,
      shippingFee: 500,
      taxRate: 5,
    };
  }

  const settings = JSON.parse(savedSettings);

  return {
    shippingThreshold: Number(
      settings.shippingThreshold ?? 25000
    ),
    shippingFee: Number(
      settings.shippingFee ?? 500
    ),
    taxRate: Number(
      settings.taxRate ?? 5
    ),
  };
}

export function calculateOrderTotals(
  subtotal: number,
  discountAmount = 0
) {
  const {
    shippingThreshold,
    shippingFee,
    taxRate,
  } = getStoreSettings();

  const shipping =
    subtotal >= shippingThreshold
      ? 0
      : shippingFee;

  const tax = Math.round(
    subtotal * (taxRate / 100)
  );

  const discount = Math.min(
    discountAmount,
    subtotal
  );

  const total =
    subtotal +
    shipping +
    tax -
    discount;

  return {
    subtotal,
    shipping,
    tax,
    discount,
    total,
  };
}