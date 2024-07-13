import React from "react";
import { Title, Description } from "components/Text";
import Button from "components/Button";

export default function OpponentSelection({ sets, onSelect }) {
  const inProgressOrNotStarted =
    sets?.filter(
      (set) => set.state === "IN_PROGRESS" || set.state === "NOT_STARTED"
    ) || [];
  const completed = sets?.filter((set) => set.state === "COMPLETE") || [];

  return (
    <>
      <Title>Select Opponent</Title>
      <Description>Select an opponent from the list below.</Description>
      <div className="flex flex-col items-center">
        {inProgressOrNotStarted.map((set) => (
          <div key={set.id} className="w-full max-w-sm mb-4">
            <Button isFullWidth onClick={() => onSelect(set)}>
              {set.opponent.name}
              <p className="text-sm text-slate-400 text-center mt-2">
                Not reported
              </p>
            </Button>
          </div>
        ))}
        {completed.map((set) => (
          <div key={set.id} className="w-full max-w-sm mb-4">
            <Button isFullWidth onClick={() => onSelect(set)}>
              {set.opponent.name}
              <p className="text-sm text-slate-400 text-center mt-2">
                {set.entrantScore} - {set.opponentScore}
              </p>
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
