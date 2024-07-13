import React from "react";
import { Title, Description } from "components/Text";
import AutocompleteInput from "components/AutocompleteInput";

export default function SelectEntrant({ entrants, onSelect }) {
  return (
    <>
      <Title>Start.gg Tag</Title>
      <Description>Please find your tag.</Description>
      <div className="mt-4 flex justify-center">
        <AutocompleteInput onSelect={onSelect} suggestions={entrants || []} />
      </div>
    </>
  );
}
