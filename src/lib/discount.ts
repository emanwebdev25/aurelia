export function saveAppliedDiscount(
  code: string,
  amount: number
) {
  localStorage.setItem(
    "aurelia-applied-discount",
    JSON.stringify({
      code,
      amount,
    })
  );
}

export function getAppliedDiscount() {
  const savedDiscount = localStorage.getItem(
    "aurelia-applied-discount"
  );

  if (!savedDiscount) {
    return {
      code: "",
      amount: 0,
    };
  }

  try {
    return JSON.parse(savedDiscount);
  } catch {
    return {
      code: "",
      amount: 0,
    };
  }
}

export function clearAppliedDiscount() {
  localStorage.removeItem(
    "aurelia-applied-discount"
  );
}