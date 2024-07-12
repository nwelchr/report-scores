import React from "react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

const Header = ({ canGoBack, onBack }) => {
  return (
    <header className="w-full p-4 bg-gray-900 flex items-center">
      {canGoBack && (
        <button onClick={onBack} className="text-white hover:text-gray-400">
          <ArrowUturnLeftIcon className="w-8 h-8" />
        </button>
      )}
    </header>
  );
};

export default Header;
