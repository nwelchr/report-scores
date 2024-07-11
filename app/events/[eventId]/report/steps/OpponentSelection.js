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
        <DialogPanel className="w-full max-w-4xl bg-gray-800 p-6 rounded-md shadow-lg text-center">
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
              className="px-4 py-2 w-full max-w-sm text-lg border rounded-md bg-rose-950 border-rose-700 text-white data-[hover]:bg-rose-800 data-[active]:bg-rose-700"
            >
              Back
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
