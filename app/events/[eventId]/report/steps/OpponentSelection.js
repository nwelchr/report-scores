import React from "react";
import { Button } from "@headlessui/react";

export default function OpponentSelection({ sets = [], onSelect, onBack }) {
  const inProgressOrNotStarted = sets.filter(
    (set) => set.state === "IN_PROGRESS" || set.state === "NOT_STARTED"
  );
  const completed = sets.filter((set) => set.state === "COMPLETE");

  return (
    <>
      <div className="w-full max-w-md mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Select Opponent</h2>
        <div className="mb-4">
          <h3 className="font-semibold">In Progress or Not Started</h3>
          {inProgressOrNotStarted.map((set) => (
            <Button key={set.id} onClick={() => onSelect(set)}>
              {set.opponent.name}
            </Button>
          ))}
        </div>
        <div>
          <h3 className="font-semibold">Completed</h3>
          {completed.map((set) => (
            <Button key={set.id} onClick={() => onSelect(set)}>
              {set.opponent.name}
            </Button>
          ))}
        </div>
      </div>
      <Button onClick={onBack}>Back</Button>
    </>
  );
}
