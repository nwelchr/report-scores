import React from "react";

export default function BestOf({ onSelect }) {
  return (
    <div className="mt-8 w-full max-w-4xl text-center">
      <h2 className="text-4xl mb-4">Best of?</h2>
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={() => onSelect(3)}
          className="py-12 border-2 rounded-md w-full text-6xl bg-gray-950 border-gray-700 text-white"
        >
          3
        </button>
        <button
          onClick={() => onSelect(5)}
          className="py-12 border-2 rounded-md w-full text-6xl bg-gray-950 border-gray-700 text-white"
        >
          5
        </button>
      </div>
    </div>
  );
}
