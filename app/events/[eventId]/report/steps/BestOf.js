import React, { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  Button,
} from "@headlessui/react";

export default function BestOf({ onSelect }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md bg-gray-800 p-6 rounded-md shadow-lg text-center">
          <DialogTitle className="text-4xl mb-4 text-white">
            Best of?
          </DialogTitle>
          <Description className="mt-2 text-gray-300">
            Please select the number of games.
          </Description>
          <div className="mt-4 flex flex-col items-center space-y-4">
            <Button
              onClick={() => {
                onSelect(3);
                setIsOpen(false);
              }}
              className="text-xl m-2 px-6 py-4 w-full max-w-sm border rounded-md bg-gray-950 border-gray-700 text-white data-[hover]:bg-gray-800 data-[active]:bg-gray-700"
            >
              3
            </Button>
            <Button
              onClick={() => {
                onSelect(5);
                setIsOpen(false);
              }}
              className="text-xl m-2 px-6 py-4 w-full max-w-sm border rounded-md bg-gray-950 border-gray-700 text-white data-[hover]:bg-gray-800 data-[active]:bg-gray-700"
            >
              5
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
