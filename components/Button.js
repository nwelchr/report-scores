import React from "react";

const Button = ({
  children,
  onClick,
  color = "slate",
  isFullWidth = false,
  disabled = false,
}) => {
  const baseClasses = "text-xl m-2 px-6 py-4 border rounded-md text-white";
  const fullWidthClass = isFullWidth ? "w-full max-w-sm" : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  const colorClasses = {
    slate:
      "bg-slate-950 border-slate-700 hover:bg-slate-800 active:bg-slate-700",
    teal: "bg-teal-950 border-teal-700 hover:bg-teal-800 active:bg-teal-700",
    fuchsia:
      "bg-fuchsia-950 border-fuchsia-700 hover:bg-fuchsia-800 active:bg-fuchsia-700",
    violet:
      "bg-violet-950 border-violet-700 hover:bg-violet-800 active:bg-violet-700",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${colorClasses[color]} ${fullWidthClass} ${disabledClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
