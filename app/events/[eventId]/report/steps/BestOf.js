import React from "react";
import { Title, Description } from "../components/Text";
import Button from "../components/Button";

export default function BestOf({ onSelect }) {
  return (
    <>
      <Title>Best of?</Title>
      <Description>Please select the number of games.</Description>
      <div className="mt-4 flex justify-center">
        <Button onClick={() => onSelect(3)} color="gray">
          3
        </Button>
        <Button onClick={() => onSelect(5)} color="gray">
          5
        </Button>
      </div>
    </>
  );
}
