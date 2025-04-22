import React from "react";

export interface LoadingSpinnerProps {
  /**
   * Tailwind size classes for width and height (e.g., 'w-8 h-8').
   * Default is 'w-8 h-8'.
   */
  sizeClass?: string;
  /**
   * Tailwind border color class (e.g., 'border-gray-200').
   * Default is 'border-gray-200'.
   */
  borderColorClass?: string;
  /**
   * Tailwind border-top color class (e.g., 'border-t-blue-600').
   * Default is 'border-t-blue-600'.
   */
  borderTopColorClass?: string;
  /**
   * Additional Tailwind classes to apply to the spinner container.
   */
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  sizeClass = "w-8 h-8",
  borderColorClass = "border-gray-200",
  borderTopColorClass = "border-t-blue-600",
  className = "",
}) => {
  return (
    <div
      role="status"
      className={`inline-block animate-spin rounded-full border-4 ${sizeClass} ${borderColorClass} ${borderTopColorClass} ${className}`}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export { LoadingSpinner };
