import React from "react";
import { Title, Description } from "components/Text";
import Button from "components/Button";

export default function BestOf({ onSelect }) {
  const handleSelect = (count) => {
    const initialGameData = Array(count).fill({ gameNum: 1 });
    onSelect(initialGameData);
  };

  return (
    <>
      <Title>Best of?</Title>
      <Description>Please select the number of games.</Description>
      <div className="flex justify-center space-x-4">
        <Button onClick={() => handleSelect(3)} color="gray">
          Best of 3
        </Button>
        <Button onClick={() => handleSelect(5)} color="gray">
          Best of 5
        </Button>
      </div>
    </>
  );
}
