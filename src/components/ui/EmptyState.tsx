"use client";

type EmptyStateProps = {
  title: string;
  message: string;
  onReset: () => void;
};

export default function EmptyState({
  title,
  message,
  onReset,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <span className="section-label">Nothing Here</span>

      <h2>{title}</h2>

      <p>{message}</p>

      <button
        type="button"
        className="btn btn-primary"
        onClick={onReset}
      >
        View All Products
      </button>
    </div>
  );
}