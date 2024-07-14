import React from "react";
import { Title, Description } from "components/Text";
import Button from "components/Button";

export default function BestOf({ onSelect }) {
  return (
    <>
      <Title>Best of?</Title>
      <div className="flex flex-col justify-center">
        <Button onClick={() => onSelect(3)} color="slate">
          3
        </Button>
        <Button onClick={() => onSelect(5)} color="slate">
          5
        </Button>
      </div>
    </>
  );
}
