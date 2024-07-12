import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  Button,
} from "@headlessui/react";

const Loader = () => {
  useEffect(() => {
    async function getLoader() {
      const { waveform } = await import("ldrs");
      waveform.register();
    }
    getLoader();
  }, []);

  return (
    <l-waveform size="80" stroke="3" speed="1.5" color="white"></l-waveform>
  );
};

export default function OpponentConfirmation({ filteredSets, onSelect, onNo }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full max-w-4xl text-center">
      {filteredSets.length === 1 ? (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md min-h-64 bg-gray-800 p-6 rounded-md shadow-lg text-center flex flex-col justify-center">
              {filteredSets[0].opponent.id ? (
                <>
                  <DialogTitle className="text-2xl text-white">
                    Confirm Opponent
                  </DialogTitle>
                  <Description className="mt-2 text-gray-300">
                    Is your opponent {filteredSets[0].opponent.name}?
                  </Description>
                  <div className="mt-4 flex justify-center">
                    <Button
                      onClick={() => {
                        onSelect(filteredSets[0]);
                        setIsOpen(false);
                      }}
                      className="text-xl m-2 px-6 py-4 border rounded-md bg-emerald-950 border-emerald-700 text-white data-[hover]:bg-emerald-800 data-[active]:bg-emerald-700"
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={() => {
                        onNo();
                        setIsOpen(false);
                      }}
                      className="text-xl m-2 px-6 py-4 border rounded-md bg-rose-950 border-rose-700 text-white data-[hover]:bg-rose-800 data-[active]:bg-rose-700"
                    >
                      No
                    </Button>
                  </div>
                </>
              ) : (
                <Description className="text-gray-300">
                  Please wait for your opponent to finish their set before
                  proceeding.
                </Description>
              )}
            </DialogPanel>
          </div>
        </Dialog>
      ) : (
        <Loader />
      )}
    </div>
  );
}
