import React from "react";
import { Title } from "../components/Text";
import Button from "../components/Button";

export default function OpponentSelection({ sets, onSelect, onBack }) {
  const inProgressOrNotStarted = sets.filter(
    (set) => set.state === "IN_PROGRESS" || set.state === "NOT_STARTED"
  );
  const completed = sets.filter((set) => set.state === "COMPLETE");

  return (
    <>
      <Title>Select Opponent</Title>
      <div className="w-full flex-grow flex flex-col items-center space-y-4">
        {inProgressOrNotStarted.map((set) => (
          <Button
            key={set.id}
            onClick={() => onSelect(set)}
            isFullWidth
            color="gray"
          >
            {set.opponent.name}
          </Button>
        ))}
        {completed.map((set) => (
          <Button
            key={set.id}
            onClick={() => onSelect(set)}
            isFullWidth
            color="gray"
          >
            {set.opponent.name}: {set.entrantScore} - {set.opponentScore}
          </Button>
        ))}
      </div>
    </>
  );
}
