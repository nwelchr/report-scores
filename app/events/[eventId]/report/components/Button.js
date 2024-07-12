import React from "react";

const Button = ({
  children,
  onClick,
  color = "gray",
  isFullWidth = false,
  disabled = false,
}) => {
  const baseClasses = `text-xl m-2 px-6 py-4 border rounded-md text-white data-[hover]:bg-${color}-800 data-[active]:bg-${color}-700`;
  const fullWidthClass = isFullWidth ? "w-full max-w-sm" : "";
  const colorClasses = `bg-${color}-950 border-${color}-700`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${colorClasses} ${fullWidthClass} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
