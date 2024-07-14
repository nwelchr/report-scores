import React from "react";
import { Title } from "components/Text";
import AutocompleteInput from "components/AutocompleteInput";

export default function SelectEntrant({ entrants, onSelect }) {
  return (
    <>
      <Title>Enter your tag.</Title>
      <div className="mt-4 flex justify-center">
        <AutocompleteInput onSelect={onSelect} suggestions={entrants || []} />
      </div>
    </>
  );
}
