import React from "react";
import AutosuggestInput from "./AutosuggestInput";

export default function SelectEntrant({ value, entrants, onChange, onSelect }) {
  return (
    <>
      <h1 className="text-4xl mb-8 text-center">Report Set</h1>
      <AutosuggestInput
        value={value}
        onChange={onChange}
        onSelect={onSelect}
        suggestions={entrants || []}
      />
    </>
  );
}
