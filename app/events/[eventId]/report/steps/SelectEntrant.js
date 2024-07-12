import React, { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import AutocompleteInput from "./AutocompleteInput";

export default function SelectEntrant({ value, entrants, onChange, onSelect }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md min-h-64 bg-black p-6 border border-gray-800 rounded-md shadow-lg text-center flex flex-col justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-white opacity-20 rounded-full blur-3xl"></div>
          </div>
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
        </DialogPanel>
      </div>
    </Dialog>
  );
}
