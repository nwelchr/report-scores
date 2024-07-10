import React from "react";

const renderScoreBoxes = (score, setScore) => {
  return (
    <div className="flex space-x-2">
      {[0, 1, 2, 3].map((num) => (
        <div
          key={num}
          onClick={() => setScore(num)}
          className={`p-4 rounded-md cursor-pointer ${
            score === num ? "bg-emerald-600" : "bg-gray-700"
          }`}
        >
          {num}
        </div>
      ))}
    </div>
  );
};

export default function ScoreInput({
  selectedEntrant,
  selectedSet,
  entrantScore,
  setEntrantScore,
  opponentScore,
  setOpponentScore,
  onSubmit,
  onBack,
}) {
  return (
    <div className="mt-8 w-full max-w-4xl text-center">
      <h2 className="text-2xl mb-4">Enter Score</h2>
      <div className="flex flex-col items-center mb-4">
        <div className="flex flex-col items-center mb-4">
          <p className="mb-2">{selectedEntrant.name}</p>
          {renderScoreBoxes(entrantScore, setEntrantScore)}
        </div>
        <div className="flex flex-col items-center">
          <p className="mb-2">{selectedSet.opponent.name}</p>
          {renderScoreBoxes(opponentScore, setOpponentScore)}
        </div>
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
