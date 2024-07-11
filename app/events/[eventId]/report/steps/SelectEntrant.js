import React from "react";
import AutocompleteInput from "./AutocompleteInput";

export default function SelectEntrant({ value, entrants, onChange, onSelect }) {
  return (
    <>
      <h1 className="text-4xl mb-8 text-center">What's your tag?</h1>
      <AutocompleteInput
        value={value}
        onChange={onChange}
        onSelect={onSelect}
        suggestions={entrants || []}
      />
    </>
  );
}
