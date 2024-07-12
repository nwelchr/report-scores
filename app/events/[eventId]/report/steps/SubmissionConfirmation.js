import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

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
        <DialogPanel className="w-full max-w-md min-h-64 bg-black p-6 border border-gray-800 rounded-md shadow-lg text-center flex flex-col justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-white opacity-20 rounded-full blur-3xl"></div>
          </div>
          <DialogTitle className="text-2xl text-white relative z-10">
            Score Submitted!
          </DialogTitle>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
