export type Discount = {
  id: number;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  active: boolean;
};