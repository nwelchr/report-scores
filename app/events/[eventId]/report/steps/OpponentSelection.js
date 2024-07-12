import React from "react";
import { DialogTitle, Button } from "@headlessui/react";

export default function OpponentSelection({ sets, onSelect, onBack }) {
  const inProgressOrNotStarted = sets.filter(
    (set) => set.state === "IN_PROGRESS" || set.state === "NOT_STARTED"
  );
  const completed = sets.filter((set) => set.state === "COMPLETE");

  return (
    <>
      <DialogTitle className="text-3xl mb-4 text-white">
        Select Opponent
      </DialogTitle>
      <div className="w-full flex-grow flex flex-col items-center space-y-4">
        {inProgressOrNotStarted.map((set) => (
          <Button
            key={set.id}
            onClick={() => onSelect(set)}
            className="w-full max-w-sm py-2 px-4 text-xl text-white bg-gray-950 border border-gray-700 rounded-md cursor-pointer data-[hover]:bg-gray-800"
          >
            {set.opponent.name}
          </Button>
        ))}
        {completed.map((set) => (
          <Button
            key={set.id}
            onClick={() => onSelect(set)}
            className="w-full max-w-sm py-2 px-4 text-xl text-white bg-gray-950 border border-gray-700 rounded-md cursor-pointer data-[hover]:bg-gray-800"
          >
            {set.opponent.name}: {set.entrantScore} - {set.opponentScore}
          </Button>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Button
          onClick={onBack}
          className="px-4 py-2 w-full max-w-sm text-lg border rounded-md bg-slate-950 border-slate-700 text-white data-[hover]:bg-slate-800 data-[active]:bg-slate-700"
        >
          Back
        </Button>
      </div>
    </>
  );
}
