import React, { useState, useMemo, useEffect } from "react";
import { Title, Description } from "components/Text";
import Button from "components/Button";

export default function ScoreInput({
  selectedEntrant,
  selectedSet,
  gameData,
  onSubmit,
  onBack,
}) {
  const [localGameData, setLocalGameData] = useState([]);

  useEffect(() => {
    if (gameData.length > 0) {
      setLocalGameData(gameData);
    }
  }, [gameData]);

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
      <Title>Enter Games</Title>
      <Description>For each game, did you win or lose?</Description>
      <div className="grid grid-cols-1">
        {localGameData.map((game, index) => (
          <div key={index} className="flex justify-center space-x-2 mb-2">
            <Button
              onClick={() => handleGameDataUpdate(index, selectedEntrant.id)}
              disabled={
                (index > 0 && !localGameData[index - 1].winnerId) || canSubmit
              }
              color={game.winnerId === selectedEntrant.id ? "indigo" : "slate"}
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
              color={
                game.winnerId === selectedSet.opponent.id ? "indigo" : "slate"
              }
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
            isFullWidth
            color="indigo"
          >
            Submit
          </Button>
        )}
        <Button onClick={onBack} color="slate">
          Back
        </Button>
      </div>
    </>
  );
}
