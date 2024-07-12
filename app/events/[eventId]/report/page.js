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

  const { data: sets, isSuccess: setsFetched } = useQuery({
    queryKey: ["sets", selectedEntrant?.id],
    queryFn: () => fetchSets(eventId, selectedEntrant?.id),
    enabled: !!selectedEntrant?.id && shouldFetchSets,
  });

  useEffect(() => {
    console.log({ sets });
    if (setsFetched && sets) {
      const inProgressOrNotStarted = sets.filter(
        (set) => set.state === "IN_PROGRESS" || set.state === "NOT_STARTED"
      );
      setFilteredSets(inProgressOrNotStarted);
      setShouldFetchSets(false);
    }
  }, [sets, setsFetched]);

  const { mutate } = useMutation({
    mutationFn: reportSet,
    onSuccess: () => {
      console.log("Set reported successfully");
      removeFromLocalStorage("reportState");
      goToNextStep({ filteredSets }); // Move to the next step based on filteredSets
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

  const handleEntrantSelect = (suggestion) => {
    setSelectedEntrant(suggestion);
    setValue(suggestion.name);
    goToNextStep({ filteredSets }); // Ensure filteredSets is passed to decideNextStep
  };

  const handleSetSelect = (set) => {
    setSelectedSet(set);
    goToNextStep({ filteredSets }); // Ensure filteredSets is passed to decideNextStep
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
        onNo: () => goToNextStep({ filteredSets }, "no"), // Ensure this transitions to selectOpponent
        onSelectSet: handleSetSelect,
      })}
    </PageWrapper>
  );
}
