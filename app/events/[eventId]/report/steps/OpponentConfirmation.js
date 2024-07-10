import React, { useEffect } from "react";

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
  return (
    <div className="w-full max-w-4xl text-center">
      {filteredSets.length === 1 ? (
        <>
          <p className="text-xl">
            Is your opponent {filteredSets[0].opponent.name}?
          </p>
          <button
            onClick={() => onSelect(filteredSets[0])}
            className="m-4 px-4 py-2 border-2 rounded-md bg-emerald-950 border-emerald-700 text-white"
          >
            Yes
          </button>
          <button
            onClick={onNo}
            className="m-4 px-4 py-2 border-2 rounded-md bg-rose-950 border-rose-700 text-white"
          >
            No
          </button>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
