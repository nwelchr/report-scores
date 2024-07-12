import React from "react";
import { DialogTitle, Description, Button } from "@headlessui/react";
import Loader from "./Loader";

export default function OpponentConfirmation({ filteredSets, onSelect, onNo }) {
  return (
    <div className="w-full max-w-4xl text-center">
      {filteredSets.length === 1 ? (
        <>
          <DialogTitle className="text-2xl text-white">
            Confirm Opponent
          </DialogTitle>
          <Description className="mt-2 text-gray-300">
            Is your opponent {filteredSets[0].opponent.name}?
          </Description>
          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => onSelect(filteredSets[0])}
              className="text-xl m-2 px-6 py-4 border rounded-md bg-teal-950 border-teal-700 text-white data-[hover]:bg-teal-800 data-[active]:bg-teal-700"
            >
              Yes
            </Button>
            <Button
              onClick={() => onNo()}
              className="text-xl m-2 px-6 py-4 border rounded-md bg-fuchsia-950 border-fuchsia-700 text-white data-[hover]:bg-fuchsia-800 data-[active]:bg-fuchsia-700"
            >
              No
            </Button>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
