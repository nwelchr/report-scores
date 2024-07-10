"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import AutosuggestInput from "./AutoSuggestInput";
import {
  saveToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "./utils";

const fetchEntrants = async (eventId) => {
  const { data } = await axios.get(`/api/events/${eventId}/entrants`);
  return data;
};

const fetchSets = async (eventId, entrantId) => {
  const { data } = await axios.get(
    `/api/events/${eventId}/entrants/${entrantId}/sets`
  );
  return data.sets;
};

const reportSet = async ({ setId, winnerId, score }) => {
  console.log(
    `Reporting set ${setId} with winner ${winnerId} and score ${score}`
  );
};

export default function ReportPage() {
  const { eventId } = useParams();
  const [step, setStep] = useState(1);
  const [selectedEntrant, setSelectedEntrant] = useState(null);
  const [selectedSet, setSelectedSet] = useState(null);
  const [entrantScore, setEntrantScore] = useState("");
  const [opponentScore, setOpponentScore] = useState("");
  const [value, setValue] = useState("");

  const { data: entrants } = useQuery({
    queryKey: ["entrants", eventId],
    queryFn: () => fetchEntrants(eventId),
  });

  const { data: sets } = useQuery({
    queryKey: ["sets", selectedEntrant?.id],
    queryFn: () => fetchSets(eventId, selectedEntrant?.id),
    enabled: !!selectedEntrant?.id,
  });

  console.log({ sets });

  const { mutate } = useMutation({
    mutationFn: reportSet,
    onSuccess: () => {
      console.log("Set reported successfully");
      removeFromLocalStorage("reportState");
      setStep(4);
    },
  });

  useEffect(() => {
    const savedState = getFromLocalStorage("reportState");
    if (savedState) {
      setStep(savedState.step);
      setSelectedEntrant(savedState.selectedEntrant);
      setSelectedSet(savedState.selectedSet);
      setEntrantScore(savedState.entrantScore);
      setOpponentScore(savedState.opponentScore);
      setValue(savedState.value);
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage("reportState", {
      step,
      selectedEntrant,
      selectedSet,
      entrantScore,
      opponentScore,
      value,
    });
  }, [step, selectedEntrant, selectedSet, entrantScore, opponentScore, value]);

  const handleEntrantSelect = (suggestion) => {
    setSelectedEntrant(suggestion);
    setValue(suggestion.name);
    setStep(2);
  };

  const handleSetSelect = (set) => {
    setSelectedSet(set);
    setStep(3);
  };

  const handleSubmit = () => {
    if (selectedSet && entrantScore && opponentScore) {
      const winnerId =
        entrantScore > opponentScore
          ? selectedEntrant.id
          : selectedSet.opponent.id;
      const setId = selectedSet.id;
      mutate({ setId, winnerId, score: `${entrantScore}-${opponentScore}` });
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl mb-8">Report Set</h1>
      {step === 1 && (
        <AutosuggestInput
          value={value}
          onChange={setValue}
          onSelect={handleEntrantSelect}
          suggestions={entrants || []}
        />
      )}
      {step === 2 && (
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl mb-4">Select Your Opponent</h2>
          <ul className="space-y-4">
            {sets &&
              sets.map((set) => (
                <li
                  key={set.id}
                  className="p-2 rounded-md bg-gray-700 cursor-pointer"
                  onClick={() => handleSetSelect(set)}
                >
                  {set.opponent.name}
                </li>
              ))}
          </ul>
          <button
            onClick={handleBack}
            className="mt-4 p-2 rounded-md bg-red-600 text-white"
          >
            Back
          </button>
        </div>
      )}
      {step === 3 && (
        <div className="mt-8 w-full max-w-4xl">
          <h2 className="text-2xl mb-4">Enter the Score</h2>
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col items-center">
              <p className="mb-2">{selectedEntrant.name}</p>
              <input
                type="number"
                value={entrantScore}
                onChange={(e) => setEntrantScore(e.target.value)}
                placeholder="Player Score"
                className="p-2 rounded-md bg-violet-950 text-white"
              />
            </div>
            <div className="flex flex-col items-center">
              <p className="mb-2">{selectedSet.opponent.name}</p>
              <input
                type="number"
                value={opponentScore}
                onChange={(e) => setOpponentScore(e.target.value)}
                placeholder="Opponent Score"
                className="p-2 rounded-md bg-violet-950 text-white"
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="p-2 rounded-md bg-emerald-600 text-white"
          >
            Submit
          </button>
          <button
            onClick={handleBack}
            className="mt-4 p-2 rounded-md bg-red-600 text-white"
          >
            Back
          </button>
        </div>
      )}
      {step === 4 && (
        <div className="mt-8">
          <h2 className="text-2xl mb-4">Score Submitted</h2>
        </div>
      )}
    </div>
  );
}
