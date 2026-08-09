import React, { useState } from "react";

const StarIcon = ({ className, variant = "outline" }) => (
  <svg
    viewBox="0 0 20 20"
    className={className}
    aria-hidden="true"
    fill={variant === "filled" ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={variant === "filled" ? 1 : 1}
    strokeLinejoin="round"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.076 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.287-3.967z" />
  </svg>
);

const StarRating = ({
  value = 0,
  max = 5,
  size = "h-4 w-4",
  className = "",
  onChange,
  disabled = false,
  label = "Rating"
}) => {
  const [hoverValue, setHoverValue] = useState(0);
  const isInteractive = typeof onChange === "function";
  const safeValue = Number.isFinite(value) ? Math.max(0, Math.min(value, max)) : 0;
  const displayValue = isInteractive && hoverValue ? hoverValue : safeValue;
  const inactiveClass = disabled ? "text-slate-300" : "text-slate-900";
  const activeClass = disabled ? "text-yellow-200/70" : "text-yellow-400";

  const renderStar = (starValue) => {
    const fill = Math.min(Math.max(displayValue - (starValue - 1), 0), 1);

    return (
      <span className="relative inline-flex">
        <StarIcon className={`${size} ${inactiveClass}`} variant="outline" />
        <span
          className="absolute inset-0 block overflow-hidden"
          style={{ width: `${fill * 100}%` }}
        >
          <StarIcon className={`${size} ${activeClass} drop-shadow-sm`} variant="filled" />
        </span>
      </span>
    );
  };

  if (!isInteractive) {
    return (
      <div className={`flex items-center gap-1 ${className}`} aria-label={`${safeValue} out of ${max} stars`}>
        {Array.from({ length: max }, (_, index) => (
          <span key={`star-${index + 1}`}>{renderStar(index + 1)}</span>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 ${className}`} role="radiogroup" aria-label={label}>
      {Array.from({ length: max }, (_, index) => {
        const starValue = index + 1;

        return (
          <button
            key={`star-button-${starValue}`}
            type="button"
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHoverValue(starValue)}
            onMouseLeave={() => setHoverValue(0)}
            disabled={disabled}
            className={`rounded-lg p-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 ${
              disabled ? "cursor-not-allowed opacity-70" : "hover:scale-110"
            }`}
            aria-label={`${starValue} star${starValue === 1 ? "" : "s"}`}
            aria-pressed={safeValue >= starValue}
          >
            {renderStar(starValue)}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
