import React from "react";

const Button = ({
  children,
  onClick,
  color = "slate",
  isFullWidth = false,
  disabled = false,
}) => {
  const baseClasses = "text-xl m-2 px-6 py-4 border rounded-md text-white";
  const fullWidthClass = isFullWidth ? "w-full" : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  const colorClasses = {
    slate:
      "bg-slate-950 border-slate-700 hover:bg-slate-800 active:bg-slate-700",
    teal: "bg-teal-950 border-teal-700 hover:bg-teal-800 active:bg-teal-700",
    indigo:
      "bg-indigo-950 border-indigo-700 hover:bg-indigo-800 active:bg-indigo-700",
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
