import React from "react";
import { Title } from "components/Text";
import Button from "components/Button";

export default function OpponentConfirmation({ filteredSets, onYes, onNo }) {
  return (
    <>
      {filteredSets[0].opponent.id ? (
        <>
          <Title>Is your opponent {filteredSets[0].opponent.name}?</Title>
          <div className="flex flex-col justify-center">
            <Button onClick={onYes} color="indigo">
              Yes
            </Button>
            <Button onClick={onNo} color="slate">
              No
            </Button>
          </div>
        </>
      ) : (
        <Title>Please wait until your opponent has finished their set.</Title>
      )}
    </>
  );
}
