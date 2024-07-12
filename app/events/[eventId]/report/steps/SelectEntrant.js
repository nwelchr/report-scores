import React from "react";
import { DialogTitle, Description } from "@headlessui/react";
import AutocompleteInput from "./AutocompleteInput";

export default function SelectEntrant({ value, entrants, onChange, onSelect }) {
  return (
    <>
      <DialogTitle className="text-4xl mb-4 text-white">
        Start.gg Tag
      </DialogTitle>
      <Description className="mt-2 text-gray-300">
        Please find your tag.
      </Description>
      <div className="mt-4 flex justify-center">
        <AutocompleteInput
          value={value}
          onChange={onChange}
          onSelect={onSelect}
          suggestions={entrants || []}
        />
      </div>
    </>
  );
}
