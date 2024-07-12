import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Button } from "@headlessui/react";

export default function OpponentSelection({ sets, onSelect, onBack }) {
  const [isOpen, setIsOpen] = useState(true);

  const inProgressOrNotStarted = sets.filter(
    (set) => set.state === "IN_PROGRESS" || set.state === "NOT_STARTED"
  );
  const completed = sets.filter((set) => set.state === "COMPLETE");

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
          <DialogTitle className="text-3xl mb-4 text-white">
            Select Opponent
          </DialogTitle>
          <div className="w-full flex-grow flex flex-col items-center space-y-4">
            {inProgressOrNotStarted.map((set) => (
              <Button
                key={set.id}
                onClick={() => {
                  onSelect(set);
                  setIsOpen(false);
                }}
                className="w-full max-w-sm py-2 px-4 text-xl text-white bg-gray-950 border border-gray-700 rounded-md cursor-pointer data-[hover]:bg-gray-800"
              >
                {set.opponent.name}
              </Button>
            ))}
            {completed.map((set) => (
              <Button
                key={set.id}
                onClick={() => {
                  onSelect(set);
                  setIsOpen(false);
                }}
                className="w-full max-w-sm py-2 px-4 text-xl text-white bg-gray-950 border border-gray-700 rounded-md cursor-pointer data-[hover]:bg-gray-800"
              >
                {set.opponent.name}: {set.entrantScore} - {set.opponentScore}
              </Button>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => {
                onBack();
                setIsOpen(false);
              }}
              className="px-4 py-2 w-full max-w-sm text-lg border rounded-md bg-slate-950 border-slate-700 text-white data-[hover]:bg-slate-800 data-[active]:bg-slate-700"
            >
              Back
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
