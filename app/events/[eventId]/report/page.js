"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  saveToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "./utils";
import SelectEntrant from "./steps/SelectEntrant";
import OpponentConfirmation from "./steps/OpponentConfirmation";
import OpponentSelection from "./steps/OpponentSelection";
import BestOf from "./steps/BestOf";
import ScoreInput from "./steps/ScoreInput";
import SubmissionConfirmation from "./steps/SubmissionConfirmation";
import { Dialog, DialogPanel } from "@headlessui/react";

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

const reportSet = async ({ eventId, setId, winnerId, gameData }) => {
  const response = await axios.post(`/api/events/${eventId}/report`, {
    setId,
    winnerId,
    gameData,
  });
  return response.data;
};

export default function ReportPage() {
  const { eventId } = useParams();
  const [step, setStep] = useState(1);
  const [selectedEntrant, setSelectedEntrant] = useState(null);
  const [selectedSet, setSelectedSet] = useState(null);
  const [filteredSets, setFilteredSets] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [value, setValue] = useState("");
  const [shouldFetchSets, setShouldFetchSets] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  const { data: entrants } = useQuery({
    queryKey: ["entrants", eventId],
    queryFn: () => fetchEntrants(eventId),
  });

  const { data: sets } = useQuery({
    queryKey: ["sets", selectedEntrant?.id],
    queryFn: () => fetchSets(eventId, selectedEntrant?.id),
    enabled: !!selectedEntrant?.id && shouldFetchSets,
  });

  const { mutate } = useMutation({
    mutationFn: reportSet,
    onSuccess: () => {
      console.log("Set reported successfully");
      removeFromLocalStorage("reportState");
      setStep(6);
      setShouldFetchSets(false);
    },
  });

  useEffect(() => {
    const savedState = getFromLocalStorage("reportState");
    if (savedState) {
      setStep(savedState.step);
      setSelectedEntrant(savedState.selectedEntrant);
      setSelectedSet(savedState.selectedSet);
      setGameData(savedState.gameData);
      setValue(savedState.value);
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage("reportState", {
      step,
      selectedEntrant,
      selectedSet,
      filteredSets,
      gameData,
      value,
    });
  }, [step, selectedEntrant, selectedSet, filteredSets, gameData, value]);

  useEffect(() => {
    if (sets && sets.length) {
      const inProgressOrNotStarted = sets.filter(
        (set) => set.state === "IN_PROGRESS" || set.state === "NOT_STARTED"
      );
      setFilteredSets(inProgressOrNotStarted);
      if (inProgressOrNotStarted.length > 1) {
        console.warn("More than one set in progress for this user.");
      }
      if (inProgressOrNotStarted.length === 1) {
        setStep(2);
      } else {
        setStep(3);
      }
    }
  }, [sets]);

  const handleEntrantSelect = (suggestion) => {
    setSelectedEntrant(suggestion);
    setValue(suggestion.name);
    setStep(2);
  };

  const handleSetSelect = (set) => {
    console.log("hello?");
    setSelectedSet(set);
    setStep(4);
  };

  const handleSubmit = (localGameData) => {
    if (selectedSet && localGameData.length) {
      const winnerId =
        localGameData.filter((game) => game.winnerId === selectedEntrant.id)
          .length >
        localGameData.filter(
          (game) => game.winnerId === selectedSet.opponent.id
        ).length
          ? selectedEntrant.id
          : selectedSet.opponent.id;
      const setId = selectedSet.id;
      mutate({ eventId, setId, winnerId, gameData: localGameData });
    }
  };

  const handleBack = () => {
    if (step === 4 && filteredSets.length === 1) {
      setStep(2);
    } else if (step === 4) {
      setStep(3);
    } else {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SelectEntrant
            value={value}
            entrants={entrants}
            onChange={setValue}
            onSelect={handleEntrantSelect}
          />
        );
      case 2:
        return (
          <OpponentConfirmation
            filteredSets={filteredSets}
            onSelect={handleSetSelect}
            onNo={() => setStep(3)}
          />
        );
      case 3:
        return (
          <OpponentSelection
            sets={sets}
            onSelect={handleSetSelect}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <BestOf
            onSelect={(bestOf) => {
              setGameData(Array(bestOf).fill({ gameNum: 1 }));
              setStep(5);
            }}
          />
        );
      case 5:
        return (
          <ScoreInput
            selectedEntrant={selectedEntrant}
            selectedSet={selectedSet}
            gameData={gameData}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        );
      case 6:
        return <SubmissionConfirmation />;
      default:
        return null;
    }
  };

  console.log({ step });

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          className="w-full max-w-md min-h-64 p-6 border border-gray-800 rounded-md shadow-lg text-center flex flex-col justify-center relative"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 90%)",
          }}
        >
          {renderStep()}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
