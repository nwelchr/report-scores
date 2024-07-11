import React from "react";

export default function ScoreInput({
  selectedEntrant,
  selectedSet,
  gameData,
  onGameDataUpdate,
  onSubmit,
  onBack,
}) {
  return (
    <div className="mt-8 w-full max-w-4xl text-center">
      <h2 className="text-2xl mb-4">Enter Games</h2>
      <div className="grid grid-cols-1 gap-4">
        {gameData.map((game, index) => (
          <div key={index} className="flex justify-center space-x-4">
            <p>Game {index + 1}:</p>
            <button
              onClick={() => onGameDataUpdate(index, selectedEntrant.id)}
              className={`px-4 py-2 border-2 rounded-md ${
                game.winnerId === selectedEntrant.id
                  ? "bg-emerald-950 border-emerald-700 text-white"
                  : "bg-gray-950 border-gray-700 text-white"
              }`}
            >
              Win
            </button>
            <button
              onClick={() => onGameDataUpdate(index, selectedSet.opponent.id)}
              className={`px-4 py-2 border-2 rounded-md ${
                game.winnerId === selectedSet.opponent.id
                  ? "bg-rose-950 border-rose-700 text-white"
                  : "bg-gray-950 border-gray-700 text-white"
              }`}
            >
              Lose
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={onSubmit}
        className="m-4 px-4 py-2 border-2 rounded-md bg-emerald-950 border-emerald-700 text-white"
      >
        Submit
      </button>
      <button
        onClick={onBack}
        className="m-4 px-4 py-2 border-2  bg-rose-950 border-rose-700 text-white"
      >
        Back
      </button>
    </div>
  );
}
