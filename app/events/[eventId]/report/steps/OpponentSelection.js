import React from "react";

export default function OpponentSelection({ sets, onSelect, onBack }) {
  const inProgressOrNotStarted = sets.filter(
    (set) => set.state === "IN_PROGRESS" || set.state === "NOT_STARTED"
  );
  const completed = sets.filter((set) => set.state === "COMPLETE");

  return (
    <div className="mx-auto h-screen w-full max-w-4xl pt-20 flex flex-col items-center justify-between">
      <h2 className="text-3xl mb-4">Select Opponent</h2>
      <div className="w-full flex-grow flex flex-col items-center space-y-4">
        {inProgressOrNotStarted.map((set) => (
          <button
            key={set.id}
            onClick={() => onSelect(set)}
            className="w-full max-w-sm py-2 px-4 text-xl text-white bg-gray-950 border border-gray-700 rounded-md cursor-pointer hover:bg-gray-800"
          >
            {set.opponent.name}
          </button>
        ))}
        {completed.map((set) => (
          <button
            key={set.id}
            onClick={() => onSelect(set)}
            className="w-full max-w-sm py-2 px-4 text-xl text-white bg-gray-950 border border-gray-700 rounded-md cursor-pointer hover:bg-gray-800"
          >
            {set.opponent.name}: {set.entrantScore} - {set.opponentScore}
          </button>
        ))}
      </div>
      <button
        onClick={onBack}
        className="m-4 px-4 py-2 w-full max-w-sm border bg-rose-950 border-rose-700 text-white"
      >
        Back
      </button>
    </div>
  );
}
