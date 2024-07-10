import React from "react";

export default function OpponentSelection({ sets, onSelect, onBack }) {
  const renderSets = (sets) => {
    const inProgressOrNotStarted = sets.filter(
      (set) => set.state === "IN_PROGRESS" || set.state === "NOT_STARTED"
    );
    const completed = sets.filter((set) => set.state === "COMPLETE");

    return (
      <ul className="space-y-4">
        {inProgressOrNotStarted.map((set) => (
          <li
            key={set.id}
            className="p-2 rounded-md bg-gray-700 cursor-pointer"
            onClick={() => onSelect(set)}
          >
            {set.opponent.name}
          </li>
        ))}
        {completed.map((set) => (
          <li key={set.id} className="p-2 rounded-md bg-gray-700">
            {set.opponent.name} - Won/Lost {set.entrantScore} -{" "}
            {set.opponentScore}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full max-w-4xl text-center">
      <h2 className="text-2xl mb-4">Select Your Opponent</h2>
      {renderSets(sets || [])}
      <button
        onClick={onBack}
        className="m-4 px-4 py-2 border-2  bg-rose-950 border-rose-700 text-white"
      >
        Back
      </button>
    </div>
  );
}
