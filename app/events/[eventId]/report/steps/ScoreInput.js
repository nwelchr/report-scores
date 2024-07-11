import React, { useState, useMemo } from "react";

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
    <div className="mt-8 w-full max-w-4xl text-center">
      <h2 className="text-4xl mb-4">Enter Games</h2>
      <div className="grid grid-cols-1 gap-4">
        {localGameData.map((game, index) => (
          <div key={index} className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => handleGameDataUpdate(index, selectedEntrant.id)}
              disabled={
                (index > 0 && !localGameData[index - 1].winnerId) || canSubmit
              }
              className={`px-8 py-4 border-4 rounded-md text-2xl ${
                game.winnerId === selectedEntrant.id
                  ? "bg-emerald-950 border-emerald-700 text-white"
                  : "bg-gray-950 border-gray-700 text-white"
              } ${
                (index > 0 && !localGameData[index - 1].winnerId) || canSubmit
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Win
            </button>
            <button
              onClick={() =>
                handleGameDataUpdate(index, selectedSet.opponent.id)
              }
              disabled={
                (index > 0 && !localGameData[index - 1].winnerId) || canSubmit
              }
              className={`px-8 py-4 border-4 rounded-md text-2xl ${
                game.winnerId === selectedSet.opponent.id
                  ? "bg-rose-950 border-rose-700 text-white"
                  : "bg-gray-950 border-gray-700 text-white"
              } ${
                (index > 0 && !localGameData[index - 1].winnerId) || canSubmit
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Lose
            </button>
          </div>
        ))}
      </div>
      {canSubmit && (
        <button
          onClick={() => onSubmit(localGameData)}
          className="m-4 px-8 py-4 border-4 rounded-md text-2xl bg-emerald-950 border-emerald-700 text-white"
        >
          Submit
        </button>
      )}
      <button
        onClick={onBack}
        className="m-4 px-8 py-4 border-4 rounded-md text-2xl bg-rose-950 border-rose-700 text-white"
      >
        Back
      </button>
    </div>
  );
}
