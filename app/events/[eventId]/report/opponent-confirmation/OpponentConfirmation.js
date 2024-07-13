import React from "react";
import { Title, Description } from "components/Text";
import Button from "components/Button";
import Loader from "components/Loader";

export default function OpponentConfirmation({ filteredSets, onSelect, onNo }) {
  return (
    <div className="w-full max-w-4xl text-center">
      {filteredSets.length === 1 ? (
        <>
          <Title>Confirm Opponent</Title>
          <Description>
            Is your opponent {filteredSets[0].opponent.name}?
          </Description>
          <div className="mt-4 flex justify-center space-x-4">
            <Button onClick={() => onSelect(filteredSets[0])} color="teal">
              Yes
            </Button>
            <Button onClick={onNo} color="fuchsia">
              No
            </Button>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
