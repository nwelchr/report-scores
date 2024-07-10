import React from "react";

export default function Step2({ filteredSets, onSelect, onNo }) {
  return (
    <div className="w-full max-w-4xl text-center">
      <p className="text-xl">
        Is your opponent {filteredSets[0].opponent.name}?
      </p>
      <button
        onClick={() => onSelect(filteredSets[0])}
        className="mt-4 p-2 rounded-md bg-emerald-600 text-white"
      >
        Yes
      </button>
      <button
        onClick={onNo}
        className="mt-4 p-2 rounded-md bg-red-600 text-white"
      >
        No
      </button>
    </div>
  );
}
