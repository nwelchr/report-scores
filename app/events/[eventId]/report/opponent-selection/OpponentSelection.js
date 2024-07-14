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
      <Title>Select your opponent.</Title>
      <div className="flex flex-col w-full justify-center items-center">
        {inProgressOrNotStarted.map((set) => (
          <Button key={set.id} isFullWidth onClick={() => onSelect(set)}>
            {set.opponent.name}
            <p className="text-sm text-slate-400 text-center mt-2">
              Not reported
            </p>
          </Button>
        ))}
        {completed.map((set) => (
          <Button key={set.id} isFullWidth onClick={() => onSelect(set)}>
            {set.opponent.name}
            <p className="text-sm text-slate-400 text-center mt-2">
              {set.entrantScore} - {set.opponentScore}
            </p>
          </Button>
        ))}
      </div>
    </>
  );
}
