"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "./utils/localStorage";
import stepsGraph from "./utils/stepsGraph";
import { fetchEntrants, fetchSets, reportSet } from "./utils/api";
import useStepNavigation from "./utils/useStepNavigation";
import PageWrapper from "./components/PageWrapper";

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
      goToNextStep({ filteredSets }); // Move to the next step based on filteredSets
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
    }
  }, [sets]);

  const handleEntrantSelect = (suggestion) => {
    setSelectedEntrant(suggestion);
    setValue(suggestion.name);
    goToNextStep({ filteredSets }); // Move to the next step
  };

  const handleSetSelect = (set) => {
    setSelectedSet(set);
    goToNextStep({ filteredSets }); // Move to the next step
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
    <PageWrapper
      currentStep={currentStep}
      goBack={goBack}
      stepsGraph={stepsGraph}
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
        onNo: () => goToNextStep({ filteredSets }), // Ensure this transitions to selectOpponent
        onSelectSet: handleSetSelect,
      })}
    </PageWrapper>
  );
}
