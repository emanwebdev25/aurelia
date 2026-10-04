"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="input"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}