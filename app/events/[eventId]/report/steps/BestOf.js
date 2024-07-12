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
        <DialogPanel className="w-full max-w-md min-h-64 bg-black p-6 border border-gray-800 rounded-md shadow-lg text-center flex flex-col justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-white opacity-20 rounded-full blur-3xl"></div>
          </div>
          <DialogTitle className="text-4xl mb-4 text-white">
            Best of?
          </DialogTitle>
          <Description className="mt-2 text-gray-300">
            Please select the number of games.
          </Description>
          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => {
                onSelect(3);
                setIsOpen(false);
              }}
              className="text-xl m-2 px-8 py-4 border rounded-md bg-gray-950 border-gray-700 text-white data-[hover]:bg-gray-800 data-[active]:bg-gray-700"
            >
              3
            </Button>
            <Button
              onClick={() => {
                onSelect(5);
                setIsOpen(false);
              }}
              className="text-xl m-2 px-8 py-4 border rounded-md bg-gray-950 border-gray-700 text-white data-[hover]:bg-gray-800 data-[active]:bg-gray-700"
            >
              5
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
