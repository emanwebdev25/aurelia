import type { Discount } from "@/types/discount";

export const discounts: Discount[] = [
  {
    id: 1,
    code: "AURELIA10",
    type: "percentage",
    value: 10,
    active: true,
  },
  {
    id: 2,
    code: "WELCOME15",
    type: "percentage",
    value: 15,
    active: true,
  },
];