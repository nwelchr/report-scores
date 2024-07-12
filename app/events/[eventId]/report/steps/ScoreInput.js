import React, { useState, useMemo } from "react";
import { DialogTitle, Description, Button } from "@headlessui/react";

export default function ScoreInput({
  selectedEntrant,
  selectedSet,
  gameData,
  onSubmit,
  onBack,
}) {
  const [localGameData, setLocalGameData] = useState(
    gameData.map((_, index) => ({ gameNum: index + 1 }))
  );
  const gameCount = localGameData.length;
  const [entrantWins, setEntrantWins] = useState(0);
  const [opponentWins, setOpponentWins] = useState(0);

  const canSubmit = useMemo(
    () =>
      (gameCount === 3 && (entrantWins === 2 || opponentWins === 2)) ||
      (gameCount === 5 && (entrantWins === 3 || opponentWins === 3)),
    [entrantWins, opponentWins, gameCount]
  );

  const handleGameDataUpdate = (index, winnerId) => {
    const newGameData = localGameData.slice(0, index + 1);
    newGameData[index] = { winnerId, gameNum: index + 1 };

    // Reset future game data
    for (let i = index + 1; i < gameCount; i++) {
      newGameData[i] = { gameNum: i + 1 };
    }

    setLocalGameData(newGameData);

    const entrantWinCount = newGameData.filter(
      (game) => game.winnerId === selectedEntrant.id
    ).length;
    const opponentWinCount = newGameData.filter(
      (game) => game.winnerId === selectedSet.opponent.id
    ).length;

    setEntrantWins(entrantWinCount);
    setOpponentWins(opponentWinCount);
  };

  return (
    <>
      <DialogTitle className="text-3xl mb-2 text-white">
        Enter Games
      </DialogTitle>
      <Description className="mt-2 mb-4 text-gray-300">
        For each game, did you win or lose?
      </Description>
      <div className="grid grid-cols-1">
        {localGameData.map((game, index) => (
          <div key={index} className="flex justify-center space-x-2 mb-2">
            <Button
              onClick={() => handleGameDataUpdate(index, selectedEntrant.id)}
              disabled={
                (index > 0 && !localGameData[index - 1].winnerId) || canSubmit
              }
              className={`m-1 px-4 py-2 w-full max-w-xs text-lg border rounded-md ${
                game.winnerId === selectedEntrant.id
                  ? "bg-teal-950 border-teal-700 text-white"
                  : "bg-gray-950 border-gray-700 text-white"
              } ${
                (index > 0 && !localGameData[index - 1].winnerId) || canSubmit
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              } data-[hover]:bg-teal-800 data-[active]:bg-teal-700`}
            >
              Win
            </Button>
            <Button
              onClick={() =>
                handleGameDataUpdate(index, selectedSet.opponent.id)
              }
              disabled={
                (index > 0 && !localGameData[index - 1].winnerId) || canSubmit
              }
              className={`m-1 px-4 py-2 w-full max-w-xs text-lg border rounded-md ${
                game.winnerId === selectedSet.opponent.id
                  ? "bg-fuchsia-950 border-fuchsia-700 text-white"
                  : "bg-gray-950 border-gray-700 text-white"
              } ${
                (index > 0 && !localGameData[index - 1].winnerId) || canSubmit
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              } data-[hover]:bg-fuchsia-800 data-[active]:bg-fuchsia-700`}
            >
              Lose
            </Button>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        {canSubmit && (
          <Button
            onClick={() => onSubmit(localGameData)}
            className="w-full max-w-sm px-4 py-2 text-lg border rounded-md bg-violet-950 border-violet-700 text-white data-[hover]:bg-violet-800 data-[active]:bg-violet-700"
          >
            Submit
          </Button>
        )}
        <Button
          onClick={onBack}
          className="w-full max-w-sm px-4 py-2 text-lg border rounded-md bg-fuchsia-950 border-fuchsia-700 text-white data-[hover]:bg-fuchsia-800 data-[active]:bg-fuchsia-700"
        >
          Back
        </Button>
      </div>
    </>
  );
}
