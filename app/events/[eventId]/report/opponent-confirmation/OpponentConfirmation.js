import React from "react";
import { Title, Description } from "components/Text";
import Button from "components/Button";

export default function OpponentConfirmation({ filteredSets, onYes, onNo }) {
  return (
    <div className="w-full max-w-4xl text-center">
      {filteredSets[0].opponent.id ? (
        <>
          <Title>Is your opponent {filteredSets[0].opponent.name}?</Title>
          <Button isFullWidth onClick={onYes} color="indigo">
            Yes
          </Button>
          <Button isFullWidth onClick={onNo} color="slate">
            No
          </Button>
        </>
      ) : (
        <Title>Please wait until your opponent has finished their set.</Title>
      )}
    </div>
  );
}
