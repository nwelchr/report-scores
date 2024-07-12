import React from "react";
import { DialogTitle, Description, Button } from "@headlessui/react";

export default function BestOf({ onSelect }) {
  return (
    <>
      <DialogTitle className="text-4xl mb-4 text-white">Best of?</DialogTitle>
      <Description className="mt-2 text-gray-300">
        Please select the number of games.
      </Description>
      <div className="mt-4 flex justify-center">
        <Button
          onClick={() => onSelect(3)}
          className="text-xl m-2 px-8 py-4 border rounded-md bg-gray-950 border-gray-700 text-white data-[hover]:bg-gray-800 data-[active]:bg-gray-700"
        >
          3
        </Button>
        <Button
          onClick={() => onSelect(5)}
          className="text-xl m-2 px-8 py-4 border rounded-md bg-gray-950 border-gray-700 text-white data-[hover]:bg-gray-800 data-[active]:bg-gray-700"
        >
          5
        </Button>
      </div>
    </>
  );
}
