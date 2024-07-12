import React, { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";

export default function SubmissionConfirmation() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md min-h-64 bg-gray-800 p-6 rounded-md shadow-lg text-center flex flex-col justify-center">
          <DialogTitle className="text-2xl text-white">
            Score Submitted!
          </DialogTitle>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
