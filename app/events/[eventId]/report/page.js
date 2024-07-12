"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "./utils";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import useStepNavigation from "./useStepNavigation";
import SelectEntrant from "./steps/SelectEntrant";
import OpponentConfirmation from "./steps/OpponentConfirmation";
import OpponentSelection from "./steps/OpponentSelection";
import BestOf from "./steps/BestOf";
import ScoreInput from "./steps/ScoreInput";
import SubmissionConfirmation from "./steps/SubmissionConfirmation";

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

const stepsGraph = {
  selectEntrant: {
    component: SelectEntrant,
    next: ["confirmOpponent"],
    prev: [],
  },
  confirmOpponent: {
    component: OpponentConfirmation,
    next: ["selectOpponent", "bestOf"],
    nextCondition: (state) =>
      state.filteredSets.length > 1 ? "selectOpponent" : "bestOf",
    prev: ["selectEntrant"],
  },
  selectOpponent: {
    component: OpponentSelection,
    next: ["bestOf"],
    prev: ["confirmOpponent"],
  },
  bestOf: {
    component: BestOf,
    next: ["scoreInput"],
    prev: ["confirmOpponent", "selectOpponent"],
  },
  scoreInput: {
    component: ScoreInput,
    next: ["submissionConfirmation"],
    prev: ["bestOf"],
  },
  submissionConfirmation: {
    component: SubmissionConfirmation,
    next: [],
    prev: ["scoreInput"],
  },
};

export default function ReportPage() {
  const { eventId } = useParams();
  const { currentStep, goToNextStep, goBack, renderStep } = useStepNavigation(
    "selectEntrant",
    stepsGraph
  );
  const [selectedEntrant, setSelectedEntrant] = useState(null);
  const [selectedSet, setSelectedSet] = useState(null);
  const [filteredSets, setFilteredSets] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [value, setValue] = useState("");
  const [shouldFetchSets, setShouldFetchSets] = useState(true);

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
      goToNextStep(); // Move to the next step
      setShouldFetchSets(false);
    },
  });

  useEffect(() => {
    const savedState = getFromLocalStorage("reportState");
    if (savedState) {
      setSelectedEntrant(savedState.selectedEntrant);
      setSelectedSet(savedState.selectedSet);
      setGameData(savedState.gameData);
      setValue(savedState.value);
      goToNextStep(savedState); // Move to the saved step
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage("reportState", {
      step: currentStep,
      selectedEntrant,
      selectedSet,
      filteredSets,
      gameData,
      value,
    });
  }, [
    currentStep,
    selectedEntrant,
    selectedSet,
    filteredSets,
    gameData,
    value,
  ]);

  useEffect(() => {
    if (sets && sets.length) {
      const inProgressOrNotStarted = sets.filter(
        (set) => set.state === "IN_PROGRESS" || set.state === "NOT_STARTED"
      );
      setFilteredSets(inProgressOrNotStarted);
      if (inProgressOrNotStarted.length > 1) {
        console.warn("More than one set in progress for this user.");
      }
      goToNextStep({ filteredSets: inProgressOrNotStarted }); // Move to the next step based on filteredSets
    }
  }, [sets]);

  const handleEntrantSelect = (suggestion) => {
    setSelectedEntrant(suggestion);
    setValue(suggestion.name);
    goToNextStep(); // Move to the next step
  };

  const handleSetSelect = (set) => {
    setSelectedSet(set);
    goToNextStep(); // Move to the next step
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <header className="w-full p-4 bg-gray-900 flex items-center">
        {stepsGraph[currentStep].prev.length > 0 && (
          <button onClick={goBack} className="text-white hover:text-gray-400">
            <ArrowUturnLeftIcon className="w-8 h-8" />
          </button>
        )}
      </header>
      <main
        className="w-full h-screen max-w-md p-6 border-gray-800 rounded-md text-center flex flex-col justify-center relative"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 40%)",
        }}
      >
        {renderStep({
          value,
          entrants,
          filteredSets,
          selectedEntrant,
          selectedSet,
          gameData,
          onChange: setValue,
          onSelect: handleEntrantSelect,
          onSubmit: handleSubmit,
          onBack: goBack,
          onNo: () => goToNextStep({ filteredSets }),
          onSelectSet: handleSetSelect,
        })}
      </main>
    </div>
  );
}
