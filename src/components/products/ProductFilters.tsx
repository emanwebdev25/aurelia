"use client";

type ProductFiltersProps = {
  category: string;
  onCategoryChange: (category: string) => void;
};

const categories = [
  "All",
  "Dresses",
  "Tops",
  "Bottoms",
  "Outerwear",
  "Accessories",
];

export default function ProductFilters({
  category,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <div className="product-filters">
      {categories.map((item) => (
        <button
          key={item}
          className={category === item ? "active" : ""}
          onClick={() => onCategoryChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}